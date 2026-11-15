// ==========================================
// 1. BANCO DE DADOS (45 perguntas de TI: 15 por modo)
// ==========================================
// Cada modo tem as suas 15 perguntas. O modo Radical sorteia 15 entre as 45 (veja montarPerguntasDaPartida).
// No modo Difícil as perguntas trazem um trecho de código (campos "linguagem" e "codigo").
const PERGUNTAS_POR_MODO = {
    // ----- Modo FÁCIL -----
    facil: [
        {
            pergunta: "Qual destes dispositivos é considerado um hardware (parte física do computador)?",
            alternativas: ["Google Chrome", "Teclado", "Microsoft Windows", "Arquivo PDF"],
            respostaCorreta: 1,
            dica: "Pense em algo que você consegue tocar fisicamente na mesa.",
            explicacaoCorreta: "Correto! Teclado.",
            explicacaoErrada: "Incorreto. A resposta certa é: Teclado."
        },
        {
            pergunta: "Qual empresa é a criadora do sistema operacional Windows?",
            alternativas: ["Apple", "Google", "Microsoft", "Linux"],
            respostaCorreta: 2,
            dica: "É uma das empresas fundadas por Bill Gates.",
            explicacaoCorreta: "Correto! Microsoft.",
            explicacaoErrada: "Incorreto. A resposta certa é: Microsoft."
        },
        {
            pergunta: "O que significa a letra \"W\" nas iniciais www de um endereço de site da internet?",
            alternativas: ["Web", "World", "Windows", "Wireless"],
            respostaCorreta: 1,
            dica: "Significa \"Mundo\" em inglês.",
            explicacaoCorreta: "Correto! World (de World Wide Web).",
            explicacaoErrada: "Incorreto. A resposta certa é: World (de World Wide Web)."
        },
        {
            pergunta: "Qual destas redes sociais é representada historicamente por um pássaro azul (ou pela letra \"X\")?",
            alternativas: ["Instagram", "LinkedIn", "Twitter (X)", "TikTok"],
            respostaCorreta: 2,
            dica: "É muito usada para debates rápidos e postagem de textos curtos.",
            explicacaoCorreta: "Correto! Twitter (X).",
            explicacaoErrada: "Incorreto. A resposta certa é: Twitter (X)."
        },
        {
            pergunta: "Qual navegador de internet pertence à empresa Google?",
            alternativas: ["Safari", "Edge", "Firefox", "Google Chrome"],
            respostaCorreta: 3,
            dica: "O nome do navegador leva o próprio nome da empresa.",
            explicacaoCorreta: "Correto! Google Chrome.",
            explicacaoErrada: "Incorreto. A resposta certa é: Google Chrome."
        },
        {
            pergunta: "Qual botão do teclado geralmente usamos para apagar o caractere que está à esquerda do cursor?",
            alternativas: ["Enter", "Shift", "Backspace (Apagar)", "Espaço"],
            respostaCorreta: 2,
            dica: "Fica geralmente na parte superior direita do teclado principal.",
            explicacaoCorreta: "Correto! Backspace (Apagar).",
            explicacaoErrada: "Incorreto. A resposta certa é: Backspace (Apagar)."
        },
        {
            pergunta: "Qual destes animais é o famoso mascote do sistema operacional Linux?",
            alternativas: ["Um leão", "Um pinguim", "Um macaco", "Um urso"],
            respostaCorreta: 1,
            dica: "O nome dele é Tux.",
            explicacaoCorreta: "Correto! Um pinguim.",
            explicacaoErrada: "Incorreto. A resposta certa é: Um pinguim."
        },
        {
            pergunta: "O que significa a sigla USB em cabos e entradas de computadores?",
            alternativas: ["Universal Serial Bus", "Ultra Sistema de Banda", "Unidade de Salvamento Básica", "User Server Board"],
            respostaCorreta: 0,
            dica: "É a entrada padrão universal usada para conectar mouses, pen drives e teclados.",
            explicacaoCorreta: "Correto! Universal Serial Bus.",
            explicacaoErrada: "Incorreto. A resposta certa é: Universal Serial Bus."
        },
        {
            pergunta: "Qual destes programas é utilizado principalmente para criar apresentações de slides?",
            alternativas: ["Microsoft Excel", "Microsoft PowerPoint", "Bloco de Notas", "Paint"],
            respostaCorreta: 1,
            dica: "É muito usado em palestras e trabalhos escolares.",
            explicacaoCorreta: "Correto! Microsoft PowerPoint.",
            explicacaoErrada: "Incorreto. A resposta certa é: Microsoft PowerPoint."
        },
        {
            pergunta: "Qual é a principal função de uma impressora?",
            alternativas: ["Projetar imagens na parede.", "Digitalizar fotos para o computador.", "Passar documentos digitais para o papel físico.", "Tocar músicas em alta voz."],
            respostaCorreta: 2,
            dica: "Ela usa tinta ou toner para deixar marcas no papel.",
            explicacaoCorreta: "Correto! Passar documentos digitais para o papel físico.",
            explicacaoErrada: "Incorreto. A resposta certa é: Passar documentos digitais para o papel físico."
        },
        {
            pergunta: "O que é um vírus de computador?",
            alternativas: ["Um componente que estraga o monitor se molhar.", "Um programa malicioso criado para infectar e danificar sistemas ou roubar dados.", "Um erro de fábrica na placa de vídeo.", "Um arquivo de música corrompido."],
            respostaCorreta: 1,
            dica: "Recebe o mesmo nome dos micro-organismos que deixam as pessoas gripadas.",
            explicacaoCorreta: "Correto! Um programa malicioso criado para infectar e danificar sistemas ou roubar dados.",
            explicacaoErrada: "Incorreto. A resposta certa é: Um programa malicioso criado para infectar e danificar sistemas ou roubar dados."
        },
        {
            pergunta: "Qual é o nome da lixeira eletrônica onde ficam os arquivos apagados temporariamente no Windows?",
            alternativas: ["Pasta Raiz", "Lixeira (Recycle Bin)", "Armário Digital", "Arquivo Morto"],
            respostaCorreta: 1,
            dica: "O ícone geralmente se parece com uma pequena cesta de escritório.",
            explicacaoCorreta: "Correto! Lixeira (Recycle Bin).",
            explicacaoErrada: "Incorreto. A resposta certa é: Lixeira (Recycle Bin)."
        },
        {
            pergunta: "Qual destes dispositivos serve para armazenar dados de forma portátil?",
            alternativas: ["Monitor", "Pen Drive", "Caixa de som", "Estabilizador"],
            respostaCorreta: 1,
            dica: "É pequeno, cabe no bolso e se conecta na entrada USB.",
            explicacaoCorreta: "Correto! Pen Drive.",
            explicacaoErrada: "Incorreto. A resposta certa é: Pen Drive."
        },
        {
            pergunta: "O que significa a tecla Caps Lock no teclado?",
            alternativas: ["Travar a tela do computador.", "Desligar o computador instantaneamente.", "Digitar todas as letras em maiúsculo.", "Tirar uma captura de tela (print)."],
            respostaCorreta: 2,
            dica: "Quando ativada, costuma acender uma luzinha verde ou laranja no teclado.",
            explicacaoCorreta: "Correto! Digitar todas as letras em maiúsculo.",
            explicacaoErrada: "Incorreto. A resposta certa é: Digitar todas as letras em maiúsculo."
        },
        {
            pergunta: "Qual destas opções é um exemplo de sistema operacional para smartphones?",
            alternativas: ["Windows 11", "Android", "Microsoft Word", "Google Drive"],
            respostaCorreta: 1,
            dica: "Foi desenvolvido pelo Google e está presente na maioria dos celulares do mundo (junto com o iOS da Apple).",
            explicacaoCorreta: "Correto! Android.",
            explicacaoErrada: "Incorreto. A resposta certa é: Android."
        }
    ],

    // ----- Modo NORMAL -----
    normal: [
        {
            pergunta: "Qual linguagem de programação é atualmente a mais utilizada em Inteligência Artificial e Ciência de Dados?",
            alternativas: ["Python", "HTML", "CSS", "Scratch"],
            respostaCorreta: 0,
            dica: "Seu nome também é o de uma famosa serpente.",
            explicacaoCorreta: "Correto! Python.",
            explicacaoErrada: "Incorreto. A resposta certa é: Python."
        },
        {
            pergunta: "O que é Cloud Computing (Computação em Nuvem)?",
            alternativas: ["Armazenar arquivos apenas no pen drive.", "Processar e armazenar dados em servidores remotos acessados pela internet.", "Um tipo de previsão do tempo feita por supercomputadores.", "A energia estática gerada pelos cabos de rede."],
            respostaCorreta: 1,
            dica: "Significa que seus arquivos não estão salvos fisicamente só no seu computador local.",
            explicacaoCorreta: "Correto! Processar e armazenar dados em servidores remotos acessados pela internet.",
            explicacaoErrada: "Incorreto. A resposta certa é: Processar e armazenar dados em servidores remotos acessados pela internet."
        },
        {
            pergunta: "Qual é a principal função de um roteador em uma rede de computadores?",
            alternativas: ["Imprimir documentos à distância.", "Proteger o computador contra vírus.", "Encaminhar pacotes de dados entre diferentes redes (como conectar sua casa à internet).", "Aumentar a memória RAM do celular."],
            respostaCorreta: 2,
            dica: "É aquele aparelho com antenas que transmite o sinal de Wi-Fi.",
            explicacaoCorreta: "Correto! Encaminhar pacotes de dados entre diferentes redes.",
            explicacaoErrada: "Incorreto. A resposta certa é: Encaminhar pacotes de dados entre diferentes redes."
        },
        {
            pergunta: "O que significa a sigla HTML no desenvolvimento web?",
            alternativas: ["HyperText Machine Language", "High Transfer Modern Link", "HyperText Markup Language", "Home Tool Multi Language"],
            respostaCorreta: 2,
            dica: "É a linguagem de marcação padrão para criar a estrutura de páginas na web.",
            explicacaoCorreta: "Correto! HyperText Markup Language.",
            explicacaoErrada: "Incorreto. A resposta certa é: HyperText Markup Language."
        },
        {
            pergunta: "Qual tecnologia descentralizada serve como base para o funcionamento de criptomoedas como o Bitcoin?",
            alternativas: ["Inteligência Artificial", "Blockchain", "Fibra Óptica", "Realidade Virtual"],
            respostaCorreta: 1,
            dica: "O nome faz referência a uma \"corrente de blocos\" interligados de forma segura.",
            explicacaoCorreta: "Correto! Blockchain.",
            explicacaoErrada: "Incorreto. A resposta certa é: Blockchain."
        },
        {
            pergunta: "O que é a Memória RAM de um computador?",
            alternativas: ["O espaço total de armazenamento de fotos e vídeos.", "A memória de curto prazo que guarda dados dos aplicativos abertos no momento.", "O chip responsável por resfriar o processador.", "A bateria que mantém o relógio da placa-mãe funcionando."],
            respostaCorreta: 1,
            dica: "Quando você desliga o computador, tudo o que estava nela é apagado.",
            explicacaoCorreta: "Correto! A memória de curto prazo que guarda dados dos aplicativos abertos no momento.",
            explicacaoErrada: "Incorreto. A resposta certa é: A memória de curto prazo que guarda dados dos aplicativos abertos no momento."
        },
        {
            pergunta: "Qual protocolo de segurança é identificado pelo \"https://\" no início dos endereços de sites?",
            alternativas: ["Abertura de portas automáticas.", "Criptografia e segurança na transferência de dados entre o navegador e o site.", "Ocultação automática de vírus.", "Aceleração da velocidade da internet."],
            respostaCorreta: 1,
            dica: "A letra \"S\" no final significa Secure (Seguro).",
            explicacaoCorreta: "Correto! Criptografia e segurança na transferência de dados entre o navegador e o site.",
            explicacaoErrada: "Incorreto. A resposta certa é: Criptografia e segurança na transferência de dados entre o navegador e o site."
        },
        {
            pergunta: "O que significa a sigla IoT (Internet das Coisas)?",
            alternativas: ["Dispositivos eletrônicos comuns (como lâmpadas e geladeiras) conectados à internet.", "Cabos subterrâneos de fibra óptica intercontinental.", "Um protocolo de segurança para redes corporativas.", "Inteligência Artificial focada em robótica industrial."],
            respostaCorreta: 0,
            dica: "Pense em uma casa inteligente onde você comanda tudo pelo celular.",
            explicacaoCorreta: "Correto! Dispositivos eletrônicos comuns conectados à internet.",
            explicacaoErrada: "Incorreto. A resposta certa é: Dispositivos eletrônicos comuns conectados à internet."
        },
        {
            pergunta: "Qual é a função do Firewall em um sistema ou rede?",
            alternativas: ["Aumentar a velocidade do processador.", "Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\".", "Limpar arquivos duplicados do disco rígido.", "Criar cópias de segurança (backup) automáticas."],
            respostaCorreta: 1,
            dica: "O nome traduzido ao pé da letra significa \"parede de fogo\".",
            explicacaoCorreta: "Correto! Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\".",
            explicacaoErrada: "Incorreto. A resposta certa é: Bloquear o acesso não autorizado, funcionando como um \"muro de proteção\"."
        },
        {
            pergunta: "O que é um Endereço IP?",
            alternativas: ["A senha secreta do seu e-mail.", "Um número de identificação único atribuído a cada dispositivo conectado a uma rede.", "A marca registrada do processador.", "A capacidade máxima de carga da bateria."],
            respostaCorreta: 1,
            dica: "Funciona como o \"endereço postal\" do seu computador na internet.",
            explicacaoCorreta: "Correto! Um número de identificação único atribuído a cada dispositivo conectado a uma rede.",
            explicacaoErrada: "Incorreto. A resposta certa é: Um número de identificação único atribuído a cada dispositivo conectado a uma rede."
        },
        {
            pergunta: "Qual linguagem de estilização é usada junto com o HTML para definir as cores, fontes e o visual de páginas web?",
            alternativas: ["Python", "CSS", "SQL", "Java"],
            respostaCorreta: 1,
            dica: "Significa Cascading Style Sheets (Folhas de Estilo em Cascata).",
            explicacaoCorreta: "Correto! CSS.",
            explicacaoErrada: "Incorreto. A resposta certa é: CSS."
        },
        {
            pergunta: "O que é Open Source (Código Aberto)?",
            alternativas: ["Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir.", "Sistemas que cobram taxas mensais altíssimas para uso corporativo.", "Programas que só rodam em computadores sem conexão com a internet.", "Jogos que não possuem fases bloqueadas."],
            respostaCorreta: 0,
            dica: "O oposto de softwares proprietários fechados (como o Windows tradicional).",
            explicacaoCorreta: "Correto! Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir.",
            explicacaoErrada: "Incorreto. A resposta certa é: Softwares cujos códigos-fonte são públicos e qualquer pessoa pode ver, modificar e distribuir."
        },
        {
            pergunta: "Qual é a principal utilidade de um arquivo compactado no formato .ZIP?",
            alternativas: ["Transformar imagens em vídeos curtos.", "Reduzir o tamanho de arquivos para facilitar o envio e armazenamento.", "Proteger a senha do usuário contra roubo de identidade.", "Apagar vírus automaticamente de pastas corrompidas."],
            respostaCorreta: 1,
            dica: "O ícone costuma se parecer com uma pasta com um zíper ou livros apertados.",
            explicacaoCorreta: "Correto! Reduzir o tamanho de arquivos para facilitar o envio e armazenamento.",
            explicacaoErrada: "Incorreto. A resposta certa é: Reduzir o tamanho de arquivos para facilitar o envio e armazenamento."
        },
        {
            pergunta: "O que é Phishing no contexto de segurança digital?",
            alternativas: ["Uma técnica para pescar arquivos corrompidos na lixeira.", "Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados.", "Um vírus que trava o computador até que o usuário reinicie a máquina.", "Uma rede social voltada para entusiastas de pesca esportiva."],
            respostaCorreta: 1,
            dica: "O som da palavra em inglês lembra \"pescaria\" (fishing), pois eles tentam fazer você \"morder a isca\".",
            explicacaoCorreta: "Correto! Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados.",
            explicacaoErrada: "Incorreto. A resposta certa é: Um golpe em que criminosos se passam por empresas confiáveis para roubar senhas e dados."
        },
        {
            pergunta: "O que significa a sigla CPU em um computador?",
            alternativas: ["Central Processing Unit (Unidade Central de Processamento)", "Computer Power Utility", "Control Principal User", "Core Peripherals Unit"],
            respostaCorreta: 0,
            dica: "É considerada o \"cérebro\" de todo o computador.",
            explicacaoCorreta: "Correto! Central Processing Unit (Unidade Central de Processamento).",
            explicacaoErrada: "Incorreto. A resposta certa é: Central Processing Unit (Unidade Central de Processamento)."
        }
    ],

    // ----- Modo DIFÍCIL -----
    dificil: [
        {
            pergunta: "O que será exibido no console após a execução deste código em Python?",
            linguagem: "Python",
            codigo: "x = [1, 2, 3]\nx.append(4)\nprint(len(x))",
            alternativas: ["3", "4", "Erro de sintaxe", "5"],
            respostaCorreta: 1,
            dica: "O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total.",
            explicacaoCorreta: "Correto! A resposta é: 4. Entenda: O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total.",
            explicacaoErrada: "Incorreto. A resposta certa é: 4. Entenda: O método .append() adiciona um elemento ao final da lista e a função len() conta quantos itens ela possui no total."
        },
        {
            pergunta: "No código Java abaixo, qual será o resultado impresso da divisão?",
            linguagem: "Java",
            codigo: "int a = 5;\nint b = 2;\nSystem.out.println(a / b);",
            alternativas: ["2.5", "3", "2", "Erro de compilação"],
            respostaCorreta: 2,
            dica: "Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado.",
            explicacaoCorreta: "Correto! A resposta é: 2. Entenda: Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado.",
            explicacaoErrada: "Incorreto. A resposta certa é: 2. Entenda: Como a e b são do tipo inteiro (int), o Java descarta a parte decimal do resultado."
        },
        {
            pergunta: "O que a consulta (query) SQL abaixo realiza no banco de dados?",
            linguagem: "SQL",
            codigo: "SELECT COUNT(*) FROM usuarios WHERE status = 'ativo';",
            alternativas: ["Retorna a lista completa com o nome de todos os usuários.", "Conta o número total de linhas onde o status é igual a 'ativo'.", "Apaga todos os usuários ativos do sistema.", "Atualiza o status dos usuários para 'ativo'."],
            respostaCorreta: 1,
            dica: "A palavra COUNT serve para contar registros, auxiliada pela condição WHERE.",
            explicacaoCorreta: "Correto! A resposta é: Conta o número total de linhas onde o status é igual a 'ativo'. Entenda: A palavra COUNT serve para contar registros, auxiliada pela condição WHERE.",
            explicacaoErrada: "Incorreto. A resposta certa é: Conta o número total de linhas onde o status é igual a 'ativo'. Entenda: A palavra COUNT serve para contar registros, auxiliada pela condição WHERE."
        },
        {
            pergunta: "Analise a função abaixo em Python. O que será impresso ao executar print(func(4))?",
            linguagem: "Python",
            codigo: "def func(n):\n    return n * 2 if n > 5 else n + 2\n\nprint(func(4))",
            alternativas: ["8", "6", "4", "10"],
            respostaCorreta: 1,
            dica: "Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2.",
            explicacaoCorreta: "Correto! A resposta é: 6. Entenda: Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2.",
            explicacaoErrada: "Incorreto. A resposta certa é: 6. Entenda: Verifique se o número 4 é maior que 5 para decidir se vai multiplicar por 2 ou somar 2."
        },
        {
            pergunta: "Qual é o objetivo principal da instrução SQL a seguir?",
            linguagem: "SQL",
            codigo: "SELECT nome FROM produtos ORDER BY preco DESC LIMIT 1;",
            alternativas: ["Encontrar o produto mais barato.", "Listar todos os produtos em ordem alfabética.", "Encontrar o produto mais caro.", "Mostrar apenas o primeiro produto cadastrado no banco."],
            respostaCorreta: 2,
            dica: "ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro.",
            explicacaoCorreta: "Correto! A resposta é: Encontrar o produto mais caro. Entenda: ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro.",
            explicacaoErrada: "Incorreto. A resposta certa é: Encontrar o produto mais caro. Entenda: ORDER BY preco DESC organiza os preços do maior para o menor, e o LIMIT 1 pega apenas o primeiro registro."
        },
        {
            pergunta: "O que o código Java abaixo imprime na tela?",
            linguagem: "Java",
            codigo: "String texto = \"Tecnologia\";\nSystem.out.println(texto.length());",
            alternativas: ["9", "10", "8", "Erro"],
            respostaCorreta: 1,
            dica: "Conte o número de letras que compõem a palavra \"Tecnologia\".",
            explicacaoCorreta: "Correto! A resposta é: 10. Entenda: Conte o número de letras que compõem a palavra \"Tecnologia\".",
            explicacaoErrada: "Incorreto. A resposta certa é: 10. Entenda: Conte o número de letras que compõem a palavra \"Tecnologia\"."
        },
        {
            pergunta: "Qual será o resultado da execução deste laço de repetição em Python?",
            linguagem: "Python",
            codigo: "soma = 0\nfor i in range(1, 4):\n    soma += i\nprint(soma)",
            alternativas: ["6", "10", "3", "4"],
            respostaCorreta: 0,
            dica: "O range(1, 4) gera os números 1, 2 e 3. Some todos eles.",
            explicacaoCorreta: "Correto! A resposta é: 6. Entenda: O range(1, 4) gera os números 1, 2 e 3. Some todos eles.",
            explicacaoErrada: "Incorreto. A resposta certa é: 6. Entenda: O range(1, 4) gera os números 1, 2 e 3. Some todos eles."
        },
        {
            pergunta: "No comando SQL abaixo, o que acontece se omitirmos a cláusula WHERE? (Considerando a tabela correta)",
            linguagem: "SQL",
            codigo: "UPDATE funcionarios SET salario = salario * 1.10;",
            alternativas: ["Apenas o primeiro funcionário receberá o aumento.", "O comando falhará com erro de sintaxe.", "Todos os registros da tabela de funcionários terão o salário reajustado.", "Nenhum funcionário terá alteração no salário."],
            respostaCorreta: 2,
            dica: "O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira.",
            explicacaoCorreta: "Correto! A resposta é: Todos os registros da tabela de funcionários terão o salário reajustado. Entenda: O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira.",
            explicacaoErrada: "Incorreto. A resposta certa é: Todos os registros da tabela de funcionários terão o salário reajustado. Entenda: O WHERE serve de filtro; sem ele, a alteração é aplicada em massa na tabela inteira."
        },
        {
            pergunta: "Qual será a saída do código Java abaixo?",
            linguagem: "Java",
            codigo: "boolean condicao = (5 > 3) && (2 == 4);\nSystem.out.println(condicao);",
            alternativas: ["true", "false", "null", "Erro de execução"],
            respostaCorreta: 1,
            dica: "O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa.",
            explicacaoCorreta: "Correto! A resposta é: false. Entenda: O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa.",
            explicacaoErrada: "Incorreto. A resposta certa é: false. Entenda: O operador && exige que ambas as condições sejam verdadeiras. A segunda parte (2 == 4) é falsa."
        },
        {
            pergunta: "O que faz o comando abaixo em Python?",
            linguagem: "Python",
            codigo: "with open('arquivo.txt', 'w') as f:\n    f.write(\"Olá Mundo\")",
            alternativas: ["Lê o conteúdo de um arquivo de texto existente.", "Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele.", "Apaga permanentemente o arquivo do computador.", "Verifica se o arquivo possui vírus."],
            respostaCorreta: 1,
            dica: "O parâmetro 'w' vem de write (escrever).",
            explicacaoCorreta: "Correto! A resposta é: Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele. Entenda: O parâmetro 'w' vem de write (escrever).",
            explicacaoErrada: "Incorreto. A resposta certa é: Abre e sobrescreve (ou cria) um arquivo de texto escrevendo \"Olá Mundo\" nele. Entenda: O parâmetro 'w' vem de write (escrever)."
        },
        {
            pergunta: "Qual comando SQL é utilizado para inserir um novo registro (uma nova linha de dados) em uma tabela?",
            linguagem: "SQL",
            alternativas: ["ADD ROW", "INSERT INTO", "CREATE RECORD", "PUT DATA"],
            respostaCorreta: 1,
            dica: "Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\".",
            explicacaoCorreta: "Correto! A resposta é: INSERT INTO. Entenda: Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\".",
            explicacaoErrada: "Incorreto. A resposta certa é: INSERT INTO. Entenda: Começa com uma palavra que significa \"inserir\" e outra que indica \"em / para dentro\"."
        },
        {
            pergunta: "O que acontece se tentarmos acessar um índice que não existe em um vetor (array) em Java, como no exemplo abaixo?",
            linguagem: "Java",
            codigo: "int[] numeros = {10, 20, 30};\nSystem.out.println(numeros[5]);",
            alternativas: ["O programa imprime o valor 0 por padrão.", "O compilador ignora a linha e continua.", "Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException).", "O programa cria automaticamente novas posições no array."],
            respostaCorreta: 2,
            dica: "Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite.",
            explicacaoCorreta: "Correto! A resposta é: Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException). Entenda: Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite.",
            explicacaoErrada: "Incorreto. A resposta certa é: Ocorre um erro em tempo de execução (ArrayIndexOutOfBoundsException). Entenda: Os índices válidos para esse array são 0, 1 e 2. Pedir o índice 5 estourará o limite."
        },
        {
            pergunta: "Qual será a saída deste código em Python?",
            linguagem: "Python",
            codigo: "def multiplicar(a, b=3):\n    return a * b\n\nprint(multiplicar(4))",
            alternativas: ["7", "12", "4", "Erro por falta de argumento"],
            respostaCorreta: 1,
            dica: "O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada.",
            explicacaoCorreta: "Correto! A resposta é: 12. Entenda: O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada.",
            explicacaoErrada: "Incorreto. A resposta certa é: 12. Entenda: O parâmetro b possui um valor padrão de 3 caso nenhum outro seja passado na chamada."
        },
        {
            pergunta: "Qual cláusula em SQL é utilizada em conjunto com funções de agregação (como COUNT ou SUM) para agrupar resultados por uma ou mais colunas?",
            linguagem: "SQL",
            alternativas: ["ORDER BY", "GROUP BY", "FILTER BY", "JOIN ON"],
            respostaCorreta: 1,
            dica: "O nome da cláusula traduz literalmente para \"agrupar por\".",
            explicacaoCorreta: "Correto! A resposta é: GROUP BY. Entenda: O nome da cláusula traduz literalmente para \"agrupar por\".",
            explicacaoErrada: "Incorreto. A resposta certa é: GROUP BY. Entenda: O nome da cláusula traduz literalmente para \"agrupar por\"."
        },
        {
            pergunta: "No código Java abaixo, qual estrutura de decisão é utilizada?",
            linguagem: "Java",
            codigo: "int nota = 7;\nif (nota >= 6) {\n    System.out.println(\"Aprovado\");\n} else {\n    System.out.println(\"Reprovado\");\n}",
            alternativas: ["Switch-Case", "Estrutura condicional if-else", "Laço de repetição for", "Tratamento de exceções try-catch"],
            respostaCorreta: 1,
            dica: "Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else).",
            explicacaoCorreta: "Correto! A resposta é: Estrutura condicional if-else. Entenda: Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else).",
            explicacaoErrada: "Incorreto. A resposta certa é: Estrutura condicional if-else. Entenda: Ela verifica se uma condição é verdadeira (if) e define uma rota alternativa caso seja falsa (else)."
        }
    ]
};

