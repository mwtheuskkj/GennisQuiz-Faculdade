import base64
import binascii
import json
import math
import os
import random
import re
import secrets
import time
import unicodedata
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from functools import wraps

import psycopg2
import psycopg2.extras
from flask import Flask, g, jsonify, request
from itsdangerous import BadSignature, URLSafeTimedSerializer
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
#--------------------------+
# (API) PERGUNTAS DO QUIZ -_-
#--------------------------+
# 45 perguntas: ids 1-15 (fácil), 16-30 (normal) e 31-45 (difícil). O modo Radical sorteia 15 delas.
# Cada acerto vale pontos conforme o nível da pergunta (veja PONTOS_POR_NIVEL).
PONTOS_POR_NIVEL = {"facil": 10, "normal": 20, "dificil": 30}
PERGUNTAS_RADICAL = 15      # quantas perguntas o modo Radical sorteia

perguntas = [
    # ----- Modo FÁCIL -----
    {
        "id": 1,
        "modo": "facil",
        "pergunta": "Qual destes dispositivos é considerado um hardware (parte física do computador)?",
        "alternativas": ["Google Chrome", "Teclado", "Microsoft Windows", "Arquivo PDF"],
        "respostaCorreta": 1,
        "dica": "Pense em algo que você consegue tocar fisicamente na mesa.",
        "explicacaoCorreta": "Correto! Teclado.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Teclado."
    },
    {
        "id": 2,
        "modo": "facil",
        "pergunta": "Qual empresa é a criadora do sistema operacional Windows?",
        "alternativas": ["Apple", "Google", "Microsoft", "Linux"],
        "respostaCorreta": 2,
        "dica": "É uma das empresas fundadas por Bill Gates.",
        "explicacaoCorreta": "Correto! Microsoft.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Microsoft."
    },
    {
        "id": 3,
        "modo": "facil",
        "pergunta": "O que significa a letra \"W\" nas iniciais www de um endereço de site da internet?",
        "alternativas": ["Web", "World", "Windows", "Wireless"],
        "respostaCorreta": 1,
        "dica": "Significa \"Mundo\" em inglês.",
        "explicacaoCorreta": "Correto! World (de World Wide Web).",
        "explicacaoErrada": "Incorreto. A resposta certa é: World (de World Wide Web)."
    },
    {
        "id": 4,
        "modo": "facil",
        "pergunta": "Qual destas redes sociais é representada historicamente por um pássaro azul (ou pela letra \"X\")?",
        "alternativas": ["Instagram", "LinkedIn", "Twitter (X)", "TikTok"],
        "respostaCorreta": 2,
        "dica": "É muito usada para debates rápidos e postagem de textos curtos.",
        "explicacaoCorreta": "Correto! Twitter (X).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Twitter (X)."
    },
    {
        "id": 5,
        "modo": "facil",
        "pergunta": "Qual navegador de internet pertence à empresa Google?",
        "alternativas": ["Safari", "Edge", "Firefox", "Google Chrome"],
        "respostaCorreta": 3,
        "dica": "O nome do navegador leva o próprio nome da empresa.",
        "explicacaoCorreta": "Correto! Google Chrome.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Google Chrome."
    },
    {
        "id": 6,
        "modo": "facil",
        "pergunta": "Qual botão do teclado geralmente usamos para apagar o caractere que está à esquerda do cursor?",
        "alternativas": ["Enter", "Shift", "Backspace (Apagar)", "Espaço"],
        "respostaCorreta": 2,
        "dica": "Fica geralmente na parte superior direita do teclado principal.",
        "explicacaoCorreta": "Correto! Backspace (Apagar).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Backspace (Apagar)."
    },
    {
        "id": 7,
        "modo": "facil",
        "pergunta": "Qual destes animais é o famoso mascote do sistema operacional Linux?",
        "alternativas": ["Um leão", "Um pinguim", "Um macaco", "Um urso"],
        "respostaCorreta": 1,
        "dica": "O nome dele é Tux.",
        "explicacaoCorreta": "Correto! Um pinguim.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Um pinguim."
    },
    {
        "id": 8,
        "modo": "facil",
        "pergunta": "O que significa a sigla USB em cabos e entradas de computadores?",
        "alternativas": ["Universal Serial Bus", "Ultra Sistema de Banda", "Unidade de Salvamento Básica", "User Server Board"],
        "respostaCorreta": 0,
        "dica": "É a entrada padrão universal usada para conectar mouses, pen drives e teclados.",
        "explicacaoCorreta": "Correto! Universal Serial Bus.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Universal Serial Bus."
    },
    {
        "id": 9,
        "modo": "facil",
        "pergunta": "Qual destes programas é utilizado principalmente para criar apresentações de slides?",
        "alternativas": ["Microsoft Excel", "Microsoft PowerPoint", "Bloco de Notas", "Paint"],
        "respostaCorreta": 1,
        "dica": "É muito usado em palestras e trabalhos escolares.",
        "explicacaoCorreta": "Correto! Microsoft PowerPoint.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Microsoft PowerPoint."
    },
    {
        "id": 10,
        "modo": "facil",
        "pergunta": "Qual é a principal função de uma impressora?",
        "alternativas": ["Projetar imagens na parede.", "Digitalizar fotos para o computador.", "Passar documentos digitais para o papel físico.", "Tocar músicas em alta voz."],
        "respostaCorreta": 2,
        "dica": "Ela usa tinta ou toner para deixar marcas no papel.",
        "explicacaoCorreta": "Correto! Passar documentos digitais para o papel físico.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Passar documentos digitais para o papel físico."
    },
    {
        "id": 11,
        "modo": "facil",
        "pergunta": "O que é um vírus de computador?",
        "alternativas": ["Um componente que estraga o monitor se molhar.", "Um programa malicioso criado para infectar e danificar sistemas ou roubar dados.", "Um erro de fábrica na placa de vídeo.", "Um arquivo de música corrompido."],
        "respostaCorreta": 1,
        "dica": "Recebe o mesmo nome dos micro-organismos que deixam as pessoas gripadas.",
        "explicacaoCorreta": "Correto! Um programa malicioso criado para infectar e danificar sistemas ou roubar dados.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Um programa malicioso criado para infectar e danificar sistemas ou roubar dados."
    },
    {
        "id": 12,
        "modo": "facil",
        "pergunta": "Qual é o nome da lixeira eletrônica onde ficam os arquivos apagados temporariamente no Windows?",
        "alternativas": ["Pasta Raiz", "Lixeira (Recycle Bin)", "Armário Digital", "Arquivo Morto"],
        "respostaCorreta": 1,
        "dica": "O ícone geralmente se parece com uma pequena cesta de escritório.",
        "explicacaoCorreta": "Correto! Lixeira (Recycle Bin).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Lixeira (Recycle Bin)."
    },
    {
        "id": 13,
        "modo": "facil",
        "pergunta": "Qual destes dispositivos serve para armazenar dados de forma portátil?",
        "alternativas": ["Monitor", "Pen Drive", "Caixa de som", "Estabilizador"],
        "respostaCorreta": 1,
        "dica": "É pequeno, cabe no bolso e se conecta na entrada USB.",
        "explicacaoCorreta": "Correto! Pen Drive.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Pen Drive."
    },
    {
        "id": 14,
        "modo": "facil",
        "pergunta": "O que significa a tecla Caps Lock no teclado?",
        "alternativas": ["Travar a tela do computador.", "Desligar o computador instantaneamente.", "Digitar todas as letras em maiúsculo.", "Tirar uma captura de tela (print)."],
        "respostaCorreta": 2,
        "dica": "Quando ativada, costuma acender uma luzinha verde ou laranja no teclado.",
        "explicacaoCorreta": "Correto! Digitar todas as letras em maiúsculo.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Digitar todas as letras em maiúsculo."
    },
    {
        "id": 15,
        "modo": "facil",
        "pergunta": "Qual destas opções é um exemplo de sistema operacional para smartphones?",
        "alternativas": ["Windows 11", "Android", "Microsoft Word", "Google Drive"],
        "respostaCorreta": 1,
        "dica": "Foi desenvolvido pelo Google e está presente na maioria dos celulares do mundo (junto com o iOS da Apple).",
        "explicacaoCorreta": "Correto! Android.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Android."
    },
    # ----- Modo NORMAL -----
    {
        "id": 16,
        "modo": "normal",
        "pergunta": "Qual linguagem de programação é atualmente a mais utilizada em Inteligência Artificial e Ciência de Dados?",
        "alternativas": ["Python", "HTML", "CSS", "Scratch"],
        "respostaCorreta": 0,
        "dica": "Seu nome também é o de uma famosa serpente.",
        "explicacaoCorreta": "Correto! Python.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Python."
    },
    {
        "id": 17,
        "modo": "normal",
        "pergunta": "O que é Cloud Computing (Computação em Nuvem)?",
        "alternativas": ["Armazenar arquivos apenas no pen drive.", "Processar e armazenar dados em servidores remotos acessados pela internet.", "Um tipo de previsão do tempo feita por supercomputadores.", "A energia estática gerada pelos cabos de rede."],
        "respostaCorreta": 1,
        "dica": "Significa que seus arquivos não estão salvos fisicamente só no seu computador local.",
        "explicacaoCorreta": "Correto! Processar e armazenar dados em servidores remotos acessados pela internet.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Processar e armazenar dados em servidores remotos acessados pela internet."
    },
    {
        "id": 18,
        "modo": "normal",
        "pergunta": "Qual é a principal função de um roteador em uma rede de computadores?",
        "alternativas": ["Imprimir documentos à distância.", "Proteger o computador contra vírus.", "Encaminhar pacotes de dados entre diferentes redes (como conectar sua casa à internet).", "Aumentar a memória RAM do celular."],
        "respostaCorreta": 2,
        "dica": "É aquele aparelho com antenas que transmite o sinal de Wi-Fi.",
        "explicacaoCorreta": "Correto! Encaminhar pacotes de dados entre diferentes redes.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Encaminhar pacotes de dados entre diferentes redes."
    },
    {
        "id": 19,
        "modo": "normal",
        "pergunta": "O que significa a sigla HTML no desenvolvimento web?",
        "alternativas": ["HyperText Machine Language", "High Transfer Modern Link", "HyperText Markup Language", "Home Tool Multi Language"],
        "respostaCorreta": 2,
        "dica": "É a linguagem de marcação padrão para criar a estrutura de páginas na web.",
        "explicacaoCorreta": "Correto! HyperText Markup Language.",
        "explicacaoErrada": "Incorreto. A resposta certa é: HyperText Markup Language."
    },
    {
        "id": 20,
        "modo": "normal",
        "pergunta": "Qual tecnologia descentralizada serve como base para o funcionamento de criptomoedas como o Bitcoin?",
        "alternativas": ["Inteligência Artificial", "Blockchain", "Fibra Óptica", "Realidade Virtual"],
        "respostaCorreta": 1,
        "dica": "O nome faz referência a uma \"corrente de blocos\" interligados de forma segura.",
        "explicacaoCorreta": "Correto! Blockchain.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Blockchain."
    },
    {
        "id": 21,
        "modo": "normal",
        "pergunta": "O que é a Memória RAM de um computador?",
        "alternativas": ["O espaço total de armazenamento de fotos e vídeos.", "A memória de curto prazo que guarda dados dos aplicativos abertos no momento.", "O chip responsável por resfriar o processador.", "A bateria que mantém o relógio da placa-mãe funcionando."],
        "respostaCorreta": 1,
        "dica": "Quando você desliga o computador, tudo o que estava nela é apagado.",
        "explicacaoCorreta": "Correto! A memória de curto prazo que guarda dados dos aplicativos abertos no momento.",
        "explicacaoErrada": "Incorreto. A resposta certa é: A memória de curto prazo que guarda dados dos aplicativos abertos no momento."
    },
    {
        "id": 22,
        "modo": "normal",
        "pergunta": "Qual protocolo de segurança é identificado pelo \"https://\" no início dos endereços de sites?",
        "alternativas": ["Abertura de portas automáticas.", "Criptografia e segurança na transferência de dados entre o navegador e o site.", "Ocultação automática de vírus.", "Aceleração da velocidade da internet."],
        "respostaCorreta": 1,
        "dica": "A letra \"S\" no final significa Secure (Seguro).",
        "explicacaoCorreta": "Correto! Criptografia e segurança na transferência de dados entre o navegador e o site.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Criptografia e segurança na transferência de dados entre o navegador e o site."
    },
    {
        "id": 23,
        "modo": "normal",
        "pergunta": "O que significa a sigla IoT (Internet das Coisas)?",
        "alternativas": ["Dispositivos eletrônicos comuns (como lâmpadas e geladeiras) conectados à internet.", "Cabos subterrâneos de fibra óptica intercontinental.", "Um protocolo de segurança para redes corporativas.", "Inteligência Artificial focada em robótica industrial."],
        "respostaCorreta": 0,
        "dica": "Pense em uma casa inteligente onde você comanda tudo pelo celular.",
        "explicacaoCorreta": "Correto! Dispositivos eletrônicos comuns conectados à internet.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Dispositivos eletrônicos comuns conectados à internet."
    },
    {
        "id": 24,
        "modo": "normal",
        "pergunta": "Qual é a função do Firewall em um sistema ou rede?",
        "alternativas": ["Aumentar a velocidade do processador.", "Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\".", "Limpar arquivos duplicados do disco rígido.", "Criar cópias de segurança (backup) automáticas."],
        "respostaCorreta": 1,
        "dica": "O nome traduzido ao pé da letra significa \"parede de fogo\".",
        "explicacaoCorreta": "Correto! Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\".",
        "explicacaoErrada": "Incorreto. A resposta certa é: Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\"."
    },
    {
        "id": 25,
        "modo": "normal",
        "pergunta": "O que é um Endereço IP?",
        "alternativas": ["A senha secreta do seu e-mail.", "Um número de identificação único atribuído a cada dispositivo conectado a uma rede.", "A marca registrada do processador.", "A capacidade máxima de carga da bateria."],
        "respostaCorreta": 1,
        "dica": "Funciona como o \"endereço postal\" do seu computador na internet.",
        "explicacaoCorreta": "Correto! Um número de identificação único atribuído a cada dispositivo conectado a uma rede.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Um número de identificação único atribuído a cada dispositivo conectado a uma rede."
    },
    {
        "id": 26,
        "modo": "normal",
        "pergunta": "Qual linguagem de estilização é usada junto com o HTML para definir as cores, fontes e o visual de páginas web?",
        "alternativas": ["Python", "CSS", "SQL", "Java"],
        "respostaCorreta": 1,
        "dica": "Significa Cascading Style Sheets (Folhas de Estilo em Cascata).",
        "explicacaoCorreta": "Correto! CSS.",
        "explicacaoErrada": "Incorreto. A resposta certa é: CSS."
    },
    {
        "id": 27,
        "modo": "normal",
        "pergunta": "O que é Open Source (Código Aberto)?",
        "alternativas": ["Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir.", "Sistemas que cobram taxas mensais altíssimas para uso corporativo.", "Programas que só rodam em computadores sem conexão com a internet.", "Jogos que não possuem fases bloqueadas."],
        "respostaCorreta": 0,
        "dica": "O oposto de softwares proprietários fechados (como o Windows tradicional).",
        "explicacaoCorreta": "Correto! Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir."
    },
    {
        "id": 28,
        "modo": "normal",
        "pergunta": "Qual é a principal utilidade de um arquivo compactado no formato .ZIP?",
        "alternativas": ["Transformar imagens em vídeos curtos.", "Reduzir o tamanho de arquivos para facilitar o envio e armazenamento.", "Proteger a senha do usuário contra roubo de identidade.", "Apagar vírus automaticamente de pastas corrompidas."],
        "respostaCorreta": 1,
        "dica": "O ícone costuma se parecer com uma pasta com um zíper ou livros apertados.",
        "explicacaoCorreta": "Correto! Reduzir o tamanho de arquivos para facilitar o envio e armazenamento.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Reduzir o tamanho de arquivos para facilitar o envio e armazenamento."
    },
    {
        "id": 29,
        "modo": "normal",
        "pergunta": "O que é Phishing no contexto de segurança digital?",
        "alternativas": ["Uma técnica para pescar arquivos corrompidos na lixeira.", "Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados.", "Um vírus que trava o computador até que o usuário reinicie a máquina.", "Uma rede social voltada para entusiastas de pesca esportiva."],
        "respostaCorreta": 1,
        "dica": "O som da palavra em inglês lembra \"pescaria\" (fishing), pois eles tentam fazer você \"morder a isca\".",
        "explicacaoCorreta": "Correto! Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados."
    },
    {
        "id": 30,
        "modo": "normal",
        "pergunta": "O que significa a sigla CPU em um computador?",
        "alternativas": ["Central Processing Unit (Unidade Central de Processamento)", "Computer Power Utility", "Control Principal User", "Core Peripherals Unit"],
        "respostaCorreta": 0,
        "dica": "É considerada o \"cérebro\" de todo o computador.",
        "explicacaoCorreta": "Correto! Central Processing Unit (Unidade Central de Processamento).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Central Processing Unit (Unidade Central de Processamento)."
    },
    # ----- Modo DIFÍCIL -----
    {
        "id": 31,
        "modo": "dificil",
        "pergunta": "O que será exibido no console após a execução deste código em Python?",
        "linguagem": "Python",
        "codigo": "x = [1, 2, 3]\nx.append(4)\nprint(len(x))",
        "alternativas": ["3", "4", "Erro de sintaxe", "5"],
        "respostaCorreta": 1,
        "dica": "O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total.",
        "explicacaoCorreta": "Correto! A resposta é: 4. Entenda: O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total.",
        "explicacaoErrada": "Incorreto. A resposta certa é: 4. Entenda: O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total."
    },
    {
        "id": 32,
        "modo": "dificil",
        "pergunta": "No código Java abaixo, qual será o resultado impresso da divisão?",
        "linguagem": "Java",
        "codigo": "int a = 5;\nint b = 2;\nSystem.out.println(a / b);",
        "alternativas": ["2.5", "3", "2", "Erro de compilação"],
        "respostaCorreta": 2,
        "dica": "Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado.",
        "explicacaoCorreta": "Correto! A resposta é: 2. Entenda: Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado.",
        "explicacaoErrada": "Incorreto. A resposta certa é: 2. Entenda: Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado."
    },
    {
        "id": 33,
        "modo": "dificil",
        "pergunta": "O que a consulta (query) SQL abaixo realiza no banco de dados?",
        "linguagem": "SQL",
        "codigo": "SELECT COUNT(*) FROM usuarios WHERE status = 'ativo';",
        "alternativas": ["Retorna a lista completa com o nome de todos os usuários.", "Conta o número total de linhas onde o status é igual a 'ativo'.", "Apaga todos os usuários ativos do sistema.", "Atualiza o status dos usuários para 'ativo'."],
        "respostaCorreta": 1,
        "dica": "A palavra COUNT serve para contar registros, auxiliada pela condição WHERE.",
        "explicacaoCorreta": "Correto! A resposta é: Conta o número total de linhas onde o status é igual a 'ativo'. Entenda: A palavra COUNT serve para contar registros, auxiliada pela condição WHERE.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Conta o número total de linhas onde o status é igual a 'ativo'. Entenda: A palavra COUNT serve para contar registros, auxiliada pela condição WHERE."
    },
    {
        "id": 34,
        "modo": "dificil",
        "pergunta": "Analise a função abaixo em Python. O que será impresso ao executar print(func(4))?",
        "linguagem": "Python",
        "codigo": "def func(n):\n    return n * 2 if n > 5 else n + 2\n\nprint(func(4))",
        "alternativas": ["8", "6", "4", "10"],
        "respostaCorreta": 1,
        "dica": "Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2.",
        "explicacaoCorreta": "Correto! A resposta é: 6. Entenda: Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2.",
        "explicacaoErrada": "Incorreto. A resposta certa é: 6. Entenda: Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2."
    },
    {
        "id": 35,
        "modo": "dificil",
        "pergunta": "Qual é o objetivo principal da instrução SQL a seguir?",
        "linguagem": "SQL",
        "codigo": "SELECT nome FROM produtos ORDER BY preco DESC LIMIT 1;",
        "alternativas": ["Encontrar o produto mais barato.", "Listar todos os produtos em ordem alfabética.", "Encontrar o produto mais caro.", "Mostrar apenas o primeiro produto cadastrado no banco."],
        "respostaCorreta": 2,
        "dica": "ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro.",
        "explicacaoCorreta": "Correto! A resposta é: Encontrar o produto mais caro. Entenda: ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Encontrar o produto mais caro. Entenda: ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro."
    },
    {
        "id": 36,
        "modo": "dificil",
        "pergunta": "O que o código Java abaixo imprime na tela?",
        "linguagem": "Java",
        "codigo": "String texto = \"Tecnologia\";\nSystem.out.println(texto.length());",
        "alternativas": ["9", "10", "8", "Erro"],
        "respostaCorreta": 1,
        "dica": "Conte o número de letras que compõem a palavra \"Tecnologia\".",
        "explicacaoCorreta": "Correto! A resposta é: 10. Entenda: Conte o número de letras que compõem a palavra \"Tecnologia\".",
        "explicacaoErrada": "Incorreto. A resposta certa é: 10. Entenda: Conte o número de letras que compõem a palavra \"Tecnologia\"."
    },
    {
        "id": 37,
        "modo": "dificil",
        "pergunta": "Qual será o resultado da execução deste laço de repetição em Python?",
        "linguagem": "Python",
        "codigo": "soma = 0\nfor i in range(1, 4):\n    soma += i\nprint(soma)",
        "alternativas": ["6", "10", "3", "4"],
        "respostaCorreta": 0,
        "dica": "O range(1, 4) gera os números 1, 2 e 3. Some todos eles.",
        "explicacaoCorreta": "Correto! A resposta é: 6. Entenda: O range(1, 4) gera os números 1, 2 e 3. Some todos eles.",
        "explicacaoErrada": "Incorreto. A resposta certa é: 6. Entenda: O range(1, 4) gera os números 1, 2 e 3. Some todos eles."
    },
    {
        "id": 38,
        "modo": "dificil",
        "pergunta": "No comando SQL abaixo, o que acontece se omitirmos a cláusula WHERE? (Considerando a tabela correta)",
        "linguagem": "SQL",
        "codigo": "UPDATE funcionarios SET salario = salario * 1.10;",
        "alternativas": ["Apenas o primeiro funcionário receberá o aumento.", "O comando falhará com erro de sintaxe.", "Todos os registros da tabela de funcionários terão o salário reajustado.", "Nenhum funcionário terá alteração no salário."],
        "respostaCorreta": 2,
        "dica": "O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira.",
        "explicacaoCorreta": "Correto! A resposta é: Todos os registros da tabela de funcionários terão o salário reajustado. Entenda: O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Todos os registros da tabela de funcionários terão o salário reajustado. Entenda: O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira."
    },
    {
        "id": 39,
        "modo": "dificil",
        "pergunta": "Qual será a saída do código Java abaixo?",
        "linguagem": "Java",
        "codigo": "boolean condicao = (5 > 3) && (2 == 4);\nSystem.out.println(condicao);",
        "alternativas": ["true", "false", "null", "Erro de execução"],
        "respostaCorreta": 1,
        "dica": "O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa.",
        "explicacaoCorreta": "Correto! A resposta é: false. Entenda: O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa.",
        "explicacaoErrada": "Incorreto. A resposta certa é: false. Entenda: O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa."
    },
    {
        "id": 40,
        "modo": "dificil",
        "pergunta": "O que faz o comando abaixo em Python?",
        "linguagem": "Python",
        "codigo": "with open('arquivo.txt', 'w') as f:\n    f.write(\"Olá Mundo\")",
        "alternativas": ["Lê o conteúdo de um arquivo de texto existente.", "Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele.", "Apaga permanentemente o arquivo do computador.", "Verifica se o arquivo possui vírus."],
        "respostaCorreta": 1,
        "dica": "O parâmetro 'w' vem de write (escrever).",
        "explicacaoCorreta": "Correto! A resposta é: Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele. Entenda: O parâmetro 'w' vem de write (escrever).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele. Entenda: O parâmetro 'w' vem de write (escrever)."
    },
    {
        "id": 41,
        "modo": "dificil",
        "pergunta": "Qual comando SQL é utilizado para inserir um novo registro (uma nova linha de dados) em uma tabela?",
        "linguagem": "SQL",
        "alternativas": ["ADD ROW", "INSERT INTO", "CREATE RECORD", "PUT DATA"],
        "respostaCorreta": 1,
        "dica": "Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\".",
        "explicacaoCorreta": "Correto! A resposta é: INSERT INTO. Entenda: Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\".",
        "explicacaoErrada": "Incorreto. A resposta certa é: INSERT INTO. Entenda: Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\"."
    },
    {
        "id": 42,
        "modo": "dificil",
        "pergunta": "O que acontece se tentarmos acessar um índice que não existe em um vetor (array) em Java, como no exemplo abaixo?",
        "linguagem": "Java",
        "codigo": "int[] numeros = {10, 20, 30};\nSystem.out.println(numeros[5]);",
        "alternativas": ["O programa imprime o valor 0 por padrão.", "O compilador ignora a linha e continua.", "Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException).", "O programa cria automaticamente novas posições no array."],
        "respostaCorreta": 2,
        "dica": "Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite.",
        "explicacaoCorreta": "Correto! A resposta é: Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException). Entenda: Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite.",
        "explicacaoErrada": "Incorreto. A resposta certa é: Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException). Entenda: Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite."
    },
    {
        "id": 43,
        "modo": "dificil",
        "pergunta": "Qual será a saída deste código em Python?",
        "linguagem": "Python",
        "codigo": "def multiplicar(a, b=3):\n    return a * b\n\nprint(multiplicar(4))",
        "alternativas": ["7", "12", "4", "Erro por falta de argumento"],
        "respostaCorreta": 1,
        "dica": "O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada.",
        "explicacaoCorreta": "Correto! A resposta é: 12. Entenda: O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada.",
        "explicacaoErrada": "Incorreto. A resposta certa é: 12. Entenda: O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada."
    },
    {
        "id": 44,
        "modo": "dificil",
        "pergunta": "Qual cláusula em SQL é utilizada em conjunto com funções de agregação (como COUNT ou SUM) para agrupar resultados por uma ou mais colunas?",
        "linguagem": "SQL",
        "alternativas": ["ORDER BY", "GROUP BY", "FILTER BY", "JOIN ON"],
        "respostaCorreta": 1,
        "dica": "O nome da cláusula traduz literalmente para \"agrupar por\".",
        "explicacaoCorreta": "Correto! A resposta é: GROUP BY. Entenda: O nome da cláusula traduz literalmente para \"agrupar por\".",
        "explicacaoErrada": "Incorreto. A resposta certa é: GROUP BY. Entenda: O nome da cláusula traduz literalmente para \"agrupar por\"."
    },
    {
        "id": 45,
        "modo": "dificil",
        "pergunta": "No código Java abaixo, qual estrutura de decisão é utilizada?",
        "linguagem": "Java",
        "codigo": "int nota = 7;\nif (nota >= 6) {\n    System.out.println(\"Aprovado\");\n} else {\n    System.out.println(\"Reprovado\");\n}",
        "alternativas": ["Switch-Case", "Estrutura condicional if-else", "Laço de repetição for", "Tratamento de exceções try-catch"],
        "respostaCorreta": 1,
        "dica": "Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else).",
        "explicacaoCorreta": "Correto! A resposta é: Estrutura condicional if-else. Entenda: Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else).",
        "explicacaoErrada": "Incorreto. A resposta certa é: Estrutura condicional if-else. Entenda: Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else)."
    }
]

