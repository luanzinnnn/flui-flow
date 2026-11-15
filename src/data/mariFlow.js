// Rascunho gerado a partir de "Prompt-Flui-Mari-Suporte-30-Dias.txt".
// Os caminhos foram preservados como nós internos; variações e ramificações
// que não viram ligação direta ficam na nota interna de cada balão.
export const MARI_SUPPORT_TEMPLATE = {
  "id": "mari-suporte-30d",
  "name": "Suporte Mari Trader — 30 dias",
  "short": "Mari Trader",
  "description": "Rascunho com 37 caminhos de atendimento (indicador, conta, lives, compra, bônus e pagamentos). Ramificações e variações ficam nas notas internas de cada balão.",
  "tag": "Suporte",
  "palette": [
    "#a3e635",
    "#fbbf24",
    "#a78bfa",
    "#22d3ee",
    "#fb7185",
    "#fb923c"
  ],
  "title": "Suporte Mari Trader — 30 dias",
  "nodes": [
    {
      "id": "mari-start",
      "type": "start",
      "x": 2142,
      "y": 40,
      "w": 156,
      "accent": "#a3e635",
      "title": "Início · Suporte Mari Trader"
    },
    {
      "id": "mari-group-1",
      "type": "condition",
      "x": 258,
      "y": 230,
      "w": 304,
      "accent": "#a3e635",
      "title": "Grupo 01 · Triagem e retorno",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 01 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-group-2",
      "type": "condition",
      "x": 968,
      "y": 230,
      "w": 304,
      "accent": "#fbbf24",
      "title": "Grupo 02 · Indicador e gráfico",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 02 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-group-3",
      "type": "condition",
      "x": 1678,
      "y": 230,
      "w": 304,
      "accent": "#a78bfa",
      "title": "Grupo 03 · Conta Avalon",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 03 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-group-4",
      "type": "condition",
      "x": 2388,
      "y": 230,
      "w": 304,
      "accent": "#22d3ee",
      "title": "Grupo 04 · Lives e materiais",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 04 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-group-5",
      "type": "condition",
      "x": 3098,
      "y": 230,
      "w": 304,
      "accent": "#fb7185",
      "title": "Grupo 05 · Compra e acessos",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 05 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-group-6",
      "type": "condition",
      "x": 3808,
      "y": 230,
      "w": 304,
      "accent": "#fb923c",
      "title": "Grupo 06 · Bônus e pagamentos",
      "text": "Escolha o assunto que a pessoa trouxe. Cada saída leva a um caminho deste grupo.",
      "note": "Grupo 06 do rascunho Suporte Mari Trader — 30 dias. Revise links, ofertas e campos pendentes antes de ativar."
    },
    {
      "id": "mari-path-triagem",
      "type": "text",
      "x": 98,
      "y": 520,
      "w": 304,
      "accent": "#a3e635",
      "title": "[triagem] Pedido genérico de ajuda",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Oi, comprei o indicador e preciso de ajuda.\n\nVariações da primeira resposta (não encadear):\nB) Olá! Me conta onde você ficou com dúvida que eu te ajudo.\nC) Oi! Me diz o que aconteceu, por gentileza, pra eu te orientar.\n\nRamificações e instruções internas:\n\n- Se: Disse que comprou e pediu ajuda sem explicar\n  Ir direto quando já disse: comprei o indicador e preciso de ajuda / comprei o indicador pedido\n  Equipe — Este é o texto para a abertura “comprei e preciso de ajuda”. Mantenha o pedido já recebido.\n  Resposta da ramificação:\n    A) Oii! É sobre o acesso da compra, a instalação do indicador ou o bônus?\n    B) Olá! Você chegou a receber o acesso ou travou em alguma etapa da instalação?\n    C) Oi! Me fala onde ficou a dúvida com o indicador que eu te ajudo por aqui.\n\n- Se: Disse que comprou e quer o bônus\n  Próximo caminho: [bonus]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Chegou somente áudio, foto ou vídeo\n  Equipe — Abra a mídia no CRM. Se não estiver legível ou se não houver transcrição, pergunte em uma frase o que a pessoa precisa.",
      "blocks": [
        {
          "id": "mari-block-triagem",
          "kind": "text",
          "text": "Oii, tudo bem? Como posso te ajudar por aqui?"
        }
      ]
    },
    {
      "id": "mari-path-atraso",
      "type": "text",
      "x": 436,
      "y": 520,
      "w": 304,
      "accent": "#a3e635",
      "title": "[atraso] Aguardando resposta ou volta do suporte",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Estou aguardando retorno e ninguém respondeu.\n\nPistas de entrada: aguardando retorno / nao tive retorno / ninguem respondeu / nao tem suporte / nao deu resposta / cade o suporte / ja mandei / esqueceu de mim\n\nVariações da primeira resposta (não encadear):\nB) Oi! Vou conferir o histórico, tá? Assim a gente continua pela parte que ficou pendente.\nC) Olá! Já vou conferir seu atendimento. Se apareceu algum erro novo, me avisa por aqui.\n\nRamificações e instruções internas:\n\n- Se: Existe um assunto anterior\n  Equipe — Retome do último ponto em aberto e mantenha os dados já enviados.\n\n- Se: Ainda não há uma dúvida identificada\n  Próximo caminho: [triagem]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-atraso",
          "kind": "text",
          "text": "Oii! Vi que você ficou aguardando. Vou olhar o que você já mandou aqui e retomar de onde parou."
        }
      ]
    },
    {
      "id": "mari-path-parar",
      "type": "text",
      "x": 98,
      "y": 950,
      "w": 304,
      "accent": "#a3e635",
      "title": "[parar] Pessoa não quer continuar ou pede para sair",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não coloca meu nome no sorteio, tá?\n\nPistas de entrada: nao coloca meu nome / nao quero participar / tira meu nome / retirar meu nome / prefiro nao participar / pare de mandar\n\nVariações da primeira resposta (não encadear):\nB) Claro, vou deixar registrado que você não quer participar. Obrigada por avisar!\nC) Combinado. Vou pedir pra equipe retirar seu nome, se ele já estiver na lista.\n\nRamificações e instruções internas:\n\n- Se: Confirmou que não quer a campanha\n  Equipe — Encerre este assunto e suspenda os lembretes da campanha para o contato.\n\n- Se: Pediu para parar mensagens no canal\n  Equipe — Passe ao atendente para aplicar a preferência de contato disponível no CRM.",
      "blocks": [
        {
          "id": "mari-block-parar",
          "kind": "text",
          "text": "Tudo bem, vou respeitar sua decisão. Se precisar de ajuda com outro assunto, pode me chamar."
        }
      ]
    },
    {
      "id": "mari-path-atualizar",
      "type": "text",
      "x": 808,
      "y": 520,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[atualizar] Pegar o indicador atualizado",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como faço para receber a atualização?\n\nPistas de entrada: atualizacao do indicador / atualizar o indicador / atualizar indicador / indicador atualizado / script atualizado / indicador antigo / receber a atualizacao / consigo a atualizacao / indicador teve alguma atualizacao\n\nVariações da primeira resposta (não encadear):\nB) Olá! Já vou verificar qual é o script mais recente pra te mandar o arquivo certo.\nC) Oii! Se você já mandou seu pedido ou o nome do arquivo, eu confiro por aqui e te oriento sobre a atualização.\n\nRamificações e instruções internas:\n\n- Se: Versão e acesso já confirmados\n  Equipe — Envie somente a versão oficial vinculada àquela compra. Quando o Flui suportar o arquivo, use o script confirmado pela equipe; senão envie a página.\n  Resposta da ramificação:\n    A) Aqui está a versão versão atual confirmada pela equipe: https://amaritrader.com/baixar-indicador. Me avisa se travar na instalação, tá?\n    B) Segue o acesso à versão versão atual confirmada pela equipe: https://amaritrader.com/baixar-indicador. Qualquer dúvida pra colocar no gráfico, pode me chamar.\n    C) Pode baixar a versão versão atual confirmada pela equipe por aqui: https://amaritrader.com/baixar-indicador. Se já tiver outro script no gráfico, confere o tutorial antes de substituir.\n\n- Se: Pedido não localizado ou falta acesso\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pergunta sobre o que aparece no gráfico\n  Próximo caminho: [versao]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-atualizar",
          "kind": "text",
          "text": "Oii! Vou conferir qual é a versão atual antes de te encaminhar o indicador."
        }
      ]
    },
    {
      "id": "mari-path-versao",
      "type": "text",
      "x": 1146,
      "y": 520,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[versao] Indicador diferente da live",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não aparece a caixinha de tendência igual à live.\n\nPistas de entrada: diferente da live / diferente do da live / diferente do mostrado na live / igual a live / caixinha de tendencia / painel de tendencia / bolinhas do engolfo / nao aparece a tendencia / nao mostra a tendencia / sem a media / com zig zag / sem as bolinhas / indicador diferente / nao aparece a caixinha de tendencia / nao esta plotando / nao tem as bolinhas\n\nVariações da primeira resposta (não encadear):\nB) Deixa eu conferir com você. Qual parte aparece diferente no seu gráfico? Se puder, me manda um recorte da tela sem seus dados.\nC) Oi! Se a caixa de tendência, as bolinhas ou a média não aparecem, me diz o nome do arquivo e o dispositivo que você está usando.\n\nRamificações e instruções internas:\n\n- Se: Já informou qual elemento está faltando\n  Ir direto quando já disse: nao aparece a caixinha de tendencia / nao aparece a tendencia / nao tem as bolinhas / sem as bolinhas / nao esta plotando\n  Equipe — Aproveite o que o contato descreveu. Peça apenas o dado que falta para comparar a versão e o dispositivo.\n  Resposta da ramificação:\n    A) Entendi qual parte está faltando. Me diz só o nome do arquivo instalado pra eu conferir se é a mesma versão da live.\n    B) Vi a diferença que você apontou. Você está usando pelo computador, pelo site no celular ou pelo app?\n    C) Vamos olhar essa diferença. Se ainda não enviou, me manda um recorte do gráfico e o nome do script, por gentileza.\n\n- Se: Foi identificada uma versão anterior\n  Próximo caminho: [atualizar]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Mesma versão e problema continua\n  Equipe — Passe ao suporte técnico com versão, dispositivo, ativo e trecho da tela já informado.",
      "blocks": [
        {
          "id": "mari-block-versao",
          "kind": "text",
          "text": "Oii! Me manda um print só do gráfico, por gentileza, e o nome do script que aparece aí. Assim eu vejo o que está diferente da live."
        }
      ]
    },
    {
      "id": "mari-path-instalar",
      "type": "text",
      "x": 808,
      "y": 950,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[instalar] Baixar e instalar o script",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Baixei mas não achei onde instalar.\n\nPistas de entrada: instalar o indicador / instalar indicador / instalar o script / baixei mas nao achei / nao achei onde instalar / nao consigo instalar / nao consegui estalar / nao consegui baixar / onde coloco o indicador / baixei nao sei / onde instalar / nao encontrei o arquivo / nao sei como configurar o indicador / onde carrego o script / onde instala / ja baixei\n\nVariações da primeira resposta (não encadear):\nB) Me conta até onde conseguiu ir, por gentileza. O arquivo chegou a baixar?\nC) Oi! Você está no computador ou no celular? Te oriento pelo passo a passo da tela que está usando.\n\nRamificações e instruções internas:\n\n- Se: Ainda não baixou\n  Equipe — Use a página de download e aguarde a pessoa abrir. Se já baixou, pule esta etapa.\n  Resposta da ramificação:\n    A) Acesse o Indicador de Sinal Combinado por aqui: https://amaritrader.com/baixar-indicador. Me avisa quando achar o arquivo, tá?\n    B) Segue o link pra baixar o indicador: https://amaritrader.com/baixar-indicador. Se a página der erro, me fala o que aparece.\n    C) Você pode começar pelo download aqui: https://amaritrader.com/baixar-indicador. Se precisar de ajuda depois, pode me chamar.\n\n- Se: Já baixou e quer instalar\n  Ir direto quando já disse: ja baixei / baixei mas nao achei / onde instalar / onde coloco o indicador\n  Equipe — Se o dispositivo não foi informado, pergunte só isso. Se já informou que é celular, vá para celular.\n  Resposta da ramificação:\n    A) Ótimo, já baixou. Você está colocando o script na Avalon pelo computador, pelo app ou pelo navegador do celular?\n    B) Como o arquivo já está baixado, me diz só em qual dispositivo você abriu o gráfico que eu te passo a tela certa.\n    C) Agora vamos colocar no gráfico. Está pelo PC ou pelo celular?\n\n- Se: Computador e tutorial conferido\n  Equipe — Use o vídeo M01 ou foto P01 se o arquivo for da mesma tela. Mantém o link de tutorial como alternativa.\n  Resposta da ramificação:\n    A) Aqui está a aula de instalação: https://maritrader.vercel.app/indicador. Se não achar o botão indicado no vídeo, me manda um recorte da tela.\n    B) Segue nosso passo a passo pra colocar o script no gráfico: https://maritrader.vercel.app/indicador. Me fala em qual parte travou, tá?\n    C) Pode acompanhar a instalação por aqui: https://maritrader.vercel.app/indicador. Se o botão aparecer diferente, me chama.\n\n- Se: No celular\n  Próximo caminho: [celular]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Arquivo do pedido não recebido\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-instalar",
          "kind": "text",
          "text": "Oii! Você travou pra baixar o arquivo ou pra colocar o script no gráfico?"
        }
      ]
    },
    {
      "id": "mari-path-celular",
      "type": "text",
      "x": 1146,
      "y": 950,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[celular] Indicador no celular",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Consigo instalar pelo celular ou tem que ser no PC?\n\nPistas de entrada: indicador no celular / instalar pelo celular / baixar no celular / app do indicador / opero pelo celular / operar pelo celular / pelo app da avalon / android ou iphone / no site ja tenho no aplicativo nao aparece / no aplicativo nao aparece a opcao do script / no app nao aparece o script\n\nVariações da primeira resposta (não encadear):\nB) Me diz, por gentileza, se está no Android ou iPhone e se abriu pelo app ou navegador.\nC) Você quer acessar a Avalon no celular ou instalar o script dentro do gráfico? Me fala se é pelo app ou navegador.\n\nRamificações e instruções internas:\n\n- Se: Site mostra script e app não mostra\n  Ir direto quando já disse: no site ja tenho no aplicativo nao aparece / no aplicativo nao aparece a opcao do script / no app nao aparece o script\n  Equipe — O histórico orienta seguir pelo site nesse caso. Se precisar de orientação visual, use só a mídia compatível.\n  Resposta da ramificação:\n    A) Se o script já aparece no site e não no app, por enquanto usa pelo site, tá? Se quiser, te ajudo com essa tela.\n    B) Como a opção está no site, pode continuar por lá. Me avisa se travar ao abrir o script pelo navegador.\n    C) Pode seguir pelo navegador, onde a opção aparece pra você. Se faltar algum botão, me conta qual.\n\n- Se: Dispositivo ou versão sem orientação validada\n  Equipe — Encaminhe ao suporte técnico com aparelho, app ou navegador e versão do script.",
      "blocks": [
        {
          "id": "mari-block-celular",
          "kind": "text",
          "text": "Oii! Você está acessando a Avalon pelo app ou pelo site no celular? Pergunto porque a opção de script pode aparecer diferente."
        }
      ]
    },
    {
      "id": "mari-path-corretora",
      "type": "text",
      "x": 808,
      "y": 1380,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[corretora] Compatibilidade com outra corretora",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Posso usar o indicador na Binance ou em outra plataforma?\n\nPistas de entrada: outra corretora / qualquer corretora / qual corretora / serve na binance / outra plataforma / funciona na binance\n\nVariações da primeira resposta (não encadear):\nB) A equipe usa a Avalon nas demonstrações. Se você quer usar em outra corretora, me fala qual pra eu verificar.\nC) Pode me dizer o nome da corretora e o ativo que quer abrir? Assim eu consigo conferir o caso certo.\n\nRamificações e instruções internas:\n\n- Se: O problema é um ativo OTC na Avalon\n  Próximo caminho: [otc]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Outra corretora ou ativos específicos\n  Equipe — Conferir compatibilidade com o suporte técnico. O histórico não confirma compatibilidade universal.",
      "blocks": [
        {
          "id": "mari-block-corretora",
          "kind": "text",
          "text": "Oii! Qual plataforma você usa e qual versão do indicador tem aí? Vou conferir se é compatível."
        }
      ]
    },
    {
      "id": "mari-path-otc",
      "type": "text",
      "x": 1146,
      "y": 1380,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[otc] Ativo OTC ausente ou gráfico diferente",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não achei Bitcoin OTC. O gráfico de Bitcoin normal fica diferente.\n\nPistas de entrada: bitcoin otc / solana otc / nao achei o ativo / ativo nao aparece / nao encontrei o ativo / nao tem otc / nao esta otc / grafico bitcoin normal / nao achei bitcoin otc / nao encontrei solana otc / bitcoin otc nao aparece\n\nVariações da primeira resposta (não encadear):\nB) Me manda o nome exato do ativo que aparece aí, por gentileza. Se o OTC não estiver na lista da Avalon, o suporte deles pode conferir.\nC) Se você está vendo o ativo normal e na live era OTC, pode ser uma tela diferente. Me fala qual nome aparece na sua lista.\n\nRamificações e instruções internas:\n\n- Se: Já informou que o OTC não aparece\n  Ir direto quando já disse: nao achei bitcoin otc / nao encontrei solana otc / bitcoin otc nao aparece / nao achei o ativo\n  Equipe — O histórico direciona a disponibilidade do ativo ao suporte da Avalon.\n  Resposta da ramificação:\n    A) Entendi. Como o OTC não aparece na sua lista, peço que confira a disponibilidade dele com o suporte da Avalon.\n    B) Se o ativo OTC não está listado na sua conta, vale pedir pra Avalon verificar por lá.\n    C) Nesse caso a Avalon consegue conferir por que a opção OTC não aparece na sua lista.\n\n- Se: Ativo existe, mas os horários ou tempos não batem\n  Próximo caminho: [sinais]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-otc",
          "kind": "text",
          "text": "Oii! Confere se no nome do ativo aparece OTC. O ativo normal e o OTC podem mostrar gráficos diferentes."
        }
      ]
    },
    {
      "id": "mari-path-resultados",
      "type": "text",
      "x": 808,
      "y": 1810,
      "w": 304,
      "accent": "#fbbf24",
      "title": "[resultados] Perdas e dúvidas sobre resultados",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Por que deu loss no meu gráfico? O indicador acerta sempre?\n\nPistas de entrada: assertivo 100 / acerta sempre / ganho garantido / perdi dinheiro / quebrei a conta / deu loss / dando loss / resultado diferente / assertividade garantida / 100 por cento de acerto / quanto de acertividades\n\nVariações da primeira resposta (não encadear):\nB) Oii! Se o gráfico marcou outra coisa, me fala o ativo e o horário que eu confiro com a equipe.\nC) Vi sua dúvida. Se for diferença na tela, me manda um recorte sem seus dados pra gente conferir a configuração.\n\nRamificações e instruções internas:\n\n- Se: Versão ou gráfico diferente\n  Próximo caminho: [versao]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Perguntou se acerta sempre ou pediu garantia\n  Ir direto quando já disse: acerta sempre / assertividade garantida / 100 por cento de acerto / ganho garantido / quanto de acertividades\n  Equipe — Explique o papel do indicador. Não transforme exemplos de resultado em promessa.\n  Resposta da ramificação:\n    A) O indicador dá sinais pra ajudar na leitura do gráfico. As operações podem dar perda, tá?\n    B) A ferramenta ajuda a analisar o gráfico, mas não garante o resultado de uma entrada.\n    C) A gente pode conferir o sinal que apareceu. Cada operação tem risco de perda.",
      "blocks": [
        {
          "id": "mari-block-resultados",
          "kind": "text",
          "text": "Entendi. Você estava no mesmo ativo, horário e configuração da live? Me manda só a parte do gráfico que ficou diferente se ainda não enviou."
        }
      ]
    },
    {
      "id": "mari-path-cadastro",
      "type": "text",
      "x": 1518,
      "y": 520,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[cadastro] Cadastro, login e link da Avalon",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como entra na corretora pelo link?\n\nPistas de entrada: como entra na corretora / como entrar na corretora / como entra na plataforma / nao consigo entrar na corretora / nao estou conseguindo entra corretora / criar conta na corretora / link da corretora / link da plataforma / link abre a conta / fica so girando / nao consigo entrar na plataforma / entrar na avalon\n\nVariações da primeira resposta (não encadear):\nB) Me diz, por gentileza, se é seu primeiro cadastro ou se apareceu erro ao entrar numa conta existente.\nC) Oi! Travou no cadastro ou no login? Se apareceu aviso, pode me dizer só o texto.\n\nRamificações e instruções internas:\n\n- Se: Pediu o link e confirmou primeiro cadastro\n  Equipe — Use somente o link de cadastro conferido. Não peça depósito como requisito para atendimento.\n  Resposta da ramificação:\n    A) Aqui está o link de cadastro que a equipe usa: https://bit.ly/Avalon_Create. Qualquer dúvida nessa etapa, pode me chamar.\n    B) Segue o link de cadastro: https://bit.ly/Avalon_Create. Se aparecer algum aviso, me fala o que aparece na tela.\n    C) Pra abrir o cadastro, pode usar este endereço: https://bit.ly/Avalon_Create. Me avisa se travar em algum ponto.\n\n- Se: CPF ou conta antiga\n  Próximo caminho: [conta-antiga]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Erro persistente no login\n  Equipe — Use o suporte oficial se o link estiver confirmado. Se não estiver, oriente o contato a abrir o suporte dentro da plataforma.\n  Resposta da ramificação:\n    A) Como o erro é no login, peço que acesse o suporte na própria Avalon pra verificar a conta.\n    B) Nesse caso o suporte da Avalon pode olhar o acesso com você. Use a opção de atendimento da corretora.\n    C) Se o aviso continuar, fala com o atendimento oficial da Avalon pelo site ou aplicativo.",
      "blocks": [
        {
          "id": "mari-block-cadastro",
          "kind": "text",
          "text": "Oii! Você já tem conta na Avalon ou vai criar a primeira?"
        }
      ]
    },
    {
      "id": "mari-path-id",
      "type": "text",
      "x": 1856,
      "y": 520,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[id] Encontrar o ID da Avalon",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Onde pego o ID da conta?\n\nPistas de entrada: onde pego o id / onde acho meu id / onde fica o id / onde encontro o id / como achar o id / onde eu pega esse id / onde pega o id / meu id da avalon / onde vejo meu id / onde fica meu id / localizar id\n\nVariações da primeira resposta (não encadear):\nB) Oii! Pra achar o ID, abre o perfil da Avalon e procura pelo número de identificação.\nC) Você encontra o ID no perfil da sua conta na Avalon. Se não achar, me diz se está no site ou no app, tá?\n\nRamificações e instruções internas:\n\n- Se: Já enviou o ID\n  Equipe — Não peça o mesmo dado de novo. Use o ID somente para a conferência necessária e volte ao assunto de origem.\n  Resposta da ramificação:\n    A) Recebi seu ID, obrigada! Vou conferir só a parte que ficou pendente pra te orientar.\n    B) Seu ID chegou aqui. Já posso encaminhar a conferência pro atendimento responsável.\n    C) Obrigada por mandar. Vou seguir com esse mesmo ID na verificação.\n\n- Se: Não consegue abrir o perfil\n  Próximo caminho: [cadastro]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-id",
          "kind": "text",
          "text": "Na Avalon, entra no perfil ou em Dados da conta. O ID aparece nessa área."
        }
      ]
    },
    {
      "id": "mari-path-conta-antiga",
      "type": "text",
      "x": 1518,
      "y": 950,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[conta-antiga] Conta antiga e elegibilidade",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Posso usar minha conta antiga da Avalon?\n\nPistas de entrada: conta antiga / conta que ja tenho / conta que eu ja tenho / mesma conta / conta ja criada / conta ja existe / preciso criar outra conta / ja tenho conta / preciso deletar / cpf ja esta la / conta com o mesmo cpf / cpf ja esta cadastrado / mesmo cpf / cpf ja / cpf cadastrado / mais de uma conta\n\nVariações da primeira resposta (não encadear):\nB) Entendi, você já tem cadastro. Vamos conferir a conta que você tem antes de mexer nela.\nC) Você pode me dizer o que aparece quando tenta usar a conta antiga? Assim vejo se é acesso ou elegibilidade.\n\nRamificações e instruções internas:\n\n- Se: CPF já cadastrado ou conta atual em uso\n  Ir direto quando já disse: mesmo cpf / cpf ja / cpf cadastrado / mais de uma conta\n  Equipe — Direcione para recuperar ou verificar a conta existente pelo atendimento oficial. Não recomende criar cadastro duplicado com outro e-mail.\n  Resposta da ramificação:\n    A) Se o CPF já consta, peço que confirme com a Avalon como recuperar ou usar a conta que já existe.\n    B) Entendi, já tem um cadastro ligado a esse CPF. O suporte da Avalon pode verificar qual é o acesso correto.\n    C) Pra resolver esse aviso, vamos seguir com a conta já cadastrada e confirmar com a Avalon como acessar.\n\n- Se: Quer recuperar acesso\n  Próximo caminho: [cadastro]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer confirmar direito a bônus\n  Próximo caminho: [bonus]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-conta-antiga",
          "kind": "text",
          "text": "Oii! Se você já tem conta, me diz se a dúvida é entrar nela ou conferir a elegibilidade de algum benefício."
        }
      ]
    },
    {
      "id": "mari-path-verificacao",
      "type": "text",
      "x": 1856,
      "y": 950,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[verificacao] Documentos e verificação da conta",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: A Avalon pede foto e não consigo enviar meu documento.\n\nPistas de entrada: enviar documentos / enviar documento / enviar identidade / confirmar identidade / abri conta tem como verificar / pede foto / verificacao de identidade / verificar minha conta / verificar a conta\n\nVariações da primeira resposta (não encadear):\nB) Me diz qual etapa da verificação está aparecendo. Os documentos você envia pela própria Avalon.\nC) Oi! Qual mensagem apareceu quando tentou verificar a conta? Pode ocultar os dados pessoais.\n\nRamificações e instruções internas:\n\n- Se: Documento, selfie ou recusa\n  Equipe — Oriente a usar a área de verificação ou atendimento oficial da Avalon. Não peça documentos pessoais no WhatsApp ou Telegram.",
      "blocks": [
        {
          "id": "mari-block-verificacao",
          "kind": "text",
          "text": "Oii! Travou na parte da foto ou apareceu um aviso na verificação? Pode me mandar só o texto, por gentileza."
        }
      ]
    },
    {
      "id": "mari-path-demo",
      "type": "text",
      "x": 1518,
      "y": 1380,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[demo] Conta demo e conta real",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como faço pra sair da conta demo?\n\nPistas de entrada: sair da conta demo / conta demonstracao / conta demo / modo demo / demo para real / mudar para real\n\nVariações da primeira resposta (não encadear):\nB) Me diz se está pelo site ou pelo app. Quero conferir com você onde aparece o modo de demonstração.\nC) Se está vendo saldo de demonstração, abre o menu do tipo de conta e me diz quais opções apareceram.\n\nRamificações e instruções internas:\n\n- Se: Alternância bloqueada ou saldo errado\n  Equipe — Direcione ao suporte oficial da Avalon. Não solicite outro depósito para testar.",
      "blocks": [
        {
          "id": "mari-block-demo",
          "kind": "text",
          "text": "Oii! No topo da plataforma está aparecendo “Demo”? Você consegue abrir o seletor do tipo de conta?"
        }
      ]
    },
    {
      "id": "mari-path-suspensa",
      "type": "text",
      "x": 1856,
      "y": 1380,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[suspensa] Conta suspensa ou restrita",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Minha conta foi suspensa. Como devo proceder?\n\nPistas de entrada: conta suspensa / minha conta foi suspensa / conta bloqueada / conta restrita / acesso bloqueado\n\nVariações da primeira resposta (não encadear):\nB) Oii! Você consegue me dizer em que tela apareceu a suspensão? Assim eu encaminho o caso certo.\nC) Me manda somente o texto do aviso, tá? Se for uma restrição da Avalon, a corretora precisa conferir.\n\nRamificações e instruções internas:\n\n- Se: Suspensão confirmada\n  Equipe — A reativação e a justificativa precisam de atendimento da corretora. Priorize a revisão humana deste caso.",
      "blocks": [
        {
          "id": "mari-block-suspensa",
          "kind": "text",
          "text": "Entendi. Foi na Avalon? Me fala só o aviso que apareceu, por gentileza, sem enviar seus dados."
        }
      ]
    },
    {
      "id": "mari-path-credenciais",
      "type": "text",
      "x": 1518,
      "y": 1810,
      "w": 304,
      "accent": "#a78bfa",
      "title": "[credenciais] Pedido de senha ou código",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Tem que passar login e senha pra dobra de banca?\n\nPistas de entrada: login e senha / usuario e senha / minha senha / passar senha / passo o acesso / codigo sms / codigo de verificacao / pediram minha senha / enviar senha / preciso passar senha / passar senha da corretora / passar login\n\nVariações da primeira resposta (não encadear):\nB) Pode ficar com sua senha e com o código de verificação, tá? Me conta só o que te pediram, sem me enviar os dados.\nC) Pra instalação ou suporte, não passe senha nem código. Se chegou um pedido desses, me fala de onde veio.\n\nRamificações e instruções internas:\n\n- Se: Já entregou senha ou suspeita de acesso\n  Equipe — Prioridade humana. Oriente a recuperar a conta e alterar a senha pelo canal oficial da corretora. Não repita credenciais que chegaram no histórico.",
      "blocks": [
        {
          "id": "mari-block-credenciais",
          "kind": "text",
          "text": "Oii! Pra receber ajuda, guarde sua senha e seus códigos com você. Se alguém pediu esses dados, me diz por qual canal."
        }
      ]
    },
    {
      "id": "mari-path-live",
      "type": "text",
      "x": 2228,
      "y": 520,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[live] Horários, comunidade e link da live",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Que horas é a live e onde entra no grupo?\n\nPistas de entrada: horario das lives / horario da live / hora da live / que horas a live / que horas e a live / onde entra no grupo / vai ter live / link da live / link do grupo / link da comunidade / entrar no grupo / entrar na comunidade / grupo de operacoes / live no telegram / link do telegram / quando e a live / horario da operacao ao vivo / quais os dias de live / link do whatsapp / grupo do whatsapp / comunidade do whatsapp\n\nVariações da primeira resposta (não encadear):\nB) Segue o canal onde a gente manda os links das lives: https://t.me/comunidademaritrader. Me avisa se você não conseguir achar o aviso.\nC) Você encontra o aviso e o link da live neste canal: https://t.me/comunidademaritrader. Se quiser o WhatsApp da comunidade, me fala por aqui.\n\nRamificações e instruções internas:\n\n- Se: Perguntou o horário e a agenda foi confirmada\n  Equipe — Somente com agenda e fuso vigentes. O histórico mostra horários diferentes para sessões normais e especiais.\n  Resposta da ramificação:\n    A) Hoje está confirmado assim: [horário a confirmar] ([fuso a confirmar]). O link sai no Telegram: https://t.me/comunidademaritrader.\n    B) O horário que a equipe confirmou é [horário a confirmar], no fuso [fuso a confirmar]. O convite fica aqui: https://t.me/comunidademaritrader.\n    C) Segue a programação confirmada, tá? [horário a confirmar] ([fuso a confirmar]). Você encontra o aviso aqui: https://t.me/comunidademaritrader.\n\n- Se: Pediu especificamente o WhatsApp\n  Ir direto quando já disse: link do whatsapp / grupo do whatsapp / comunidade do whatsapp\n  Equipe — Envie apenas o canal solicitado.\n  Resposta da ramificação:\n    A) Segue nossa comunidade no WhatsApp: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW. Se o convite não abrir, me avisa.\n    B) Pode entrar no grupo do WhatsApp por aqui: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW.\n    C) Aqui está o link do WhatsApp da comunidade: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW.\n\n- Se: Convite não funciona\n  Próximo caminho: [live-erro]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-live",
          "kind": "text",
          "text": "Oii! Os avisos das lives saem no nosso Telegram: https://t.me/comunidademaritrader. Se estiver procurando a de hoje, olha o aviso mais recente, tá?"
        }
      ]
    },
    {
      "id": "mari-path-live-erro",
      "type": "text",
      "x": 2566,
      "y": 520,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[live-erro] Live ou Meet não abre",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não abre o Meet no celular.\n\nPistas de entrada: nao abre o meet / nao abre meet / meet nao abre / link da live nao abre / nao consegui acessar a live / nao recebi o link da live / erro no meet / meet nao esta entrando / nao esta entrando o meet / nao encontrei o link da live\n\nVariações da primeira resposta (não encadear):\nB) Se o link da live não abriu, confere primeiro o convite mais recente no Telegram: https://t.me/comunidademaritrader. Se continuar, me fala a mensagem da tela.\nC) Vamos conferir. O Meet pede autorização pra entrar ou o link nem abre?\n\nRamificações e instruções internas:\n\n- Se: Não encontrou o convite da sessão\n  Ir direto quando já disse: nao recebi o link da live / nao encontrei o link da live\n  Equipe — Oriente a olhar o aviso mais recente. Não reutilize convite de outra live.\n  Resposta da ramificação:\n    A) Olha o último aviso neste canal: https://t.me/comunidademaritrader. Se a sessão ainda estiver acontecendo, é ali que você confirma o convite.\n    B) O convite atualizado sai por aqui: https://t.me/comunidademaritrader. Se não tiver aviso pra essa sessão, eu confiro com a equipe.\n    C) Segue o canal onde saem os links: https://t.me/comunidademaritrader. Me diz qual sessão você procura se ainda não encontrar.\n\n- Se: Erro de acesso persiste\n  Equipe — Encaminhe à equipe da live com a sessão, plataforma e erro, sem publicar link vencido.",
      "blocks": [
        {
          "id": "mari-block-live-erro",
          "kind": "text",
          "text": "Oii! Deu erro quando abriu o Meet? Me diz o aviso que apareceu, por gentileza."
        }
      ]
    },
    {
      "id": "mari-path-grupo-erro",
      "type": "text",
      "x": 2228,
      "y": 950,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[grupo-erro] Grupo ou link do Telegram não abre",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não está abrindo o link do Telegram.\n\nPistas de entrada: nao abre o telegram / nao esta abrindo o link do telegram / link do telegram nao abre / link do grupo nao abre\n\nVariações da primeira resposta (não encadear):\nB) Entendi. É o link do Telegram que não abriu, né? Segue o canal que a equipe usa: https://t.me/comunidademaritrader.\nC) Confere por este endereço: https://t.me/comunidademaritrader. Se o app pedir pra aguardar aprovação, me avisa o que apareceu.\n\nRamificações e instruções internas:\n\n- Se: A dificuldade é entrar na live ou Meet\n  Próximo caminho: [live-erro]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Convite expirado ou acesso restrito\n  Equipe — Confirme o link vigente com a equipe. Se for solicitação de entrada, deixe o atendimento acompanhar.",
      "blocks": [
        {
          "id": "mari-block-grupo-erro",
          "kind": "text",
          "text": "Oii! Tenta abrir pelo app do Telegram: https://t.me/comunidademaritrader. Se aparecer algum aviso, me manda só o que ele diz."
        }
      ]
    },
    {
      "id": "mari-path-sinais",
      "type": "text",
      "x": 2566,
      "y": 950,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[sinais] Horário dos sinais, tempo do gráfico e expiração",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O horário dos sinais muda? E como vejo a expiração?\n\nPistas de entrada: horario dos sinais / horario das entradas / tempo de expiracao / tempo de ativo / diferenca no horario / sinais no telegram / ativos de quantos minutos / hora de expiracao\n\nVariações da primeira resposta (não encadear):\nB) Me diz, por gentileza, se é o horário do aviso ou o tempo que aparece na sua tela.\nC) Você está tentando comparar o horário do sinal com o gráfico? Me fala qual aviso e qual ativo pra eu conferir.\n\nRamificações e instruções internas:\n\n- Se: Horário ou fuso dos avisos\n  Ir direto quando já disse: horario dos sinais / diferenca no horario / horario das entradas\n  Equipe — Use o aviso atual e confirme o fuso. Não dê orientação de entrada ao vivo com dados do histórico.\n  Resposta da ramificação:\n    A) Os avisos da equipe ficam no Telegram: https://t.me/comunidademaritrader. Confere o horário do aviso da sessão e me chama se aparecer diferente na sua tela.\n    B) Para conferir o horário, abre o aviso correspondente aqui: https://t.me/comunidademaritrader. Se ainda tiver diferença, me diz o fuso que aparece no seu aparelho.\n    C) Olha o horário e a referência do aviso original no canal: https://t.me/comunidademaritrader. Se estiver confuso, eu confiro com a equipe.\n\n- Se: Tempo de expiração ou duração do ativo\n  Ir direto quando já disse: tempo de expiracao / hora de expiracao\n  Equipe — Diferencie o tempo da vela, a duração do ativo na lista e a expiração. Use print da interface se necessário.\n  Resposta da ramificação:\n    A) Entendi que é a expiração. Você quer localizar o campo na plataforma ou entender o tempo que aparece no exemplo da live?\n    B) Se a dúvida é sobre a expiração, me manda um recorte dessa parte da tela, sem dados da conta, pra eu apontar o campo.\n    C) Vamos ver a tela certa. Você está olhando o tempo da vela no gráfico ou o campo de expiração?\n\n- Se: Ativo OTC ausente\n  Próximo caminho: [otc]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-sinais",
          "kind": "text",
          "text": "Oii! A dúvida é sobre o horário publicado no Telegram ou sobre o tempo de expiração na Avalon?"
        }
      ]
    },
    {
      "id": "mari-path-aprender",
      "type": "text",
      "x": 2228,
      "y": 1380,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[aprender] Aulas para começar e acompanhar operações",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como e por onde começo? Onde vejo as aulas?\n\nPistas de entrada: como e por onde comecar / por onde comeco / por onde comecar / como comecar a operar / onde posso ver suas aulas / tem aula ensinando / como operar junto / como acompanhar as operacoes / como usa o indicador / como interpretar os sinais / tempo de expiracao\n\nVariações da primeira resposta (não encadear):\nB) Segue o nosso YouTube: https://www.youtube.com/@MariTrader. Tem uma parte específica do indicador que você quer ver?\nC) Você pode começar pelas aulas do canal: https://www.youtube.com/@MariTrader. Se a dúvida é sobre a instalação, me avisa que te mando esse passo a passo.\n\nRamificações e instruções internas:\n\n- Se: Pediu as aulas da compra\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer instalar\n  Próximo caminho: [instalar]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer a planilha\n  Próximo caminho: [planilha]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-aprender",
          "kind": "text",
          "text": "Oii! Se você está começando, as aulas públicas ficam aqui: https://www.youtube.com/@MariTrader. Se for aula da compra, eu confiro seu acesso."
        }
      ]
    },
    {
      "id": "mari-path-planilha",
      "type": "text",
      "x": 2566,
      "y": 1380,
      "w": 304,
      "accent": "#22d3ee",
      "title": "[planilha] Planilha e gerenciamento de banca",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Pode me mandar a planilha de gerenciamento?\n\nPistas de entrada: planilha / gerenciamento de banca / calculo correto para gerenciamento / valor de entrada\n\nVariações da primeira resposta (não encadear):\nB) Segue o link que usamos pra planilha de gerenciamento: https://gerenciamentotrader.com/. Qualquer dúvida pode me chamar.\nC) Você pode acessar o painel de gerenciamento por aqui: https://gerenciamentotrader.com/. Quer ajuda em algum campo específico?\n\nRamificações e instruções internas:\n\n- Se: Já abriu, mas não sabe preencher\n  Equipe — Oriente sobre registro e leitura da planilha. Se pedir valor para investir, não sugira montante individual.\n  Resposta da ramificação:\n    A) A planilha é pra você registrar e acompanhar as operações. Me fala qual campo ficou com dúvida.\n    B) Podemos conferir como preencher. Qual coluna você está tentando usar?\n    C) Me manda só o nome da coluna, por gentileza, que eu te explico como preencher.",
      "blocks": [
        {
          "id": "mari-block-planilha",
          "kind": "text",
          "text": "Oii! A ferramenta de gerenciamento fica aqui: https://gerenciamentotrader.com/. Se tiver dificuldade pra abrir, me avisa."
        }
      ]
    },
    {
      "id": "mari-path-planos",
      "type": "text",
      "x": 2938,
      "y": 520,
      "w": 304,
      "accent": "#fb7185",
      "title": "[planos] Preço e acesso básico ou completo",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Qual o valor? Quero o acesso completo.\n\nPistas de entrada: acesso basico / acesso completo / quanto custa / qual o valor do indicador / qual o valor dele / quanto custa o indicador / qual a diferenca dos acessos / quero o acesso completo / prefiro acesso completo / prefiro o acesso completo / bom dia acesso completo / quero o acesso basico / prefiro acesso basico / prefiro o acesso basico\n\nVariações da primeira resposta (não encadear):\nB) Temos opções diferentes no atendimento. Me diz se quer o básico, o completo ou entender a diferença entre eles.\nC) Oi! Se ainda estiver escolhendo, eu confiro os itens e o valor da oferta atual pra te explicar certinho.\n\nRamificações e instruções internas:\n\n- Se: Escolheu o acesso completo\n  Ir direto quando já disse: quero o acesso completo / prefiro acesso completo / prefiro o acesso completo / bom dia acesso completo\n  Equipe — Abra esta etapa após confirmar a oferta vigente. Antes de copiar, valide o checkout e informe o que consta na oferta.\n  Resposta da ramificação:\n    A) Segue a página do acesso completo: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Confere o valor e o que vem no acesso antes de finalizar, tá?\n    B) Aqui está o acesso completo: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Se quiser confirmar algum item da oferta, pode me chamar.\n    C) Pode ver os detalhes do completo por aqui: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Qualquer dúvida me chama.\n\n- Se: Escolheu o acesso básico\n  Ir direto quando já disse: quero o acesso basico / prefiro acesso basico / prefiro o acesso basico\n  Equipe — Confirme que o pedido do contato é sobre a opção básica e que o checkout está vigente.\n  Resposta da ramificação:\n    A) Segue a opção básica: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Você pode conferir o valor e o que está incluído na própria página.\n    B) Aqui está a página do acesso básico: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Se algum item ficar com dúvida, me chama.\n    C) Pode conferir o básico por aqui: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Me avisa se era essa opção que você procurava.\n\n- Se: Pediu promessa de acerto\n  Próximo caminho: [resultados]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Já comprou e não recebeu\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-planos",
          "kind": "text",
          "text": "Oii! Você quer ver o acesso básico ou o completo? Eu confiro o que vem em cada opção pra te mandar a certa."
        }
      ]
    },
    {
      "id": "mari-path-particular",
      "type": "text",
      "x": 3276,
      "y": 520,
      "w": 304,
      "accent": "#fb7185",
      "title": "[particular] Aula particular ou mini curso mencionado ao vivo",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Quanto custa a aula que o Pedro falou?\n\nPistas de entrada: aula que o pedro falou / aula particular / aulas particulares / link do mini curso / valor do mini curso\n\nVariações da primeira resposta (não encadear):\nB) Me fala qual live ou qual aula você viu, por gentileza. Assim te encaminho pro contato certo.\nC) Oi! É sobre a aula particular ou sobre o mini curso? Vou conferir a opção que você viu.\n\nRamificações e instruções internas:\n\n- Se: É a aula de um integrante da equipe\n  Equipe — Confirme com o responsável valor, disponibilidade e canal atual.\n\n- Se: É material que já comprou\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-particular",
          "kind": "text",
          "text": "Oii! Você está falando da aula particular que foi mencionada na live? Vou conferir com a equipe qual era."
        }
      ]
    },
    {
      "id": "mari-path-curso",
      "type": "text",
      "x": 2938,
      "y": 950,
      "w": 304,
      "accent": "#fb7185",
      "title": "[curso] Acesso ao curso ou à compra",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O Kirvano está dando erro. Onde estão minhas aulas?\n\nPistas de entrada: cadê meu curso / cade meu curso / onde estao minhas aulas / perdi meu acesso / acesso ao curso / acesso as aulas / kirvano / nao consigo acessar as aulas / curso sumiu / comprei e nao recebi\n\nVariações da primeira resposta (não encadear):\nB) Você recebeu o e-mail da compra? Se já mandou o número do pedido, vou conferir com ele por aqui.\nC) Oi! Se o Kirvano deu erro, me diz o aviso que aparece. Assim eu confiro se é acesso ou se falta localizar a compra.\n\nRamificações e instruções internas:\n\n- Se: A compra está localizada e o acesso correto foi confirmado\n  Equipe — Use a área que pertence ao pedido. O link geral de cursos serve para apresentação e não substitui o login do produto.\n  Resposta da ramificação:\n    A) Esse é o acesso da sua compra: [confirmar link da área da compra]. Entra com o e-mail que usou no pedido.\n    B) Pode abrir por aqui: [confirmar link da área da compra]. Use o e-mail da compra e me avisa se aparecer algum erro.\n    C) Segue a área correta: [confirmar link da área da compra]. Se o login não entrar, me manda só o texto do aviso.\n\n- Se: O pedido é do pacote 5 Estratégias\n  Próximo caminho: [painel]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pedido não localizado ou erro continua\n  Equipe — Passe à equipe de compras com a referência já recebida. Nunca peça senha do Kirvano.",
      "blocks": [
        {
          "id": "mari-block-curso",
          "kind": "text",
          "text": "Oii! Me informa por gentileza o nome usado na compra ou o número do pedido, se ainda não mandou aqui."
        }
      ]
    },
    {
      "id": "mari-path-painel",
      "type": "text",
      "x": 3276,
      "y": 950,
      "w": 304,
      "accent": "#fb7185",
      "title": "[painel] Cinco Estratégias e acesso ao Visor Trader",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Adquiri as 5 estratégias do indicador. Onde acesso?\n\nPistas de entrada: 5 estrategias do indicador / cinco estrategias / visor trader / visortrader / painel das estrategias\n\nVariações da primeira resposta (não encadear):\nB) Você comprou as 5 Estratégias? Me diz se chegou o e-mail do pedido ou se faltou o endereço do painel.\nC) Me avisa se o problema é achar o painel ou entrar nele, por gentileza.\n\nRamificações e instruções internas:\n\n- Se: Produto e endereço do painel conferidos\n  Equipe — O histórico associou esse pacote ao Visor Trader. Confirme o acesso atual antes de usar o endereço.\n  Resposta da ramificação:\n    A) Aqui está o painel vinculado à sua compra: https://visortrader.com/. Se tiver erro ao entrar, me diz qual aviso aparece.\n    B) Pode acessar o painel por aqui: https://visortrader.com/. Qualquer dúvida com a tela, pode me chamar.\n    C) Segue o endereço do painel que a equipe confirmou: https://visortrader.com/.\n\n- Se: Pedido não encontrado\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-painel",
          "kind": "text",
          "text": "Oii! Vou conferir o acesso do pacote 5 Estratégias. Se já mandou o pedido, eu sigo por ele aqui."
        }
      ]
    },
    {
      "id": "mari-path-estorno",
      "type": "text",
      "x": 2938,
      "y": 1380,
      "w": 304,
      "accent": "#fb7185",
      "title": "[estorno] Estorno da compra do indicador",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não gostei. Tem como estornar o que paguei?\n\nPistas de entrada: estornar / estorno / reembolso / devolver o dinheiro / cancelar a compra / quero meu dinheiro de volta\n\nVariações da primeira resposta (não encadear):\nB) Entendi que você quer cancelar a compra. Me manda só a referência do pedido se ela ainda não estiver aqui.\nC) Sigo com seu pedido de reembolso por aqui. Se o número da compra já estiver na conversa, eu confiro por ele.\n\nRamificações e instruções internas:\n\n- Se: Estorno de compra\n  Equipe — Encaminhe ao suporte de compras com prioridade conforme o procedimento vigente. Não condicione a oferta ou depósito e não prometa aprovação ou data.\n\n- Se: Na verdade é retirada de saldo da corretora\n  Próximo caminho: [saque]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-estorno",
          "kind": "text",
          "text": "Oii! Vou encaminhar seu pedido de estorno da compra. Se ainda não mandou, me informa o número do pedido, por gentileza."
        }
      ]
    },
    {
      "id": "mari-path-bonus",
      "type": "text",
      "x": 3648,
      "y": 520,
      "w": 304,
      "accent": "#fb923c",
      "title": "[bonus] Bônus após comprar o indicador",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Comprei o indicador e gostaria do bônus.\n\nPistas de entrada: gostaria do bonus / bonus da compra / bonus pos compra / bonus do indicador / cade o bonus / como recebo o bonus / minha compra tem bonus\n\nVariações da primeira resposta (não encadear):\nB) Vamos conferir o que veio com seu pedido. Se já mandou o número da compra, eu uso esse aqui mesmo.\nC) Oi! Você quer o bônus que apareceu na oferta do indicador ou está procurando um cupom de depósito?\n\nRamificações e instruções internas:\n\n- Se: Benefício da compra ainda não localizado\n  Equipe — Peça apenas a referência do pedido que falta. Aplique o que estiver no registro da compra.\n  Resposta da ramificação:\n    A) Me informa o número do pedido, por gentileza, pra eu conferir o benefício que veio na sua compra.\n    B) Se ainda não mandou por aqui, me passa a referência da compra, tá? Com ela eu localizo o bônus certo.\n    C) Vou checar o que estava incluído no seu pedido. Você tem o número dele aí?\n\n- Se: Cupom da corretora\n  Próximo caminho: [cupom]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Evento ou sorteio de alavancagem\n  Próximo caminho: [alavancagem]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pix ou devolução promocional\n  Próximo caminho: [pix]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-bonus",
          "kind": "text",
          "text": "Oii! Vou verificar o bônus da sua compra. Você lembra se era um material ou um cupom da Avalon?"
        }
      ]
    },
    {
      "id": "mari-path-deposito",
      "type": "text",
      "x": 3986,
      "y": 520,
      "w": 304,
      "accent": "#fb923c",
      "title": "[deposito] Depósito mínimo ou depósito pendente",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Qual o mínimo pra depositar?\n\nPistas de entrada: deposito minimo / minimo pra depositar / minimo para depositar / minimo de deposito / menor valor / duvida sobre deposito / deposito nao caiu / deposito pendente / preciso depositar / tem que fazer deposito / quanto posso depositar / menor valor que pode botar / minimo para colocar / pix fiz e nao caiu / paguei e nao apareceu\n\nVariações da primeira resposta (não encadear):\nB) Na Avalon, abre a área de depósito e escolhe o método. O mínimo aplicável aparece antes de finalizar.\nC) Você quer ver o mínimo ou já pagou e o valor não apareceu? Se for o mínimo, confere o que a tela mostra pro seu método.\n\nRamificações e instruções internas:\n\n- Se: Já pagou e o valor não apareceu\n  Ir direto quando já disse: deposito nao caiu / deposito pendente / pix fiz e nao caiu / paguei e nao apareceu\n  Equipe — Direcione à corretora com o status e método da transação. Não peça outro pagamento.\n  Resposta da ramificação:\n    A) Entendi, já foi pago. Peço que confira a transação com o suporte da Avalon por dentro da plataforma.\n    B) Se o depósito ainda não apareceu, o suporte da Avalon consegue verificar o status. Use o atendimento deles com a referência da transação.\n    C) Como o pagamento já foi feito, deixa a Avalon conferir o que aconteceu pelo atendimento oficial, tá?",
      "blocks": [
        {
          "id": "mari-block-deposito",
          "kind": "text",
          "text": "Oii! O mínimo é o que aparece na tela de depósito pro método que você escolheu. Confere por lá antes de confirmar, tá?"
        }
      ]
    },
    {
      "id": "mari-path-cupom",
      "type": "text",
      "x": 3648,
      "y": 950,
      "w": 304,
      "accent": "#fb923c",
      "title": "[cupom] Cupom de depósito e código inválido",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O código promocional diz que não é válido.\n\nPistas de entrada: cupom invalido / codigo invalido / nao e valido / codigo promocional / cupom para deposito / cupom pro deposito / cupom de deposito / cupom nao funciona / cupom funciona / cupom disponivel / tem algum cupom / bonus de 300\n\nVariações da primeira resposta (não encadear):\nB) Você quer o código ou teve erro na aplicação? Me conta o que apareceu, por gentileza.\nC) Oi! Dá pra verificar o cupom por aqui. Me fala se foi erro ou se você ainda quer ver qual está ativo.\n\nRamificações e instruções internas:\n\n- Se: Código consta como inválido\n  Ir direto quando já disse: cupom invalido / codigo invalido / nao e valido / cupom nao funciona\n  Equipe — Valide código, vigência, elegibilidade e regra de saque. Não recomende outro depósito para testar.\n  Resposta da ramificação:\n    A) Entendi, apareceu cupom inválido. Qual foi o código que você tentou, se ainda não mandou por aqui?\n    B) Vou conferir por que deu inválido. Me passa só o nome do cupom que você usou, por gentileza.\n    C) Se a Avalon recusou o cupom, vamos confirmar as condições antes de usar outro. Me avisa qual foi o código.\n\n- Se: Quer saber onde aplica\n  Equipe — Oriente a conferir o resumo e os termos antes de confirmar a transação.\n  Resposta da ramificação:\n    A) A área de depósito da Avalon tem um campo de cupom. Depois de aplicar, confere os termos e o resumo antes de finalizar.\n    B) Coloca no campo de cupom promocional e verifica se a plataforma aceitou antes de confirmar, tá?\n    C) O código entra no campo de cupom da tela de depósito. Se aparecer algum aviso, me fala o que diz.\n\n- Se: Já depositou sem usar o cupom\n  Próximo caminho: [cupom-pos]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Usou o cupom, mas o saldo não mudou\n  Próximo caminho: [bonus-saldo]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Perguntou regras de saque\n  Próximo caminho: [rollover]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-cupom",
          "kind": "text",
          "text": "Oii! Vou conferir qual cupom está válido pra sua conta. Você está tentando aplicar antes de finalizar o depósito?"
        }
      ]
    },
    {
      "id": "mari-path-cupom-pos",
      "type": "text",
      "x": 3986,
      "y": 950,
      "w": 304,
      "accent": "#fb923c",
      "title": "[cupom-pos] Depósito concluído sem cupom",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Já depositei e esqueci de colocar o cupom.\n\nPistas de entrada: ja depositei e esqueci / esqueci do cupom / esqueci de colocar o cupom / esqueci o cupom / depositei sem cupom\n\nVariações da primeira resposta (não encadear):\nB) Entendi, o pagamento já terminou sem o cupom. Vamos confirmar com a Avalon o que vale pra essa promoção.\nC) Você já depositou, então primeiro vamos verificar a transação que existe. Me diz só qual cupom queria aplicar, se ainda não informou.\n\nRamificações e instruções internas:\n\n- Se: Aplicação retroativa ou nova oferta\n  Equipe — Verifique com a corretora e a equipe se o regulamento permite correção. Não prometa crédito retroativo ou condicione a outro pagamento.\n\n- Se: Cupom estava aplicado, saldo não mudou\n  Próximo caminho: [bonus-saldo]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-cupom-pos",
          "kind": "text",
          "text": "Oii! Como o depósito já foi feito, vou conferir se a promoção permite alguma correção. Você lembra o código que queria usar?"
        }
      ]
    },
    {
      "id": "mari-path-bonus-saldo",
      "type": "text",
      "x": 3648,
      "y": 1380,
      "w": 304,
      "accent": "#fb923c",
      "title": "[bonus-saldo] Bônus de depósito não entrou ou sumiu",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Usei o cupom, mas o bônus não apareceu.\n\nPistas de entrada: bonus nao caiu / bonus nao apareceu / bonus nao entrou / bonus sumiu / bonus ativo e outro / apliquei e o bonus\n\nVariações da primeira resposta (não encadear):\nB) Entendi. Se o cupom foi aceito e o bônus não apareceu, a Avalon precisa conferir esse lançamento.\nC) Confere se o bônus aparece como ativo na própria Avalon. Se ainda não estiver, me fala o que aparece na área de bônus.\n\nRamificações e instruções internas:\n\n- Se: Bônus aplicado, duplicado ou ausente\n  Equipe — Encaminhe ao suporte oficial para conferir o estado do benefício e as restrições. Não declare que outro cupom vai resolver.\n\n- Se: A dúvida é limite de saque\n  Próximo caminho: [rollover]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-bonus-saldo",
          "kind": "text",
          "text": "Oii! Você consegue ver se o cupom apareceu como aceito na tela do depósito? Me fala o status, por gentileza."
        }
      ]
    },
    {
      "id": "mari-path-pix",
      "type": "text",
      "x": 3986,
      "y": 1380,
      "w": 304,
      "accent": "#fb923c",
      "title": "[pix] Pix promocional ou devolução anunciada",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: E o meu Pix?\n\nPistas de entrada: e o meu pix / cashback / pix promocional / devolucao do pix / 30 via pix / devolucao anunciada\n\nVariações da primeira resposta (não encadear):\nB) Entendi, você está aguardando o Pix da oferta. Vou pedir pra equipe verificar com o histórico que já temos.\nC) Vou conferir esse retorno, tá? Se a oferta foi enviada aqui, eu sigo com essa mesma informação.\n\nRamificações e instruções internas:\n\n- Se: Ainda aguarda retorno do Pix anunciado\n  Equipe — Encaminhe à equipe da promoção com a referência já recebida. Confirme condição, status e eventual prazo sem pedir chave Pix no chat nem exigir novo depósito.\n\n- Se: O problema é um Pix de depósito que não caiu\n  Próximo caminho: [deposito]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-pix",
          "kind": "text",
          "text": "Oii! Você está falando do Pix que foi mencionado na promoção? Vou conferir a condição que apareceu no seu atendimento."
        }
      ]
    },
    {
      "id": "mari-path-rollover",
      "type": "text",
      "x": 3648,
      "y": 1810,
      "w": 304,
      "accent": "#fb923c",
      "title": "[rollover] Rollover e regras do bônus",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Esse bônus tem rollover? De quantas vezes?\n\nPistas de entrada: rollover / rolover / regra de saque / meta de operacoes / quantas vezes e o rollover / lucro acumulado / condicoes do bonus / regra do bonus\n\nVariações da primeira resposta (não encadear):\nB) O volume exigido e a regra de saque podem variar conforme o cupom. Se não está claro na tela, peço que confirme com a Avalon.\nC) Você já ativou o bônus ou está conferindo antes? A regra aplicável fica nas condições da promoção na Avalon.\n\nRamificações e instruções internas:\n\n- Se: Regra de saque, multiplicador ou prazo não aparece\n  Equipe — Direcione ao suporte oficial. Informe os termos confirmados pela corretora e diferencie saldo próprio de crédito promocional.\n\n- Se: Saque já recusado ou pendente\n  Próximo caminho: [saque]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-rollover",
          "kind": "text",
          "text": "Oii! O rollover depende das condições do bônus. Confere a regra que aparece na área de bônus da Avalon antes de confirmar qualquer operação."
        }
      ]
    },
    {
      "id": "mari-path-saque",
      "type": "text",
      "x": 3986,
      "y": 1810,
      "w": 304,
      "accent": "#fb923c",
      "title": "[saque] Saque bloqueado ou pendente",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Preciso sacar, mas a opção não aparece.\n\nPistas de entrada: nao consigo sacar / como sacar / opcao de saque / preciso sacar / quero sacar / posso sacar / saque bloqueado / saque pendente / saque nao aparece / saque negado / sacar o bonus / a opcao de saque nao aparece / saque travado / saque recusado / opcao de saque nao aparece / saque esta pendente\n\nVariações da primeira resposta (não encadear):\nB) Você chegou a solicitar o saque ou o botão nem abriu? Me diz só o status, por gentileza.\nC) Entendi que o problema é a retirada. A Avalon consegue verificar o motivo no atendimento deles. Se tiver um aviso, pode me dizer só o que ele fala.\n\nRamificações e instruções internas:\n\n- Se: Já informou que o saque está bloqueado ou pendente\n  Ir direto quando já disse: opcao de saque nao aparece / saque nao aparece / saque pendente / saque esta pendente / saque bloqueado / nao consigo sacar\n  Equipe — Direcione ao suporte da corretora. Se houver promoção, confira as condições aplicáveis sem pedir operação adicional.\n  Resposta da ramificação:\n    A) Como você já viu que o saque ficou bloqueado ou pendente, a Avalon precisa conferir o motivo na sua conta pelo atendimento oficial.\n    B) Entendi o status do saque. Peço que abra o suporte na própria Avalon pra verificar o motivo e a previsão informada por eles.\n    C) Nesse caso, confirma o status com a Avalon. Se tiver bônus ativo, pede que indiquem a regra que está afetando a retirada.\n\n- Se: É devolução da compra do indicador\n  Próximo caminho: [estorno]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-saque",
          "kind": "text",
          "text": "Oii! Se o saque não apareceu ou está pendente, peço que confirme o status com o suporte da Avalon. Qual aviso aparece na sua tela?"
        }
      ]
    },
    {
      "id": "mari-path-alavancagem",
      "type": "text",
      "x": 3648,
      "y": 2240,
      "w": 304,
      "accent": "#fb923c",
      "title": "[alavancagem] Alavancagem ou dobra de banca",
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como funciona? É sorteio ou já vou ser escolhido?\n\nPistas de entrada: dobra de banca / dobrar a banca / dobrar sua banca / alavancagem / alavancar / serei selecionada / e sorteio / sessao de alavancagem\n\nVariações da primeira resposta (não encadear):\nB) Oi! Quando a equipe abre uma campanha, a seleção segue o regulamento dela. Quer saber os critérios ou se há campanha aberta?\nC) Me fala, por gentileza, se a dúvida é sobre a seleção ou sobre a sua participação. Vou conferir o que está vigente.\n\nRamificações e instruções internas:\n\n- Se: Perguntou valor, data, chance de seleção ou cobertura de perda\n  Equipe — Encaminhe à equipe da campanha. O histórico registra regras diferentes. Só comunique critérios documentados e vigentes.\n\n- Se: Pediram login, senha ou código\n  Próximo caminho: [credenciais]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pediu para não participar\n  Próximo caminho: [parar]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-alavancagem",
          "kind": "text",
          "text": "Oii! Você quer entender como funciona a seleção ou conferir se tem uma campanha ativa? Vou confirmar as regras com a equipe."
        }
      ]
    }
  ],
  "edges": [
    {
      "id": "mari-edge-1",
      "from": "mari-start",
      "to": "mari-group-1",
      "label": "01 · Triagem e retorno",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-2",
      "from": "mari-start",
      "to": "mari-group-2",
      "label": "02 · Indicador e gráfico",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-3",
      "from": "mari-start",
      "to": "mari-group-3",
      "label": "03 · Conta Avalon",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-4",
      "from": "mari-start",
      "to": "mari-group-4",
      "label": "04 · Lives e materiais",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-5",
      "from": "mari-start",
      "to": "mari-group-5",
      "label": "05 · Compra e acessos",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-6",
      "from": "mari-start",
      "to": "mari-group-6",
      "label": "06 · Bônus e pagamentos",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-7",
      "from": "mari-group-1",
      "to": "mari-path-triagem",
      "label": "[triagem] Pedido genérico de ajuda",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-8",
      "from": "mari-group-1",
      "to": "mari-path-atraso",
      "label": "[atraso] Aguardando resposta ou volta do suporte",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-9",
      "from": "mari-group-1",
      "to": "mari-path-parar",
      "label": "[parar] Pessoa não quer continuar ou pede para sair",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-10",
      "from": "mari-group-2",
      "to": "mari-path-atualizar",
      "label": "[atualizar] Pegar o indicador atualizado",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-11",
      "from": "mari-group-2",
      "to": "mari-path-versao",
      "label": "[versao] Indicador diferente da live",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-12",
      "from": "mari-group-2",
      "to": "mari-path-instalar",
      "label": "[instalar] Baixar e instalar o script",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-13",
      "from": "mari-group-2",
      "to": "mari-path-celular",
      "label": "[celular] Indicador no celular",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-14",
      "from": "mari-group-2",
      "to": "mari-path-corretora",
      "label": "[corretora] Compatibilidade com outra corretora",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-15",
      "from": "mari-group-2",
      "to": "mari-path-otc",
      "label": "[otc] Ativo OTC ausente ou gráfico diferente",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-16",
      "from": "mari-group-2",
      "to": "mari-path-resultados",
      "label": "[resultados] Perdas e dúvidas sobre resultados",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-17",
      "from": "mari-group-3",
      "to": "mari-path-cadastro",
      "label": "[cadastro] Cadastro, login e link da Avalon",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-18",
      "from": "mari-group-3",
      "to": "mari-path-id",
      "label": "[id] Encontrar o ID da Avalon",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-19",
      "from": "mari-group-3",
      "to": "mari-path-conta-antiga",
      "label": "[conta-antiga] Conta antiga e elegibilidade",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-20",
      "from": "mari-group-3",
      "to": "mari-path-verificacao",
      "label": "[verificacao] Documentos e verificação da conta",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-21",
      "from": "mari-group-3",
      "to": "mari-path-demo",
      "label": "[demo] Conta demo e conta real",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-22",
      "from": "mari-group-3",
      "to": "mari-path-suspensa",
      "label": "[suspensa] Conta suspensa ou restrita",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-23",
      "from": "mari-group-3",
      "to": "mari-path-credenciais",
      "label": "[credenciais] Pedido de senha ou código",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-24",
      "from": "mari-group-4",
      "to": "mari-path-live",
      "label": "[live] Horários, comunidade e link da live",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-25",
      "from": "mari-group-4",
      "to": "mari-path-live-erro",
      "label": "[live-erro] Live ou Meet não abre",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-26",
      "from": "mari-group-4",
      "to": "mari-path-grupo-erro",
      "label": "[grupo-erro] Grupo ou link do Telegram não abre",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-27",
      "from": "mari-group-4",
      "to": "mari-path-sinais",
      "label": "[sinais] Horário dos sinais, tempo do gráfico e expiração",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-28",
      "from": "mari-group-4",
      "to": "mari-path-aprender",
      "label": "[aprender] Aulas para começar e acompanhar operações",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-29",
      "from": "mari-group-4",
      "to": "mari-path-planilha",
      "label": "[planilha] Planilha e gerenciamento de banca",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-30",
      "from": "mari-group-5",
      "to": "mari-path-planos",
      "label": "[planos] Preço e acesso básico ou completo",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-31",
      "from": "mari-group-5",
      "to": "mari-path-particular",
      "label": "[particular] Aula particular ou mini curso mencionado a…",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-32",
      "from": "mari-group-5",
      "to": "mari-path-curso",
      "label": "[curso] Acesso ao curso ou à compra",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-33",
      "from": "mari-group-5",
      "to": "mari-path-painel",
      "label": "[painel] Cinco Estratégias e acesso ao Visor Trader",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-34",
      "from": "mari-group-5",
      "to": "mari-path-estorno",
      "label": "[estorno] Estorno da compra do indicador",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-35",
      "from": "mari-group-6",
      "to": "mari-path-bonus",
      "label": "[bonus] Bônus após comprar o indicador",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-36",
      "from": "mari-group-6",
      "to": "mari-path-deposito",
      "label": "[deposito] Depósito mínimo ou depósito pendente",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-37",
      "from": "mari-group-6",
      "to": "mari-path-cupom",
      "label": "[cupom] Cupom de depósito e código inválido",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-38",
      "from": "mari-group-6",
      "to": "mari-path-cupom-pos",
      "label": "[cupom-pos] Depósito concluído sem cupom",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-39",
      "from": "mari-group-6",
      "to": "mari-path-bonus-saldo",
      "label": "[bonus-saldo] Bônus de depósito não entrou ou sumiu",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-40",
      "from": "mari-group-6",
      "to": "mari-path-pix",
      "label": "[pix] Pix promocional ou devolução anunciada",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-41",
      "from": "mari-group-6",
      "to": "mari-path-rollover",
      "label": "[rollover] Rollover e regras do bônus",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-42",
      "from": "mari-group-6",
      "to": "mari-path-saque",
      "label": "[saque] Saque bloqueado ou pendente",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-43",
      "from": "mari-group-6",
      "to": "mari-path-alavancagem",
      "label": "[alavancagem] Alavancagem ou dobra de banca",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-44",
      "from": "mari-path-triagem",
      "to": "mari-path-bonus",
      "label": "Disse que comprou e quer o bônus",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-45",
      "from": "mari-path-atraso",
      "to": "mari-path-triagem",
      "label": "Ainda não há uma dúvida identificada",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-46",
      "from": "mari-path-atualizar",
      "to": "mari-path-curso",
      "label": "Pedido não localizado ou falta acesso",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-47",
      "from": "mari-path-atualizar",
      "to": "mari-path-versao",
      "label": "Pergunta sobre o que aparece no gráfico",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-48",
      "from": "mari-path-versao",
      "to": "mari-path-atualizar",
      "label": "Foi identificada uma versão anterior",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-49",
      "from": "mari-path-instalar",
      "to": "mari-path-celular",
      "label": "No celular",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-50",
      "from": "mari-path-instalar",
      "to": "mari-path-curso",
      "label": "Arquivo do pedido não recebido",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-51",
      "from": "mari-path-corretora",
      "to": "mari-path-otc",
      "label": "O problema é um ativo OTC na Avalon",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-52",
      "from": "mari-path-otc",
      "to": "mari-path-sinais",
      "label": "Ativo existe, mas os horários ou tempos não batem",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-53",
      "from": "mari-path-resultados",
      "to": "mari-path-versao",
      "label": "Versão ou gráfico diferente",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-54",
      "from": "mari-path-cadastro",
      "to": "mari-path-conta-antiga",
      "label": "CPF ou conta antiga",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-55",
      "from": "mari-path-id",
      "to": "mari-path-cadastro",
      "label": "Não consegue abrir o perfil",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-56",
      "from": "mari-path-conta-antiga",
      "to": "mari-path-cadastro",
      "label": "Quer recuperar acesso",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-57",
      "from": "mari-path-conta-antiga",
      "to": "mari-path-bonus",
      "label": "Quer confirmar direito a bônus",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-58",
      "from": "mari-path-live",
      "to": "mari-path-live-erro",
      "label": "Convite não funciona",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-59",
      "from": "mari-path-grupo-erro",
      "to": "mari-path-live-erro",
      "label": "A dificuldade é entrar na live ou Meet",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-60",
      "from": "mari-path-sinais",
      "to": "mari-path-otc",
      "label": "Ativo OTC ausente",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-61",
      "from": "mari-path-aprender",
      "to": "mari-path-curso",
      "label": "Pediu as aulas da compra",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-62",
      "from": "mari-path-aprender",
      "to": "mari-path-instalar",
      "label": "Quer instalar",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-63",
      "from": "mari-path-aprender",
      "to": "mari-path-planilha",
      "label": "Quer a planilha",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-64",
      "from": "mari-path-planos",
      "to": "mari-path-resultados",
      "label": "Pediu promessa de acerto",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-65",
      "from": "mari-path-planos",
      "to": "mari-path-curso",
      "label": "Já comprou e não recebeu",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-66",
      "from": "mari-path-particular",
      "to": "mari-path-curso",
      "label": "É material que já comprou",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-67",
      "from": "mari-path-curso",
      "to": "mari-path-painel",
      "label": "O pedido é do pacote 5 Estratégias",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-68",
      "from": "mari-path-painel",
      "to": "mari-path-curso",
      "label": "Pedido não encontrado",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-69",
      "from": "mari-path-estorno",
      "to": "mari-path-saque",
      "label": "Na verdade é retirada de saldo da corretora",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-70",
      "from": "mari-path-bonus",
      "to": "mari-path-cupom",
      "label": "Cupom da corretora",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-71",
      "from": "mari-path-bonus",
      "to": "mari-path-alavancagem",
      "label": "Evento ou sorteio de alavancagem",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-72",
      "from": "mari-path-bonus",
      "to": "mari-path-pix",
      "label": "Pix ou devolução promocional",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-73",
      "from": "mari-path-cupom",
      "to": "mari-path-cupom-pos",
      "label": "Já depositou sem usar o cupom",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-74",
      "from": "mari-path-cupom",
      "to": "mari-path-bonus-saldo",
      "label": "Usou o cupom, mas o saldo não mudou",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-75",
      "from": "mari-path-cupom",
      "to": "mari-path-rollover",
      "label": "Perguntou regras de saque",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-76",
      "from": "mari-path-cupom-pos",
      "to": "mari-path-bonus-saldo",
      "label": "Cupom estava aplicado, saldo não mudou",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-77",
      "from": "mari-path-bonus-saldo",
      "to": "mari-path-rollover",
      "label": "A dúvida é limite de saque",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-78",
      "from": "mari-path-pix",
      "to": "mari-path-deposito",
      "label": "O problema é um Pix de depósito que não caiu",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-79",
      "from": "mari-path-rollover",
      "to": "mari-path-saque",
      "label": "Saque já recusado ou pendente",
      "color": "#fb923c",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-80",
      "from": "mari-path-saque",
      "to": "mari-path-estorno",
      "label": "É devolução da compra do indicador",
      "color": "#fb7185",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-81",
      "from": "mari-path-alavancagem",
      "to": "mari-path-credenciais",
      "label": "Pediram login, senha ou código",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false
    },
    {
      "id": "mari-edge-82",
      "from": "mari-path-alavancagem",
      "to": "mari-path-parar",
      "label": "Pediu para não participar",
      "color": "#a3e635",
      "animated": true,
      "dashed": false
    }
  ]
}