// perguntas da partida que está rolando (montadas em iniciarQuiz, de acordo com o modo)
let perguntas = [];

// ==========================================
// 2. CONFIGURAÇÕES GERAIS
// ==========================================
// API Flask do projeto (se estiver desligada, o site usa o modo local).
// Quando o site é aberto pelo próprio Flask (porta 5000, no computador ou pelo celular na mesma rede)
// ou pelo próprio Render, a API é o mesmo endereço da página; se abrir o index.html direto, usa o 127.0.0.1.
// Se o site estiver em outro domínio (ex.: gennisquiz.vercel.app), usa a API publicada no Render:
// troque o endereço abaixo pelo da sua API (a URL do Web Service, tipo https://gennisquiz.onrender.com).
const API_RENDER = "https://gennisquiz.onrender.com";
const API_URL = (/^https?:$/.test(location.protocol) && (location.port === "5000" || location.hostname.endsWith(".onrender.com")))
    ? location.origin
    : (/^https?:$/.test(location.protocol) && !["localhost", "127.0.0.1"].includes(location.hostname) && !/^\d{1,3}(\.\d{1,3}){3}$/.test(location.hostname))
        ? API_RENDER
        : "http://127.0.0.1:5000";

const TEMPOS = { facil: 60, normal: 30, dificil: 15 }; // segundos por pergunta
// No modo Radical o tempo muda a cada pergunta, conforme o nível dela
const TEMPOS_RADICAL = { facil: 30, normal: 20, dificil: 15 };
// Pontos por acerto, conforme o nível da pergunta (a API calcula os mesmos valores e é ela quem salva)
const PONTOS_POR_NIVEL = { facil: 10, normal: 20, dificil: 30 };
const PERGUNTAS_RADICAL = 15;   // quantas perguntas o modo Radical sorteia entre as 45
const NOMES_MODO = { facil: "Fácil", normal: "Normal", dificil: "Difícil", radical: "Radical" };

const AVATARES = [
    { kanji: "侍", rotulo: "Samurai", tema: "escuro" },
    { kanji: "猫", rotulo: "Gato", tema: "claro" },
    { kanji: "狐", rotulo: "Raposa", tema: "escuro" },
    { kanji: "龍", rotulo: "Dragão", tema: "claro" },
    { kanji: "桜", rotulo: "Cerejeira", tema: "claro" },
    { kanji: "月", rotulo: "Lua", tema: "escuro" },
    { kanji: "鬼", rotulo: "Oni", tema: "escuro" },
    { kanji: "鯉", rotulo: "Carpa", tema: "claro" }
];

const CRIADORES = [
    { nome: "Matheus Pentogennis", user: "mwtheuskkj" },
    { nome: "Gustavo Naves", user: "Massarubash" },
    { nome: "João Guimarães", user: "jaobom006" },
    { nome: "Gabriel Gonçalves", user: "midasrei68-dev" },
    { nome: "Lucas Teles", user: "Luucasy" },
    { nome: "Lucas da Graça", user: "lucasgracaleandro-arch" }
];

const MODOS_LISTA = ["facil", "normal", "dificil", "radical"];
const NIVEIS = ["facil", "normal", "dificil"];   // os modos que têm perguntas próprias

// Emblemas (insígnias). Os mesmos códigos ficam salvos na tabela emblema do banco.
let EMBLEMAS = [   // lista inicial; depois o site troca pela do banco (carregarCatalogoEmblemas)
    { codigo: "GENNIS_ACCOUNT", nome: "GennisAccount", descricao: "Criou a conta direto no site do GennisQuiz." },
    { codigo: "GOOGLE_ACCOUNT", nome: "GoogleAccount", descricao: "Entrou no GennisQuiz com uma conta do Google." },
    { codigo: "TOP_1", nome: "Top 1", descricao: "Está em 1º lugar no ranking geral. Coroa de ouro!" },
    { codigo: "TOP_2", nome: "Top 2", descricao: "Está em 2º lugar no ranking geral. Coroa de prata!" },
    { codigo: "TOP_3", nome: "Top 3", descricao: "Está em 3º lugar no ranking geral. Coroa de bronze!" },
    { codigo: "DONO", nome: "Dono / Criador", descricao: "Criador do GennisQuiz." },
    { codigo: "COLABORADOR", nome: "Colaborador", descricao: "Ajudou a construir o GennisQuiz." },
    { codigo: "MOSTRA", nome: "Mostra Tech", descricao: "Participou da mostra de tecnologia." },
    { codigo: "DEV", nome: "Desenvolvedor", descricao: "Tem acesso ao painel de desenvolvedor do GennisQuiz." }
];

// estes emblemas só aparecem no perfil de quem os tem (ninguém "ainda não conquistou" um acesso)
const EMBLEMAS_SO_QUEM_TEM = ["DONO", "DEV"];

// o catálogo vem do banco: um emblema criado no futuro já aparece aqui e no painel, sem mexer no site
async function carregarCatalogoEmblemas() {
    const r = await chamarAPI("/api/emblemas");
    if (r.ok && Array.isArray(r.dados.emblemas) && r.dados.emblemas.length) EMBLEMAS = r.dados.emblemas;
}