# Site pelo próprio Flask: abrir http://127.0.0.1:5000/ já mostra o Quiz (não precisa abrir o index.html).
# Só estes arquivos são entregues (nunca o app.py, o banco ou a chave secreta).
PASTA_SITE = os.path.dirname(os.path.abspath(__file__))
ARQUIVOS_DO_SITE = {
    "index.html": "text/html; charset=utf-8",
    "style.css": "text/css; charset=utf-8",
    "script.js": "text/javascript; charset=utf-8",
    "favicon.ico": "image/x-icon",
    "icones/icone-16.png": "image/png",
    "icones/icone-32.png": "image/png",
    "icones/icone-48.png": "image/png",
    "icones/icone-180.png": "image/png",
    "icones/icone-192.png": "image/png",
    "icones/icone-512.png": "image/png",
}


@app.route("/", methods=["GET"])
@app.route("/index.html", methods=["GET"])
def inicio():
    return entregar_arquivo_do_site("index.html")


@app.route("/<path:arquivo>", methods=["GET"])
def arquivo_do_site(arquivo):
    if arquivo not in ARQUIVOS_DO_SITE:
        return erro("Não encontrado", 404)
    return entregar_arquivo_do_site(arquivo)


def entregar_arquivo_do_site(arquivo):
    caminho = os.path.join(PASTA_SITE, arquivo)
    if not os.path.isfile(caminho):
        return erro("Arquivo do site não encontrado. Deixe o app.py na mesma pasta do index.html.", 404)
    with open(caminho, "rb") as f:
        resposta = app.response_class(f.read(), mimetype=ARQUIVOS_DO_SITE[arquivo].split(";")[0])
    resposta.headers["Content-Type"] = ARQUIVOS_DO_SITE[arquivo]
    resposta.headers["Cache-Control"] = "no-cache"      # sempre confere se o arquivo mudou
    return resposta


