"""
Leva os dados do quiz.db (SQLite) para o PostgreSQL. Rode UMA vez, no seu computador, depois de criar o PostgreSQL no Render.

Como usar:
    pip install flask psycopg2-binary
    set DATABASE_URL=<External Database URL do PostgreSQL do Render>       (no Windows: set / no Linux e Mac: export)
    python migrar_sqlite_para_postgres.py                  (usa o quiz.db que está na mesma pasta)
    python migrar_sqlite_para_postgres.py caminho/quiz.db  (ou diga onde está o arquivo)

O que ele faz:
  - cria as tabelas no PostgreSQL (o app.py faz isso sozinho quando é importado);
  - copia usuários, logins (senhas continuam como hash), partidas do ranking e emblemas, com os mesmos ids;
  - se o quiz.db for antigo (sem a coluna pontos), calcula os pontos das partidas (acertos x valor do modo);
  - confere se as quantidades bateram. Se algo der errado, nada é gravado (é tudo numa transação só).

Ele se recusa a rodar se o PostgreSQL já tiver usuários, para não misturar dados. Use --forcar para ignorar esse aviso.
"""
import os
import sqlite3
import sys

if not os.environ.get("DATABASE_URL"):
    sys.exit("Defina a DATABASE_URL (a External Database URL do PostgreSQL do Render) antes de rodar.")

import app   # importar o app.py já cria as tabelas no PostgreSQL

argumentos = [a for a in sys.argv[1:] if not a.startswith("--")]
forcar = "--forcar" in sys.argv
caminho = argumentos[0] if argumentos else os.path.join(os.path.dirname(os.path.abspath(__file__)), "quiz.db")
if not os.path.exists(caminho):
    sys.exit("Não achei o arquivo %s" % caminho)

origem = sqlite3.connect("file:%s?mode=ro" % caminho.replace("\\", "/"), uri=True)   # só leitura: o quiz.db não é alterado
origem.row_factory = sqlite3.Row
destino = app.abrir_banco()


def colunas_da_origem(tabela):
    return [linha[1] for linha in origem.execute("PRAGMA table_info(%s)" % tabela)]


def copiar(tabela, colunas, linhas):
    # insere linha por linha, mantendo os ids que já existiam
    sql = "INSERT INTO %s (%s) VALUES (%s)" % (tabela, ", ".join(colunas), ", ".join("?" for _ in colunas))
    for linha in linhas:
        destino.execute(sql, tuple(linha[c] for c in colunas))
    return len(linhas)


try:
    ja_tem = destino.execute("SELECT COUNT(*) FROM usuario").fetchone()[0]
    if ja_tem and not forcar:
        sys.exit("O PostgreSQL já tem %d usuário(s). Nada foi copiado (use --forcar se tiver certeza)." % ja_tem)

    # ---------- usuario ----------
    tem = colunas_da_origem("usuario")
    cols = [c for c in ("id_usuario", "nome", "email", "tipo_conta", "google_id", "foto", "banner",
                        "biografia", "pronomes", "data_cadastro") if c in tem]
    linhas = origem.execute("SELECT * FROM usuario ORDER BY id_usuario").fetchall()
    n_usuarios = copiar("usuario", cols, linhas)

    # ---------- login ----------
    tem = colunas_da_origem("login")
    cols = [c for c in ("id_login", "id_usuario", "nome_login", "senha_hash", "data_ultimo_acesso",
                        "data_troca_nome", "data_troca_senha") if c in tem]
    linhas = origem.execute("SELECT * FROM login ORDER BY id_login").fetchall()
    n_logins = copiar("login", cols, linhas)

    # ---------- ranking ----------
    tem = colunas_da_origem("ranking")
    linhas = origem.execute("SELECT * FROM ranking ORDER BY id_ranking").fetchall()
    n_ranking = 0
    for p in linhas:
        # quiz.db antigo não tem pontos: calcula (acertos x valor do modo)
        pontos = p["pontos"] if "pontos" in tem else p["acertos"] * app.PONTOS_POR_NIVEL.get(p["modo"], 0)
        destino.execute(
            "INSERT INTO ranking (id_ranking, id_usuario, modo, acertos, total_perguntas, pontos, data_partida) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (p["id_ranking"], p["id_usuario"], p["modo"], p["acertos"], p["total_perguntas"], pontos, p["data_partida"]))
        n_ranking += 1

    # ---------- emblemas ----------
    # os ids dos emblemas podem ser diferentes nos dois bancos, então liga pelo código (GENNIS_ACCOUNT, TOP_1...)
    novo_id = {}
    for e in origem.execute("SELECT * FROM emblema").fetchall():
        achou = destino.execute("SELECT id_emblema FROM emblema WHERE codigo = ?", (e["codigo"],)).fetchone()
        if achou is None:       # emblema que só existia no seu banco antigo
            achou = destino.execute(
                "INSERT INTO emblema (codigo, nome, descricao) VALUES (?, ?, ?) RETURNING id_emblema",
                (e["codigo"], e["nome"], e["descricao"])).fetchone()
        novo_id[e["id_emblema"]] = achou[0]

    tem = colunas_da_origem("usuario_emblema")
    linhas = origem.execute("SELECT * FROM usuario_emblema").fetchall()
    n_emblemas = 0
    for ue in linhas:
        manual = ue["manual"] if "manual" in tem else 0
        destino.execute(
            "INSERT INTO usuario_emblema (id_usuario, id_emblema, data_conquista, manual) VALUES (?, ?, ?, ?)",
            (ue["id_usuario"], novo_id[ue["id_emblema"]], ue["data_conquista"], manual))
        n_emblemas += 1

    # ---------- os próximos ids novos continuam depois dos que foram copiados ----------
    for tabela, coluna in (("usuario", "id_usuario"), ("login", "id_login"),
                           ("ranking", "id_ranking"), ("emblema", "id_emblema")):
        destino.execute(
            "SELECT setval(pg_get_serial_sequence('%s', '%s'), COALESCE((SELECT MAX(%s) FROM %s), 0) + 1, false)"
            % (tabela, coluna, coluna, tabela))

    # ---------- conferência ----------
    for tabela, esperado in (("usuario", n_usuarios), ("login", n_logins), ("ranking", n_ranking)):
        no_banco = destino.execute("SELECT COUNT(*) FROM %s" % tabela).fetchone()[0]
        if no_banco != esperado:
            raise RuntimeError("A contagem de %s não bateu: copiei %d mas o PostgreSQL tem %d" % (tabela, esperado, no_banco))

    destino.commit()
    print("Pronto! Copiado para o PostgreSQL:")
    print("  %d usuários, %d logins, %d partidas do ranking, %d emblemas de usuários" % (n_usuarios, n_logins, n_ranking, n_emblemas))
except SystemExit:
    destino.rollback()
    raise
except Exception:
    destino.rollback()
    print("Deu erro e NADA foi gravado no PostgreSQL. Detalhes abaixo:")
    raise
finally:
    destino.close()
    origem.close()