// emblemas feitos com um kanji dentro de um selo colorido
const EMBLEMAS_KANJI = {
    DONO: { kanji: "創", fundo: "#ffd54a", borda: "#8a6508", cor: "#2b1d00" },
    COLABORADOR: { kanji: "協", fundo: "#9ec9ff", borda: "#2d5e9e", cor: "#0d2a4d" },
    MOSTRA: { kanji: "祭", fundo: "#ff9aa8", borda: "#9e2d44", cor: "#4d0d1b" },
    DEV: { kanji: "開", fundo: "#8ff0c0", borda: "#1f7a52", cor: "#06301f" }
};

// ícone do GennisQuiz (selo com o kanji 問) e da marca do Google
const ICONE_GENNIS =
    '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="3" y="3" width="42" height="42" rx="7" style="fill:var(--inverso-bg)"/>' +
    '<text x="24" y="35" text-anchor="middle" class="kanji-emblema" style="fill:var(--inverso-fg)">問</text></svg>';
const ICONE_GOOGLE =
    '<svg viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

const ICONE_CONTRASTE =
    '<svg class="icone-ui" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" class="icone-cheio"/></svg>';

const CORES_COROA = {
    1: { fill: "#ffd54a", stroke: "#8a6508", nome: "Ouro" },
    2: { fill: "#dfe3e8", stroke: "#5f6b78", nome: "Prata" },
    3: { fill: "#d98a4a", stroke: "#6e3f14", nome: "Bronze" }
};

// ==========================================
// 3. MAPEAMENTO DOS ELEMENTOS HTML
// ==========================================
const $ = (id) => document.getElementById(id);

const splash = $("splash");
const telaLogin = $("tela-login");
const appEl = $("app");
const rodapeCriadores = $("rodapeCriadores");

const formLogin = $("formLogin");
const erroLogin = $("erroLogin");

const inicioContainer = $("inicio-container");
const quizContainer = $("quiz-container");
const questionTitle = $("question");
const btnDica = $("btnDica");
const textoDica = $("textoDica");
const areaExplicacao = $("areaExplicacao");
const tituloResultado = $("tituloResultado");
const textoExplicacao = $("textoExplicacao");
const btnProxima = $("btnProxima");
const timerDisplay = $("timer-display");
const spanTempo = $("tempo");
const barraTempo = $("barraTempo");
const finalScreen = $("final");
const finalScore = $("finalScore");
const mensagemFinal = $("mensagemFinal");
const emojiFinal = $("emojiFinal");
const btnReiniciar = $("btnReiniciar");
const btnModos = document.querySelectorAll(".btn-modo");
const gradeInicio = $("gradeInicio");
const btnSair = $("btnSair");
const rotuloModo = $("rotuloModo");

const btnAlternativas = [
    $("alternative1"),
    $("alternative2"),
    $("alternative3"),
    $("alternative4")
];

// Acessibilidade
const btnAcessibilidade = $("btnAcessibilidade");
const menuAcessibilidade = $("menuAcessibilidade");
const btnContraste = $("btnContraste");
const btnFonteMais = $("btnFonteMais");
const btnFonteMenos = $("btnFonteMenos");
const btnResetarAcessibilidade = $("btnResetarAcessibilidade");

// Abas, perfil, ranking, pop-ups
const abasBtns = document.querySelectorAll(".aba");
const btnPerfil = $("btnPerfil");
const modalSair = $("modalSair");
const modalGithub = $("modalGithub");
const listaRanking = $("listaRanking");
const rankingVazio = $("rankingVazio");

// ==========================================
// 4. VARIÁVEIS DE ESTADO
// ==========================================
let indiceAtual = 0;
let pontuacao = 0;
let modoAtual = "normal";
let timer = null;
let tempoRestante = 0;
let tempoTotal = 0;
let respondida = false;
let jogando = false;
let pontosPartida = 0;                                     // pontos ganhos na partida atual
let acertosPorNivel = { facil: 0, normal: 0, dificil: 0 };  // usado pelo Radical para a API calcular os pontos

let usuario = null;          // perfil da conta logada (vem do banco de dados)
let token = null;            // sessão do login (a API confere em toda requisição)
let configAPI = null;        // { google_client_id, dias_entre_trocas }
let googleCadastro = null;   // dados do Google enquanto o usuário escolhe nickname e foto
let bannerTemp = null;
let appAberto = false;
let bancoOnline = null;      // null = ainda não testado
let filtroRanking = "geral";

const ESCALA_MIN = 0.8;
const ESCALA_MAX = 1.6;
const ESCALA_PASSO = 0.1;

let escalaFonte = 1;
let altoContraste = false;
let tema = "escuro";
let daltonismo = "nenhum";

// ==========================================
// 5. FUNÇÕES AUXILIARES
// ==========================================
function mostrar(elemento, visivel) {
    elemento.hidden = !visivel;
}

function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
}

function lerLS(chave, padrao) {
    try {
        const v = JSON.parse(localStorage.getItem(chave));
        return v === null || v === undefined ? padrao : v;
    } catch (e) {
        return padrao;
    }
}

function gravarLS(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor));
    } catch (e) { /* o navegador pode bloquear o armazenamento */ }
}

// "Matheus P." -> "matheus_p" (mesma regra da tabela login: a-z, 0-9 e _, de 3 a 20)
function normalizarNome(texto) {
    return texto
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase().trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 20);
}

function nomeValido(nome) {
    return /^[a-z0-9_]{3,20}$/.test(nome);
}

// ---------- pop-ups com fade-in / fade-out ----------
let focoAntesDoModal = null;

function abrirModal(modal) {
    clearTimeout(modal._t);
    focoAntesDoModal = document.activeElement;
    modal.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("visivel")));
    const foco = modal.querySelector("[data-foco]") || modal.querySelector("button");
    setTimeout(() => foco && foco.focus({ preventScroll: true }), 60);
}

function fecharModal(modal, devolverFoco = true) {
    modal.classList.remove("visivel");
    modal.querySelectorAll("input[type=password]").forEach(i => { i.value = ""; });
    clearTimeout(modal._t);
    modal._t = setTimeout(() => { modal.hidden = true; }, 290);
    if (devolverFoco && focoAntesDoModal && document.contains(focoAntesDoModal)) {
        focoAntesDoModal.focus({ preventScroll: true });
    }
}

// ---------- avatar e coroa ----------
// A foto e o banner são uma imagem em base64 (PNG, JPG, WEBP ou GIF) e podem terminar com
// "#a=zoom,x,y,proporção": o enquadramento que o usuário escolheu no pop-up de ajuste.
const REGEX_IMAGEM = /^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/;
const BANNER_ASPECTO = 4;   // largura / altura do banner (o CSS usa o mesmo valor)
// imagens grandes (GIF de até 4 MB) não vêm dentro do JSON: a API manda o endereço delas
const REGEX_URL_IMAGEM = /^\/api\/(?:foto|banner)\/[^/?#\s]+(?:\?v=\d+)?$/;

function separarImagem(valor) {
    if (typeof valor !== "string") return null;
    const corte = valor.indexOf("#");
    const src = corte === -1 ? valor : valor.slice(0, corte);
    const ehUrl = REGEX_URL_IMAGEM.test(src);
    if (!ehUrl && !REGEX_IMAGEM.test(src)) return null;

    let ajuste = null;
    const m = corte === -1 ? null : /^a=([\d.]+),([\d.]+),([\d.]+),([\d.]+)$/.exec(valor.slice(corte + 1));
    if (m) {
        ajuste = { z: Number(m[1]), x: Number(m[2]), y: Number(m[3]), r: Number(m[4]) };
        if (!(ajuste.z >= 1 && ajuste.r > 0)) ajuste = null;
    }
    return { src: ehUrl ? API_URL + src : src, ajuste };
}

function juntarImagem(src, a) {
    // endereço de imagem grande volta para o formato curto que a API entende
    if (src.startsWith(API_URL + "/api/")) src = src.slice(API_URL.length);
    return `${src}#a=${a.z.toFixed(3)},${a.x.toFixed(3)},${a.y.toFixed(3)},${a.r.toFixed(5)}`;
}

// tamanho da imagem (em % do quadro) já com o zoom; a imagem sempre cobre o quadro inteiro
function dimensoesAjuste(a, aspecto) {
    let W, H;
    if (a.r >= aspecto) { H = 100; W = 100 * a.r / aspecto; }
    else { W = 100; H = 100 * aspecto / a.r; }
    return { W: W * a.z, H: H * a.z };
}

function aplicarAjuste(img, a, aspecto) {
    if (!a) return;
    const { W, H } = dimensoesAjuste(a, aspecto);
    img.classList.add("ajustada");
    img.style.width = W + "%";
    img.style.height = H + "%";
    img.style.left = (-(W - 100) * a.x) + "%";
    img.style.top = (-(H - 100) * a.y) + "%";
}

function criarImagemAjustada(valor, aspecto) {
    const dados = separarImagem(valor);
    if (!dados) return null;
    const img = new Image();
    img.alt = "";
    img.draggable = false;
    img.src = dados.src;
    aplicarAjuste(img, dados.ajuste, aspecto);
    return img;
}

function criarAvatar(foto, tam = 48) {
    const a = el("span", "avatar");
    a.style.setProperty("--tam", tam + "px");

    const img = criarImagemAjustada(foto, 1);
    if (img) {
        a.appendChild(img);
    } else {
        const preset = AVATARES.find(p => "preset:" + p.kanji === foto) || AVATARES[0];
        a.textContent = preset.kanji;
        a.classList.add("avatar-" + preset.tema);
    }
    return a;
}

function criarCoroa(pos) {
    const c = CORES_COROA[pos];
    const wrap = el("span", "coroa");
    wrap.title = `Coroa de ${c.nome} - ${pos}º lugar`;
    wrap.innerHTML =
        `<svg viewBox="0 0 40 30" role="img" aria-label="Coroa de ${c.nome}, ${pos}º lugar">` +
        `<path d="M3 25 L6 8 L14 17 L20 4 L26 17 L34 8 L37 25 Z" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2" stroke-linejoin="round"/>` +
        `<rect x="3" y="25" width="34" height="4" rx="1" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"/>` +
        `<text x="20" y="23" text-anchor="middle" font-size="10" font-weight="800" font-family="sans-serif" fill="${c.stroke}">${pos}</text>` +
        `</svg>`;
    return wrap;
}

// ==========================================
// 6. BANCO DE DADOS (API Flask)
// ==========================================
// Login, perfil, ranking e emblemas ficam salvos no banco (PostgreSQL) pela API.
// O navegador guarda só o "token" da sessão, para não pedir a senha a cada atualização da página.
function atualizarStatusBanco() {
    let texto = "Conectando ao banco de dados…";
    if (bancoOnline === true) texto = "● Banco de dados conectado";
    if (bancoOnline === false) texto = "○ Sem conexão com o banco de dados. Ligue a API (python app.py)";
    document.querySelectorAll("[data-status]").forEach(e => { e.textContent = texto; });
}

function guardarToken(novo) {
    token = novo;
    if (novo) gravarLS("gq_token", novo);
    else {
        try { localStorage.removeItem("gq_token"); } catch (e) { /* ignora */ }
    }
}

// devolve sempre { ok, status, dados, erro }; nunca lança erro
// Imagens grandes (GIF de até 4 MB) não vão dentro do JSON: o base64 aumentaria o arquivo em ~33% e
// passaria do limite de 4,5 MB da Vercel. Elas sobem como arquivo, direto nos bytes da requisição.
const LIMITE_IMAGEM_NO_JSON = 600_000;   // caracteres de base64

function imagemGrande(valor) {
    return typeof valor === "string" && valor.startsWith("data:image/") && valor.length > LIMITE_IMAGEM_NO_JSON;
}

async function enviarImagemGrande(tipo, valor) {
    const base = valor.split("#")[0];
    const ajuste = valor.includes("#") ? valor.slice(valor.indexOf("#") + 1) : "";
    const arquivo = await (await fetch(base)).blob();
    const consulta = ajuste ? "?ajuste=" + encodeURIComponent(ajuste) : "";
    return chamarAPI("/api/eu/imagem/" + tipo + consulta, {
        method: "PUT",
        body: arquivo,
        headers: { "Content-Type": arquivo.type },
        tempo: 60000
    });
}

async function chamarAPI(caminho, opcoes = {}) {
    const ctrl = new AbortController();
    const limite = setTimeout(() => ctrl.abort(), opcoes.tempo || 10000);
    const cabecalhos = { "Content-Type": "application/json", ...(opcoes.headers || {}) };
    if (token) cabecalhos.Authorization = "Bearer " + token;

    try {
        const resp = await fetch(API_URL + caminho, { method: opcoes.method, body: opcoes.body, headers: cabecalhos, signal: ctrl.signal });
        clearTimeout(limite);
        let dados = null;
        try { dados = await resp.json(); } catch (e) { /* resposta sem JSON */ }

        bancoOnline = true;
        atualizarStatusBanco();

        if (resp.status === 401 && dados && dados.sessao_invalida && token) sessaoExpirou();

        return {
            ok: resp.ok,
            status: resp.status,
            dados: dados || {},
            erro: resp.ok ? null : ((dados && dados.erro) || "Erro " + resp.status)
        };
    } catch (e) {
        clearTimeout(limite);
        bancoOnline = false;
        atualizarStatusBanco();
        return {
            ok: false,
            status: 0,
            dados: {},
            erro: "Sem conexão com o banco de dados. Confira se a API está ligada (python app.py)."
        };
    }
}

function formatarPontos(n) {
    return (Number(n) || 0).toLocaleString("pt-BR");
}

function normalizarPartida(p) {
    return {
        jogador: p.jogador,
        foto: p.foto,
        pontos: Number(p.pontos) || 0,          // soma dos pontos de todas as partidas (do modo, ou de todos no Geral)
        partidas: Number(p.partidas) || 0,
        acertos: Number(p.acertos) || 0,
        total: Number(p.total_perguntas) || 0,
        data: p.data_partida || ""
    };
}

// a API já devolve a melhor partida de cada jogador, em ordem de ranking
async function buscarRanking(filtro, limite) {
    const partes = [];
    if (filtro && filtro !== "geral") partes.push("modo=" + filtro);
    if (limite) partes.push("limite=" + limite);
    const r = await chamarAPI("/ranking" + (partes.length ? "?" + partes.join("&") : ""));
    return r.ok && Array.isArray(r.dados) ? r.dados.map(normalizarPartida) : null;
}

async function salvarPartida(modo, acertos, total, porNivel) {
    const corpo = { modo, acertos, total_perguntas: total };
    if (modo === "radical") corpo.acertos_por_nivel = porNivel;   // a API soma +10 / +20 / +30 conforme o nível
    const r = await chamarAPI("/ranking", {
        method: "POST",
        body: JSON.stringify(corpo)
    });
    if (!r.ok) return false;

    (r.dados.emblemas_novos || []).forEach(avisarEmblema);

    // o perfil muda (top, coroa, pontuações), então busca de novo
    const eu = await chamarAPI("/api/eu");
    if (eu.ok) {
        usuario = eu.dados;
        atualizarChip();
    }
    return true;
}

async function atualizarRanking() {
    const partidas = await buscarRanking(filtroRanking, 10);
    const lista = (partidas || []).slice(0, 10);

    listaRanking.replaceChildren(...lista.map((r, i) => {
        const pos = i + 1;
        const eVoce = usuario && r.jogador === usuario.nickname;
        const li = el("li", "item-ranking clicavel" + (eVoce ? " voce" : ""));
        li.tabIndex = 0;
        li.setAttribute("role", "button");
        li.setAttribute("aria-label", `Ver o perfil de ${r.jogador}, ${pos}º lugar`);
        li.appendChild(el("span", "pos", pos + "º"));

        const wrap = el("span", "avatar-wrap");
        wrap.appendChild(criarAvatar(r.foto, 44));
        if (pos <= 3) wrap.appendChild(criarCoroa(pos));
        li.appendChild(wrap);

        const info = el("span", "info");
        info.appendChild(el("strong", "nome", r.jogador));
        info.appendChild(el("small", "modo-tag",
            `${r.partidas} ${r.partidas === 1 ? "partida" : "partidas"}` + (eVoce ? " · você" : "")));
        li.appendChild(info);

        li.appendChild(el("span", "pontos", `${formatarPontos(r.pontos)} pts`));

        li.addEventListener("click", () => abrirPerfilDe(r.jogador));
        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                abrirPerfilDe(r.jogador);
            }
        });
        return li;
    }));

    if (partidas === null) {
        rankingVazio.textContent = "Não foi possível carregar o ranking do banco de dados.";
    } else {
        rankingVazio.textContent = "Ainda não há pontos neste ranking. Seja o primeiro!";
    }
    rankingVazio.hidden = lista.length > 0;
    return lista;
}