@app.route("/api/status", methods=["GET"])
def status():
    return jsonify({
        "status": "online"
    })
    
    
def pergunta_publica(pergunta):
    # o que o navegador pode ver da pergunta (a resposta correta e as explicações ficam só aqui no servidor)
    dados = {
        "id": pergunta["id"],
        "modo": pergunta["modo"],
        "pontos": PONTOS_POR_NIVEL[pergunta["modo"]],
        "pergunta": pergunta["pergunta"],
        "alternativas": pergunta["alternativas"],
        "dica": pergunta.get("dica")
    }
    if "linguagem" in pergunta:
        dados["linguagem"] = pergunta["linguagem"]
    if "codigo" in pergunta:
        dados["codigo"] = pergunta["codigo"]
    return dados


@app.route("/api/perguntas", methods=["GET"])
def listar_perguntas():
    # ?modo=facil | normal | dificil -> as 15 perguntas do modo
    # ?modo=radical -> 15 perguntas sorteadas entre as 45 (cada uma já diz o seu nível em "modo" e vale os seus "pontos")
    # sem ?modo -> todas as 45
    modo = request.args.get("modo")

    if modo == "radical":
        escolhidas = random.sample(perguntas, PERGUNTAS_RADICAL)
    elif modo in PONTOS_POR_NIVEL:
        escolhidas = [p for p in perguntas if p["modo"] == modo]
    elif modo is None:
        escolhidas = perguntas
    else:
        return jsonify({"erro": "Modo inválido"}), 400

    resultado = []

    for pergunta in escolhidas:
        resultado.append(pergunta_publica(pergunta))

    return jsonify(resultado)


@app.route("/api/perguntas/<int:id>", methods=["GET"])
def buscar_pergunta(id):
    for pergunta in perguntas:
        if pergunta["id"] == id:
            return jsonify(pergunta_publica(pergunta))
    return jsonify({
        "erro": "Pergunta não encontrada"
    }), 404
    

@app.route("/api/respostas", methods=["POST"])
def verificar_resposta():

    dados = request.get_json(silent=True)

    if not isinstance(dados, dict):
        return jsonify({"erro": "Envie os dados em JSON"}), 400

    id_pergunta = dados.get("id_pergunta")
    alternativa = dados.get("alternativa")

    if not isinstance(id_pergunta, int) or isinstance(id_pergunta, bool):
        return jsonify({"erro": "ID da pergunta inválido"}), 400

    if not isinstance(alternativa, int) or isinstance(alternativa, bool):
        return jsonify({"erro": "Alternativa inválida"}), 400

    pergunta_encontrada = None

    for pergunta in perguntas:
        if pergunta["id"] == id_pergunta:
            pergunta_encontrada = pergunta
            break

    if pergunta_encontrada is None:
        return jsonify({"erro": "Pergunta não encontrada"}), 404

    if alternativa < 0 or alternativa >= len(pergunta_encontrada["alternativas"]):
        return jsonify({"erro": "Alternativa inexistente"}), 400

    correta = alternativa == pergunta_encontrada["respostaCorreta"]

    if correta:
        mensagem = "Resposta correta!"
        explicacao = pergunta_encontrada["explicacaoCorreta"]
    else:
        mensagem = "Resposta incorreta!"
        explicacao = pergunta_encontrada["explicacaoErrada"]

    return jsonify({
        "correta": correta,
        "mensagem": mensagem,
        "explicacao": explicacao,
        "pontos": PONTOS_POR_NIVEL[pergunta_encontrada["modo"]] if correta else 0
    })




#--------------------------+
# BANCO DE DADOS (PostgreSQL)
#--------------------------+
# O banco é um PostgreSQL (no Render, o PostgreSQL do próprio Render), acessado pela DATABASE_URL.
# As tabelas são criadas sozinhas na primeira vez que a API roda.
# As tabelas usuario, login e ranking seguem os nomes do doc_date/08-extensao.

PASTA = os.path.dirname(os.path.abspath(__file__))
# Banco PostgreSQL. No Render a DATABASE_URL já vem pronta (Internal Database URL do seu PostgreSQL).
# No computador, defina a DATABASE_URL ou use o padrão abaixo (usuário postgres, banco "quiz").
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/quiz")
CAMINHO_CHAVE = os.path.join(PASTA, "quiz_secret.key")

# Para o login com Google funcionar, coloque aqui o "ID do cliente" criado no Google Cloud
# (ou defina a variável de ambiente GOOGLE_CLIENT_ID). Passo a passo no README.
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "422612220290-p83uuvi2qkvf92jhb6ialtq891egduu7.apps.googleusercontent.com")

# Conta do dono/criador do Quiz: ela recebe o emblema DONO e libera a aba "Desenvolvedor" no site.
# (opcional) QUIZ_DONO_EMAIL: se definido, só esse e-mail pode usar o nickname reservado do dono.
DONO_NICK = os.environ.get("QUIZ_DONO_NICK", "mwtheuskkj").strip().lower()
DONO_EMAIL = os.environ.get("QUIZ_DONO_EMAIL", "").strip().lower()

DIAS_ENTRE_TROCAS = 7            # tempo de espera para trocar nickname / senha de novo
VALIDADE_SESSAO = 60 * 60 * 24 * 30   # o login vale por 30 dias
MODOS = ("facil", "normal", "dificil", "radical")     # radical = 15 perguntas sorteadas dos 3 modos
AVATARES_PADRAO = ["侍", "猫", "狐", "龍", "桜", "月", "鬼", "鯉"]   # mesmos do script.js

app.config["MAX_CONTENT_LENGTH"] = 4608 * 1024        # 4,5 MB: é o limite de uma requisição na Vercel
LIMITE_JSON_COMUM = 64 * 1024                        # as demais rotas nunca precisam de mais que isso

SQL_RANKING = """
-- Cada linha é uma partida terminada. Os pontos de cada partida ficam salvos aqui,
-- e a soma deles (por modo e no geral) é o que monta o ranking.
CREATE TABLE IF NOT EXISTS ranking (
    id_ranking      INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_usuario      INTEGER NOT NULL,
    modo            TEXT NOT NULL,
    acertos         INTEGER NOT NULL,
    total_perguntas INTEGER NOT NULL,
    pontos          INTEGER NOT NULL DEFAULT 0,   -- fácil +10, normal +20, difícil +30 por acerto (radical: conforme o nível de cada pergunta)
    data_partida    TEXT NOT NULL,
    CONSTRAINT ck_ranking_modo    CHECK (modo IN ('facil', 'normal', 'dificil', 'radical')),
    CONSTRAINT ck_ranking_total   CHECK (total_perguntas > 0),
    CONSTRAINT ck_ranking_acertos CHECK (acertos >= 0 AND acertos <= total_perguntas),
    CONSTRAINT ck_ranking_pontos  CHECK (pontos >= 0),
    CONSTRAINT fk_ranking_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_ranking_modo_pontos ON ranking (modo, pontos DESC);
CREATE INDEX IF NOT EXISTS idx_ranking_usuario ON ranking (id_usuario);

-- Ajustes de pontos feitos pelo painel do desenvolvedor (um por jogador e por modo).
-- O valor guardado é a diferença que soma (ou subtrai) das partidas: pontos do modo = soma das partidas + ajuste.
-- Assim o jogador continua ganhando pontos normalmente depois de um ajuste. O modo radical não tem ajuste.
CREATE TABLE IF NOT EXISTS ajuste_pontos (
    id_usuario  INTEGER NOT NULL,
    modo        TEXT NOT NULL,
    pontos      INTEGER NOT NULL,
    data_ajuste TEXT NOT NULL,
    CONSTRAINT pk_ajuste_pontos PRIMARY KEY (id_usuario, modo),
    CONSTRAINT ck_ajuste_modo   CHECK (modo IN ('facil', 'normal', 'dificil')),
    CONSTRAINT fk_ajuste_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);
"""

