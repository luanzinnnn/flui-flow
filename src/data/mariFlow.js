export const MARI_SUPPORT_TEMPLATE = {
  "id": "mari-suporte-30d",
  "revision": 2,
  "name": "Suporte Mari Trader — 30 dias",
  "short": "Mari Trader",
  "description": "Rascunho com tom natural e 37 caminhos de atendimento (indicador, conta, lives, compra, bônus e pagamentos). Ramificações e variações ficam nas notas internas de cada balão.",
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Oi, comprei o indicador e preciso de ajuda.\n\nVariações da primeira resposta (não encadear):\nB) Oi! Me conta o que aconteceu.\nC) Oii! Qual é a dúvida?\n\nRamificações e instruções internas:\n\n- Se: Disse que comprou e pediu ajuda sem explicar\n  Ir direto quando já disse: comprei o indicador e preciso de ajuda / comprei o indicador pedido\n  Equipe — Este é o texto para a abertura “comprei e preciso de ajuda”. Mantenha o pedido já recebido.\n  Resposta da ramificação:\n    A) É sobre o acesso, a instalação ou o bônus?\n    B) Você recebeu o acesso ou travou pra instalar?\n    C) Em que parte do indicador você ficou com dúvida?\n\n- Se: Disse que comprou e quer o bônus\n  Próximo caminho: [bonus]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Chegou somente áudio, foto ou vídeo\n  Equipe — Abra a mídia no CRM. Se não estiver legível ou se não houver transcrição, pergunte em uma frase o que a pessoa precisa.",
      "blocks": [
        {
          "id": "mari-block-triagem",
          "kind": "text",
          "text": "Oii, tudo bem? Como posso te ajudar?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Estou aguardando retorno e ninguém respondeu.\n\nPistas de entrada: aguardando retorno / nao tive retorno / ninguem respondeu / nao tem suporte / nao deu resposta / cade o suporte / ja mandei / esqueceu de mim\n\nVariações da primeira resposta (não encadear):\nB) Vou dar uma olhada no que você já mandou.\nC) Vou ver o que ficou faltando aqui.\n\nRamificações e instruções internas:\n\n- Se: Existe um assunto anterior\n  Equipe — Retome do último ponto em aberto e mantenha os dados já enviados.\n\n- Se: Ainda não há uma dúvida identificada\n  Próximo caminho: [triagem]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-atraso",
          "kind": "text",
          "text": "Deixa eu ver onde a gente parou."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não coloca meu nome no sorteio, tá?\n\nPistas de entrada: nao coloca meu nome / nao quero participar / tira meu nome / retirar meu nome / prefiro nao participar / pare de mandar\n\nVariações da primeira resposta (não encadear):\nB) Tá certo, pode deixar!\nC) Tranquilo, valeu por avisar!\n\nRamificações e instruções internas:\n\n- Se: Confirmou que não quer a campanha\n  Equipe — Encerre este assunto e suspenda os lembretes da campanha para o contato.\n\n- Se: Pediu para parar mensagens no canal\n  Equipe — Passe ao atendente para aplicar a preferência de contato disponível no CRM.",
      "blocks": [
        {
          "id": "mari-block-parar",
          "kind": "text",
          "text": "Beleza, sem problema!"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como faço para receber a atualização?\n\nPistas de entrada: atualizacao do indicador / atualizar o indicador / atualizar indicador / indicador atualizado / script atualizado / indicador antigo / receber a atualizacao / consigo a atualizacao / indicador teve alguma atualizacao\n\nVariações da primeira resposta (não encadear):\nB) Deixa eu conferir qual arquivo tá valendo.\nC) Vou ver aqui qual script você precisa.\n\nRamificações e instruções internas:\n\n- Se: Versão e acesso já confirmados\n  Equipe — Envie somente a versão oficial vinculada àquela compra. Quando o Flui suportar o arquivo, use o script confirmado pela equipe; senão envie a página.\n  Resposta da ramificação:\n    A) Aqui tá a versão versão atual confirmada pela equipe: https://amaritrader.com/baixar-indicador.\n    B) Pode baixar a versão atual confirmada pela equipe aqui: https://amaritrader.com/baixar-indicador.\n    C) Segue a versão versão atual confirmada pela equipe: https://amaritrader.com/baixar-indicador. Se travar pra instalar, me avisa.\n\n- Se: Pedido não localizado ou falta acesso\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pergunta sobre o que aparece no gráfico\n  Próximo caminho: [versao]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-atualizar",
          "kind": "text",
          "text": "Vou ver qual é a versão mais nova pra te mandar."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não aparece a caixinha de tendência igual à live.\n\nPistas de entrada: diferente da live / diferente do da live / diferente do mostrado na live / igual a live / caixinha de tendencia / painel de tendencia / bolinhas do engolfo / nao aparece a tendencia / nao mostra a tendencia / sem a media / com zig zag / sem as bolinhas / indicador diferente / nao aparece a caixinha de tendencia / nao esta plotando / nao tem as bolinhas\n\nVariações da primeira resposta (não encadear):\nB) O que tá diferente da live no seu gráfico?\nC) Qual parte tá faltando aí: as bolinhas, a média ou a caixa de tendência?\n\nRamificações e instruções internas:\n\n- Se: Já informou qual elemento está faltando\n  Ir direto quando já disse: nao aparece a caixinha de tendencia / nao aparece a tendencia / nao tem as bolinhas / sem as bolinhas / nao esta plotando\n  Equipe — Aproveite o que o contato descreveu. Peça apenas o dado que falta para comparar a versão e o dispositivo.\n  Resposta da ramificação:\n    A) Qual é o nome do arquivo que você instalou?\n    B) Tá no PC, no app ou no site do celular?\n    C) Me manda só um print da parte do gráfico que tá diferente, sem seus dados.\n\n- Se: Foi identificada uma versão anterior\n  Próximo caminho: [atualizar]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Mesma versão e problema continua\n  Equipe — Passe ao suporte técnico com versão, dispositivo, ativo e trecho da tela já informado.",
      "blocks": [
        {
          "id": "mari-block-versao",
          "kind": "text",
          "text": "Me manda um print só do gráfico e o nome do script."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Baixei mas não achei onde instalar.\n\nPistas de entrada: instalar o indicador / instalar indicador / instalar o script / baixei mas nao achei / nao achei onde instalar / nao consigo instalar / nao consegui estalar / nao consegui baixar / onde coloco o indicador / baixei nao sei / onde instalar / nao encontrei o arquivo / nao sei como configurar o indicador / onde carrego o script / onde instala / ja baixei\n\nVariações da primeira resposta (não encadear):\nB) O arquivo chegou a baixar?\nC) Tá tentando instalar pelo PC ou pelo celular?\n\nRamificações e instruções internas:\n\n- Se: Ainda não baixou\n  Equipe — Use a página de download e aguarde a pessoa abrir. Se já baixou, pule esta etapa.\n  Resposta da ramificação:\n    A) Baixa o indicador aqui: https://amaritrader.com/baixar-indicador.\n    B) Segue o link pra baixar: https://amaritrader.com/baixar-indicador. Se der erro, me avisa.\n    C) O arquivo do indicador fica aqui: https://amaritrader.com/baixar-indicador.\n\n- Se: Já baixou e quer instalar\n  Ir direto quando já disse: ja baixei / baixei mas nao achei / onde instalar / onde coloco o indicador\n  Equipe — Se o dispositivo não foi informado, pergunte só isso. Se já informou que é celular, vá para celular.\n  Resposta da ramificação:\n    A) Boa! Tá instalando pelo PC, pelo app ou pelo navegador do celular?\n    B) Já que baixou, me diz onde tá abrindo a Avalon: no PC ou no celular?\n    C) Agora é colocar no gráfico. Tá pelo PC ou pelo celular?\n\n- Se: Computador e tutorial conferido\n  Equipe — Use o vídeo M01 ou foto P01 se o arquivo for da mesma tela. Mantém o link de tutorial como alternativa.\n  Resposta da ramificação:\n    A) O passo a passo tá aqui: https://maritrader.vercel.app/indicador.\n    B) Segue o tutorial de instalação: https://maritrader.vercel.app/indicador. Se travar, me diz onde.\n    C) Dá uma olhada nessa aula: https://maritrader.vercel.app/indicador. Se o botão não aparecer, me avisa.\n\n- Se: No celular\n  Próximo caminho: [celular]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Arquivo do pedido não recebido\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-instalar",
          "kind": "text",
          "text": "Travou pra baixar ou pra colocar no gráfico?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Consigo instalar pelo celular ou tem que ser no PC?\n\nPistas de entrada: indicador no celular / instalar pelo celular / baixar no celular / app do indicador / opero pelo celular / operar pelo celular / pelo app da avalon / android ou iphone / no site ja tenho no aplicativo nao aparece / no aplicativo nao aparece a opcao do script / no app nao aparece o script\n\nVariações da primeira resposta (não encadear):\nB) É Android ou iPhone? Você abriu pelo app ou pelo site?\nC) Qual você tá usando aí: o app ou o site no celular?\n\nRamificações e instruções internas:\n\n- Se: Site mostra script e app não mostra\n  Ir direto quando já disse: no site ja tenho no aplicativo nao aparece / no aplicativo nao aparece a opcao do script / no app nao aparece o script\n  Equipe — O histórico orienta seguir pelo site nesse caso. Se precisar de orientação visual, use só a mídia compatível.\n  Resposta da ramificação:\n    A) Se o script aparece no site, segue pelo navegador.\n    B) Pode abrir pelo site, onde já aparece a opção do script.\n    C) Usa o navegador por enquanto. Se faltar algum botão lá também, me avisa.\n\n- Se: Dispositivo ou versão sem orientação validada\n  Equipe — Encaminhe ao suporte técnico com aparelho, app ou navegador e versão do script.",
      "blocks": [
        {
          "id": "mari-block-celular",
          "kind": "text",
          "text": "Tá no app da Avalon ou no navegador do celular?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Posso usar o indicador na Binance ou em outra plataforma?\n\nPistas de entrada: outra corretora / qualquer corretora / qual corretora / serve na binance / outra plataforma / funciona na binance\n\nVariações da primeira resposta (não encadear):\nB) Nas lives a gente usa a Avalon. Qual você tá usando?\nC) Me fala a corretora e o nome do script pra eu conferir.\n\nRamificações e instruções internas:\n\n- Se: O problema é um ativo OTC na Avalon\n  Próximo caminho: [otc]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Outra corretora ou ativos específicos\n  Equipe — Conferir compatibilidade com o suporte técnico. O histórico não confirma compatibilidade universal.",
      "blocks": [
        {
          "id": "mari-block-corretora",
          "kind": "text",
          "text": "Qual corretora você usa? Vou ver se esse script roda nela."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não achei Bitcoin OTC. O gráfico de Bitcoin normal fica diferente.\n\nPistas de entrada: bitcoin otc / solana otc / nao achei o ativo / ativo nao aparece / nao encontrei o ativo / nao tem otc / nao esta otc / grafico bitcoin normal / nao achei bitcoin otc / nao encontrei solana otc / bitcoin otc nao aparece\n\nVariações da primeira resposta (não encadear):\nB) Qual nome aparece na sua lista? Vê se tem OTC no final.\nC) Na live era OTC? Me diz qual ativo abriu aí.\n\nRamificações e instruções internas:\n\n- Se: Já informou que o OTC não aparece\n  Ir direto quando já disse: nao achei bitcoin otc / nao encontrei solana otc / bitcoin otc nao aparece / nao achei o ativo\n  Equipe — O histórico direciona a disponibilidade do ativo ao suporte da Avalon.\n  Resposta da ramificação:\n    A) Se não aparece na lista, fala com o suporte da Avalon pra conferir.\n    B) O suporte da Avalon consegue ver por que esse OTC não tá aparecendo na sua conta.\n    C) Pergunta no suporte da Avalon se esse ativo OTC tá disponível pra sua conta.\n\n- Se: Ativo existe, mas os horários ou tempos não batem\n  Próximo caminho: [sinais]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-otc",
          "kind": "text",
          "text": "Confere se tá escrito OTC no nome. O gráfico pode ser diferente do ativo normal."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Por que deu loss no meu gráfico? O indicador acerta sempre?\n\nPistas de entrada: assertivo 100 / acerta sempre / ganho garantido / perdi dinheiro / quebrei a conta / deu loss / dando loss / resultado diferente / assertividade garantida / 100 por cento de acerto / quanto de acertividades\n\nVariações da primeira resposta (não encadear):\nB) Qual ativo e horário apareceram aí? Vou dar uma olhada.\nC) Me manda um print só do gráfico onde deu diferente, sem seus dados.\n\nRamificações e instruções internas:\n\n- Se: Versão ou gráfico diferente\n  Próximo caminho: [versao]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Perguntou se acerta sempre ou pediu garantia\n  Ir direto quando já disse: acerta sempre / assertividade garantida / 100 por cento de acerto / ganho garantido / quanto de acertividades\n  Equipe — Explique o papel do indicador. Não transforme exemplos de resultado em promessa.\n  Resposta da ramificação:\n    A) O indicador ajuda a ler o gráfico. Mesmo com sinal, a operação pode dar perda.\n    B) Dá pra usar o sinal como referência, mas ele não garante o resultado.\n    C) Um sinal pode dar certo ou errado. Se quiser, a gente confere o que apareceu no gráfico.",
      "blocks": [
        {
          "id": "mari-block-resultados",
          "kind": "text",
          "text": "Foi no mesmo ativo e horário da live?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como entra na corretora pelo link?\n\nPistas de entrada: como entra na corretora / como entrar na corretora / como entra na plataforma / nao consigo entrar na corretora / nao estou conseguindo entra corretora / criar conta na corretora / link da corretora / link da plataforma / link abre a conta / fica so girando / nao consigo entrar na plataforma / entrar na avalon\n\nVariações da primeira resposta (não encadear):\nB) Travou pra criar a conta ou pra entrar?\nC) Qual aviso apareceu no cadastro ou no login?\n\nRamificações e instruções internas:\n\n- Se: Pediu o link e confirmou primeiro cadastro\n  Equipe — Use somente o link de cadastro conferido. Não peça depósito como requisito para atendimento.\n  Resposta da ramificação:\n    A) O link de cadastro é esse: https://bit.ly/Avalon_Create.\n    B) Pra criar sua primeira conta, entra aqui: https://bit.ly/Avalon_Create.\n    C) Segue o link: https://bit.ly/Avalon_Create. Se travar no cadastro, me avisa.\n\n- Se: CPF ou conta antiga\n  Próximo caminho: [conta-antiga]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Erro persistente no login\n  Equipe — Use o suporte oficial se o link estiver confirmado. Se não estiver, oriente o contato a abrir o suporte dentro da plataforma.\n  Resposta da ramificação:\n    A) Se o login continua dando erro, fala com o suporte dentro da Avalon.\n    B) Pra resolver o acesso dessa conta, abre o atendimento da própria Avalon.\n    C) A Avalon consegue conferir o login pelo suporte do app ou do site.",
      "blocks": [
        {
          "id": "mari-block-cadastro",
          "kind": "text",
          "text": "Você já tem conta na Avalon ou vai criar a primeira?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Onde pego o ID da conta?\n\nPistas de entrada: onde pego o id / onde acho meu id / onde fica o id / onde encontro o id / como achar o id / onde eu pega esse id / onde pega o id / meu id da avalon / onde vejo meu id / onde fica meu id / localizar id\n\nVariações da primeira resposta (não encadear):\nB) Na Avalon, entra no seu perfil e procura o ID.\nC) O ID fica no perfil. Se não achar, me fala se tá no app ou no site.\n\nRamificações e instruções internas:\n\n- Se: Já enviou o ID\n  Equipe — Não peça o mesmo dado de novo. Use o ID somente para a conferência necessária e volte ao assunto de origem.\n  Resposta da ramificação:\n    A) Boa, chegou aqui. Vou conferir.\n    B) Já tenho seu ID aqui. Vou dar uma olhada.\n    C) Peguei o ID! Vou conferir com esse mesmo.\n\n- Se: Não consegue abrir o perfil\n  Próximo caminho: [cadastro]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-id",
          "kind": "text",
          "text": "Abre o perfil da Avalon. O ID fica em Dados da conta."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Posso usar minha conta antiga da Avalon?\n\nPistas de entrada: conta antiga / conta que ja tenho / conta que eu ja tenho / mesma conta / conta ja criada / conta ja existe / preciso criar outra conta / ja tenho conta / preciso deletar / cpf ja esta la / conta com o mesmo cpf / cpf ja esta cadastrado / mesmo cpf / cpf ja / cpf cadastrado / mais de uma conta\n\nVariações da primeira resposta (não encadear):\nB) Se já tem conta, vamos ver essa primeiro. Você consegue entrar nela?\nC) É dúvida pra entrar na conta antiga ou pra ver se o bônus vale nela?\n\nRamificações e instruções internas:\n\n- Se: CPF já cadastrado ou conta atual em uso\n  Ir direto quando já disse: mesmo cpf / cpf ja / cpf cadastrado / mais de uma conta\n  Equipe — Direcione para recuperar ou verificar a conta existente pelo atendimento oficial. Não recomende criar cadastro duplicado com outro e-mail.\n  Resposta da ramificação:\n    A) Se o CPF já tá cadastrado, fala com a Avalon pra recuperar a conta que você tem.\n    B) O suporte da Avalon consegue te ajudar a entrar na conta ligada a esse CPF.\n    C) Como já tem conta nesse CPF, vê com a Avalon como recuperar o acesso.\n\n- Se: Quer recuperar acesso\n  Próximo caminho: [cadastro]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer confirmar direito a bônus\n  Próximo caminho: [bonus]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-conta-antiga",
          "kind": "text",
          "text": "Você quer entrar na conta que já tem ou ver se dá pra usar o bônus nela?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: A Avalon pede foto e não consigo enviar meu documento.\n\nPistas de entrada: enviar documentos / enviar documento / enviar identidade / confirmar identidade / abri conta tem como verificar / pede foto / verificacao de identidade / verificar minha conta / verificar a conta\n\nVariações da primeira resposta (não encadear):\nB) Em que parte da verificação você travou? Os documentos vão pela própria Avalon.\nC) Qual aviso apareceu na hora de verificar? Pode mandar só a mensagem, sem seus dados.\n\nRamificações e instruções internas:\n\n- Se: Documento, selfie ou recusa\n  Equipe — Oriente a usar a área de verificação ou atendimento oficial da Avalon. Não peça documentos pessoais no WhatsApp ou Telegram.",
      "blocks": [
        {
          "id": "mari-block-verificacao",
          "kind": "text",
          "text": "Travou na foto ou apareceu algum aviso? Me manda só o texto."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como faço pra sair da conta demo?\n\nPistas de entrada: sair da conta demo / conta demonstracao / conta demo / modo demo / demo para real / mudar para real\n\nVariações da primeira resposta (não encadear):\nB) Tá no app ou no site? Me fala onde aparece “Demo”.\nC) Abre o menu onde tá escrito “Demo” e me diz quais opções aparecem.\n\nRamificações e instruções internas:\n\n- Se: Alternância bloqueada ou saldo errado\n  Equipe — Direcione ao suporte oficial da Avalon. Não solicite outro depósito para testar.",
      "blocks": [
        {
          "id": "mari-block-demo",
          "kind": "text",
          "text": "Tá aparecendo “Demo” lá em cima? Vê se consegue abrir o menu da conta."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Minha conta foi suspensa. Como devo proceder?\n\nPistas de entrada: conta suspensa / minha conta foi suspensa / conta bloqueada / conta restrita / acesso bloqueado\n\nVariações da primeira resposta (não encadear):\nB) Em qual tela apareceu a suspensão?\nC) Se foi na Avalon, o suporte deles precisa conferir. Qual aviso apareceu aí?\n\nRamificações e instruções internas:\n\n- Se: Suspensão confirmada\n  Equipe — A reativação e a justificativa precisam de atendimento da corretora. Priorize a revisão humana deste caso.",
      "blocks": [
        {
          "id": "mari-block-suspensa",
          "kind": "text",
          "text": "Foi na Avalon? Me manda só o aviso que apareceu, sem seus dados."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Tem que passar login e senha pra dobra de banca?\n\nPistas de entrada: login e senha / usuario e senha / minha senha / passar senha / passo o acesso / codigo sms / codigo de verificacao / pediram minha senha / enviar senha / preciso passar senha / passar senha da corretora / passar login\n\nVariações da primeira resposta (não encadear):\nB) Fica com sua senha e seu código, tá? Me diz só de onde veio o pedido.\nC) Pra te ajudar com isso, não preciso da sua senha. Se pediram código também, não manda.\n\nRamificações e instruções internas:\n\n- Se: Já entregou senha ou suspeita de acesso\n  Equipe — Prioridade humana. Oriente a recuperar a conta e alterar a senha pelo canal oficial da corretora. Não repita credenciais que chegaram no histórico.",
      "blocks": [
        {
          "id": "mari-block-credenciais",
          "kind": "text",
          "text": "Não precisa passar senha nem código. Se alguém pediu, me fala por onde."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Que horas é a live e onde entra no grupo?\n\nPistas de entrada: horario das lives / horario da live / hora da live / que horas a live / que horas e a live / onde entra no grupo / vai ter live / link da live / link do grupo / link da comunidade / entrar no grupo / entrar na comunidade / grupo de operacoes / live no telegram / link do telegram / quando e a live / horario da operacao ao vivo / quais os dias de live / link do whatsapp / grupo do whatsapp / comunidade do whatsapp\n\nVariações da primeira resposta (não encadear):\nB) A live de hoje fica no aviso mais recente daqui: https://t.me/comunidademaritrader.\nC) Segue o Telegram onde a gente avisa das lives: https://t.me/comunidademaritrader.\n\nRamificações e instruções internas:\n\n- Se: Perguntou o horário e a agenda foi confirmada\n  Equipe — Somente com agenda e fuso vigentes. O histórico mostra horários diferentes para sessões normais e especiais.\n  Resposta da ramificação:\n    A) Hoje vai ser [horário a confirmar] ([fuso a confirmar]). O link sai aqui: https://t.me/comunidademaritrader.\n    B) A live tá marcada pra [horário a confirmar] no fuso [fuso a confirmar]. O aviso fica aqui: https://t.me/comunidademaritrader.\n    C) O horário é [horário a confirmar] ([fuso a confirmar]). Dá uma olhada no Telegram: https://t.me/comunidademaritrader.\n\n- Se: Pediu especificamente o WhatsApp\n  Ir direto quando já disse: link do whatsapp / grupo do whatsapp / comunidade do whatsapp\n  Equipe — Envie apenas o canal solicitado.\n  Resposta da ramificação:\n    A) O grupo do WhatsApp é esse: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW.\n    B) Entra no grupo por aqui: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW.\n    C) Segue o WhatsApp da comunidade: https://chat.whatsapp.com/BgmZumA0iajJsChxvknfBW. Se não abrir, me avisa.\n\n- Se: Convite não funciona\n  Próximo caminho: [live-erro]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-live",
          "kind": "text",
          "text": "Os links das lives saem aqui no Telegram: https://t.me/comunidademaritrader."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não abre o Meet no celular.\n\nPistas de entrada: nao abre o meet / nao abre meet / meet nao abre / link da live nao abre / nao consegui acessar a live / nao recebi o link da live / erro no meet / meet nao esta entrando / nao esta entrando o meet / nao encontrei o link da live\n\nVariações da primeira resposta (não encadear):\nB) Tenta pelo último aviso aqui: https://t.me/comunidademaritrader. Se não abrir, me diz o que aparece.\nC) O Meet pediu pra aguardar ou apareceu outro aviso?\n\nRamificações e instruções internas:\n\n- Se: Não encontrou o convite da sessão\n  Ir direto quando já disse: nao recebi o link da live / nao encontrei o link da live\n  Equipe — Oriente a olhar o aviso mais recente. Não reutilize convite de outra live.\n  Resposta da ramificação:\n    A) Olha o último aviso da live aqui: https://t.me/comunidademaritrader.\n    B) O link novo sai por aqui: https://t.me/comunidademaritrader. Se não achar, me fala qual live é.\n    C) Confere se o convite já saiu no Telegram: https://t.me/comunidademaritrader.\n\n- Se: Erro de acesso persiste\n  Equipe — Encaminhe à equipe da live com a sessão, plataforma e erro, sem publicar link vencido.",
      "blocks": [
        {
          "id": "mari-block-live-erro",
          "kind": "text",
          "text": "O Meet abriu e deu erro ou o link nem abriu?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não está abrindo o link do Telegram.\n\nPistas de entrada: nao abre o telegram / nao esta abrindo o link do telegram / link do telegram nao abre / link do grupo nao abre\n\nVariações da primeira resposta (não encadear):\nB) É esse o link do canal: https://t.me/comunidademaritrader. Vê se abre pelo app.\nC) Testa por aqui: https://t.me/comunidademaritrader. Se ficar só aguardando aprovação, me avisa.\n\nRamificações e instruções internas:\n\n- Se: A dificuldade é entrar na live ou Meet\n  Próximo caminho: [live-erro]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Convite expirado ou acesso restrito\n  Equipe — Confirme o link vigente com a equipe. Se for solicitação de entrada, deixe o atendimento acompanhar.",
      "blocks": [
        {
          "id": "mari-block-grupo-erro",
          "kind": "text",
          "text": "Tenta abrir no app do Telegram: https://t.me/comunidademaritrader. Se der erro, me fala o que aparece."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O horário dos sinais muda? E como vejo a expiração?\n\nPistas de entrada: horario dos sinais / horario das entradas / tempo de expiracao / tempo de ativo / diferenca no horario / sinais no telegram / ativos de quantos minutos / hora de expiracao\n\nVariações da primeira resposta (não encadear):\nB) Você quer conferir a hora do aviso ou o tempo que aparece no gráfico?\nC) Qual sinal ficou diferente aí? Me fala o ativo e o horário que você viu.\n\nRamificações e instruções internas:\n\n- Se: Horário ou fuso dos avisos\n  Ir direto quando já disse: horario dos sinais / diferenca no horario / horario das entradas\n  Equipe — Use o aviso atual e confirme o fuso. Não dê orientação de entrada ao vivo com dados do histórico.\n  Resposta da ramificação:\n    A) Confere o horário no aviso do Telegram: https://t.me/comunidademaritrader.\n    B) Olha o aviso original aqui: https://t.me/comunidademaritrader. Se o horário não bater, me fala seu fuso.\n    C) Segue o canal: https://t.me/comunidademaritrader. Vê a hora que aparece no aviso do sinal.\n\n- Se: Tempo de expiração ou duração do ativo\n  Ir direto quando já disse: tempo de expiracao / hora de expiracao\n  Equipe — Diferencie o tempo da vela, a duração do ativo na lista e a expiração. Use print da interface se necessário.\n  Resposta da ramificação:\n    A) É pra achar o campo de expiração ou entender o tempo que usaram na live?\n    B) Me manda um print só da parte onde aparece a expiração, sem seus dados.\n    C) Você tá olhando o tempo da vela ou o campo de expiração da operação?\n\n- Se: Ativo OTC ausente\n  Próximo caminho: [otc]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-sinais",
          "kind": "text",
          "text": "É o horário do sinal no Telegram ou o tempo de expiração na Avalon?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como e por onde começo? Onde vejo as aulas?\n\nPistas de entrada: como e por onde comecar / por onde comeco / por onde comecar / como comecar a operar / onde posso ver suas aulas / tem aula ensinando / como operar junto / como acompanhar as operacoes / como usa o indicador / como interpretar os sinais / tempo de expiracao\n\nVariações da primeira resposta (não encadear):\nB) Segue o YouTube: https://www.youtube.com/@MariTrader. Qual parte do indicador você quer ver?\nC) Pra começar, dá uma olhada nas aulas daqui: https://www.youtube.com/@MariTrader.\n\nRamificações e instruções internas:\n\n- Se: Pediu as aulas da compra\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer instalar\n  Próximo caminho: [instalar]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Quer a planilha\n  Próximo caminho: [planilha]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-aprender",
          "kind": "text",
          "text": "As aulas abertas tão aqui: https://www.youtube.com/@MariTrader. Se for da sua compra, me fala qual."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Pode me mandar a planilha de gerenciamento?\n\nPistas de entrada: planilha / gerenciamento de banca / calculo correto para gerenciamento / valor de entrada\n\nVariações da primeira resposta (não encadear):\nB) Segue o link da planilha: https://gerenciamentotrader.com/.\nC) É por aqui que você abre: https://gerenciamentotrader.com/. Se travar, me avisa.\n\nRamificações e instruções internas:\n\n- Se: Já abriu, mas não sabe preencher\n  Equipe — Oriente sobre registro e leitura da planilha. Se pedir valor para investir, não sugira montante individual.\n  Resposta da ramificação:\n    A) Qual coluna ficou com dúvida?\n    B) Me fala qual campo você tá tentando preencher.\n    C) A planilha serve pra anotar as operações. Qual parte você quer ver?",
      "blocks": [
        {
          "id": "mari-block-planilha",
          "kind": "text",
          "text": "A planilha fica aqui: https://gerenciamentotrader.com/."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Qual o valor? Quero o acesso completo.\n\nPistas de entrada: acesso basico / acesso completo / quanto custa / qual o valor do indicador / qual o valor dele / quanto custa o indicador / qual a diferenca dos acessos / quero o acesso completo / prefiro acesso completo / prefiro o acesso completo / bom dia acesso completo / quero o acesso basico / prefiro acesso basico / prefiro o acesso basico\n\nVariações da primeira resposta (não encadear):\nB) Qual acesso você quer conferir: o básico ou o completo?\nC) Quer que eu te mostre o que vem em cada acesso?\n\nRamificações e instruções internas:\n\n- Se: Escolheu o acesso completo\n  Ir direto quando já disse: quero o acesso completo / prefiro acesso completo / prefiro o acesso completo / bom dia acesso completo\n  Equipe — Abra esta etapa após confirmar a oferta vigente. Antes de copiar, valide o checkout e informe o que consta na oferta.\n  Resposta da ramificação:\n    A) O completo tá aqui: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Dá pra conferir o valor e o que vem nele.\n    B) Segue o acesso completo: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05.\n    C) Olha o completo por aqui: https://pay.kirvano.com/183783de-d448-49d5-b949-867893931bf6?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Se ficar alguma dúvida, me chama.\n\n- Se: Escolheu o acesso básico\n  Ir direto quando já disse: quero o acesso basico / prefiro acesso basico / prefiro o acesso basico\n  Equipe — Confirme que o pedido do contato é sobre a opção básica e que o checkout está vigente.\n  Resposta da ramificação:\n    A) O básico tá aqui: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Dá pra ver o valor e o que vem nele.\n    B) Segue o acesso básico: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05.\n    C) Confere o básico aqui: https://pay.kirvano.com/78284e96-b8dd-44c9-a91d-14912937248f?aff=2680f02c-558d-45c7-a136-def95ee7ed05. Se faltar alguma informação, me avisa.\n\n- Se: Pediu promessa de acerto\n  Próximo caminho: [resultados]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Já comprou e não recebeu\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-planos",
          "kind": "text",
          "text": "Você quer ver o básico, o completo ou a diferença dos dois?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Quanto custa a aula que o Pedro falou?\n\nPistas de entrada: aula que o pedro falou / aula particular / aulas particulares / link do mini curso / valor do mini curso\n\nVariações da primeira resposta (não encadear):\nB) Me fala qual aula ou live foi pra eu achar o contato certo.\nC) É sobre a aula particular ou o minicurso?\n\nRamificações e instruções internas:\n\n- Se: É a aula de um integrante da equipe\n  Equipe — Confirme com o responsável valor, disponibilidade e canal atual.\n\n- Se: É material que já comprou\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-particular",
          "kind": "text",
          "text": "É a aula particular que falaram na live?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O Kirvano está dando erro. Onde estão minhas aulas?\n\nPistas de entrada: cadê meu curso / cade meu curso / onde estao minhas aulas / perdi meu acesso / acesso ao curso / acesso as aulas / kirvano / nao consigo acessar as aulas / curso sumiu / comprei e nao recebi\n\nVariações da primeira resposta (não encadear):\nB) Chegou o e-mail da compra? Se o pedido já tá aqui, vou olhar por ele.\nC) Qual erro apareceu no Kirvano? Me manda só o aviso.\n\nRamificações e instruções internas:\n\n- Se: A compra está localizada e o acesso correto foi confirmado\n  Equipe — Use a área que pertence ao pedido. O link geral de cursos serve para apresentação e não substitui o login do produto.\n  Resposta da ramificação:\n    A) O acesso da sua compra é aqui: [confirmar link da área da compra]. Entra com o e-mail do pedido.\n    B) Abre por aqui: [confirmar link da área da compra]. Usa o mesmo e-mail da compra.\n    C) Segue o acesso: [confirmar link da área da compra]. Se o login der erro, me diz o que apareceu.\n\n- Se: O pedido é do pacote 5 Estratégias\n  Próximo caminho: [painel]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pedido não localizado ou erro continua\n  Equipe — Passe à equipe de compras com a referência já recebida. Nunca peça senha do Kirvano.",
      "blocks": [
        {
          "id": "mari-block-curso",
          "kind": "text",
          "text": "Me manda o número do pedido ou o nome que usou na compra."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Adquiri as 5 estratégias do indicador. Onde acesso?\n\nPistas de entrada: 5 estrategias do indicador / cinco estrategias / visor trader / visortrader / painel das estrategias\n\nVariações da primeira resposta (não encadear):\nB) Chegou o e-mail da compra das 5 Estratégias?\nC) Tá faltando o link do painel ou ele dá erro pra entrar?\n\nRamificações e instruções internas:\n\n- Se: Produto e endereço do painel conferidos\n  Equipe — O histórico associou esse pacote ao Visor Trader. Confirme o acesso atual antes de usar o endereço.\n  Resposta da ramificação:\n    A) O painel da sua compra fica aqui: https://visortrader.com/.\n    B) Pode abrir o painel por aqui: https://visortrader.com/.\n    C) Segue o painel: https://visortrader.com/. Se der erro pra entrar, me avisa.\n\n- Se: Pedido não encontrado\n  Próximo caminho: [curso]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-painel",
          "kind": "text",
          "text": "Vou ver o acesso das 5 Estratégias pelo seu pedido."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Não gostei. Tem como estornar o que paguei?\n\nPistas de entrada: estornar / estorno / reembolso / devolver o dinheiro / cancelar a compra / quero meu dinheiro de volta\n\nVariações da primeira resposta (não encadear):\nB) Vou passar seu pedido de estorno pra equipe. O número da compra já tá aqui?\nC) Vou olhar o número da compra aqui pra passar seu pedido de reembolso pra equipe.\n\nRamificações e instruções internas:\n\n- Se: Estorno de compra\n  Equipe — Encaminhe ao suporte de compras com prioridade conforme o procedimento vigente. Não condicione a oferta ou depósito e não prometa aprovação ou data.\n\n- Se: Na verdade é retirada de saldo da corretora\n  Próximo caminho: [saque]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-estorno",
          "kind": "text",
          "text": "Me passa o número do pedido pra eu mandar pro pessoal que cuida dos estornos."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Comprei o indicador e gostaria do bônus.\n\nPistas de entrada: gostaria do bonus / bonus da compra / bonus pos compra / bonus do indicador / cade o bonus / como recebo o bonus / minha compra tem bonus\n\nVariações da primeira resposta (não encadear):\nB) Vou ver o que veio com seu pedido. Você lembra qual bônus apareceu?\nC) É o bônus do indicador ou um cupom pra depósito?\n\nRamificações e instruções internas:\n\n- Se: Benefício da compra ainda não localizado\n  Equipe — Peça apenas a referência do pedido que falta. Aplique o que estiver no registro da compra.\n  Resposta da ramificação:\n    A) Me manda o número do pedido pra eu ver qual bônus veio na compra.\n    B) Você tem o número do pedido aí? Com ele eu confiro o bônus.\n    C) Se o número do pedido ainda não tá aqui, me manda pra eu olhar.\n\n- Se: Cupom da corretora\n  Próximo caminho: [cupom]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Evento ou sorteio de alavancagem\n  Próximo caminho: [alavancagem]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pix ou devolução promocional\n  Próximo caminho: [pix]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-bonus",
          "kind": "text",
          "text": "O bônus da compra era um material ou um cupom da Avalon?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Qual o mínimo pra depositar?\n\nPistas de entrada: deposito minimo / minimo pra depositar / minimo para depositar / minimo de deposito / menor valor / duvida sobre deposito / deposito nao caiu / deposito pendente / preciso depositar / tem que fazer deposito / quanto posso depositar / menor valor que pode botar / minimo para colocar / pix fiz e nao caiu / paguei e nao apareceu\n\nVariações da primeira resposta (não encadear):\nB) Na Avalon, abre a parte de depósito e escolhe como vai pagar. O mínimo aparece ali.\nC) Você quer ver o mínimo ou já pagou e o valor não apareceu?\n\nRamificações e instruções internas:\n\n- Se: Já pagou e o valor não apareceu\n  Ir direto quando já disse: deposito nao caiu / deposito pendente / pix fiz e nao caiu / paguei e nao apareceu\n  Equipe — Direcione à corretora com o status e método da transação. Não peça outro pagamento.\n  Resposta da ramificação:\n    A) Se já pagou e não caiu, chama o suporte dentro da Avalon.\n    B) Como o depósito já foi feito, passa a referência do pagamento pro suporte da Avalon.\n    C) O suporte da Avalon consegue olhar esse pagamento. Abre o atendimento por dentro da plataforma.",
      "blocks": [
        {
          "id": "mari-block-deposito",
          "kind": "text",
          "text": "O valor mínimo aparece na tela de depósito depois que você escolhe como pagar."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: O código promocional diz que não é válido.\n\nPistas de entrada: cupom invalido / codigo invalido / nao e valido / codigo promocional / cupom para deposito / cupom pro deposito / cupom de deposito / cupom nao funciona / cupom funciona / cupom disponivel / tem algum cupom / bonus de 300\n\nVariações da primeira resposta (não encadear):\nB) O cupom deu algum aviso ou você ainda quer pegar o código?\nC) É pra aplicar um cupom ou pra ver por que ele deu erro?\n\nRamificações e instruções internas:\n\n- Se: Código consta como inválido\n  Ir direto quando já disse: cupom invalido / codigo invalido / nao e valido / cupom nao funciona\n  Equipe — Valide código, vigência, elegibilidade e regra de saque. Não recomende outro depósito para testar.\n  Resposta da ramificação:\n    A) Qual código deu inválido aí?\n    B) Se ainda não mandou, me passa o cupom que deu erro.\n    C) Deixa eu conferir esse código. Qual foi o cupom que você tentou?\n\n- Se: Quer saber onde aplica\n  Equipe — Oriente a conferir o resumo e os termos antes de confirmar a transação.\n  Resposta da ramificação:\n    A) Coloca o código no campo de cupom. Antes de pagar, confere se aceitou e quais são as regras.\n    B) Na tela de depósito tem o campo de cupom. Vê se entrou certinho e confere o resumo antes de pagar.\n    C) O código vai no campo de cupom da tela de depósito. Confere os termos antes de finalizar.\n\n- Se: Já depositou sem usar o cupom\n  Próximo caminho: [cupom-pos]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Usou o cupom, mas o saldo não mudou\n  Próximo caminho: [bonus-saldo]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Perguntou regras de saque\n  Próximo caminho: [rollover]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-cupom",
          "kind": "text",
          "text": "Você quer ver qual cupom tá valendo ou deu erro com um código?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Já depositei e esqueci de colocar o cupom.\n\nPistas de entrada: ja depositei e esqueci / esqueci do cupom / esqueci de colocar o cupom / esqueci o cupom / depositei sem cupom\n\nVariações da primeira resposta (não encadear):\nB) Depois de pagar, precisa ver se a regra permite colocar o cupom. Vamos conferir pela Avalon.\nC) Me diz qual código ficou faltando, se ainda não mandou. Vou ver o que dá pra fazer nesse depósito.\n\nRamificações e instruções internas:\n\n- Se: Aplicação retroativa ou nova oferta\n  Equipe — Verifique com a corretora e a equipe se o regulamento permite correção. Não prometa crédito retroativo ou condicione a outro pagamento.\n\n- Se: Cupom estava aplicado, saldo não mudou\n  Próximo caminho: [bonus-saldo]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-cupom-pos",
          "kind": "text",
          "text": "Como já pagou, vou ver se ainda dá pra aplicar. Qual era o cupom?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Usei o cupom, mas o bônus não apareceu.\n\nPistas de entrada: bonus nao caiu / bonus nao apareceu / bonus nao entrou / bonus sumiu / bonus ativo e outro / apliquei e o bonus\n\nVariações da primeira resposta (não encadear):\nB) Se aceitou o cupom e não entrou o bônus, fala com o suporte da Avalon pra eles olharem.\nC) Abre a parte de bônus na Avalon e me fala o que aparece ali.\n\nRamificações e instruções internas:\n\n- Se: Bônus aplicado, duplicado ou ausente\n  Equipe — Encaminhe ao suporte oficial para conferir o estado do benefício e as restrições. Não declare que outro cupom vai resolver.\n\n- Se: A dúvida é limite de saque\n  Próximo caminho: [rollover]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-bonus-saldo",
          "kind": "text",
          "text": "Na tela do depósito apareceu que o cupom foi aceito?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: E o meu Pix?\n\nPistas de entrada: e o meu pix / cashback / pix promocional / devolucao do pix / 30 via pix / devolucao anunciada\n\nVariações da primeira resposta (não encadear):\nB) Vou olhar com a equipe o Pix que ficou faltando.\nC) Vou ver o Pix da promoção pelo que já tá na conversa.\n\nRamificações e instruções internas:\n\n- Se: Ainda aguarda retorno do Pix anunciado\n  Equipe — Encaminhe à equipe da promoção com a referência já recebida. Confirme condição, status e eventual prazo sem pedir chave Pix no chat nem exigir novo depósito.\n\n- Se: O problema é um Pix de depósito que não caiu\n  Próximo caminho: [deposito]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-pix",
          "kind": "text",
          "text": "É o Pix que falaram na oferta? Vou conferir aqui."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Esse bônus tem rollover? De quantas vezes?\n\nPistas de entrada: rollover / rolover / regra de saque / meta de operacoes / quantas vezes e o rollover / lucro acumulado / condicoes do bonus / regra do bonus\n\nVariações da primeira resposta (não encadear):\nB) A regra pra sacar depende do cupom. Se não aparecer na tela, confere com a Avalon.\nC) Você já ativou o bônus ou ainda tá olhando as regras? Elas ficam na área de bônus.\n\nRamificações e instruções internas:\n\n- Se: Regra de saque, multiplicador ou prazo não aparece\n  Equipe — Direcione ao suporte oficial. Informe os termos confirmados pela corretora e diferencie saldo próprio de crédito promocional.\n\n- Se: Saque já recusado ou pendente\n  Próximo caminho: [saque]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-rollover",
          "kind": "text",
          "text": "O rollover muda conforme o bônus. A regra fica na área de bônus da Avalon."
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Preciso sacar, mas a opção não aparece.\n\nPistas de entrada: nao consigo sacar / como sacar / opcao de saque / preciso sacar / quero sacar / posso sacar / saque bloqueado / saque pendente / saque nao aparece / saque negado / sacar o bonus / a opcao de saque nao aparece / saque travado / saque recusado / opcao de saque nao aparece / saque esta pendente\n\nVariações da primeira resposta (não encadear):\nB) Qual aviso deu na hora de sacar? Me manda só o texto.\nC) Se o saque não saiu, o suporte da Avalon consegue olhar. Qual aviso apareceu aí?\n\nRamificações e instruções internas:\n\n- Se: Já informou que o saque está bloqueado ou pendente\n  Ir direto quando já disse: opcao de saque nao aparece / saque nao aparece / saque pendente / saque esta pendente / saque bloqueado / nao consigo sacar\n  Equipe — Direcione ao suporte da corretora. Se houver promoção, confira as condições aplicáveis sem pedir operação adicional.\n  Resposta da ramificação:\n    A) Como o saque ficou travado, fala com o suporte da Avalon pra eles olharem na sua conta.\n    B) Abre o suporte dentro da Avalon pra ver o que segurou o saque.\n    C) Confere com a Avalon por que o saque ficou parado. Se tiver bônus ativo, pergunta se a regra dele afetou a retirada.\n\n- Se: É devolução da compra do indicador\n  Próximo caminho: [estorno]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-saque",
          "kind": "text",
          "text": "O saque ficou pendente ou o botão nem apareceu?"
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
      "note": "RASCUNHO — revise links, ofertas e campos entre [ ] antes de ativar.\n\nExemplo de entrada: Como funciona? É sorteio ou já vou ser escolhido?\n\nPistas de entrada: dobra de banca / dobrar a banca / dobrar sua banca / alavancagem / alavancar / serei selecionada / e sorteio / sessao de alavancagem\n\nVariações da primeira resposta (não encadear):\nB) É sobre como participar ou como funciona a escolha?\nC) Vou conferir com a equipe o que tá valendo. Qual é a dúvida sobre a alavancagem?\n\nRamificações e instruções internas:\n\n- Se: Perguntou valor, data, chance de seleção ou cobertura de perda\n  Equipe — Encaminhe à equipe da campanha. O histórico registra regras diferentes. Só comunique critérios documentados e vigentes.\n\n- Se: Pediram login, senha ou código\n  Próximo caminho: [credenciais]\n  Equipe — Continuar com o contexto já recebido.\n\n- Se: Pediu para não participar\n  Próximo caminho: [parar]\n  Equipe — Continuar com o contexto já recebido.",
      "blocks": [
        {
          "id": "mari-block-alavancagem",
          "kind": "text",
          "text": "Você quer saber como escolhem quem participa ou se tem campanha aberta agora?"
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
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-8",
      "from": "mari-group-1",
      "to": "mari-path-atraso",
      "label": "[atraso] Aguardando resposta ou volta do suporte",
      "color": "#a3e635",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-9",
      "from": "mari-group-1",
      "to": "mari-path-parar",
      "label": "[parar] Pessoa não quer continuar ou pede para sair",
      "color": "#a3e635",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-10",
      "from": "mari-group-2",
      "to": "mari-path-atualizar",
      "label": "[atualizar] Pegar o indicador atualizado",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-11",
      "from": "mari-group-2",
      "to": "mari-path-versao",
      "label": "[versao] Indicador diferente da live",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-12",
      "from": "mari-group-2",
      "to": "mari-path-instalar",
      "label": "[instalar] Baixar e instalar o script",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-13",
      "from": "mari-group-2",
      "to": "mari-path-celular",
      "label": "[celular] Indicador no celular",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-14",
      "from": "mari-group-2",
      "to": "mari-path-corretora",
      "label": "[corretora] Compatibilidade com outra corretora",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-15",
      "from": "mari-group-2",
      "to": "mari-path-otc",
      "label": "[otc] Ativo OTC ausente ou gráfico diferente",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-16",
      "from": "mari-group-2",
      "to": "mari-path-resultados",
      "label": "[resultados] Perdas e dúvidas sobre resultados",
      "color": "#fbbf24",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-17",
      "from": "mari-group-3",
      "to": "mari-path-cadastro",
      "label": "[cadastro] Cadastro, login e link da Avalon",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-18",
      "from": "mari-group-3",
      "to": "mari-path-id",
      "label": "[id] Encontrar o ID da Avalon",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-19",
      "from": "mari-group-3",
      "to": "mari-path-conta-antiga",
      "label": "[conta-antiga] Conta antiga e elegibilidade",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-20",
      "from": "mari-group-3",
      "to": "mari-path-verificacao",
      "label": "[verificacao] Documentos e verificação da conta",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-21",
      "from": "mari-group-3",
      "to": "mari-path-demo",
      "label": "[demo] Conta demo e conta real",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-22",
      "from": "mari-group-3",
      "to": "mari-path-suspensa",
      "label": "[suspensa] Conta suspensa ou restrita",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-23",
      "from": "mari-group-3",
      "to": "mari-path-credenciais",
      "label": "[credenciais] Pedido de senha ou código",
      "color": "#a78bfa",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-24",
      "from": "mari-group-4",
      "to": "mari-path-live",
      "label": "[live] Horários, comunidade e link da live",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-25",
      "from": "mari-group-4",
      "to": "mari-path-live-erro",
      "label": "[live-erro] Live ou Meet não abre",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-26",
      "from": "mari-group-4",
      "to": "mari-path-grupo-erro",
      "label": "[grupo-erro] Grupo ou link do Telegram não abre",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-27",
      "from": "mari-group-4",
      "to": "mari-path-sinais",
      "label": "[sinais] Horário dos sinais, tempo do gráfico e expiração",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-28",
      "from": "mari-group-4",
      "to": "mari-path-aprender",
      "label": "[aprender] Aulas para começar e acompanhar operações",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-29",
      "from": "mari-group-4",
      "to": "mari-path-planilha",
      "label": "[planilha] Planilha e gerenciamento de banca",
      "color": "#22d3ee",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-30",
      "from": "mari-group-5",
      "to": "mari-path-planos",
      "label": "[planos] Preço e acesso básico ou completo",
      "color": "#fb7185",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-31",
      "from": "mari-group-5",
      "to": "mari-path-particular",
      "label": "[particular] Aula particular ou mini curso mencionado a…",
      "color": "#fb7185",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-32",
      "from": "mari-group-5",
      "to": "mari-path-curso",
      "label": "[curso] Acesso ao curso ou à compra",
      "color": "#fb7185",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-33",
      "from": "mari-group-5",
      "to": "mari-path-painel",
      "label": "[painel] Cinco Estratégias e acesso ao Visor Trader",
      "color": "#fb7185",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-34",
      "from": "mari-group-5",
      "to": "mari-path-estorno",
      "label": "[estorno] Estorno da compra do indicador",
      "color": "#fb7185",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-35",
      "from": "mari-group-6",
      "to": "mari-path-bonus",
      "label": "[bonus] Bônus após comprar o indicador",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-36",
      "from": "mari-group-6",
      "to": "mari-path-deposito",
      "label": "[deposito] Depósito mínimo ou depósito pendente",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-37",
      "from": "mari-group-6",
      "to": "mari-path-cupom",
      "label": "[cupom] Cupom de depósito e código inválido",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-38",
      "from": "mari-group-6",
      "to": "mari-path-cupom-pos",
      "label": "[cupom-pos] Depósito concluído sem cupom",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-39",
      "from": "mari-group-6",
      "to": "mari-path-bonus-saldo",
      "label": "[bonus-saldo] Bônus de depósito não entrou ou sumiu",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-40",
      "from": "mari-group-6",
      "to": "mari-path-pix",
      "label": "[pix] Pix promocional ou devolução anunciada",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-41",
      "from": "mari-group-6",
      "to": "mari-path-rollover",
      "label": "[rollover] Rollover e regras do bônus",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-42",
      "from": "mari-group-6",
      "to": "mari-path-saque",
      "label": "[saque] Saque bloqueado ou pendente",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
    },
    {
      "id": "mari-edge-43",
      "from": "mari-group-6",
      "to": "mari-path-alavancagem",
      "label": "[alavancagem] Alavancagem ou dobra de banca",
      "color": "#fb923c",
      "animated": true,
      "dashed": false,
      "weak": true
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