// ==========================================
// 7. ABERTURA, LOGIN, CADASTRO E PERFIL
// ==========================================
function iniciarSplash() {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let encerrada = false;

    const encerrar = () => {
        if (encerrada) return;
        encerrada = true;
        splash.classList.add("saindo");
        setTimeout(() => {
            splash.hidden = true;
            iniciarSessao();
        }, 700);
    };

    setTimeout(encerrar, reduzido ? 1400 : 4300);
    splash.addEventListener("click", encerrar);
    document.addEventListener("keydown", (e) => {
        if (!splash.hidden && (e.key === "Enter" || e.key === " " || e.key === "Escape")) encerrar();
    });
}

// se já existe uma sessão salva, entra direto; senão mostra o login
async function iniciarSessao() {
    carregarConfigAPI();
    const salvo = lerLS("gq_token", null);

    if (typeof salvo === "string" && salvo) {
        token = salvo;
        const r = await chamarAPI("/api/eu");
        if (r.ok) {
            usuario = r.dados;
            entrarNoApp();
            return;
        }
        if (r.status !== 0) guardarToken(null);   // sessão vencida ou conta apagada
        else token = null;                        // API desligada: guarda o token e pede login
    }
    mostrarLogin();
}

function sessaoExpirou() {
    guardarToken(null);
    if (appAberto) sairDaConta("Sua sessão expirou. Entre novamente.");
}

function mostrarLogin(aviso, tipo) {
    appAberto = false;
    mostrar(appEl, false);
    mostrar(telaLogin, true);
    atualizarRodape();
    mostrarSub("entrar");
    mostrarAviso(aviso, tipo);
    $("loginId").focus({ preventScroll: true });
}

function mostrarAviso(texto, tipo) {
    const a = $("avisoLogin");
    a.textContent = texto || "";
    a.className = "aviso-login" + (tipo === "ok" ? " aviso-ok" : "");
    a.hidden = !texto;
}

// "entrar" | "cadastro" | "google" (concluir o cadastro vindo do Google)
function mostrarSub(nome) {
    const formularios = { entrar: "formLogin", cadastro: "formCadastro", google: "formGoogle" };
    Object.keys(formularios).forEach(n => mostrar($(formularios[n]), n === nome));
    document.querySelectorAll("#subAbas button").forEach(b => {
        b.setAttribute("aria-selected", b.dataset.sub === nome);
    });
    mostrar($("subAbas"), nome !== "google");
    mostrar($("areaGoogle"), nome !== "google");
    ["erroLogin", "erroCadastro", "erroGoogle"].forEach(id => { $(id).textContent = ""; });
    if (nome !== "google") mostrarAviso("");
}

function limparFormulariosLogin() {
    ["loginId", "loginSenha", "cadNick", "cadEmail", "cadSenha", "cadSenha2", "gNick"].forEach(id => { $(id).value = ""; });
    [verificacaoCadastro, verificacaoGoogle].forEach(v => v.reiniciar());
    seletorCadastro.definir(null);
    seletorGoogle.definir(null);
}

// ---------- seletor de foto (avatares prontos ou foto do dispositivo) ----------
function criarSeletorFoto(container) {
    let valor = "preset:" + AVATARES[0].kanji;

    const previa = el("span", "seletor-previa");
    const grade = el("div", "avatares");
    grade.setAttribute("role", "group");
    grade.setAttribute("aria-label", "Avatares disponíveis");
    const botaoUpload = el("button", "", "Enviar foto do dispositivo");
    botaoUpload.type = "button";
    const botaoAjustar = el("button", "", "Ajustar foto");
    botaoAjustar.type = "button";
    const arquivoInput = el("input");
    arquivoInput.type = "file";
    arquivoInput.accept = "image/png,image/jpeg,image/webp,image/gif";
    arquivoInput.className = "sr-only";
    arquivoInput.tabIndex = -1;
    const dica = el("small", "dica-campo", "PNG, JPG, WEBP ou GIF animado (GIF de até 4 MB).");
    const erro = el("p", "erro-campo");
    erro.setAttribute("role", "alert");

    const botoes = AVATARES.map(a => {
        const b = el("button", "avatar-opcao");
        b.type = "button";
        b.dataset.foto = "preset:" + a.kanji;
        b.setAttribute("aria-label", "Avatar " + a.rotulo);
        b.appendChild(criarAvatar("preset:" + a.kanji, 52));
        b.addEventListener("click", () => { valor = b.dataset.foto; erro.textContent = ""; pintar(); });
        grade.appendChild(b);
        return b;
    });

    function pintar() {
        previa.replaceChildren(criarAvatar(valor, 88));
        botoes.forEach(b => b.setAttribute("aria-pressed", b.dataset.foto === valor));
        botaoAjustar.hidden = !separarImagem(valor);
    }

    botaoUpload.addEventListener("click", () => arquivoInput.click());
    arquivoInput.addEventListener("change", async () => {
        const arquivo = arquivoInput.files[0];
        arquivoInput.value = "";
        erro.textContent = "";
        if (!arquivo) return;
        const msg = validarArquivoImagem(arquivo, "foto");
        if (msg) { erro.textContent = msg; return; }
        try {
            const img = await prepararImagem(arquivo, "foto");
            abrirAjuste({ tipo: "foto", src: img.src, r: img.r, aoAplicar: (v) => { valor = v; pintar(); } });
        } catch (e) {
            erro.textContent = "Não foi possível abrir essa imagem.";
        }
    });
    botaoAjustar.addEventListener("click", () => {
        const d = separarImagem(valor);
        if (d) abrirAjuste({ tipo: "foto", src: d.src, ajuste: d.ajuste, aoAplicar: (v) => { valor = v; pintar(); } });
    });

    const linha = el("div", "upload-linha");
    linha.append(botaoUpload, botaoAjustar, arquivoInput);
    container.replaceChildren(previa, grade, linha, dica, erro);
    pintar();

    return {
        valor: () => valor,
        definir: (v) => { valor = v || "preset:" + AVATARES[0].kanji; erro.textContent = ""; pintar(); }
    };
}

const LIMITE_IMAGEM = 4 * 1024 * 1024;   // foto e banner (inclusive GIF): 4 MB e nada além disso (limite da Vercel)

function validarArquivoImagem(arquivo, tipo) {
    if (!/^image\/(png|jpe?g|webp|gif)$/.test(arquivo.type)) return "Escolha uma imagem PNG, JPG, WEBP ou GIF.";
    if (arquivo.size > LIMITE_IMAGEM) {
        const quem = tipo === "banner" ? "banner" : "foto de perfil";
        return arquivo.type === "image/gif"
            ? `O GIF do ${quem} pode ter até 4 MB.`
            : `A imagem é grande demais (máximo de 4 MB).`;
    }
    return "";
}

function carregarImagem(url) {
    return new Promise((ok, falhou) => {
        const img = new Image();
        img.onload = () => ok(img);
        img.onerror = () => falhou(new Error("imagem inválida"));
        img.src = url;
    });
}

function lerComoDataURL(arquivo) {
    return new Promise((ok, falhou) => {
        const leitor = new FileReader();
        leitor.onload = () => ok(leitor.result);
        leitor.onerror = () => falhou(new Error("leitura falhou"));
        leitor.readAsDataURL(arquivo);
    });
}

// GIF vai como está (para continuar animado); as outras imagens são reduzidas e viram JPEG leve.
// O corte em si é feito no pop-up de ajuste, então aqui a proporção original é mantida.
async function prepararImagem(arquivo, tipo) {
    const url = URL.createObjectURL(arquivo);
    try {
        const img = await carregarImagem(url);
        const largura = img.naturalWidth;
        const altura = img.naturalHeight;
        if (!largura || !altura) throw new Error("imagem sem tamanho");

        if (arquivo.type === "image/gif") {
            return { src: await lerComoDataURL(arquivo), r: largura / altura };
        }

        const maior = tipo === "banner" ? 1200 : 512;
        const escala = Math.min(1, maior / Math.max(largura, altura));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(largura * escala));
        canvas.height = Math.max(1, Math.round(altura * escala));
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const maximo = tipo === "banner" ? 1300000 : 330000;
        let qualidade = 0.86;
        let src = canvas.toDataURL("image/jpeg", qualidade);
        while (src.length > maximo && qualidade > 0.4) {
            qualidade -= 0.15;
            src = canvas.toDataURL("image/jpeg", qualidade);
        }
        return { src, r: canvas.width / canvas.height };
    } finally {
        URL.revokeObjectURL(url);
    }
}

// ---------- pop-up de ajuste (arrastar e zoom, como no Discord) ----------
let ajusteEstado = null;
let ajusteArrasto = null;

async function abrirAjuste({ tipo, src, ajuste, r, aoAplicar }) {
    if (!ajuste && !r) {
        try {
            const im = await carregarImagem(src);
            r = im.naturalWidth / im.naturalHeight;
        } catch (e) { r = 1; }
    }
    const aspecto = tipo === "banner" ? BANNER_ASPECTO : 1;
    const a = ajuste ? { ...ajuste } : { z: 1, x: 0.5, y: 0.5, r };

    const quadro = $("ajusteQuadro");
    quadro.className = "ajuste-quadro " + (tipo === "banner" ? "ajuste-banner" : "ajuste-foto");
    const img = new Image();
    img.alt = "";
    img.draggable = false;
    img.src = src;
    quadro.replaceChildren(img, el("span", "ajuste-mascara"));

    ajusteEstado = { tipo, src, aspecto, a, img, aoAplicar };
    $("tituloAjuste").textContent = tipo === "banner" ? "Ajustar banner" : "Ajustar foto de perfil";
    $("ajusteZoom").value = a.z;
    aplicarAjuste(img, a, aspecto);
    abrirModal($("modalAjuste"));
    quadro.focus({ preventScroll: true });
}

function moverAjuste(dx, dy) {
    if (!ajusteEstado) return;
    const { a, aspecto, img } = ajusteEstado;
    const quadro = $("ajusteQuadro");
    const { W, H } = dimensoesAjuste(a, aspecto);
    const sobraX = W / 100 * quadro.clientWidth - quadro.clientWidth;
    const sobraY = H / 100 * quadro.clientHeight - quadro.clientHeight;
    if (sobraX > 0.5) a.x = Math.min(1, Math.max(0, a.x - dx / sobraX));
    if (sobraY > 0.5) a.y = Math.min(1, Math.max(0, a.y - dy / sobraY));
    aplicarAjuste(img, a, aspecto);
}

function aplicarEnquadramento() {
    if (!ajusteEstado) return;
    const { src, a, aoAplicar } = ajusteEstado;
    ajusteEstado = null;
    fecharModal($("modalAjuste"));
    aoAplicar(juntarImagem(src, a));
}

// ---------- nickname: aparece ✓ se estiver livre e ✗ se já estiver em uso ----------
function ligarVerificacaoNick(input, textoEl, nickAtual) {
    const icone = document.querySelector(`[data-icone-status="${input.id}"]`);
    const estado = { nick: "", ocupado: false, invalido: true };
    let contador = 0;
    let espera = null;

    function pintar(classe, simbolo, mensagem) {
        if (icone) {
            icone.textContent = simbolo;
            icone.className = "icone-status " + classe;
        }
        textoEl.className = "status-nick " + classe;
        textoEl.replaceChildren(
            document.createTextNode("Seu nome de jogador: "),
            el("strong", "", estado.nick || "—")
        );
        if (mensagem) {
            textoEl.appendChild(document.createTextNode(" · "));
            textoEl.appendChild(el("span", "", mensagem));
        }
    }

    function reiniciar() {
        contador++;
        clearTimeout(espera);
        estado.nick = "";
        estado.ocupado = false;
        estado.invalido = true;
        pintar("", "", "");
    }

    input.addEventListener("input", () => {
        const nick = normalizarNome(input.value);
        contador++;
        clearTimeout(espera);
        estado.nick = nick;
        estado.ocupado = false;
        estado.invalido = !nomeValido(nick);

        if (!nick) { pintar("", "", ""); return; }
        if (estado.invalido) { pintar("ocupado", "✗", "use de 3 a 20 letras, números ou _ (sem acentos)"); return; }
        if (nickAtual && nick === nickAtual()) { estado.invalido = true; pintar("ocupado", "✗", "esse já é o seu nickname atual"); return; }

        pintar("verificando", "…", "verificando…");
        const minha = contador;
        espera = setTimeout(async () => {
            const r = await chamarAPI("/api/nickname/disponivel?nome=" + encodeURIComponent(nick));
            if (minha !== contador) return;       // o usuário continuou digitando
            if (!r.ok) { pintar("ocupado", "!", r.erro); return; }
            if (r.dados.disponivel) {
                pintar("livre", "✓", "nickname disponível");
            } else {
                estado.ocupado = true;
                pintar("ocupado", "✗", "já está sendo utilizado por outro usuário");
            }
        }, 350);
    });

    estado.reiniciar = reiniciar;
    return estado;
}

// ---------- login ----------
function abrirSessao(dados) {
    guardarToken(dados.token);
    usuario = dados.usuario;
    limparFormulariosLogin();
    googleCadastro = null;
    entrarNoApp();
    (dados.emblemas_novos || []).forEach(avisarEmblema);
}

async function tentarEntrar(e) {
    e.preventDefault();
    const identificador = $("loginId").value.trim();
    const senha = $("loginSenha").value;

    if (!identificador || !senha) {
        $("erroLogin").textContent = "Informe o e-mail ou nickname e a senha.";
        return;
    }
    $("erroLogin").textContent = "";

    const btn = $("btnEntrar");
    btn.disabled = true;
    btn.textContent = "Entrando…";
    const r = await chamarAPI("/api/login", { method: "POST", body: JSON.stringify({ identificador, senha }) });
    btn.disabled = false;
    btn.textContent = "Entrar";

    if (!r.ok) {
        $("erroLogin").textContent = r.erro;
        return;
    }
    abrirSessao(r.dados);
}

// ---------- cadastro pelo site ----------
function emailValido(email) {
    return email.length <= 120 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

async function tentarCadastrar(e) {
    e.preventDefault();
    const erro = $("erroCadastro");
    const nickname = normalizarNome($("cadNick").value);
    const email = $("cadEmail").value.trim().toLowerCase();
    const senha = $("cadSenha").value;

    erro.textContent = "";
    if (!nomeValido(nickname)) { erro.textContent = "Use de 3 a 20 letras, números ou _ (sem acentos) no nickname."; $("cadNick").focus(); return; }
    if (verificacaoCadastro.ocupado) { erro.textContent = "Este nickname já está sendo utilizado por outro usuário."; $("cadNick").focus(); return; }
    if (!emailValido(email)) { erro.textContent = "Digite um e-mail válido."; $("cadEmail").focus(); return; }
    if (senha.length < 6 || senha.length > 100) { erro.textContent = "A senha precisa ter de 6 a 100 caracteres."; $("cadSenha").focus(); return; }
    if (senha !== $("cadSenha2").value) { erro.textContent = "As senhas não são iguais."; $("cadSenha2").focus(); return; }

    const btn = $("btnCadastrar");
    btn.disabled = true;
    btn.textContent = "Criando conta…";
    const fotoEscolhida = seletorCadastro.valor();
    const r = await chamarAPI("/api/cadastro", {
        method: "POST",
        body: JSON.stringify({ nickname, email, senha, foto: imagemGrande(fotoEscolhida) ? null : fotoEscolhida })
    });
    btn.disabled = false;
    btn.textContent = "Criar conta";

    if (!r.ok) {
        erro.textContent = r.erro;
        return;
    }
    abrirSessao(r.dados);
    await enviarFotoGrandeDepoisDoCadastro(fotoEscolhida);
}

// GIF grande escolhido no cadastro: a conta é criada e, logo depois, a foto sobe como arquivo
async function enviarFotoGrandeDepoisDoCadastro(foto) {
    if (!imagemGrande(foto)) return;
    const r = await enviarImagemGrande("foto", foto);
    if (r.ok) {
        usuario = r.dados;
        atualizarChip();
    } else {
        avisar("Conta criada, mas a foto não foi enviada: " + r.erro);
    }
}

// ---------- login com o Google ----------
async function carregarConfigAPI() {
    const r = await chamarAPI("/api/config");
    configAPI = r.ok ? r.dados : null;
    // O Google não aceita endereço em formato de IP (127.0.0.1) como origem do login: com o Google
    // ligado, o site abre pelo "localhost", que é o endereço permitido para testes no computador.
    if (configAPI && configAPI.google_client_id && location.hostname === "127.0.0.1" && location.port === "5000") {
        location.replace(location.href.replace("//127.0.0.1:", "//localhost:"));
        return;
    }
    prepararGoogle();
}

function carregarScriptGoogle() {
    return new Promise((ok, falhou) => {
        if (window.google && window.google.accounts) { ok(); return; }
        const s = document.createElement("script");
        s.src = "https://accounts.google.com/gsi/client";
        s.async = true;
        s.defer = true;
        s.onload = ok;
        s.onerror = falhou;
        document.head.appendChild(s);
    });
}

function botaoGoogleDesligado() {
    const b = el("button", "btn-google-off");
    b.type = "button";
    b.disabled = true;
    b.innerHTML = ICONE_GOOGLE + "<span>Continuar com o Google</span>";
    return b;
}

async function prepararGoogle() {
    const botao = $("googleBotao");
    const aviso = $("googleAviso");
    aviso.hidden = true;
    if (!configAPI) { botao.replaceChildren(botaoGoogleDesligado()); return; }

    if (!configAPI.google_client_id) {
        botao.replaceChildren(botaoGoogleDesligado());
        aviso.textContent = "O login com Google ainda não foi configurado neste servidor (veja o README).";
        aviso.hidden = false;
        return;
    }

    // o Google não aceita endereço em formato de IP (ex.: 192.168.0.10 no celular): evita o "Erro 400"
    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(location.hostname)) {
        botao.replaceChildren(botaoGoogleDesligado());
        aviso.textContent = "O login com Google só funciona abrindo pelo localhost ou por um endereço https. Aqui, entre com e-mail ou nickname.";
        aviso.hidden = false;
        return;
    }

    try {
        await carregarScriptGoogle();
        window.google.accounts.id.initialize({
            client_id: configAPI.google_client_id,
            callback: (resp) => entrarComGoogle(resp.credential)
        });
        botao.replaceChildren();
        window.google.accounts.id.renderButton(botao, {
            type: "standard", theme: "outline", size: "large", text: "continue_with", shape: "rectangular", width: 300
        });
    } catch (e) {
        botao.replaceChildren(botaoGoogleDesligado());
        aviso.textContent = "Não foi possível carregar o login do Google. Confira a sua internet.";
        aviso.hidden = false;
    }
}