ESQUEMA = """
-- Dados de usuários
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario    INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    nome          TEXT NOT NULL,                -- guarda o mesmo nickname do login (como no 08-extensao)
    email         TEXT NOT NULL UNIQUE,         -- sempre em minúsculo, não pode repetir
    tipo_conta    TEXT NOT NULL DEFAULT 'site', -- 'site' (cadastro pelo Quiz) ou 'google'
    google_id     TEXT UNIQUE,                  -- só preenchido nas contas do Google
    foto          TEXT,                         -- 'preset:侍' ou uma imagem em base64
    banner        TEXT,                         -- imagem em base64 (opcional)
    biografia     TEXT NOT NULL DEFAULT '',
    pronomes      TEXT NOT NULL DEFAULT '',     -- ex.: 'ele/dele' (opcional, aparece ao lado do nickname)
    data_cadastro TEXT NOT NULL,
    CONSTRAINT ck_usuario_tipo  CHECK (tipo_conta IN ('site', 'google')),
    CONSTRAINT ck_usuario_email CHECK (email = lower(email))
);

-- Dados de login (a senha fica só como hash, e é NULL nas contas do Google)
CREATE TABLE IF NOT EXISTS login (
    id_login           INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    id_usuario         INTEGER NOT NULL UNIQUE,
    nome_login         TEXT NOT NULL UNIQUE,    -- o nickname, também aparece no ranking
    senha_hash         TEXT,
    data_ultimo_acesso TEXT,
    data_troca_nome    TEXT,                    -- última vez que trocou o nickname (regra dos 7 dias)
    data_troca_senha   TEXT,                    -- última vez que trocou a senha (regra dos 7 dias)
    CONSTRAINT ck_login_nome CHECK (length(nome_login) BETWEEN 3 AND 20 AND nome_login !~ '[^a-z0-9_]'),
    CONSTRAINT fk_login_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE
);

__RANKING__
-- Emblemas (insígnias) que existem no Quiz
CREATE TABLE IF NOT EXISTS emblema (
    id_emblema INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    codigo     TEXT NOT NULL UNIQUE,
    nome       TEXT NOT NULL,
    descricao  TEXT NOT NULL
);

-- Quais emblemas cada usuário tem
CREATE TABLE IF NOT EXISTS usuario_emblema (
    id_usuario     INTEGER NOT NULL,
    id_emblema     INTEGER NOT NULL,
    data_conquista TEXT NOT NULL,
    manual         INTEGER NOT NULL DEFAULT 0,   -- 1 = colocado pelo painel do desenvolvedor (o ranking não tira)
    CONSTRAINT pk_usuario_emblema PRIMARY KEY (id_usuario, id_emblema),
    CONSTRAINT fk_ue_usuario FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_ue_emblema FOREIGN KEY (id_emblema) REFERENCES emblema (id_emblema)
);
"""
ESQUEMA = ESQUEMA.replace("__RANKING__", SQL_RANKING)

EMBLEMAS = [
    ("GENNIS_ACCOUNT", "GennisAccount", "Criou a conta direto no site do GennisQuiz."),
    ("GOOGLE_ACCOUNT", "GoogleAccount", "Entrou no GennisQuiz com uma conta do Google."),
    ("TOP_1", "Top 1", "Está em 1º lugar no ranking geral. Coroa de ouro!"),
    ("TOP_2", "Top 2", "Está em 2º lugar no ranking geral. Coroa de prata!"),
    ("TOP_3", "Top 3", "Está em 3º lugar no ranking geral. Coroa de bronze!"),
    ("DONO", "Dono / Criador", "Criador do GennisQuiz."),
    ("COLABORADOR", "Colaborador", "Ajudou a construir o GennisQuiz."),
    ("MOSTRA", "Mostra Tech", "Participou da mostra de tecnologia."),
    ("DEV", "Desenvolvedor", "Tem acesso ao painel de desenvolvedor do GennisQuiz."),
]
# Para criar um emblema novo no futuro, é só acrescentar uma linha na lista acima (codigo, nome, descricao):
# ele entra sozinho na tabela "emblema" e já aparece no painel do desenvolvedor para ser liberado.
# (o desenho do ícone é opcional; sem ele o site usa um selo com a inicial do nome)

# estes emblemas o ranking/cadastro dá sozinho (no painel aparecem marcados como "automático")
EMBLEMAS_AUTOMATICOS = ("GENNIS_ACCOUNT", "GOOGLE_ACCOUNT", "TOP_1", "TOP_2", "TOP_3")

SQL_DAR_DONO = ("INSERT INTO usuario_emblema (id_usuario, id_emblema, data_conquista) "
                "SELECT ?, id_emblema, ? FROM emblema WHERE codigo = 'DONO' ON CONFLICT DO NOTHING")


def garantir_dono(db):
    # a conta com o nickname do dono ganha o emblema DONO, mas só se ninguém tiver ele ainda
    if db.execute("SELECT 1 FROM usuario_emblema ue JOIN emblema e ON e.id_emblema = ue.id_emblema "
                  "WHERE e.codigo = 'DONO' LIMIT 1").fetchone():
        return
    linha = db.execute("SELECT l.id_usuario, u.email FROM login l JOIN usuario u ON u.id_usuario = l.id_usuario "
                       "WHERE l.nome_login = ?", (DONO_NICK,)).fetchone()
    if linha is None or (DONO_EMAIL and linha[1].lower() != DONO_EMAIL):
        return
    db.execute(SQL_DAR_DONO, (linha[0], datetime.now(timezone.utc).isoformat(timespec="seconds")))


def nickname_reservado(nickname, email):
    # com QUIZ_DONO_EMAIL definido, o nickname do dono só vale para o e-mail do dono
    return bool(DONO_EMAIL) and nickname == DONO_NICK and (email or "").lower() != DONO_EMAIL


class Banco:
    # Embrulha a conexão do PostgreSQL para o resto do código continuar do mesmo jeito:
    # db.execute(sql, parametros) com "?" no lugar dos valores, linhas que abrem por nome (linha["id"]) ou posição (linha[0]),
    # e "with db:" que salva (commit) no fim ou desfaz (rollback) se der erro.
    def __init__(self, conexao):
        self.conexao = conexao

    def execute(self, sql, parametros=None):
        cursor = self.conexao.cursor(cursor_factory=psycopg2.extras.DictCursor)
        if parametros:
            sql = sql.replace("?", "%s")        # o psycopg2 usa %s no lugar do ?
        cursor.execute(sql, parametros if parametros else None)
        return cursor

    def executemany(self, sql, lista):
        for parametros in lista:
            self.execute(sql, parametros)

    def commit(self):
        self.conexao.commit()

    def rollback(self):
        self.conexao.rollback()

    def close(self):
        self.conexao.close()

    def __enter__(self):
        return self

    def __exit__(self, tipo, valor, rastro):
        if tipo is None:
            self.conexao.commit()
        else:
            self.conexao.rollback()
        return False


def abrir_banco():
    return Banco(psycopg2.connect(DATABASE_URL))


def iniciar_banco():
    db = abrir_banco()
    # o gunicorn abre vários workers ao mesmo tempo: o lock faz um esperar o outro terminar de criar as tabelas
    db.execute("SELECT pg_advisory_xact_lock(727274)")
    db.execute(ESQUEMA)
    db.executemany("INSERT INTO emblema (codigo, nome, descricao) VALUES (?, ?, ?) ON CONFLICT (codigo) DO NOTHING", EMBLEMAS)
    garantir_dono(db)
    db.commit()
    db.close()


def get_db():
    # uma conexão por requisição (o Flask fecha ela no final)
    if "db" not in g:
        g.db = abrir_banco()
    return g.db


@app.teardown_appcontext
def fechar_db(erro):
    db = g.pop("db", None)
    if db is not None:
        db.close()


#--------------------------+
# CHAVE SECRETA, CORS E FUNÇÕES AUXILIARES
#--------------------------+
def carregar_chave():
    chave = os.environ.get("GENNISQUIZ_SECRET")
    if chave:
        return chave
    if not os.path.exists(CAMINHO_CHAVE):
        try:
            with open(CAMINHO_CHAVE, "x") as arquivo:
                arquivo.write(secrets.token_hex(32))
            os.chmod(CAMINHO_CHAVE, 0o600)
        except (FileExistsError, OSError):
            pass
    with open(CAMINHO_CHAVE) as arquivo:
        return arquivo.read().strip()


serializador = URLSafeTimedSerializer(carregar_chave())


@app.after_request
def liberar_cors(resposta):
    # o site (index.html) abre em outro endereço que a API, então o navegador exige isso
    resposta.headers["Access-Control-Allow-Origin"] = "*"
    resposta.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resposta.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    return resposta


@app.errorhandler(413)
def arquivo_grande(erro):
    return jsonify({"erro": "Imagem grande demais. O limite é de 4 MB."}), 413


@app.before_request
def limitar_tamanho_das_rotas():
    # só o cadastro e a edição de perfil recebem imagens; as outras rotas ficam com um limite pequeno
    if request.method in ("POST", "PUT") and request.endpoint not in (
            "cadastrar", "completar_cadastro_google", "atualizar_perfil", "enviar_imagem"):
        if (request.content_length or 0) > LIMITE_JSON_COMUM:
            return arquivo_grande(None)


def erro(mensagem, codigo=400, **extra):
    return jsonify({"erro": mensagem, **extra}), codigo


def pegar_json():
    dados = request.get_json(silent=True)
    return dados if isinstance(dados, dict) else None


def agora():
    return datetime.now(timezone.utc)


def texto_data(data):
    return data.isoformat(timespec="seconds")


def ler_data(texto):
    return datetime.fromisoformat(texto) if texto else None


def nickname_valido(nickname):
    return isinstance(nickname, str) and re.fullmatch(r"[a-z0-9_]{3,20}", nickname) is not None


def email_valido(email):
    return isinstance(email, str) and len(email) <= 120 and re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", email) is not None


def senha_valida(senha):
    return isinstance(senha, str) and 6 <= len(senha) <= 100


def normalizar_nickname(texto):
    # "Matheus P." vira "matheus_p" (mesma regra do script.js)
    texto = unicodedata.normalize("NFD", str(texto))
    texto = "".join(c for c in texto if not unicodedata.combining(c))
    texto = re.sub(r"\s+", "_", texto.lower().strip())
    return re.sub(r"[^a-z0-9_]", "", texto)[:20]


ASSINATURAS_IMAGEM = {
    "png": (b"\x89PNG",),
    "jpeg": (b"\xff\xd8",),
    "gif": (b"GIF8",),
    "webp": (b"RIFF",),
}


def ajuste_valido(texto):
    # o enquadramento escolhido no pop-up de ajuste vai no fim da imagem: #a=zoom,x,y,proporção
    achou = re.fullmatch(r"a=(\d{1,2}(?:\.\d{1,4})?),(\d(?:\.\d{1,4})?),(\d(?:\.\d{1,4})?),(\d{1,3}(?:\.\d{1,6})?)", texto)
    if not achou:
        return False
    zoom, x, y, proporcao = (float(n) for n in achou.groups())
    return 1 <= zoom <= 5 and 0 <= x <= 1 and 0 <= y <= 1 and 0.05 <= proporcao <= 50


