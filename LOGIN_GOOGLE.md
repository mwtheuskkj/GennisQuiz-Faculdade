# Login com Google — passo a passo

O GennisQuiz **já tem o login com Google pronto**, no site e no banco de dados. Só falta ligar a chave do Google (leva uns 10 minutos).

## O que já existe no banco de dados (`quiz.db`)

Tabela `usuario`:

| Coluna | Para que serve |
| --- | --- |
| `tipo_conta` | `'site'` (cadastro pelo Quiz) ou `'google'` (entrou com o Google) |
| `google_id` | identificador único da conta Google (só nas contas do Google; nunca se repete) |
| `email` | e-mail da conta (vem do Google, verificado) |

- Conta Google **não tem senha** (na tabela `login` o `senha_hash` fica vazio/nulo), então "alterar senha" não aparece para elas.
- A conta Google ganha o emblema **GoogleAccount** (e a do site, **GennisAccount**).
- O primeiro acesso com o Google pede só o **nickname** e a foto (igual ao cadastro do site). Nos acessos seguintes entra direto.
- O Google nunca entra numa conta que já exista com o mesmo e-mail (o e-mail é único no banco), o que evita assumir a conta de outra pessoa.

Para conferir no banco depois de testar:

```sql
SELECT u.nome, u.email, u.tipo_conta, u.google_id IS NOT NULL AS tem_google
FROM usuario u;
```

## Parte 1 — Criar a chave no Google Cloud

1. Acesse **https://console.cloud.google.com** com a sua conta Google.
2. No topo, clique em **Selecionar projeto → Novo projeto**. Nome: `GennisQuiz` → **Criar**. Depois selecione o projeto.
3. Menu ☰ → **APIs e serviços → Tela de permissão OAuth** (às vezes aparece como *Google Auth Platform*).
   - Clique em **Começar** / **Configurar**.
   - Nome do app: `GennisQuiz`. E-mail de suporte: o seu.
   - Público-alvo: **Externo**.
   - Contato: o seu e-mail. Aceite os termos e **Criar**.
4. Ainda nessa área, em **Público-alvo** (ou *Audience*):
   - Enquanto o app está em **Teste**, só entram os e-mails listados em **Usuários de teste** → clique em **Add users** e coloque os e-mails que vão testar.
   - Para **qualquer pessoa** poder entrar (a mostra de tecnologia), clique em **Publicar app** (*Publish app* → *Em produção*). Como o Quiz só pede e-mail e nome básico, **não precisa de verificação** do Google.
5. Menu ☰ → **APIs e serviços → Credenciais** (ou *Clientes*) → **Criar credenciais → ID do cliente OAuth**.
   - Tipo de aplicativo: **Aplicativo da Web**. Nome: `GennisQuiz Web`.
   - Em **Origens JavaScript autorizadas** clique em **Adicionar URI** e coloque **um por linha** (só o endereço, sem barra no final e sem caminho):
     - `http://localhost:5000`  ← o importante para testar no computador
     - (**não** use `127.0.0.1`: o Google recusa endereço em formato de IP e mostra "Erro 400: invalid_request")
     - quando for para a Vercel: `https://SEU-SITE.vercel.app` (o endereço exato que a Vercel der)
   - **Não** precisa preencher "URIs de redirecionamento".
   - **Criar**. Copie o **ID do cliente** (termina com `.apps.googleusercontent.com`). Não precisa do "segredo do cliente".

> As alterações no Google podem levar de alguns minutos até algumas horas para valer. Se aparecer `origin_mismatch`, o endereço não bate com o da lista.

## Parte 2 — Ligar o ID no projeto

Escolha **uma** das formas:

**A) Variável de ambiente (recomendado, também é o jeito da Vercel)**

- Windows PowerShell:
  ```powershell
  $env:GOOGLE_CLIENT_ID="COLE-AQUI.apps.googleusercontent.com"
  python app.py
  ```
- Windows CMD: `set GOOGLE_CLIENT_ID=COLE-AQUI.apps.googleusercontent.com` e depois `python app.py`
- Vercel: projeto → **Settings → Environment Variables** → nome `GOOGLE_CLIENT_ID`, valor = o ID → **Save** → faça um novo deploy.

**B) Direto no código:** no `app.py`, troque a linha
`GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")`
por
`GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "COLE-AQUI.apps.googleusercontent.com")`
(o ID do cliente não é segredo, pode ficar no código).

## Parte 3 — Testar

1. Reinicie a API e abra **http://localhost:5000/** (com o Google ligado, o site já troca `127.0.0.1` por `localhost` sozinho). Use o mesmo endereço que você colocou nas origens autorizadas.
2. Na tela de login deve aparecer o botão **Entrar com o Google**. Se aparecer desativado/ausente, a API não recebeu o ID: confira `http://localhost:5000/api/config` — o campo `google_client_id` precisa mostrar o seu ID (se mostrar `null`, a variável não foi lida).
3. Entre com uma conta Google → escolha nickname e foto → pronto. Confira o emblema **GoogleAccount** no perfil.

## Problemas comuns

| Mensagem / sintoma | O que fazer |
| --- | --- |
| **"Acesso bloqueado: erro de autorização — Erro 400: invalid_request"** | Quase sempre é o endereço: abra o site por **http://localhost:5000** (nunca `127.0.0.1` nem IP de rede) e deixe `http://localhost:5000` nas origens autorizadas. Se continuar, confira se o ID do cliente é do tipo **Aplicativo da Web** (não "Computador"/"Android") e clique em *detalhes do erro* na tela do Google: ele diz o motivo exato. |
| `origin_mismatch` / "Erro 400" do Google | O endereço da barra do navegador não está nas **Origens JavaScript autorizadas** (confira `127.0.0.1` x `localhost`, `http` x `https`, a porta). |
| `access_denied` / "app não verificado" | O app está em **Teste** e o e-mail não está em *Usuários de teste*, ou ainda não foi **publicado**. |
| Botão do Google não aparece | `GOOGLE_CLIENT_ID` vazio (veja `/api/config`) ou sem internet para carregar `accounts.google.com`. |
| Não funciona pelo celular em `http://192.168.x.x:5000` | O Google **não aceita IP de rede** como origem. No celular use o login do site, ou publique na Vercel (endereço `https://`). |
| "Esta conta do Google já foi cadastrada" | Esse e-mail já tem conta no banco; entre normalmente (e-mail e senha do site, ou o Google se foi assim que criou). |