async function entrarComGoogle(credencial) {
    const r = await chamarAPI("/api/login/google", { method: "POST", body: JSON.stringify({ credencial }) });
    if (!r.ok) {
        mostrarAviso(r.erro);
        return;
    }
    if (r.dados.novo) {
        abrirCadastroGoogle(r.dados);        // primeira vez: escolher nickname e foto
        return;
    }
    abrirSessao(r.dados);                    // já tem conta: entra direto
}

function abrirCadastroGoogle(dados) {
    googleCadastro = dados;
    $("googleEmail").textContent = dados.email;
    $("gNick").value = dados.sugestao || "";
    $("gNick").dispatchEvent(new Event("input"));
    seletorGoogle.definir(null);
    mostrarSub("google");
}

async function concluirCadastroGoogle(e) {
    e.preventDefault();
    const erro = $("erroGoogle");
    const nickname = normalizarNome($("gNick").value);
    erro.textContent = "";

    if (!googleCadastro) { mostrarSub("entrar"); return; }
    if (!nomeValido(nickname)) { erro.textContent = "Use de 3 a 20 letras, números ou _ (sem acentos) no nickname."; return; }
    if (verificacaoGoogle.ocupado) { erro.textContent = "Este nickname já está sendo utilizado por outro usuário."; return; }

    const btn = $("btnConcluirGoogle");
    btn.disabled = true;
    const fotoEscolhida = seletorGoogle.valor();
    const r = await chamarAPI("/api/login/google/completar", {
        method: "POST",
        body: JSON.stringify({ cadastro_token: googleCadastro.cadastro_token, nickname, foto: imagemGrande(fotoEscolhida) ? null : fotoEscolhida })
    });
    btn.disabled = false;

    if (!r.ok) {
        if (r.status === 401) {              // passou o tempo para concluir
            googleCadastro = null;
            mostrarSub("entrar");
            mostrarAviso(r.erro);
        } else {
            erro.textContent = r.erro;
        }
        return;
    }
    abrirSessao(r.dados);
    await enviarFotoGrandeDepoisDoCadastro(fotoEscolhida);
}

// ---------- entrar / sair do app ----------
function atualizarChip() {
    $("chipAvatar").replaceChildren(criarAvatarComCoroa(usuario.foto, 34, usuario.top, "mini"));
    $("chipNome").textContent = usuario.nickname;
    $("saudacaoNome").textContent = usuario.nickname;
    atualizarAbaDev();
}

// a aba "Desenvolvedor" só aparece para quem tem acesso (a API confere o emblema DONO/DEV em toda chamada)
function atualizarAbaDev() {
    const dev = !!(usuario && usuario.dev);
    $("tab-dev").hidden = !dev;
    document.querySelector(".abas").classList.toggle("com-dev", dev);
    if (!dev && !$("aba-dev").hidden) irParaAba("inicio");
}

function entrarNoApp() {
    appAberto = true;
    carregarCatalogoEmblemas();
    mostrar(telaLogin, false);
    mostrar(appEl, true);
    atualizarChip();
    irParaAba("inicio");
    voltarAoInicio();
    atualizarRodape();
}

function sairDaConta(aviso, tipo) {
    clearInterval(timer);
    jogando = false;
    guardarToken(null);
    usuario = null;
    document.querySelectorAll(".modal-fundo.visivel").forEach(m => fecharModal(m, false));
    mostrarLogin(aviso, tipo);
}

// ---------- aba Perfil ----------
function formatarData(iso) {
    const d = new Date(iso);
    return iso && !isNaN(d) ? d.toLocaleDateString("pt-BR") : "—";
}

function criarAvatarComCoroa(foto, tam, top, tamanho) {
    const wrap = el("span", "avatar-wrap" + (tamanho ? " avatar-wrap-" + tamanho : ""));
    wrap.appendChild(criarAvatar(foto, tam));
    if (top >= 1 && top <= 3) wrap.appendChild(criarCoroa(top));
    return wrap;
}

function criarIconeEmblema(codigo, tam = 40) {
    const wrap = el("span", "emblema-icone");
    wrap.style.setProperty("--tam", tam + "px");
    if (codigo.startsWith("TOP_")) {
        wrap.appendChild(criarCoroa(Number(codigo.slice(-1))));
    } else if (EMBLEMAS_KANJI[codigo]) {
        const k = EMBLEMAS_KANJI[codigo];
        wrap.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' +
            `<rect x="3" y="3" width="42" height="42" rx="${codigo === "DONO" ? 21 : 7}" fill="${k.fundo}" stroke="${k.borda}" stroke-width="2.5"/>` +
            `<text x="24" y="35" text-anchor="middle" class="kanji-emblema" fill="${k.cor}">${k.kanji}</text></svg>`;
        if (codigo === "DONO") wrap.classList.add("emblema-dono");
    } else if (codigo === "GOOGLE_ACCOUNT" || codigo === "GENNIS_ACCOUNT") {
        wrap.innerHTML = codigo === "GOOGLE_ACCOUNT" ? ICONE_GOOGLE : ICONE_GENNIS;
    } else {
        // emblema novo, ainda sem desenho próprio: selo com a inicial do nome e uma cor feita a partir do código
        const info = EMBLEMAS.find(e => e.codigo === codigo);
        const inicial = ((info && info.nome) || codigo).trim().charAt(0).toUpperCase();
        let matiz = 0;
        for (const ch of codigo) matiz = (matiz * 31 + ch.charCodeAt(0)) % 360;
        wrap.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' +
            `<rect x="3" y="3" width="42" height="42" rx="12" fill="hsl(${matiz} 70% 75%)" stroke="hsl(${matiz} 55% 30%)" stroke-width="2.5"/>` +
            `<text x="24" y="34" text-anchor="middle" class="kanji-emblema" fill="hsl(${matiz} 60% 18%)"></text></svg>`;
        wrap.querySelector("text").textContent = inicial;
    }
    return wrap;
}

function criarEmblemaMini(codigo) {
    const info = EMBLEMAS.find(e => e.codigo === codigo);
    const s = el("span", "emblema-mini");
    s.title = info ? `${info.nome}: ${info.descricao}` : codigo;
    s.setAttribute("role", "img");
    s.setAttribute("aria-label", "Emblema " + (info ? info.nome : codigo));
    s.appendChild(criarIconeEmblema(codigo, 30));
    return s;
}

function estatistica(rotulo, valor, detalhe, extra) {
    const caixa = el("div", "estat");
    caixa.appendChild(el("span", "estat-rotulo", rotulo));
    const v = el("strong", "estat-valor");
    if (extra) v.appendChild(extra);
    v.appendChild(document.createTextNode(valor));
    caixa.appendChild(v);
    if (detalhe) caixa.appendChild(el("small", "estat-detalhe", detalhe));
    return caixa;
}

// monta o perfil (o mesmo para a aba "Perfil" e para o pop-up de outros jogadores)
// "Últimas partidas": 5 linhas por vez; com mais de 5 partidas aparecem as setinhas de página
function criarHistorico(p) {
    const caixa = el("div", "historico");
    const ul = el("ul", "ultimas");
    const nav = el("div", "historico-nav");
    const anterior = el("button", "seta-pagina", "");
    const proxima = el("button", "seta-pagina", "");
    const rotulo = el("span", "historico-pagina", "");
    anterior.type = proxima.type = "button";
    anterior.setAttribute("aria-label", "Partidas mais recentes");
    proxima.setAttribute("aria-label", "Partidas mais antigas");
    anterior.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    proxima.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    nav.append(anterior, rotulo, proxima);
    caixa.append(ul, nav);

    let pagina = 1;
    let totalPaginas = 1;
    let ocupado = false;

    function desenhar(lista) {
        ul.replaceChildren(...lista.map(u => {
            const li = el("li");
            li.append(
                el("span", "", "Modo " + (NOMES_MODO[u.modo] || u.modo)),
                el("strong", "", `${u.acertos}/${u.total_perguntas} · +${formatarPontos(u.pontos)} pts`),
                el("small", "", formatarData(u.data_partida))
            );
            return li;
        }));
        nav.hidden = totalPaginas <= 1;
        rotulo.textContent = `${pagina} / ${totalPaginas}`;
        anterior.disabled = ocupado || pagina <= 1;
        proxima.disabled = ocupado || pagina >= totalPaginas;
    }

    async function irPara(nova) {
        ocupado = true;
        anterior.disabled = proxima.disabled = true;
        const r = await chamarAPI(`/api/perfil/${encodeURIComponent(p.nickname)}/partidas?pagina=${nova}`);
        ocupado = false;
        if (!r.ok) { desenhar(ul.__lista || []); return; }
        pagina = r.dados.pagina;
        totalPaginas = r.dados.total_paginas;
        ul.__lista = r.dados.partidas;
        desenhar(r.dados.partidas);
    }

    // o perfil já traz a primeira página; "total_partidas" diz se existem mais
    totalPaginas = Math.max(1, Math.ceil((p.total_partidas || p.ultimas_partidas.length) / 5));
    ul.__lista = p.ultimas_partidas.slice(0, 5);
    desenhar(ul.__lista);
    anterior.addEventListener("click", () => irPara(pagina - 1));
    proxima.addEventListener("click", () => irPara(pagina + 1));
    return caixa;
}

function renderPerfil(container, p) {
    const topo = el("article", "cartao perfil-cartao");

    const banner = el("div", "perfil-banner");
    const imagemBanner = criarImagemAjustada(p.banner, BANNER_ASPECTO);
    if (imagemBanner) {
        banner.appendChild(imagemBanner);
        banner.classList.add("com-imagem");
    }
    topo.appendChild(banner);

    const linha = el("div", "perfil-topo");
    linha.appendChild(criarAvatarComCoroa(p.foto, 112, p.top, "grande"));

    const ident = el("div", "perfil-ident");
    const linhaNome = el("div", "perfil-linha-nome");
    linhaNome.appendChild(el("h2", "perfil-nome", p.nickname));
    if (p.pronomes) linhaNome.appendChild(el("span", "perfil-pronomes", p.pronomes));
    ident.appendChild(linhaNome);
    const mini = el("div", "emblemas-mini");
    (p.emblemas || []).forEach(e => mini.appendChild(criarEmblemaMini(e.codigo)));
    ident.appendChild(mini);
    ident.appendChild(el("p", "perfil-meta",
        (p.tipo_conta === "google" ? "Conta Google" : "Conta GennisQuiz") + " · Membro desde " + formatarData(p.data_cadastro)));
    linha.appendChild(ident);
    topo.appendChild(linha);

    topo.appendChild(el("p", "perfil-bio" + (p.biografia ? "" : " vazia"), p.biografia || "Sem biografia ainda."));

    // ranking e pontuações
    const rank = el("section", "cartao perfil-bloco");
    rank.appendChild(el("h2", "", "Ranking e pontuações"));

    const stats = el("div", "perfil-stats");
    stats.append(
        estatistica("Posição geral",
            p.posicao_geral ? p.posicao_geral + "º" : "—",
            p.posicao_geral ? `de ${p.jogadores_no_ranking} no ranking` : "Ainda sem pontuação"),
        estatistica("Pontos totais",
            p.posicao_geral ? formatarPontos(p.pontos_total) : "—",
            p.posicao_geral ? "somando todos os modos" : ""),
        estatistica("Top do ranking",
            p.top ? "Top " + p.top : "—",
            p.top ? "Coroa de " + CORES_COROA[p.top].nome : "Fora do pódio",
            p.top ? criarCoroaInline(p.top) : null),
        estatistica("Partidas jogadas", String(p.total_partidas || 0), "")
    );
    rank.appendChild(stats);

    const modos = el("div", "perfil-modos");
    MODOS_LISTA.forEach(m => {
        const d = p.modos ? p.modos[m] : null;
        const caixa = el("div", "modo-caixa");
        caixa.appendChild(el("strong", "", "Modo " + NOMES_MODO[m]));
        caixa.appendChild(el("span", "modo-pontos", d ? `${formatarPontos(d.pontos)} pts` : "—"));
        caixa.appendChild(el("small", "", d
            ? `${d.posicao}º no ranking · ${d.partidas} ${d.partidas === 1 ? "partida" : "partidas"}`
            : "Ainda não jogou"));
        modos.appendChild(caixa);
    });
    rank.appendChild(modos);

    if (p.ultimas_partidas && p.ultimas_partidas.length) {
        rank.appendChild(el("h3", "perfil-sub", "Últimas partidas"));
        rank.appendChild(criarHistorico(p));
    }

    // emblemas
    const emb = el("section", "cartao perfil-bloco");
    emb.appendChild(el("h2", "", "Emblemas"));
    const grade = el("div", "emblemas-grade");
    const conquistados = new Map((p.emblemas || []).map(e => [e.codigo, e.data_conquista]));
    EMBLEMAS.forEach(info => {
        const tem = conquistados.has(info.codigo);
        if (EMBLEMAS_SO_QUEM_TEM.includes(info.codigo) && !tem) return;   // acesso: só aparece em quem tem
        const c = el("div", "emblema-cartao" + (tem ? "" : " bloqueado"));
        c.appendChild(criarIconeEmblema(info.codigo, 52));
        const txt = el("div", "emblema-txt");
        txt.appendChild(el("strong", "", info.nome));
        txt.appendChild(el("small", "", info.descricao));
        txt.appendChild(el("span", "emblema-estado",
            tem ? "Conquistado em " + formatarData(conquistados.get(info.codigo)) : "Ainda não conquistado"));
        c.appendChild(txt);
        grade.appendChild(c);
    });
    const breve = el("div", "emblema-cartao breve");
    breve.appendChild(el("span", "emblema-icone emblema-breve", "?"));
    const txtBreve = el("div", "emblema-txt");
    txtBreve.appendChild(el("strong", "", "Em breve"));
    txtBreve.appendChild(el("small", "", "Mais emblemas serão lançados em breve."));
    breve.appendChild(txtBreve);
    grade.appendChild(breve);
    emb.appendChild(grade);

    container.replaceChildren(topo, rank, emb);
}

function criarCoroaInline(pos) {
    const c = criarCoroa(pos);
    c.classList.add("coroa-inline");
    return c;
}

async function carregarPerfilProprio() {
    const r = await chamarAPI("/api/eu");
    if (!r.ok) {
        $("perfilConteudo").replaceChildren(el("p", "texto-apoio", r.erro));
        return;
    }
    usuario = r.dados;
    atualizarChip();
    renderPerfil($("perfilConteudo"), usuario);

    $("contaInfo").textContent = `Conectado como ${usuario.nickname} (${usuario.email}).`;
    $("btnAlterarSenha").hidden = !usuario.pode_trocar_senha;
    $("notaSenhaGoogle").hidden = !!usuario.pode_trocar_senha;
}