def imagem_valida(valor, limite, aceita_padrao=False):
    # aceita 'preset:侍' (só na foto) ou uma imagem em base64 (data URL, PNG/JPG/WEBP/GIF)
    # de até "limite" caracteres, com o enquadramento (#a=...) opcional no final
    if not isinstance(valor, str):
        return False
    if aceita_padrao and valor.startswith("preset:"):
        return valor[len("preset:"):] in AVATARES_PADRAO
    if len(valor) > limite:
        return False
    valor, separador, ajuste = valor.partition("#")
    if separador and not ajuste_valido(ajuste):
        return False
    achou = re.fullmatch(r"data:image/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/]+={0,2})", valor)
    if not achou:
        return False
    try:
        conteudo = base64.b64decode(achou.group(2), validate=True)
    except (binascii.Error, ValueError):
        return False
    # o arquivo em si (já decodificado) pode ter no máximo 4 MB
    if len(conteudo) > LIMITE_IMAGEM_BYTES:
        return False
    # confere se o começo do arquivo bate com o tipo que a imagem diz ser
    if not conteudo.startswith(ASSINATURAS_IMAGEM[achou.group(1)]):
        return False
    if achou.group(1) == "webp" and conteudo[8:12] != b"WEBP":
        return False
    return True


# tamanho máximo de foto e banner: 4 MB (cabe no limite de 4,5 MB por requisição da Vercel).
# Imagens grandes são enviadas como arquivo "cru" (PUT /api/eu/imagem/<foto|banner>), sem o aumento de
# ~33% do base64; em base64 um arquivo de 4 MB tem cerca de 5,6 milhões de caracteres.
LIMITE_IMAGEM_BYTES = 4 * 1024 * 1024
LIMITE_FOTO = 5_600_000
LIMITE_BANNER = 5_600_000
# imagens maiores que isso (em caracteres) não vão dentro das respostas JSON do ranking/perfil:
# elas são entregues em /api/foto/<nickname> e /api/banner/<nickname>
LIMITE_INLINE = 60_000
PARTIDAS_POR_PAGINA = 5
LIMITE_PONTOS_DEV = 1000000   # maior valor que o painel do desenvolvedor aceita por modo


def sql_imagem(coluna):
    # devolve a imagem pequena inteira; a grande vira '@grande' + o enquadramento (#a=...)
    return ("CASE WHEN length({c}) > {n} THEN '@grande' || "
            "CASE WHEN strpos({c}, '#') > 0 THEN substr({c}, strpos({c}, '#')) ELSE '' END "
            "ELSE {c} END").format(c=coluna, n=LIMITE_INLINE)


def url_imagem(valor, tipo, nickname, versao):
    # troca o marcador '@grande' pelo endereço da imagem; '?v=' faz o navegador recarregar quando ela muda
    if isinstance(valor, str) and valor.startswith("@grande"):
        return "/api/%s/%s?v=%s%s" % (tipo, urllib.parse.quote(nickname), versao, valor[len("@grande"):])
    return valor


def limpar_biografia(texto):
    # mantém as quebras de linha (no máximo uma linha em branco seguida) e tira o resto de espaço sobrando
    texto = texto.replace("\r\n", "\n").replace("\r", "\n")
    texto = re.sub(r"[\x00-\x08\x0b-\x1f\x7f]", "", texto)
    linhas = [re.sub(r"[ \t]+", " ", linha).strip() for linha in texto.split("\n")]
    texto = "\n".join(linhas).strip()
    return re.sub(r"\n{3,}", "\n\n", texto)


def limpar_pronomes(texto):
    texto = re.sub(r"[\x00-\x1f\x7f]", "", texto)
    return re.sub(r"\s+", " ", texto).strip()


# tentativas erradas de login ficam só na memória (zera quando a API reinicia)
FALHAS = {}


def bloqueado(chave, limite):
    recentes = [t for t in FALHAS.get(chave, []) if t > time.time() - 600]
    FALHAS[chave] = recentes
    return len(recentes) >= limite


def registrar_falha(chave):
    FALHAS.setdefault(chave, []).append(time.time())


def criar_sessao(id_usuario):
    return serializador.dumps({"id": id_usuario}, salt="sessao")


def login_obrigatorio(funcao):
    @wraps(funcao)
    def interna(*args, **kwargs):
        cabecalho = request.headers.get("Authorization", "")
        if not cabecalho.startswith("Bearer "):
            return erro("Faça login para continuar", 401, sessao_invalida=True)
        try:
            dados = serializador.loads(cabecalho[7:], salt="sessao", max_age=VALIDADE_SESSAO)
        except BadSignature:
            return erro("Sessão expirada. Entre novamente", 401, sessao_invalida=True)

        usuario = buscar_usuario(get_db(), dados.get("id"))
        if usuario is None:
            return erro("Conta não encontrada", 401, sessao_invalida=True)
        g.usuario = usuario
        return funcao(*args, **kwargs)
    return interna


def eh_dono(db, id_usuario):
    return db.execute("SELECT 1 FROM usuario_emblema ue JOIN emblema e ON e.id_emblema = ue.id_emblema "
                      "WHERE ue.id_usuario = ? AND e.codigo = 'DONO'", (id_usuario,)).fetchone() is not None


def tem_acesso_dev(db, id_usuario):
    # acesso ao painel: emblema DONO (criador) ou DEV (liberado por alguém que já tem acesso)
    return db.execute("SELECT 1 FROM usuario_emblema ue JOIN emblema e ON e.id_emblema = ue.id_emblema "
                      "WHERE ue.id_usuario = ? AND e.codigo IN ('DONO', 'DEV')", (id_usuario,)).fetchone() is not None


def dev_obrigatorio(funcao):
    # a checagem é sempre feita aqui no servidor (esconder a aba no site não protege nada)
    @wraps(funcao)
    @login_obrigatorio
    def interna(*args, **kwargs):
        if not tem_acesso_dev(get_db(), g.usuario["id_usuario"]):
            return erro("Apenas quem tem acesso de desenvolvedor pode fazer isso", 403)
        return funcao(*args, **kwargs)
    return interna


def buscar_usuario(db, id_usuario):
    # foto e banner grandes não são carregados aqui (ficam em /api/foto e /api/banner)
    return db.execute(
        "SELECT u.id_usuario, u.nome, u.email, u.tipo_conta, u.google_id, u.biografia, u.pronomes, u.data_cadastro, "
        + sql_imagem("u.foto") + " AS foto, length(u.foto) AS foto_tam, "
        + sql_imagem("u.banner") + " AS banner, length(u.banner) AS banner_tam, "
        "l.nome_login, l.senha_hash, l.data_troca_nome, l.data_troca_senha "
        "FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario WHERE u.id_usuario = ?",
        (id_usuario,)
    ).fetchone()


def buscar_por_identificador(db, identificador):
    # entra com e-mail ou com nickname
    return db.execute(
        "SELECT u.*, l.nome_login, l.senha_hash, l.data_troca_nome, l.data_troca_senha "
        "FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario "
        "WHERE u.email = ? OR l.nome_login = ?",
        (identificador, identificador)
    ).fetchone()


def verificar_espera(data_ultima_troca):
    # devolve (libera_em, dias_restantes) se ainda estiver nos 7 dias, ou None se já pode trocar
    if not data_ultima_troca:
        return None
    libera_em = ler_data(data_ultima_troca) + timedelta(days=DIAS_ENTRE_TROCAS)
    falta = (libera_em - agora()).total_seconds()
    if falta <= 0:
        return None
    return libera_em, math.ceil(falta / 86400)


def erro_espera(o_que, espera):
    libera_em, dias = espera
    return erro(
        f"Você só pode alterar {o_que} novamente depois de {DIAS_ENTRE_TROCAS} dias.",
        429, dias_restantes=dias, libera_em=texto_data(libera_em), dias_total=DIAS_ENTRE_TROCAS
    )


#--------------------------+
# RANKING E EMBLEMAS
#--------------------------+
def ranking_pontos(db, modo=None):
    # soma dos pontos de todas as partidas de cada jogador, já em ordem de ranking.
    # Com modo = só aquele modo; sem modo = ranking geral (soma de todos os modos).
    # Empate: fica na frente quem chegou nessa pontuação primeiro (última partida mais antiga).
    filtro = "WHERE r.modo = ? " if modo else ""
    parametros = (modo,) if modo else ()
    # as partidas e os ajustes do painel Dev entram juntos na soma (o ajuste conta como 0 partidas)
    return db.execute(
        "SELECT r.id_usuario, l.nome_login AS jogador, " + sql_imagem("u.foto") + " AS foto, length(u.foto) AS foto_tam, "
        "SUM(r.pontos) AS pontos, SUM(r.acertos) AS acertos, SUM(r.total_perguntas) AS total_perguntas, "
        "SUM(r.partida) AS partidas, MAX(r.data_partida) AS data_partida "
        "FROM (SELECT id_usuario, modo, pontos, acertos, total_perguntas, data_partida, id_ranking, 1 AS partida FROM ranking "
        "      UNION ALL "
        "      SELECT id_usuario, modo, pontos, 0, 0, data_ajuste, 0, 0 FROM ajuste_pontos) r "
        "JOIN login l ON l.id_usuario = r.id_usuario "
        "JOIN usuario u ON u.id_usuario = r.id_usuario " + filtro +
        "GROUP BY r.id_usuario, u.id_usuario, l.id_login "
        "HAVING SUM(r.partida) > 0 OR SUM(r.pontos) > 0 "
        "ORDER BY pontos DESC, MAX(r.data_partida) ASC, MAX(r.id_ranking) ASC",
        parametros
    ).fetchall()


def dar_emblema(db, id_usuario, codigo):
    # devolve True se o usuário ainda não tinha esse emblema
    id_emblema = db.execute("SELECT id_emblema FROM emblema WHERE codigo = ?", (codigo,)).fetchone()["id_emblema"]
    cursor = db.execute(
        "INSERT INTO usuario_emblema (id_usuario, id_emblema, data_conquista) VALUES (?, ?, ?) ON CONFLICT DO NOTHING",
        (id_usuario, id_emblema, texto_data(agora()))
    )
    return cursor.rowcount > 0


def sincronizar_emblemas_top(db):
    # Top 1, 2 e 3 do ranking geral. Quem sai do top perde o emblema e quem entra ganha.
    # Devolve a lista de (id_usuario, codigo) que foram entregues agora.
    top = ranking_pontos(db)[:3]
    novos = []
    for posicao in (1, 2, 3):
        codigo = "TOP_%d" % posicao
        dono = top[posicao - 1]["id_usuario"] if len(top) >= posicao else None
        if dono is None:
            db.execute("DELETE FROM usuario_emblema WHERE manual = 0 "
                       "AND id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)", (codigo,))
            continue
        db.execute(
            "DELETE FROM usuario_emblema WHERE id_usuario <> ? AND manual = 0 "
            "AND id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)",
            (dono, codigo)
        )
        if dar_emblema(db, dono, codigo):
            novos.append((dono, codigo))
    return novos