async function abrirPerfilDe(nickname) {
    const r = await chamarAPI("/api/perfil/" + encodeURIComponent(nickname));
    if (!r.ok) {
        avisar(r.erro);
        return;
    }
    renderPerfil($("verPerfilConteudo"), r.dados);
    abrirModal($("modalVerPerfil"));
}

// ---------- editar perfil (foto, banner, pronome e biografia) ----------
function atualizarBannerPrevia() {
    const b = $("bannerPrevia");
    const img = criarImagemAjustada(bannerTemp, BANNER_ASPECTO);
    b.replaceChildren(...(img ? [img] : []));
    b.classList.toggle("com-imagem", !!img);
    $("btnRemoverBanner").disabled = !img;
    $("btnAjustarBanner").disabled = !img;
}

// mantém as quebras de linha da biografia (igual à API)
function limparBio(texto) {
    const linhas = texto.replace(/\r\n?/g, "\n").replace(/[\x00-\x08\x0b-\x1f\x7f]/g, "")
        .split("\n").map(l => l.replace(/[ \t]+/g, " ").trim());
    return linhas.join("\n").trim().replace(/\n{3,}/g, "\n\n");
}

function limparPronomes(texto) {
    return texto.replace(/\s+/g, " ").trim();
}

function abrirEditar() {
    seletorEditar.definir(usuario.foto);
    bannerTemp = usuario.banner || null;
    $("editarBio").value = usuario.biografia || "";
    $("editarPronomes").value = usuario.pronomes || "";
    $("contaBio").textContent = $("editarBio").value.length + "/200";
    $("erroEditar").textContent = "";
    atualizarBannerPrevia();
    abrirModal($("modalEditar"));
}

async function aoEscolherBanner() {
    const input = $("inputBanner");
    const arquivo = input.files[0];
    input.value = "";
    $("erroEditar").textContent = "";
    if (!arquivo) return;

    const msg = validarArquivoImagem(arquivo, "banner");
    if (msg) {
        $("erroEditar").textContent = msg;
        return;
    }
    try {
        const img = await prepararImagem(arquivo, "banner");
        abrirAjuste({ tipo: "banner", src: img.src, r: img.r, aoAplicar: (v) => { bannerTemp = v; atualizarBannerPrevia(); } });
    } catch (e) {
        $("erroEditar").textContent = "Não foi possível abrir essa imagem.";
    }
}

function ajustarBannerAtual() {
    const d = separarImagem(bannerTemp);
    if (d) abrirAjuste({ tipo: "banner", src: d.src, ajuste: d.ajuste, aoAplicar: (v) => { bannerTemp = v; atualizarBannerPrevia(); } });
}

async function salvarEdicao() {
    const corpo = {};
    const arquivos = {};   // imagens grandes: sobem como arquivo, antes do restante
    if (seletorEditar.valor() !== usuario.foto) {
        if (imagemGrande(seletorEditar.valor())) arquivos.foto = seletorEditar.valor(); else corpo.foto = seletorEditar.valor();
    }
    if ((bannerTemp || null) !== (usuario.banner || null)) {
        if (imagemGrande(bannerTemp)) arquivos.banner = bannerTemp; else corpo.banner = bannerTemp;
    }
    const bio = limparBio($("editarBio").value);
    if (bio !== (usuario.biografia || "")) corpo.biografia = bio;
    const pronomes = limparPronomes($("editarPronomes").value);
    if (pronomes !== (usuario.pronomes || "")) corpo.pronomes = pronomes;

    if (!Object.keys(corpo).length && !Object.keys(arquivos).length) {
        fecharModal($("modalEditar"));
        return;
    }

    const btn = $("btnEditarSalvar");
    btn.disabled = true;
    let r = null;
    for (const tipo of Object.keys(arquivos)) {
        r = await enviarImagemGrande(tipo, arquivos[tipo]);
        if (!r.ok) break;
    }
    if (!r || r.ok) {
        if (Object.keys(corpo).length) r = await chamarAPI("/api/eu", { method: "PUT", body: JSON.stringify(corpo) });
    }
    btn.disabled = false;

    if (!r.ok) {
        $("erroEditar").textContent = r.erro;
        return;
    }
    usuario = r.dados;
    fecharModal($("modalEditar"));
    atualizarChip();
    renderPerfil($("perfilConteudo"), usuario);
    avisar("Perfil atualizado!");
}

// ---------- troca de nickname e senha (espera de 7 dias) ----------
function diasRestantes(iso) {
    const ms = new Date(iso) - Date.now();
    return ms > 0 ? Math.ceil(ms / 86400000) : 0;
}

function abrirEspera(oQue, dias, liberaEm) {
    const total = (configAPI && configAPI.dias_entre_trocas) || usuario.dias_entre_trocas || 7;
    dias = Math.max(1, Math.min(total, dias));

    $("textoEspera").textContent = `Você só pode alterar ${oQue} novamente depois de ${total} dias.`;
    $("esperaDiasTexto").textContent = dias === 1 ? "dia restante" : "dias restantes";
    $("esperaDias").textContent = "0";
    $("esperaData").textContent = liberaEm ? "Liberado em " + formatarData(liberaEm) : "";

    // uma bolinha por dia: as acesas são os dias que já passaram
    const passados = total - dias;
    $("esperaPontos").replaceChildren(...Array.from({ length: total }, (_, i) => {
        const p = el("span", "ponto-dia" + (i < passados ? " passado" : ""));
        p.style.animationDelay = (0.25 + i * 0.08) + "s";
        return p;
    }));

    abrirModal($("modalEspera"));
    setTimeout(() => animarNumero($("esperaDias"), dias, 800), 250);
}

function esperaAtiva(iso) {
    return iso && diasRestantes(iso) > 0;
}

function pedirTrocaNick() {
    if (esperaAtiva(usuario.proxima_troca_nickname)) {
        abrirEspera("o nickname", diasRestantes(usuario.proxima_troca_nickname), usuario.proxima_troca_nickname);
        return;
    }
    $("novoNick").value = "";
    verificacaoNovoNick.reiniciar();
    $("erroNick").textContent = "";
    abrirModal($("modalNick"));
    $("novoNick").focus();
}

async function salvarNick() {
    const erro = $("erroNick");
    const nickname = normalizarNome($("novoNick").value);
    erro.textContent = "";

    if (!nomeValido(nickname)) { erro.textContent = "Use de 3 a 20 letras, números ou _ (sem acentos)."; return; }
    if (nickname === usuario.nickname) { erro.textContent = "Esse já é o seu nickname atual."; return; }
    if (verificacaoNovoNick.ocupado) { erro.textContent = "Este nickname já está sendo utilizado por outro usuário."; return; }

    const btn = $("btnNickSalvar");
    btn.disabled = true;
    const r = await chamarAPI("/api/eu/nickname", { method: "PUT", body: JSON.stringify({ nickname }) });
    btn.disabled = false;

    if (r.status === 429 && r.dados.dias_restantes !== undefined) {
        fecharModal($("modalNick"), false);
        abrirEspera("o nickname", r.dados.dias_restantes, r.dados.libera_em);
        return;
    }
    if (!r.ok) { erro.textContent = r.erro; return; }

    usuario = r.dados;
    fecharModal($("modalNick"));
    atualizarChip();
    renderPerfil($("perfilConteudo"), usuario);
    $("contaInfo").textContent = `Conectado como ${usuario.nickname} (${usuario.email}).`;
    avisar("Nickname atualizado!");
}

function pedirTrocaSenha() {
    if (esperaAtiva(usuario.proxima_troca_senha)) {
        abrirEspera("a senha", diasRestantes(usuario.proxima_troca_senha), usuario.proxima_troca_senha);
        return;
    }
    ["senhaAtual", "senhaNova", "senhaNova2"].forEach(id => { $(id).value = ""; });
    $("erroSenha").textContent = "";
    abrirModal($("modalSenha"));
    $("senhaAtual").focus();
}

async function salvarSenha() {
    const erro = $("erroSenha");
    const atual = $("senhaAtual").value;
    const nova = $("senhaNova").value;
    erro.textContent = "";

    if (!atual) { erro.textContent = "Digite a sua senha atual."; return; }
    if (nova.length < 6 || nova.length > 100) { erro.textContent = "A nova senha precisa ter de 6 a 100 caracteres."; return; }
    if (nova !== $("senhaNova2").value) { erro.textContent = "As senhas novas não são iguais."; return; }
    if (nova === atual) { erro.textContent = "A nova senha precisa ser diferente da atual."; return; }

    const btn = $("btnSenhaSalvar");
    btn.disabled = true;
    const r = await chamarAPI("/api/eu/senha", {
        method: "PUT",
        body: JSON.stringify({ senha_atual: atual, senha_nova: nova })
    });
    btn.disabled = false;

    if (r.status === 429 && r.dados.dias_restantes !== undefined) {
        fecharModal($("modalSenha"), false);
        abrirEspera("a senha", r.dados.dias_restantes, r.dados.libera_em);
        return;
    }
    if (!r.ok) { erro.textContent = r.erro; return; }

    usuario = r.dados;
    fecharModal($("modalSenha"));
    avisar("Senha atualizada!");
}

// ---------- excluir a conta (2 pop-ups) ----------
function pedirExclusao() {
    abrirModal($("modalExcluir1"));
}

function continuarExclusao() {
    fecharModal($("modalExcluir1"), false);
    $("excluirNick").value = "";
    $("excluirSenha").value = "";
    $("erroExcluir").textContent = "";
    const comSenha = usuario.tipo_conta === "site";
    mostrar($("excluirSenhaGrupo"), comSenha);
    $("textoExcluir2").textContent = comSenha
        ? "Digite o seu nickname e a sua senha para apagar a conta de vez."
        : "Digite o seu nickname para apagar a conta de vez (contas do Google não têm senha no Quiz).";
    abrirModal($("modalExcluir2"));
    $("excluirNick").focus();
}

async function confirmarExclusao() {
    const erro = $("erroExcluir");
    const nickname = $("excluirNick").value.trim();
    const senha = $("excluirSenha").value;
    erro.textContent = "";

    if (!nickname) { erro.textContent = "Digite o seu nickname."; return; }
    if (usuario.tipo_conta === "site" && !senha) { erro.textContent = "Digite a sua senha."; return; }

    const btn = $("btnExcluir2Confirmar");
    btn.disabled = true;
    const r = await chamarAPI("/api/eu", { method: "DELETE", body: JSON.stringify({ nickname, senha }) });
    btn.disabled = false;

    if (!r.ok) {
        erro.textContent = r.erro;
        return;
    }
    sairDaConta("Sua conta foi excluída do GennisQuiz e do banco de dados.", "ok");
}

// ---------- emblemas e avisos ----------
let temporizadorAviso = null;

function avisar(texto, icone) {
    const t = $("toast");
    t.replaceChildren();
    if (icone) t.appendChild(icone);
    t.appendChild(el("span", "", texto));
    t.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("visivel")));
    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(() => {
        t.classList.remove("visivel");
        temporizadorAviso = setTimeout(() => { t.hidden = true; }, 350);
    }, 4600);
}

function avisarEmblema(codigo) {
    const info = EMBLEMAS.find(e => e.codigo === codigo);
    if (info) avisar("Novo emblema conquistado: " + info.nome + "!", criarIconeEmblema(codigo, 30));
}

// ==========================================
// 8. ABAS E RODAPÉ DOS CRIADORES
// ==========================================
function irParaAba(nome) {
    abasBtns.forEach(b => {
        const ativa = b.dataset.aba === nome;
        b.classList.toggle("ativa", ativa);
        b.setAttribute("aria-selected", ativa);
    });
    ["inicio", "perfil", "config", "sobre", "dev"].forEach(a => mostrar($("aba-" + a), a === nome));
    if (nome === "inicio" && appAberto) atualizarRanking();
    if (nome === "perfil" && appAberto) carregarPerfilProprio();
    if (nome === "dev" && appAberto) carregarPainelDev();
}

// ---------- aba Desenvolvedor (só o dono) ----------
const painelDev = { busca: "", pagina: 1, alvo: null };

async function carregarPainelDev() {
    const lista = $("devLista");
    lista.replaceChildren(el("p", "texto-apoio", "Carregando…"));
    const r = await chamarAPI(`/api/dev/usuarios?busca=${encodeURIComponent(painelDev.busca)}&pagina=${painelDev.pagina}`);
    if (!r.ok) {
        lista.replaceChildren(el("p", "erro-campo", r.erro));
        return;
    }
    painelDev.pagina = r.dados.pagina;
    $("devTotal").textContent = `${r.dados.total} usuário${r.dados.total === 1 ? "" : "s"}`;
    $("devPagina").textContent = `${r.dados.pagina} / ${r.dados.total_paginas}`;
    $("devAnterior").disabled = r.dados.pagina <= 1;
    $("devProxima").disabled = r.dados.pagina >= r.dados.total_paginas;
    mostrar($("devNav"), r.dados.total_paginas > 1);

    if (!r.dados.usuarios.length) {
        lista.replaceChildren(el("p", "texto-apoio", "Nenhum usuário encontrado."));
        return;
    }
    lista.replaceChildren(...r.dados.usuarios.map(u => {
        const linha = el("div", "dev-linha");
        linha.appendChild(criarAvatar(u.foto, 40));
        const info = el("div", "dev-info");
        info.appendChild(el("strong", "", u.nickname));
        info.appendChild(el("small", "", (u.tipo_conta === "google" ? "Conta Google" : "Conta do site") + " · desde " + formatarData(u.data_cadastro)));
        linha.appendChild(info);
        const emb = el("span", "dev-emblemas");
        u.emblemas.forEach(c => emb.appendChild(criarEmblemaMini(c)));
        linha.appendChild(emb);
        const b = el("button", "", "Editar");
        b.type = "button";
        b.addEventListener("click", () => abrirEdicaoDev(u.nickname));
        linha.appendChild(b);
        return linha;
    }));
}

async function abrirEdicaoDev(nickname) {
    const r = await chamarAPI("/api/dev/usuarios/" + encodeURIComponent(nickname));
    if (!r.ok) { avisar(r.erro); return; }
    painelDev.alvo = r.dados;
    painelDev.catalogo = null;       // recarrega o catálogo: pode ter emblema novo no banco
    $("erroDev").textContent = "";
    abrirModal($("modalDev"));
    preencherEdicaoDev();
}

async function preencherEdicaoDev() {
    const p = painelDev.alvo;
    $("devTitulo").textContent = "Editar @" + p.nickname;
    $("devNick").value = p.nickname;
    $("devPronomes").value = p.pronomes || "";
    $("devBio").value = p.biografia || "";
    $("devAvatar").replaceChildren(criarAvatar(p.foto, 56));
    desenharPontosDev();
    await desenharEmblemasDev();
}

// pontos de cada modo (fácil, normal, difícil) com campo para mudar e botão para zerar
function desenharPontosDev() {
    const p = painelDev.alvo;
    const alvoEhDono = (p.emblemas || []).some(e => e.codigo === "DONO");
    const travado = alvoEhDono && !usuario.dono;     // só um dono mexe na conta de outro dono (o servidor confere também)
    const caixa = $("devPontos");
    const linhas = ["facil", "normal", "dificil"].map(modo => {
        const passo = PONTOS_POR_NIVEL[modo];
        const atual = p.modos && p.modos[modo] ? p.modos[modo].pontos : 0;
        const linha = el("div", "dev-pontos-linha");
        const nome = el("span", "dev-pontos-modo", "Modo " + NOMES_MODO[modo]);
        const campo = document.createElement("input");
        campo.type = "number";
        campo.min = "0";
        campo.step = String(passo);
        campo.value = String(atual);
        campo.setAttribute("aria-label", "Pontos do modo " + NOMES_MODO[modo]);
        const definir = el("button", "", "Definir");
        const zerar = el("button", "", "Zerar");
        definir.type = zerar.type = "button";
        campo.disabled = definir.disabled = zerar.disabled = travado;
        definir.addEventListener("click", () => {
            const valor = Number(campo.value);
            if (campo.value.trim() === "" || !Number.isInteger(valor) || valor < 0 || valor % passo !== 0) {
                $("erroDev").textContent = `No modo ${NOMES_MODO[modo]} os pontos precisam ser múltiplos de ${passo}`;
                return;
            }
            mudarPontosDev(modo, valor);
        });
        zerar.addEventListener("click", () => mudarPontosDev(modo, 0));
        linha.append(nome, campo, definir, zerar);
        return linha;
    });
    const todos = el("button", "dev-pontos-todos", "Zerar todos os modos");
    todos.type = "button";
    todos.disabled = travado;
    todos.addEventListener("click", () => mudarPontosDev("todos", 0));
    caixa.replaceChildren(...linhas, todos);
}

async function mudarPontosDev(modo, pontos) {
    const nick = painelDev.alvo.nickname;
    const oque = modo === "todos" ? "TODOS os pontos (fácil, normal e difícil)" : (pontos === 0 ? "os pontos do modo " + NOMES_MODO[modo] : "os pontos do modo " + NOMES_MODO[modo] + " para " + pontos);
    if (!confirm((pontos === 0 ? "Zerar " : "Mudar ") + oque + " de @" + nick + "?")) return;
    const r = await chamarAPI(`/api/dev/usuarios/${encodeURIComponent(nick)}/pontos`, {
        method: "PUT", body: JSON.stringify({ modo, pontos })
    });
    if (!r.ok) { $("erroDev").textContent = r.erro; desenharPontosDev(); return; }
    painelDev.alvo = r.dados;
    $("erroDev").textContent = "";
    avisar("Pontos de @" + r.dados.nickname + " atualizados");
    desenharPontosDev();
    await desenharEmblemasDev();     // o Top 1/2/3 pode ter mudado
    carregarPainelDev();
}

// todos os emblemas do banco (inclusive os criados no futuro), com caixinha para liberar ou tirar
async function desenharEmblemasDev() {
    const p = painelDev.alvo;
    const lista = $("devEmblemas");
    if (!painelDev.catalogo) {
        const r = await chamarAPI("/api/dev/emblemas");
        if (!r.ok) { lista.replaceChildren(el("p", "erro-campo", r.erro)); return; }
        painelDev.catalogo = r.dados.emblemas;
        EMBLEMAS = r.dados.emblemas.map(e => ({ codigo: e.codigo, nome: e.nome, descricao: e.descricao }));
    }
    const tem = new Set((p.emblemas || []).map(e => e.codigo));
    const alvoEhDono = tem.has("DONO");
    lista.replaceChildren(...painelDev.catalogo.map(info => {
        const rotulo = el("label", "dev-emblema");
        const caixa = document.createElement("input");
        caixa.type = "checkbox";
        caixa.checked = tem.has(info.codigo);
        // só um dono mexe no emblema Dono / Criador e na conta de outro dono (o servidor confere também)
        const travado = (info.codigo === "DONO" || alvoEhDono) && !usuario.dono;
        const proprioDono = info.codigo === "DONO" && p.nickname === usuario.nickname;
        caixa.disabled = travado || proprioDono;
        caixa.addEventListener("change", () => mudarEmblemaDev(info.codigo, caixa));
        rotulo.title = info.descricao;
        rotulo.append(caixa, criarIconeEmblema(info.codigo, 30), el("span", "", info.nome));
        if (info.automatico) rotulo.appendChild(el("small", "dev-auto", "automático"));
        if (info.codigo === "DEV") rotulo.appendChild(el("small", "dev-auto", "libera este painel"));
        return rotulo;
    }));
}

async function mudarEmblemaDev(codigo, caixa) {
    caixa.disabled = true;
    const r = await chamarAPI(`/api/dev/usuarios/${encodeURIComponent(painelDev.alvo.nickname)}/emblemas`, {
        method: "PUT", body: JSON.stringify({ codigo, ativo: caixa.checked })
    });
    if (!r.ok) { caixa.checked = !caixa.checked; caixa.disabled = false; $("erroDev").textContent = r.erro; return; }
    painelDev.alvo = r.dados;
    $("erroDev").textContent = "";
    avisar(caixa.checked ? "Emblema colocado" : "Emblema removido");
    await desenharEmblemasDev();
    carregarPainelDev();
}

async function salvarEdicaoDev(extra = {}) {
    const p = painelDev.alvo;
    const corpo = { ...extra };
    const nick = $("devNick").value.trim();
    if (nick && nick.toLowerCase() !== p.nickname) corpo.nickname = nick;
    const bio = limparBio($("devBio").value);
    if (bio !== (p.biografia || "")) corpo.biografia = bio;
    const pron = limparPronomes($("devPronomes").value);
    if (pron !== (p.pronomes || "")) corpo.pronomes = pron;
    if (!Object.keys(corpo).length) { fecharModal($("modalDev")); return; }

    const r = await chamarAPI("/api/dev/usuarios/" + encodeURIComponent(p.nickname), { method: "PUT", body: JSON.stringify(corpo) });
    if (!r.ok) { $("erroDev").textContent = r.erro; return; }
    painelDev.alvo = r.dados;
    if (extra.remover_foto || extra.remover_banner) {
        preencherEdicaoDev();
        $("erroDev").textContent = "";
    } else {
        fecharModal($("modalDev"));
    }
    avisar("Perfil de @" + r.dados.nickname + " atualizado");
    carregarPainelDev();
}

function bloquearNavegacao(bloquear) {
    abasBtns.forEach(b => { b.disabled = bloquear; });
    btnPerfil.disabled = bloquear;
}

function atualizarRodape() {
    const telaVisivel = !telaLogin.hidden || (appAberto && !jogando);
    mostrar(rodapeCriadores, telaVisivel);
}

function montarCriadores() {
    const trilho = $("marqueeTrilho");

    const montarGrupo = (copia) => {
        const grupo = el("div", "marquee-grupo");
        if (copia) grupo.setAttribute("aria-hidden", "true");

        CRIADORES.forEach(c => {
            const b = el("button", "criador");
            b.type = "button";
            if (copia) b.tabIndex = -1;
            b.setAttribute("aria-label", `${c.nome}, perfil no GitHub @${c.user}`);

            const foto = el("span", "criador-foto");
            const img = new Image();
            img.alt = "";
            img.referrerPolicy = "no-referrer";
            img.src = `https://github.com/${encodeURIComponent(c.user)}.png?size=120`;
            img.addEventListener("error", () => { foto.replaceChildren(document.createTextNode(c.nome[0])); });
            foto.appendChild(img);

            const texto = el("span", "criador-texto");
            texto.appendChild(el("strong", "", c.nome));
            texto.appendChild(el("span", "criador-user", "@" + c.user));

            b.append(foto, texto);
            b.addEventListener("click", () => abrirGithub(c));
            grupo.appendChild(b);
        });
        return grupo;
    };

    // dois grupos iguais: a animação anda -50% e recomeça sem pulo
    trilho.append(montarGrupo(false), montarGrupo(true));
}

function abrirGithub(c) {
    const av = el("span", "criador-foto");
    av.style.cssText = "width:6rem;height:6rem;font-size:2.4rem";
    const img = new Image();
    img.alt = "";
    img.referrerPolicy = "no-referrer";
    img.src = `https://github.com/${encodeURIComponent(c.user)}.png?size=240`;
    img.addEventListener("error", () => { av.replaceChildren(document.createTextNode(c.nome[0])); });
    av.appendChild(img);

    $("ghAvatar").replaceChildren(av);
    $("ghNome").textContent = c.nome;
    $("ghUser").textContent = "@" + c.user + " no GitHub";
    $("ghLink").href = `https://github.com/${encodeURIComponent(c.user)}`;
    abrirModal(modalGithub);
}

// ==========================================
// 9. LÓGICA DO QUIZ
// ==========================================
// pop-up "Iniciando em..." (3, 2, 1) antes do quiz começar, em qualquer modo.
// O cronômetro das perguntas só começa depois dele, então ninguém perde tempo.
let contagemAtiva = false;

function iniciarComContagem(modo) {
    if (contagemAtiva) return;
    contagemAtiva = true;

    const modal = $("modalContagem");
    const numero = $("contagemNumero");
    let restante = 3;

    function mostrarNumero() {
        numero.textContent = restante;
        numero.classList.remove("batida");
        void numero.offsetWidth;          // reinicia a animação do número
        numero.classList.add("batida");
    }

    mostrarNumero();
    abrirModal(modal);

    const intervalo = setInterval(() => {
        restante -= 1;
        if (restante > 0) {
            mostrarNumero();
            return;
        }
        clearInterval(intervalo);
        fecharModal(modal, false);
        contagemAtiva = false;
        iniciarQuiz(modo);
    }, 1000);
}

function embaralhar(lista) {
    // Fisher-Yates: devolve uma cópia embaralhada
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
}

// Monta as perguntas da partida. Cada pergunta ganha o seu "nivel" (facil, normal ou dificil),
// que decide a dica, os pontos e (no Radical) o tempo.
function montarPerguntasDaPartida(modo) {
    if (modo !== "radical") {
        return PERGUNTAS_POR_MODO[modo].map(p => ({ ...p, nivel: modo }));
    }
    // Radical: junta as 45 perguntas dos três modos, sorteia 15 e também embaralha as alternativas de cada uma
    const todas = NIVEIS.flatMap(nivel => PERGUNTAS_POR_MODO[nivel].map(p => ({ ...p, nivel })));
    return embaralhar(todas).slice(0, PERGUNTAS_RADICAL).map(p => {
        const ordem = embaralhar(p.alternativas.map((texto, i) => ({ texto, certa: i === p.respostaCorreta })));
        return {
            ...p,
            alternativas: ordem.map(o => o.texto),
            respostaCorreta: ordem.findIndex(o => o.certa)
        };
    });
}

// pop-up do modo Radical: avisa que as perguntas caem aleatórias e pergunta se o jogador aceita
function pedirDesafioRadical() {
    abrirModal($("modalRadical"));
}

function aceitarDesafioRadical() {
    fecharModal($("modalRadical"), false);
    iniciarComContagem("radical");
}

function recusarDesafioRadical() {
    fecharModal($("modalRadical"));
}

function iniciarQuiz(modo) {
    modoAtual = modo;
    perguntas = montarPerguntasDaPartida(modo);
    indiceAtual = 0;
    pontuacao = 0;
    pontosPartida = 0;
    acertosPorNivel = { facil: 0, normal: 0, dificil: 0 };
    jogando = true;

    gradeInicio.classList.add("jogando");
    bloquearNavegacao(true);
    atualizarRodape();

    mostrar(inicioContainer, false);
    mostrar(finalScreen, false);
    mostrar(quizContainer, true);

    carregarPergunta();
}

function carregarPergunta() {
    clearInterval(timer);
    respondida = false;
    quizContainer.classList.remove("quiz-borrado");
    const dados = perguntas[indiceAtual];
    const nivel = dados.nivel;      // no Radical cada pergunta tem o nível dela

    questionTitle.innerText = `(${indiceAtual + 1}/${perguntas.length}) ${dados.pergunta}`;
    textoDica.innerText = "Dica: " + dados.dica;

    // trecho de código (perguntas do modo Difícil)
    $("blocoCodigoLinguagem").textContent = dados.linguagem || "";
    $("blocoCodigoTexto").textContent = dados.codigo || "";
    mostrar($("blocoCodigo"), Boolean(dados.codigo));

    rotuloModo.textContent = (modoAtual === "radical"
        ? "Radical · " + NOMES_MODO[nivel]
        : "Modo " + NOMES_MODO[modoAtual]) + " · +" + PONTOS_POR_NIVEL[nivel] + " pts";

    mostrar(areaExplicacao, false);
    mostrar(btnProxima, false);
    btnDica.setAttribute("aria-expanded", "false");

    // Cada nível mostra um conjunto diferente de ajudas (no Radical vale o nível da pergunta que caiu)
    if (nivel === "facil") {
        mostrar(textoDica, true);      // dica sempre visível
        mostrar(btnDica, false);
    } else if (nivel === "normal") {
        mostrar(textoDica, false);     // dica só quando clicar no ?
        mostrar(btnDica, true);
    } else if (nivel === "dificil") {
        mostrar(textoDica, false);     // sem dica
        mostrar(btnDica, false);
    }

    // o cronômetro roda em todos os modos (tempo por pergunta; no Radical depende do nível dela)
    mostrar(timerDisplay, true);
    iniciarTimer(modoAtual === "radical" ? TEMPOS_RADICAL[nivel] : TEMPOS[modoAtual]);

    btnAlternativas.forEach((btn, index) => {
        btn.innerText = dados.alternativas[index];
        btn.disabled = false;
        btn.classList.remove("correta", "errada");
        btn.onclick = () => verificarResposta(index);
    });

    btnAlternativas[0].focus({ preventScroll: true });
}

function verificarResposta(indiceEscolhido) {
    clearInterval(timer);
    respondida = true;
    const dados = perguntas[indiceAtual];
    const correta = dados.respostaCorreta;

    btnAlternativas.forEach(btn => btn.disabled = true);

    if (indiceEscolhido === -1) {
        // Estourou o tempo
        mostrarResultado(
            "✖ O tempo acabou!",
            "Você demorou muito. A resposta correta era: " + dados.alternativas[correta],
            false
        );
        btnAlternativas[correta].classList.add("correta");
    } else if (indiceEscolhido === correta) {
        // Acertou: ganha os pontos do nível da pergunta
        pontuacao++;
        pontosPartida += PONTOS_POR_NIVEL[dados.nivel];
        acertosPorNivel[dados.nivel]++;
        btnAlternativas[indiceEscolhido].classList.add("correta");
        mostrarResultado(`✔ Resposta Correta! +${PONTOS_POR_NIVEL[dados.nivel]} pts`, dados.explicacaoCorreta, true);
    } else {
        // Errou
        btnAlternativas[indiceEscolhido].classList.add("errada");
        btnAlternativas[correta].classList.add("correta");
        mostrarResultado("✖ Resposta Incorreta!", dados.explicacaoErrada, false);
    }

    mostrar(areaExplicacao, true);
    mostrar(btnProxima, true);
    btnProxima.focus({ preventScroll: true });
}

function mostrarResultado(titulo, texto, acertou) {
    tituloResultado.innerText = titulo;
    tituloResultado.className = acertou ? "resultado-certo" : "resultado-errado";
    textoExplicacao.innerText = texto;
}

function animarNumero(elemento, ate, duracao = 1500) {
    const inicio = performance.now();
    const passo = (agora) => {
        const t = Math.min(1, (agora - inicio) / duracao);
        elemento.textContent = Math.round(ate * (1 - Math.pow(1 - t, 3)));
        if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
}

async function finalizarQuiz() {
    clearInterval(timer);
    jogando = false;
    mostrar(quizContainer, false);
    mostrar(finalScreen, true);
    gradeInicio.classList.remove("jogando");
    bloquearNavegacao(false);
    atualizarRodape();

    const total = perguntas.length;
    const erros = total - pontuacao;
    const modoJogado = modoAtual;

    finalScore.innerText = `Você acertou ${pontuacao} de ${total} questões!`;
    animarNumero($("numPontosPartida"), pontosPartida);

    // perfil do usuário
    $("finalAvatar").replaceChildren(criarAvatar(usuario.foto, 64));
    $("finalNome").textContent = usuario.nickname;
    $("finalModo").textContent = "Modo " + NOMES_MODO[modoJogado];

    // barras de acertos e erros sendo carregadas
    const barraAcertos = $("barraAcertos");
    const barraErros = $("barraErros");
    barraAcertos.style.width = "0";
    barraErros.style.width = "0";
    $("numAcertos").textContent = "0";
    $("numErros").textContent = "0";
    setTimeout(() => {
        barraAcertos.style.width = (pontuacao / total * 100) + "%";
        barraErros.style.width = (erros / total * 100) + "%";
        animarNumero($("numAcertos"), pontuacao);
        animarNumero($("numErros"), erros);
    }, 150);

    const porcentagem = pontuacao / total;
    let kanji, mensagem;

    if (porcentagem === 1) {
        kanji = "優";
        mensagem = "Perfeito! Você domina TI!";
    } else if (porcentagem >= 0.7) {
        kanji = "良";
        mensagem = "Mandou muito bem!";
    } else if (porcentagem >= 0.4) {
        kanji = "可";
        mensagem = "Bom resultado, mas dá para melhorar.";
    } else {
        kanji = "学";
        mensagem = "Continue estudando, você chega lá!";
    }

    emojiFinal.innerText = kanji;
    mensagemFinal.innerText = mensagem;
    btnReiniciar.focus({ preventScroll: true });

    // salva no banco e descobre a colocação no ranking do modo jogado
    const lugar = $("finalLugar");
    lugar.textContent = "Calculando a sua colocação…";
    const salvou = await salvarPartida(modoJogado, pontuacao, total, acertosPorNivel);

    // a posição e os pontos acumulados vêm do perfil, que a API acabou de recalcular
    const dadosModo = salvou && usuario.modos ? usuario.modos[modoJogado] : null;
    const posicao = dadosModo ? dadosModo.posicao : 0;
    const acumulado = dadosModo ? ` (${formatarPontos(dadosModo.pontos)} pts acumulados)` : "";

    lugar.replaceChildren();
    if (!salvou) {
        lugar.textContent = "Não foi possível salvar a pontuação no banco de dados.";
    } else if (posicao >= 1 && posicao <= 3) {
        lugar.append(criarCoroa(posicao),
            document.createTextNode(`${posicao}º lugar no modo ${NOMES_MODO[modoJogado]} - Coroa de ${CORES_COROA[posicao].nome}!${acumulado}`));
    } else if (posicao > 3) {
        lugar.textContent = `Você está em ${posicao}º lugar no modo ${NOMES_MODO[modoJogado]}${acumulado}.`;
    } else {
        lugar.textContent = "Sua pontuação foi registrada.";
    }

    atualizarRanking();
}

function voltarAoInicio() {
    clearInterval(timer);
    jogando = false;
    respondida = true;
    quizContainer.classList.remove("quiz-borrado");
    gradeInicio.classList.remove("jogando");
    bloquearNavegacao(false);
    mostrar(finalScreen, false);
    mostrar(quizContainer, false);
    mostrar(inicioContainer, true);
    atualizarRodape();
    if (appAberto) atualizarRanking();
}

// ---------- sair do quiz no meio (pop-up com blur) ----------
function pedirSaida() {
    pausarTimer();
    quizContainer.classList.add("quiz-borrado");
    abrirModal(modalSair);
}

function cancelarSaida() {
    fecharModal(modalSair, false);
    quizContainer.classList.remove("quiz-borrado");
    if (!respondida) retomarTimer();
    const proximoFoco = respondida ? btnProxima : btnAlternativas.find(b => !b.disabled);
    if (proximoFoco) proximoFoco.focus({ preventScroll: true });
}

function confirmarSaida() {
    fecharModal(modalSair, false);
    voltarAoInicio();
}

// ==========================================
// 10. TIMER (por pergunta, em todos os modos)
// ==========================================
function iniciarTimer(segundos) {
    tempoTotal = segundos;
    tempoRestante = segundos;

    // a barra volta cheia sem animação
    barraTempo.style.transition = "none";
    barraTempo.style.width = "100%";
    void barraTempo.offsetWidth;
    barraTempo.style.transition = "";

    atualizarDisplayTempo();
    retomarTimer();
}

function retomarTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        tempoRestante--;
        atualizarDisplayTempo();

        if (tempoRestante <= 0) {
            clearInterval(timer);
            verificarResposta(-1); // Estourou o tempo
        }
    }, 1000);
}