#--------------------------+
# PERFIL
#--------------------------+
def montar_perfil(db, id_usuario, privado=False):
    usuario = buscar_usuario(db, id_usuario)
    if usuario is None:
        return None

    geral = ranking_pontos(db)
    posicao = next((i + 1 for i, r in enumerate(geral) if r["id_usuario"] == id_usuario), None)

    contagem = {linha["modo"]: linha["qtd"] for linha in db.execute(
        "SELECT modo, COUNT(*) AS qtd FROM ranking WHERE id_usuario = ? GROUP BY modo", (id_usuario,))}

    modos = {}
    for modo in MODOS:
        lista = ranking_pontos(db, modo)
        indice = next((i for i, r in enumerate(lista) if r["id_usuario"] == id_usuario), None)
        modos[modo] = None if indice is None else {
            "pontos": lista[indice]["pontos"],
            "acertos": lista[indice]["acertos"],
            "total_perguntas": lista[indice]["total_perguntas"],
            "posicao": indice + 1,
            "partidas": contagem.get(modo, 0)
        }

    ultimas = [dict(p) for p in db.execute(
        "SELECT modo, acertos, total_perguntas, pontos, data_partida FROM ranking WHERE id_usuario = ? "
        "ORDER BY data_partida DESC, id_ranking DESC LIMIT ?", (id_usuario, PARTIDAS_POR_PAGINA))]

    emblemas = [dict(e) for e in db.execute(
        "SELECT e.codigo, e.nome, e.descricao, ue.data_conquista FROM usuario_emblema ue "
        "JOIN emblema e ON e.id_emblema = ue.id_emblema WHERE ue.id_usuario = ? ORDER BY e.id_emblema",
        (id_usuario,))]

    perfil = {
        "nickname": usuario["nome_login"],
        "biografia": usuario["biografia"],
        "pronomes": usuario["pronomes"],
        "foto": url_imagem(usuario["foto"], "foto", usuario["nome_login"], usuario["foto_tam"]),
        "banner": url_imagem(usuario["banner"], "banner", usuario["nome_login"], usuario["banner_tam"]),
        "tipo_conta": usuario["tipo_conta"],
        "data_cadastro": usuario["data_cadastro"],
        "posicao_geral": posicao,
        "top": posicao if posicao is not None and posicao <= 3 else None,
        "pontos_total": 0 if posicao is None else geral[posicao - 1]["pontos"],
        "jogadores_no_ranking": len(geral),
        "modos": modos,
        "total_partidas": sum(contagem.values()),
        "ultimas_partidas": ultimas,
        "emblemas": emblemas
    }

    if privado:
        # só o próprio dono da conta recebe estes dados
        espera_nome = verificar_espera(usuario["data_troca_nome"])
        espera_senha = verificar_espera(usuario["data_troca_senha"])
        perfil["email"] = usuario["email"]
        perfil["pode_trocar_senha"] = usuario["tipo_conta"] == "site"
        perfil["proxima_troca_nickname"] = texto_data(espera_nome[0]) if espera_nome else None
        perfil["proxima_troca_senha"] = texto_data(espera_senha[0]) if espera_senha else None
        perfil["dias_entre_trocas"] = DIAS_ENTRE_TROCAS
        perfil["dono"] = any(e["codigo"] == "DONO" for e in emblemas)
        perfil["dev"] = perfil["dono"] or any(e["codigo"] == "DEV" for e in emblemas)
    return perfil


def resposta_sessao(db, id_usuario, codigo_status=200, emblemas_novos=()):
    return jsonify({
        "token": criar_sessao(id_usuario),
        "usuario": montar_perfil(db, id_usuario, privado=True),
        "emblemas_novos": list(emblemas_novos)
    }), codigo_status


#--------------------------+
# (API) CONFIGURAÇÃO E NICKNAME
#--------------------------+
@app.route("/api/config", methods=["GET"])
def configuracao():
    return jsonify({
        "google_client_id": GOOGLE_CLIENT_ID or None,
        "dias_entre_trocas": DIAS_ENTRE_TROCAS
    })


@app.route("/api/nickname/disponivel", methods=["GET"])
def nickname_disponivel():
    nickname = normalizar_nickname(request.args.get("nome", ""))

    if not nickname_valido(nickname):
        return jsonify({"nickname": nickname, "valido": False, "disponivel": False})

    existe = get_db().execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone()
    return jsonify({"nickname": nickname, "valido": True, "disponivel": existe is None})


#--------------------------+
# (API) CADASTRO E LOGIN
#--------------------------+
def criar_conta(db, nickname, email, tipo_conta, senha_hash, foto, google_id=None):
    # grava usuario + login + emblema da conta na mesma transação (se der erro em um, volta tudo)
    with db:
        cursor = db.execute(
            "INSERT INTO usuario (nome, email, tipo_conta, google_id, foto, data_cadastro) VALUES (?, ?, ?, ?, ?, ?) "
            "RETURNING id_usuario",
            (nickname, email, tipo_conta, google_id, foto, texto_data(agora()))
        )
        id_usuario = cursor.fetchone()["id_usuario"]
        db.execute(
            "INSERT INTO login (id_usuario, nome_login, senha_hash, data_ultimo_acesso) VALUES (?, ?, ?, ?)",
            (id_usuario, nickname, senha_hash, texto_data(agora()))
        )
        dar_emblema(db, id_usuario, "GENNIS_ACCOUNT" if tipo_conta == "site" else "GOOGLE_ACCOUNT")
        garantir_dono(db)
    return id_usuario


def erro_de_duplicado(db, nickname, email):
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)
    return erro("Este e-mail já está cadastrado", 409)


@app.route("/api/cadastro", methods=["POST"])
def cadastrar():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    nickname = normalizar_nickname(dados.get("nickname", ""))
    email = str(dados.get("email", "")).strip().lower()
    senha = dados.get("senha")
    foto = dados.get("foto") or "preset:" + AVATARES_PADRAO[0]

    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if not email_valido(email):
        return erro("E-mail inválido")
    if not senha_valida(senha):
        return erro("A senha precisa ter de 6 a 100 caracteres")
    if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
        return erro("Foto de perfil inválida")

    if nickname_reservado(nickname, email):
        return erro("Este nickname é reservado", 403)

    db = get_db()
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)
    if db.execute("SELECT 1 FROM usuario WHERE email = ?", (email,)).fetchone():
        return erro("Este e-mail já está cadastrado", 409)

    try:
        id_usuario = criar_conta(db, nickname, email, "site", generate_password_hash(senha), foto)
    except psycopg2.IntegrityError:
        # dois cadastros iguais ao mesmo tempo
        return erro_de_duplicado(db, nickname, email)

    return resposta_sessao(db, id_usuario, 201, ["GENNIS_ACCOUNT"])


# hash de mentira, só para o login demorar o mesmo tempo quando o usuário não existe
HASH_FALSO = generate_password_hash("senha-que-ninguem-usa")


@app.route("/api/login", methods=["POST"])
def entrar():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    identificador = str(dados.get("identificador", "")).strip().lower()
    senha = dados.get("senha")
    if not identificador or not isinstance(senha, str) or not senha:
        return erro("Informe o e-mail ou nickname e a senha")

    chave_id = ("login", identificador)
    chave_ip = ("login-ip", request.remote_addr)
    if bloqueado(chave_id, 8) or bloqueado(chave_ip, 30):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)

    db = get_db()
    usuario = buscar_por_identificador(db, identificador)

    if usuario is not None and usuario["senha_hash"] is None:
        return erro("Esta conta foi criada com o Google. Use o botão \"Continuar com o Google\"", 400)

    if usuario is None:
        check_password_hash(HASH_FALSO, senha)
    if usuario is None or not check_password_hash(usuario["senha_hash"], senha):
        registrar_falha(chave_id)
        registrar_falha(chave_ip)
        return erro("E-mail/nickname ou senha incorretos", 401)

    FALHAS.pop(chave_id, None)
    with db:
        db.execute("UPDATE login SET data_ultimo_acesso = ? WHERE id_usuario = ?",
                   (texto_data(agora()), usuario["id_usuario"]))
    return resposta_sessao(db, usuario["id_usuario"])


#--------------------------+
# (API) LOGIN COM GOOGLE
#--------------------------+
def verificar_token_google(credencial):
    # pergunta para o Google se o token é de verdade; devolve {sub, email} ou None
    if not GOOGLE_CLIENT_ID or not isinstance(credencial, str) or not credencial:
        return None
    try:
        url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + urllib.parse.quote(credencial)
        with urllib.request.urlopen(url, timeout=6) as resposta:
            info = json.loads(resposta.read().decode("utf-8"))
        if info.get("aud") != GOOGLE_CLIENT_ID:
            return None
        if info.get("iss") not in ("accounts.google.com", "https://accounts.google.com"):
            return None
        if str(info.get("email_verified")).lower() != "true":
            return None
        if int(info.get("exp", 0)) < time.time():
            return None
        return {"sub": str(info["sub"]), "email": str(info["email"]).strip().lower()}
    except Exception:
        return None


@app.route("/api/login/google", methods=["POST"])
def entrar_com_google():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")
    if not GOOGLE_CLIENT_ID:
        return erro("O login com Google ainda não foi configurado neste servidor", 503)

    info = verificar_token_google(dados.get("credencial"))
    if info is None:
        return erro("Não foi possível confirmar a conta do Google", 401)

    db = get_db()
    usuario = db.execute("SELECT id_usuario FROM usuario WHERE google_id = ?", (info["sub"],)).fetchone()

    if usuario is not None:
        # já tem conta: entra direto
        with db:
            db.execute("UPDATE login SET data_ultimo_acesso = ? WHERE id_usuario = ?",
                       (texto_data(agora()), usuario["id_usuario"]))
        return resposta_sessao(db, usuario["id_usuario"])

    if db.execute("SELECT 1 FROM usuario WHERE email = ?", (info["email"],)).fetchone():
        return erro("Este e-mail já tem uma conta cadastrada no site. Entre com o e-mail e a senha", 409)

    # primeira vez: o usuário ainda precisa escolher nickname e foto (mesmo procedimento do cadastro)
    return jsonify({
        "novo": True,
        "email": info["email"],
        "sugestao": normalizar_nickname(info["email"].split("@")[0]),
        "cadastro_token": serializador.dumps(info, salt="google-cadastro")
    })


@app.route("/api/login/google/completar", methods=["POST"])
def completar_cadastro_google():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    try:
        info = serializador.loads(str(dados.get("cadastro_token", "")), salt="google-cadastro", max_age=900)
    except BadSignature:
        return erro("O tempo para concluir o cadastro acabou. Entre com o Google de novo", 401)

    nickname = normalizar_nickname(dados.get("nickname", ""))
    foto = dados.get("foto") or "preset:" + AVATARES_PADRAO[0]

    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
        return erro("Foto de perfil inválida")

    if nickname_reservado(nickname, info["email"]):
        return erro("Este nickname é reservado", 403)

    db = get_db()
    if db.execute("SELECT 1 FROM usuario WHERE google_id = ? OR email = ?", (info["sub"], info["email"])).fetchone():
        return erro("Esta conta do Google já foi cadastrada. Entre novamente", 409)
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    try:
        id_usuario = criar_conta(db, nickname, info["email"], "google", None, foto, google_id=info["sub"])
    except psycopg2.IntegrityError:
        return erro_de_duplicado(db, nickname, info["email"])

    return resposta_sessao(db, id_usuario, 201, ["GOOGLE_ACCOUNT"])


#--------------------------+
# (API) PERFIL
#--------------------------+
@app.route("/api/eu", methods=["GET"])
@login_obrigatorio
def meu_perfil():
    return jsonify(montar_perfil(get_db(), g.usuario["id_usuario"], privado=True))


@app.route("/api/perfil/<nickname>", methods=["GET"])
@login_obrigatorio
def ver_perfil(nickname):
    db = get_db()
    linha = db.execute("SELECT id_usuario FROM login WHERE nome_login = ?", (nickname.lower(),)).fetchone()
    if linha is None:
        return erro("Usuário não encontrado", 404)
    return jsonify(montar_perfil(db, linha["id_usuario"]))


def imagem_propria(valor, tipo):
    # ao reajustar uma imagem grande, o site manda o endereço dela (/api/foto/<nick>?v=..#a=...)
    # em vez de enviar tudo de novo: aqui voltamos a imagem guardada, com o novo enquadramento
    if not isinstance(valor, str) or not valor.startswith("/api/%s/" % tipo):
        return None
    caminho, _, ajuste = valor.partition("#")
    caminho = caminho.partition("?")[0]
    if caminho != "/api/%s/%s" % (tipo, urllib.parse.quote(g.usuario["nome_login"])):
        return None
    if ajuste and not ajuste_valido(ajuste):
        return None
    guardada = get_db().execute(
        "SELECT %s AS imagem FROM usuario WHERE id_usuario = ?" % tipo,
        (g.usuario["id_usuario"],)).fetchone()["imagem"]
    if not guardada or guardada.startswith("preset:"):
        return None
    base = guardada.partition("#")[0]
    return base + ("#" + ajuste if ajuste else "")


def entregar_imagem(nickname, coluna):
    # entrega a foto/banner como imagem de verdade (para o <img>); é o que permite GIFs de até 4 MB
    # sem pesar o ranking e o perfil. Só o dono da conta escolhe a imagem; o endereço é público como o perfil.
    linha = get_db().execute(
        "SELECT u.%s AS imagem FROM usuario u JOIN login l ON l.id_usuario = u.id_usuario "
        "WHERE l.nome_login = ?" % coluna, (nickname.lower(),)).fetchone()
    if linha is None or not linha["imagem"] or linha["imagem"].startswith("preset:"):
        return erro("Imagem não encontrada", 404)
    achou = re.fullmatch(r"data:image/(png|jpeg|webp|gif);base64,([A-Za-z0-9+/]+={0,2})",
                         linha["imagem"].partition("#")[0])
    if not achou:
        return erro("Imagem não encontrada", 404)
    resposta = app.response_class(base64.b64decode(achou.group(2)), mimetype="image/" + achou.group(1))
    resposta.headers["Cache-Control"] = "public, max-age=86400"
    resposta.headers["X-Content-Type-Options"] = "nosniff"
    return resposta