function pausarTimer() {
    clearInterval(timer);
}

function atualizarDisplayTempo() {
    const minutos = Math.floor(tempoRestante / 60);
    const segundosRestantes = tempoRestante % 60;
    spanTempo.innerText = `${minutos}:${segundosRestantes.toString().padStart(2, "0")}`;
    barraTempo.style.width = Math.max(0, tempoRestante / tempoTotal * 100) + "%";

    const limiteUrgente = Math.min(10, Math.ceil(tempoTotal / 3));
    timerDisplay.classList.toggle("urgente", tempoRestante <= limiteUrgente);
}

// ==========================================
// 11. ACESSIBILIDADE: menu, alto contraste, fonte, tema e daltonismo
// ==========================================
function abrirFecharMenu() {
    const aberto = menuAcessibilidade.classList.toggle("ativo");
    btnAcessibilidade.setAttribute("aria-expanded", aberto);
}

function fecharMenuAcessibilidade() {
    menuAcessibilidade.classList.remove("ativo");
    btnAcessibilidade.setAttribute("aria-expanded", "false");
}

function aplicarAcessibilidade() {
    document.body.classList.toggle("modo-acessivel", altoContraste);
    document.documentElement.style.setProperty("--escala-fonte", escalaFonte);

    btnContraste.setAttribute("aria-pressed", altoContraste);
    btnContraste.innerHTML = ICONE_CONTRASTE + "<span>" + (altoContraste ? "Contraste normal" : "Alto contraste") + "</span>";

    btnFonteMais.disabled = escalaFonte >= ESCALA_MAX;
    btnFonteMenos.disabled = escalaFonte <= ESCALA_MIN;

    gravarLS("acessibilidade", { escalaFonte, altoContraste });
}

function aplicarTema() {
    document.documentElement.dataset.tema = tema;
    const claro = tema === "claro";
    $("btnTema").setAttribute("aria-checked", claro);
    $("temaTexto").textContent = claro ? "Tema claro" : "Tema escuro";
    gravarLS("gq_tema", tema);
}

function aplicarDaltonismo() {
    ["protanopia", "deuteranopia", "tritanopia"].forEach(t => {
        document.documentElement.classList.toggle("daltonismo-" + t, t === daltonismo);
    });
    const radio = document.querySelector(`input[name="daltonismo"][value="${daltonismo}"]`);
    if (radio) radio.checked = true;
    gravarLS("gq_daltonismo", daltonismo);
}

function carregarPreferencias() {
    const salvo = lerLS("acessibilidade", null);
    if (salvo) {
        const escala = Number(salvo.escalaFonte);
        if (escala >= ESCALA_MIN && escala <= ESCALA_MAX) escalaFonte = escala;
        altoContraste = salvo.altoContraste === true;
    }
    tema = lerLS("gq_tema", "escuro") === "claro" ? "claro" : "escuro";
    const dalt = lerLS("gq_daltonismo", "nenhum");
    daltonismo = ["protanopia", "deuteranopia", "tritanopia"].includes(dalt) ? dalt : "nenhum";

    aplicarAcessibilidade();
    aplicarTema();
    aplicarDaltonismo();
}

// ==========================================
// 12. EVENTOS
// ==========================================

// Login, cadastro e perfil
document.querySelectorAll("#subAbas button").forEach(b => b.addEventListener("click", () => mostrarSub(b.dataset.sub)));
formLogin.addEventListener("submit", tentarEntrar);
$("formCadastro").addEventListener("submit", tentarCadastrar);
$("formGoogle").addEventListener("submit", concluirCadastroGoogle);
$("btnCancelarGoogle").addEventListener("click", () => { googleCadastro = null; mostrarSub("entrar"); });
btnPerfil.addEventListener("click", () => irParaAba("perfil"));

$("btnEditarPerfil").addEventListener("click", abrirEditar);
$("btnEscolherBanner").addEventListener("click", () => $("inputBanner").click());
$("btnAjustarBanner").addEventListener("click", ajustarBannerAtual);
$("inputBanner").addEventListener("change", aoEscolherBanner);
$("btnRemoverBanner").addEventListener("click", () => { bannerTemp = null; atualizarBannerPrevia(); });
$("editarBio").addEventListener("input", () => { $("contaBio").textContent = $("editarBio").value.length + "/200"; });
$("btnEditarSalvar").addEventListener("click", salvarEdicao);
$("btnEditarCancelar").addEventListener("click", () => fecharModal($("modalEditar")));

$("btnAlterarNick").addEventListener("click", pedirTrocaNick);
$("btnNickSalvar").addEventListener("click", salvarNick);
$("btnNickCancelar").addEventListener("click", () => fecharModal($("modalNick")));
$("novoNick").addEventListener("keydown", (e) => { if (e.key === "Enter") salvarNick(); });

$("btnAlterarSenha").addEventListener("click", pedirTrocaSenha);
$("btnSenhaSalvar").addEventListener("click", salvarSenha);
$("btnSenhaCancelar").addEventListener("click", () => fecharModal($("modalSenha")));
["senhaAtual", "senhaNova", "senhaNova2"].forEach(id => $(id).addEventListener("keydown", (e) => { if (e.key === "Enter") salvarSenha(); }));

$("btnEsperaOk").addEventListener("click", () => fecharModal($("modalEspera")));

$("btnSairConta").addEventListener("click", () => sairDaConta());
$("btnExcluirConta").addEventListener("click", pedirExclusao);
$("btnExcluir1Sim").addEventListener("click", continuarExclusao);
$("btnExcluir1Nao").addEventListener("click", () => fecharModal($("modalExcluir1")));
$("btnExcluir2Confirmar").addEventListener("click", confirmarExclusao);
$("btnExcluir2Cancelar").addEventListener("click", () => fecharModal($("modalExcluir2")));
["excluirNick", "excluirSenha"].forEach(id => $(id).addEventListener("keydown", (e) => { if (e.key === "Enter") confirmarExclusao(); }));

const quadroAjuste = $("ajusteQuadro");
quadroAjuste.addEventListener("pointerdown", (e) => {
    ajusteArrasto = { x: e.clientX, y: e.clientY };
    quadroAjuste.setPointerCapture(e.pointerId);
    quadroAjuste.classList.add("arrastando");
});
quadroAjuste.addEventListener("pointermove", (e) => {
    if (!ajusteArrasto) return;
    moverAjuste(e.clientX - ajusteArrasto.x, e.clientY - ajusteArrasto.y);
    ajusteArrasto = { x: e.clientX, y: e.clientY };
});
["pointerup", "pointercancel"].forEach(ev => quadroAjuste.addEventListener(ev, () => {
    ajusteArrasto = null;
    quadroAjuste.classList.remove("arrastando");
}));
quadroAjuste.addEventListener("keydown", (e) => {
    const passo = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[e.key];
    if (passo) { e.preventDefault(); moverAjuste(passo[0], passo[1]); }
});
$("ajusteZoom").addEventListener("input", () => {
    if (!ajusteEstado) return;
    ajusteEstado.a.z = Number($("ajusteZoom").value);
    aplicarAjuste(ajusteEstado.img, ajusteEstado.a, ajusteEstado.aspecto);
});
$("btnAjusteAplicar").addEventListener("click", aplicarEnquadramento);
$("btnAjusteCancelar").addEventListener("click", () => { ajusteEstado = null; fecharModal($("modalAjuste")); });

$("btnVerPerfilFechar").addEventListener("click", () => fecharModal($("modalVerPerfil")));
$("modalVerPerfil").addEventListener("click", (e) => { if (e.target === $("modalVerPerfil")) fecharModal($("modalVerPerfil")); });

// Abas
abasBtns.forEach(b => b.addEventListener("click", () => irParaAba(b.dataset.aba)));

let esperaBuscaDev = null;
$("devBusca").addEventListener("input", (e) => {
    clearTimeout(esperaBuscaDev);
    esperaBuscaDev = setTimeout(() => { painelDev.busca = e.target.value.trim(); painelDev.pagina = 1; carregarPainelDev(); }, 300);
});
$("devAnterior").addEventListener("click", () => { painelDev.pagina -= 1; carregarPainelDev(); });
$("devProxima").addEventListener("click", () => { painelDev.pagina += 1; carregarPainelDev(); });
$("btnDevSalvar").addEventListener("click", () => salvarEdicaoDev());
$("btnDevFechar").addEventListener("click", () => fecharModal($("modalDev")));
$("btnDevRemoverFoto").addEventListener("click", () => salvarEdicaoDev({ remover_foto: true }));
$("btnDevRemoverBanner").addEventListener("click", () => salvarEdicaoDev({ remover_banner: true }));

// Escolha do modo de jogo
btnModos.forEach(btn => {
    btn.addEventListener("click", () => {
        const modoEscolhido = btn.dataset.modo; // "facil" | "normal" | "dificil" | "radical"

        if (!modoEscolhido) {
            console.warn("O botão de modo precisa de um atributo data-modo no HTML.");
            return;
        }
        // o Radical sempre pergunta antes, porque as perguntas caem de modos misturados
        if (modoEscolhido === "radical") {
            pedirDesafioRadical();
            return;
        }
        iniciarComContagem(modoEscolhido);
    });
});

// Pop-up do Radical (Sim / Não)
$("btnRadicalSim").addEventListener("click", aceitarDesafioRadical);
$("btnRadicalNao").addEventListener("click", recusarDesafioRadical);

// Próxima pergunta
btnProxima.addEventListener("click", () => {
    indiceAtual++;

    if (indiceAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
});

// Botão de dica (modo normal)
btnDica.addEventListener("click", () => {
    const visivel = !textoDica.hidden;
    mostrar(textoDica, !visivel);
    btnDica.setAttribute("aria-expanded", !visivel);
});

// Sair do quiz (com confirmação)
btnSair.addEventListener("click", pedirSaida);
$("btnSairSim").addEventListener("click", confirmarSaida);
$("btnSairNao").addEventListener("click", cancelarSaida);

// Voltar ao início (sem recarregar a página)
btnReiniciar.addEventListener("click", voltarAoInicio);

// Ranking: filtro por modo
document.querySelectorAll(".filtro").forEach(btn => {
    btn.addEventListener("click", () => {
        filtroRanking = btn.dataset.filtro;
        document.querySelectorAll(".filtro").forEach(b => b.setAttribute("aria-pressed", b === btn));
        atualizarRanking();
    });
});

// Pop-up do GitHub
$("btnGhFechar").addEventListener("click", () => fecharModal(modalGithub));
modalGithub.addEventListener("click", (e) => { if (e.target === modalGithub) fecharModal(modalGithub); });

// Tema e daltonismo
$("btnTema").addEventListener("click", () => {
    tema = tema === "claro" ? "escuro" : "claro";
    aplicarTema();
});

document.querySelectorAll('input[name="daltonismo"]').forEach(r => {
    r.addEventListener("change", () => {
        daltonismo = r.value;
        aplicarDaltonismo();
    });
});

// Menu de acessibilidade
btnAcessibilidade.addEventListener("click", (e) => {
    e.stopPropagation();
    abrirFecharMenu();
});

document.addEventListener("click", (e) => {
    if (!menuAcessibilidade.contains(e.target)) fecharMenuAcessibilidade();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (contagemAtiva) return;      // o "Iniciando em..." não fecha
        if (menuAcessibilidade.classList.contains("ativo")) {
            fecharMenuAcessibilidade();
            btnAcessibilidade.focus();
        } else if (modalGithub.classList.contains("visivel")) {
            fecharModal(modalGithub);
        } else if (modalSair.classList.contains("visivel")) {
            cancelarSaida();
        } else {
            const aberto = [...document.querySelectorAll(".modal-fundo.visivel")].pop();
            if (aberto) fecharModal(aberto);
        }
    }

    // mantém o foco dentro do pop-up aberto
    if (e.key === "Tab") {
        const aberto = [...document.querySelectorAll(".modal-fundo.visivel")].pop();
        if (!aberto) return;
        const focaveis = [...aberto.querySelectorAll("button:not(:disabled), a[href], input:not([type=file]), textarea")]
            .filter(x => !x.hidden && x.offsetParent !== null);
        if (!focaveis.length) return;
        const primeiro = focaveis[0];
        const ultimo = focaveis[focaveis.length - 1];
        if (e.shiftKey && document.activeElement === primeiro) {
            e.preventDefault();
            ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
            e.preventDefault();
            primeiro.focus();
        }
    }
});

btnContraste.addEventListener("click", () => {
    altoContraste = !altoContraste;
    aplicarAcessibilidade();
});

btnFonteMais.addEventListener("click", () => {
    escalaFonte = Math.min(ESCALA_MAX, +(escalaFonte + ESCALA_PASSO).toFixed(1));
    aplicarAcessibilidade();
});

btnFonteMenos.addEventListener("click", () => {
    escalaFonte = Math.max(ESCALA_MIN, +(escalaFonte - ESCALA_PASSO).toFixed(1));
    aplicarAcessibilidade();
});

btnResetarAcessibilidade.addEventListener("click", () => {
    escalaFonte = 1;
    altoContraste = false;
    aplicarAcessibilidade();
});

// ==========================================
// 13. INICIALIZAÇÃO
// ==========================================
function montarPrevias() {
    $("previaCoroas").append(criarCoroa(1), criarCoroa(2), criarCoroa(3));
    document.querySelectorAll(".mini-coroa").forEach(m => m.appendChild(criarCoroa(Number(m.dataset.coroa))));
}

const seletorCadastro = criarSeletorFoto($("seletorFotoCadastro"));
const seletorGoogle = criarSeletorFoto($("seletorFotoGoogle"));
const seletorEditar = criarSeletorFoto($("seletorFotoEditar"));
const verificacaoCadastro = ligarVerificacaoNick($("cadNick"), $("cadNickStatus"));
const verificacaoGoogle = ligarVerificacaoNick($("gNick"), $("gNickStatus"));
const verificacaoNovoNick = ligarVerificacaoNick($("novoNick"), $("novoNickStatus"), () => usuario && usuario.nickname);

carregarPreferencias();
montarCriadores();
montarPrevias();
atualizarStatusBanco();
iniciarSplash();