@app.route("/api/foto/<nickname>", methods=["GET"])
def foto_do_usuario(nickname):
    return entregar_imagem(nickname, "foto")


@app.route("/api/banner/<nickname>", methods=["GET"])
def banner_do_usuario(nickname):
    return entregar_imagem(nickname, "banner")


@app.route("/api/perfil/<nickname>/partidas", methods=["GET"])
@login_obrigatorio
def partidas_do_usuario(nickname):
    # histórico de partidas, 5 por página (pagina=1 é a mais recente)
    db = get_db()
    linha = db.execute("SELECT id_usuario FROM login WHERE nome_login = ?", (nickname.lower(),)).fetchone()
    if linha is None:
        return erro("Usuário não encontrado", 404)
    try:
        pagina = max(1, int(request.args.get("pagina", 1)))
    except ValueError:
        return erro("Página inválida")
    total = db.execute("SELECT COUNT(*) AS n FROM ranking WHERE id_usuario = ?", (linha["id_usuario"],)).fetchone()["n"]
    total_paginas = max(1, -(-total // PARTIDAS_POR_PAGINA))
    pagina = min(pagina, total_paginas)
    partidas = [dict(p) for p in db.execute(
        "SELECT modo, acertos, total_perguntas, pontos, data_partida FROM ranking WHERE id_usuario = ? "
        "ORDER BY data_partida DESC, id_ranking DESC LIMIT ? OFFSET ?",
        (linha["id_usuario"], PARTIDAS_POR_PAGINA, (pagina - 1) * PARTIDAS_POR_PAGINA))]
    return jsonify({"partidas": partidas, "pagina": pagina, "total_paginas": total_paginas, "total": total})


@app.route("/api/eu", methods=["PUT"])
@login_obrigatorio
def atualizar_perfil():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    campos = {}

    if "biografia" in dados:
        biografia = dados["biografia"]
        if not isinstance(biografia, str):
            return erro("Biografia inválida")
        biografia = limpar_biografia(biografia)
        if len(biografia) > 200:
            return erro("A biografia pode ter no máximo 200 caracteres")
        campos["biografia"] = biografia

    if "pronomes" in dados:
        pronomes = dados["pronomes"]
        if not isinstance(pronomes, str):
            return erro("Pronome inválido")
        pronomes = limpar_pronomes(pronomes)
        if len(pronomes) > 20:
            return erro("O pronome pode ter no máximo 20 caracteres")
        campos["pronomes"] = pronomes

    if "foto" in dados:
        foto = imagem_propria(dados["foto"], "foto") or dados["foto"]
        if not imagem_valida(foto, LIMITE_FOTO, aceita_padrao=True):
            return erro("Foto de perfil inválida")
        campos["foto"] = foto

    if "banner" in dados:
        banner = imagem_propria(dados["banner"], "banner") or dados["banner"]
        if banner in (None, ""):
            campos["banner"] = None      # remove o banner
        elif imagem_valida(banner, LIMITE_BANNER):
            campos["banner"] = banner
        else:
            return erro("Banner inválido")

    if not campos:
        return erro("Nada para atualizar")

    db = get_db()
    with db:
        # os nomes das colunas vêm só do dicionário acima (nunca do usuário)
        colunas = ", ".join("%s = ?" % coluna for coluna in campos)
        db.execute("UPDATE usuario SET " + colunas + " WHERE id_usuario = ?",
                   (*campos.values(), g.usuario["id_usuario"]))
    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


#--------------------------+
# (API) PAINEL DO DESENVOLVEDOR (só a conta com o emblema DONO)
#--------------------------+
USUARIOS_POR_PAGINA = 20


def buscar_alvo(db, nickname):
    return db.execute("SELECT id_usuario FROM login WHERE nome_login = ?", (str(nickname).lower(),)).fetchone()


@app.route("/api/dev/usuarios", methods=["GET"])
@dev_obrigatorio
def dev_listar_usuarios():
    db = get_db()
    busca = request.args.get("busca", "").strip().lower()[:30]
    try:
        pagina = max(1, int(request.args.get("pagina", 1)))
    except ValueError:
        return erro("Página inválida")
    # %, _ e \ da busca valem como texto comum
    padrao = "%" + busca.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_") + "%"
    total = db.execute("SELECT COUNT(*) AS n FROM login WHERE nome_login LIKE ? ESCAPE '\\'", (padrao,)).fetchone()["n"]
    total_paginas = max(1, -(-total // USUARIOS_POR_PAGINA))
    pagina = min(pagina, total_paginas)
    linhas = db.execute(
        "SELECT l.id_usuario, l.nome_login, u.tipo_conta, u.data_cadastro, "
        + sql_imagem("u.foto") + " AS foto, length(u.foto) AS foto_tam "
        "FROM login l JOIN usuario u ON u.id_usuario = l.id_usuario "
        "WHERE l.nome_login LIKE ? ESCAPE '\\' ORDER BY l.nome_login LIMIT ? OFFSET ?",
        (padrao, USUARIOS_POR_PAGINA, (pagina - 1) * USUARIOS_POR_PAGINA)).fetchall()
    usuarios = []
    for linha in linhas:
        codigos = [e["codigo"] for e in db.execute(
            "SELECT e.codigo FROM usuario_emblema ue JOIN emblema e ON e.id_emblema = ue.id_emblema "
            "WHERE ue.id_usuario = ? ORDER BY e.id_emblema", (linha["id_usuario"],))]
        usuarios.append({
            "nickname": linha["nome_login"],
            "tipo_conta": linha["tipo_conta"],
            "data_cadastro": linha["data_cadastro"],
            "foto": url_imagem(linha["foto"], "foto", linha["nome_login"], linha["foto_tam"]),
            "emblemas": codigos
        })
    return jsonify({"usuarios": usuarios, "total": total, "pagina": pagina, "total_paginas": total_paginas})


@app.route("/api/dev/usuarios/<nickname>", methods=["GET"])
@dev_obrigatorio
def dev_ver_usuario(nickname):
    db = get_db()
    alvo = buscar_alvo(db, nickname)
    if alvo is None:
        return erro("Usuário não encontrado", 404)
    return jsonify(montar_perfil(db, alvo["id_usuario"]))


@app.route("/api/dev/usuarios/<nickname>", methods=["PUT"])
@dev_obrigatorio
def dev_editar_usuario(nickname):
    # o dono edita o perfil de qualquer usuário: bio, pronome, nickname (sem a espera de 7 dias) e
    # pode remover a foto (volta ao avatar padrão) ou o banner
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")
    db = get_db()
    alvo = buscar_alvo(db, nickname)
    if alvo is None:
        return erro("Usuário não encontrado", 404)
    id_alvo = alvo["id_usuario"]
    if eh_dono(db, id_alvo) and not eh_dono(db, g.usuario["id_usuario"]):
        return erro("Só o dono do Quiz pode editar a conta de outro dono", 403)

    campos = {}
    if "biografia" in dados:
        if not isinstance(dados["biografia"], str):
            return erro("Biografia inválida")
        biografia = limpar_biografia(dados["biografia"])
        if len(biografia) > 200:
            return erro("A biografia pode ter no máximo 200 caracteres")
        campos["biografia"] = biografia
    if "pronomes" in dados:
        if not isinstance(dados["pronomes"], str):
            return erro("Pronome inválido")
        pronomes = limpar_pronomes(dados["pronomes"])
        if len(pronomes) > 20:
            return erro("O pronome pode ter no máximo 20 caracteres")
        campos["pronomes"] = pronomes
    if dados.get("remover_foto") is True:
        campos["foto"] = "preset:" + AVATARES_PADRAO[0]
    if dados.get("remover_banner") is True:
        campos["banner"] = None

    novo_nick = None
    if "nickname" in dados:
        novo_nick = normalizar_nickname(dados["nickname"])
        if not nickname_valido(novo_nick):
            return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
        if novo_nick == str(nickname).lower():
            novo_nick = None
        elif db.execute("SELECT 1 FROM login WHERE nome_login = ?", (novo_nick,)).fetchone():
            return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    if not campos and novo_nick is None:
        return erro("Nada para atualizar")

    try:
        with db:
            if campos:
                colunas = ", ".join("%s = ?" % coluna for coluna in campos)   # nomes fixos do dicionário acima
                db.execute("UPDATE usuario SET " + colunas + " WHERE id_usuario = ?", (*campos.values(), id_alvo))
            if novo_nick:
                db.execute("UPDATE login SET nome_login = ? WHERE id_usuario = ?", (novo_nick, id_alvo))
                db.execute("UPDATE usuario SET nome = ? WHERE id_usuario = ?", (novo_nick, id_alvo))
    except psycopg2.IntegrityError:
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)
    return jsonify(montar_perfil(db, id_alvo))


@app.route("/api/emblemas", methods=["GET"])
@login_obrigatorio
def listar_emblemas():
    # catálogo completo (lido do banco, então emblemas futuros aparecem sozinhos no site)
    return jsonify({"emblemas": [dict(e) for e in get_db().execute(
        "SELECT codigo, nome, descricao FROM emblema ORDER BY id_emblema")]})


@app.route("/api/dev/emblemas", methods=["GET"])
@dev_obrigatorio
def dev_listar_emblemas():
    lista = [dict(e, automatico=e["codigo"] in EMBLEMAS_AUTOMATICOS) for e in get_db().execute(
        "SELECT codigo, nome, descricao FROM emblema ORDER BY id_emblema")]
    return jsonify({"emblemas": lista})


@app.route("/api/dev/usuarios/<nickname>/emblemas", methods=["PUT"])
@dev_obrigatorio
def dev_mudar_emblema(nickname):
    # coloca ou tira QUALQUER emblema do catálogo (os de hoje e os que forem criados depois).
    # Regras: só um DONO mexe no emblema DONO (e ninguém tira o DONO de si mesmo, para o Quiz nunca ficar sem dono);
    # só um DONO mexe nas contas de outros donos. Dar o emblema DEV libera o painel para aquela conta.
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")
    codigo = dados.get("codigo")
    ativo = dados.get("ativo")
    if not isinstance(codigo, str) or not isinstance(ativo, bool):
        return erro("Emblema inválido")
    db = get_db()
    if db.execute("SELECT 1 FROM emblema WHERE codigo = ?", (codigo,)).fetchone() is None:
        return erro("Emblema inválido")
    alvo = buscar_alvo(db, nickname)
    if alvo is None:
        return erro("Usuário não encontrado", 404)
    id_alvo = alvo["id_usuario"]
    eu_sou_dono = eh_dono(db, g.usuario["id_usuario"])
    if (codigo == "DONO" or eh_dono(db, id_alvo)) and not eu_sou_dono:
        return erro("Só o dono do Quiz pode mexer no emblema e na conta de um dono", 403)
    if codigo == "DONO" and not ativo and id_alvo == g.usuario["id_usuario"]:
        return erro("O dono não pode tirar o próprio emblema de Dono / Criador")
    with db:
        if ativo:
            cursor = db.execute(
                "INSERT INTO usuario_emblema (id_usuario, id_emblema, data_conquista, manual) "
                "SELECT ?, id_emblema, ?, 1 FROM emblema WHERE codigo = ? ON CONFLICT DO NOTHING",
                (id_alvo, texto_data(agora()), codigo))
            if cursor.rowcount == 0:      # já tinha (talvez automático): passa a valer como manual
                db.execute("UPDATE usuario_emblema SET manual = 1 WHERE id_usuario = ? "
                           "AND id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)", (id_alvo, codigo))
        else:
            db.execute("DELETE FROM usuario_emblema WHERE id_usuario = ? "
                       "AND id_emblema = (SELECT id_emblema FROM emblema WHERE codigo = ?)", (id_alvo, codigo))
        if codigo.startswith("TOP_"):
            sincronizar_emblemas_top(db)
    return jsonify(montar_perfil(db, id_alvo))


@app.route("/api/dev/usuarios/<nickname>/pontos", methods=["PUT"])
@dev_obrigatorio
def dev_mudar_pontos(nickname):
    # zera ou muda os pontos de um jogador em UM modo (facil, normal ou dificil) ou zera os três de uma vez ("todos").
    # O valor precisa fechar com o modo: múltiplo de 10 (fácil), 20 (normal) ou 30 (difícil). O radical não entra.
    # Só um DONO mexe nos pontos da conta de outro dono (mesma regra dos emblemas).
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")
    modo = dados.get("modo")
    pontos = dados.get("pontos")
    if modo != "todos" and modo not in PONTOS_POR_NIVEL:
        return erro("Escolha o modo fácil, normal ou difícil (o radical não tem ajuste de pontos)")
    if not isinstance(pontos, int) or isinstance(pontos, bool) or pontos < 0 or pontos > LIMITE_PONTOS_DEV:
        return erro("Pontos inválidos")
    if modo == "todos":
        if pontos != 0:
            return erro("Para todos os modos só dá para zerar")
    elif pontos % PONTOS_POR_NIVEL[modo]:
        return erro("No modo %s os pontos precisam ser múltiplos de %d" % (modo, PONTOS_POR_NIVEL[modo]))
    db = get_db()
    alvo = buscar_alvo(db, nickname)
    if alvo is None:
        return erro("Usuário não encontrado", 404)
    id_alvo = alvo["id_usuario"]
    if eh_dono(db, id_alvo) and not eh_dono(db, g.usuario["id_usuario"]):
        return erro("Só o dono do Quiz pode mexer na conta de um dono", 403)
    with db:
        for m in (list(PONTOS_POR_NIVEL) if modo == "todos" else [modo]):
            das_partidas = db.execute(
                "SELECT COALESCE(SUM(pontos), 0) AS total FROM ranking WHERE id_usuario = ? AND modo = ?",
                (id_alvo, m)).fetchone()["total"]
            diferenca = pontos - das_partidas       # quanto falta (ou sobra) para chegar no valor pedido
            if diferenca == 0:
                db.execute("DELETE FROM ajuste_pontos WHERE id_usuario = ? AND modo = ?", (id_alvo, m))
            else:
                db.execute(
                    "INSERT INTO ajuste_pontos (id_usuario, modo, pontos, data_ajuste) VALUES (?, ?, ?, ?) "
                    "ON CONFLICT (id_usuario, modo) DO UPDATE SET pontos = EXCLUDED.pontos, data_ajuste = EXCLUDED.data_ajuste",
                    (id_alvo, m, diferenca, texto_data(agora())))
        sincronizar_emblemas_top(db)
    return jsonify(montar_perfil(db, id_alvo))


@app.route("/api/eu/imagem/<tipo>", methods=["PUT"])
@login_obrigatorio
def enviar_imagem(tipo):
    # foto/banner enviados como arquivo (corpo da requisição = bytes da imagem), até 4 MB.
    # O enquadramento vai na URL: ?ajuste=a=2.000,0.500,0.500,1.00000
    if tipo not in ("foto", "banner"):
        return erro("Imagem inválida", 404)
    tipo_arquivo = (request.mimetype or "").lower()
    if tipo_arquivo not in ("image/png", "image/jpeg", "image/webp", "image/gif"):
        return erro("Envie uma imagem PNG, JPG, WEBP ou GIF")
    conteudo = request.get_data()
    if not conteudo:
        return erro("Imagem vazia")
    ajuste = request.args.get("ajuste", "")
    if ajuste and not ajuste_valido(ajuste):
        return erro("Enquadramento inválido")
    valor = "data:%s;base64,%s" % (tipo_arquivo, base64.b64encode(conteudo).decode("ascii"))
    if ajuste:
        valor += "#" + ajuste
    limite = LIMITE_FOTO if tipo == "foto" else LIMITE_BANNER
    if not imagem_valida(valor, limite):
        return erro("Imagem inválida ou maior que 4 MB")
    db = get_db()
    with db:
        db.execute("UPDATE usuario SET %s = ? WHERE id_usuario = ?" % tipo, (valor, g.usuario["id_usuario"]))
    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu/nickname", methods=["PUT"])
@login_obrigatorio
def trocar_nickname():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    espera = verificar_espera(g.usuario["data_troca_nome"])
    if espera:
        return erro_espera("o nickname", espera)

    nickname = normalizar_nickname(dados.get("nickname", ""))
    if not nickname_valido(nickname):
        return erro("Use de 3 a 20 letras, números ou _ (sem acentos) no nickname")
    if nickname == g.usuario["nome_login"]:
        return erro("Esse já é o seu nickname atual")
    if nickname_reservado(nickname, g.usuario["email"]):
        return erro("Este nickname é reservado", 403)

    db = get_db()
    if db.execute("SELECT 1 FROM login WHERE nome_login = ?", (nickname,)).fetchone():
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    try:
        with db:
            db.execute("UPDATE login SET nome_login = ?, data_troca_nome = ? WHERE id_usuario = ?",
                       (nickname, texto_data(agora()), g.usuario["id_usuario"]))
            db.execute("UPDATE usuario SET nome = ? WHERE id_usuario = ?", (nickname, g.usuario["id_usuario"]))
    except psycopg2.IntegrityError:
        return erro("Este nickname já está sendo utilizado por outro usuário", 409)

    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu/senha", methods=["PUT"])
@login_obrigatorio
def trocar_senha():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    if g.usuario["tipo_conta"] != "site":
        return erro("Contas do Google não têm senha no Quiz. Altere a senha direto na sua conta Google")

    espera = verificar_espera(g.usuario["data_troca_senha"])
    if espera:
        return erro_espera("a senha", espera)

    senha_atual = dados.get("senha_atual")
    senha_nova = dados.get("senha_nova")

    chave = ("senha", g.usuario["id_usuario"])
    if bloqueado(chave, 8):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)
    if not isinstance(senha_atual, str) or not check_password_hash(g.usuario["senha_hash"], senha_atual):
        registrar_falha(chave)
        return erro("A senha atual está incorreta", 401)
    if not senha_valida(senha_nova):
        return erro("A nova senha precisa ter de 6 a 100 caracteres")
    if senha_nova == senha_atual:
        return erro("A nova senha precisa ser diferente da atual")

    db = get_db()
    with db:
        db.execute("UPDATE login SET senha_hash = ?, data_troca_senha = ? WHERE id_usuario = ?",
                   (generate_password_hash(senha_nova), texto_data(agora()), g.usuario["id_usuario"]))
    FALHAS.pop(chave, None)
    return jsonify(montar_perfil(db, g.usuario["id_usuario"], privado=True))


@app.route("/api/eu", methods=["DELETE"])
@login_obrigatorio
def excluir_conta():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    chave = ("excluir", g.usuario["id_usuario"])
    if bloqueado(chave, 8):
        return erro("Muitas tentativas erradas. Aguarde alguns minutos e tente de novo", 429)

    nickname = str(dados.get("nickname", "")).strip().lower()
    senha = dados.get("senha")

    if nickname != g.usuario["nome_login"]:
        registrar_falha(chave)
        return erro("O nickname digitado não confere com o da sua conta", 400)

    # conta do Google não tem senha no Quiz: a confirmação é só o nickname
    if g.usuario["tipo_conta"] == "site":
        if not isinstance(senha, str) or not check_password_hash(g.usuario["senha_hash"], senha):
            registrar_falha(chave)
            return erro("Senha incorreta", 401)

    db = get_db()
    with db:
        # o ON DELETE CASCADE apaga login, partidas e emblemas junto
        db.execute("DELETE FROM usuario WHERE id_usuario = ?", (g.usuario["id_usuario"],))
        # sem este jogador o ranking muda, então confere os emblemas de Top de novo
        sincronizar_emblemas_top(db)
    FALHAS.pop(chave, None)
    return jsonify({"mensagem": "Conta excluída"})


#--------------------------+
# (API) RANKING
#--------------------------+
@app.route("/ranking", methods=["GET"])
@login_obrigatorio
def listar_ranking():
    modo = request.args.get("modo")
    if modo is not None and modo not in MODOS:
        return erro("Modo inválido")

    try:
        limite = max(1, min(int(request.args.get("limite", 100)), 500))
    except ValueError:
        return erro("Limite inválido")

    linhas = ranking_pontos(get_db(), modo)[:limite]
    return jsonify([{
        "jogador": linha["jogador"],
        "foto": url_imagem(linha["foto"], "foto", linha["jogador"], linha["foto_tam"]),
        "pontos": linha["pontos"],
        "partidas": linha["partidas"],
        "acertos": linha["acertos"],
        "total_perguntas": linha["total_perguntas"],
        "data_partida": linha["data_partida"]
    } for linha in linhas])


@app.route("/ranking", methods=["POST"])
@login_obrigatorio
def salvar_partida():
    dados = pegar_json()
    if dados is None:
        return erro("Envie os dados em JSON")

    modo = dados.get("modo")
    acertos = dados.get("acertos")
    total = dados.get("total_perguntas")

    if modo not in MODOS:
        return erro("Modo inválido")
    for numero in (acertos, total):
        if not isinstance(numero, int) or isinstance(numero, bool):
            return erro("Pontuação inválida")
    if total < 1 or total > 100 or acertos < 0 or acertos > total:
        return erro("Pontuação inválida")

    # cada acerto vale pontos conforme o modo: fácil +10, normal +20, difícil +30
    if modo == "radical":
        # no radical o valor depende do nível de cada pergunta sorteada, então o site manda quantos acertos teve em cada nível
        por_nivel = dados.get("acertos_por_nivel")
        if not isinstance(por_nivel, dict) or set(por_nivel) != set(PONTOS_POR_NIVEL):
            return erro("Acertos por nível inválidos")
        for quantidade in por_nivel.values():
            if not isinstance(quantidade, int) or isinstance(quantidade, bool) or quantidade < 0:
                return erro("Acertos por nível inválidos")
        if sum(por_nivel.values()) != acertos:
            return erro("Acertos por nível não batem com o total de acertos")
        pontos = sum(por_nivel[nivel] * valor for nivel, valor in PONTOS_POR_NIVEL.items())
    else:
        pontos = acertos * PONTOS_POR_NIVEL[modo]

    db = get_db()
    with db:
        # o usuário vem do login (token), não do que o navegador manda
        db.execute(
            "INSERT INTO ranking (id_usuario, modo, acertos, total_perguntas, pontos, data_partida) VALUES (?, ?, ?, ?, ?, ?)",
            (g.usuario["id_usuario"], modo, acertos, total, pontos, texto_data(agora()))
        )
        novos = sincronizar_emblemas_top(db)

    meus = [codigo for (dono, codigo) in novos if dono == g.usuario["id_usuario"]]
    return jsonify({"mensagem": "Partida salva", "pontos": pontos, "emblemas_novos": meus}), 201


iniciar_banco()


def ip_da_rede():
    # descobre o IP do computador na rede local (não envia nada pela internet)
    import socket
    teste = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        teste.connect(("10.255.255.255", 1))
        return teste.getsockname()[0]
    except OSError:
        return "IP-DO-COMPUTADOR"
    finally:
        teste.close()


if __name__ == "__main__":
    # Por padrão o servidor fica aberto para a rede local (0.0.0.0), então o celular na mesma rede Wi-Fi
    # consegue abrir o site pelo IP do computador. Para deixar só neste computador: QUIZ_HOST=127.0.0.1
    # O modo de depuração (QUIZ_DEBUG=1) só liga quando o servidor está fechado para a rede, por segurança.
    host = os.environ.get("QUIZ_HOST", "0.0.0.0")
    depurar = os.environ.get("QUIZ_DEBUG") == "1" and host in ("127.0.0.1", "localhost")
    if not (depurar and os.environ.get("WERKZEUG_RUN_MAIN") == "true"):     # imprime uma vez só
        print("\n GennisQuiz no ar!")
        print("   Neste computador:  http://localhost:5000/")
        if host not in ("127.0.0.1", "localhost"):
            print("   No celular (mesmo Wi-Fi):  http://%s:5000/\n" % ip_da_rede())
    app.run(host=host, port=int(os.environ.get("PORT", 5000)), debug=depurar)