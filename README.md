# flui.

**Estúdio visual de fluxos de mensagens.** Um canvas infinito para desenhar conversas com balões de texto, áudio, foto e vídeo — conectados por linhas que você pode colorir, rotular e testar antes de publicar.

> Demo online: **https://fluiflow.space**

---

## O que dá para fazer

- **Vários fluxos salvos** — cada fluxo funciona como um arquivo separado, com nome, conteúdo e viewport próprios. Clique no **logo do flui** (ou pressione `F`) para abrir a barra lateral de fluxos e criar um novo, voltar a qualquer anterior, duplicar, renomear ou excluir. O salvamento é automático, mas você também pode salvar na hora clicando em **salvo** ou com `⌘S` / `Ctrl+S`.
- **Canvas livre** — arraste o fundo para navegar, role para dar zoom, use `espaço + arrastar` para mover com precisão. Em fluxos grandes, a visão geral compacta mostra os caminhos e grupos; aproxime para ler as mensagens. Tudo é salvo automaticamente no navegador.
- **Balões de mensagem** — texto, áudio, foto, vídeo, condição e espera. Adicione pela barra lateral, pelo duplo clique no canvas ou soltando uma conexão no vazio.
- **Conteúdo em camadas** — um mesmo balão pode misturar texto, áudio, foto e vídeo. No painel da direita, use as setas para organizar a ordem dos blocos. O áudio não exige descrição.
- **Biblioteca de mídias** — envie fotos, áudios e vídeos uma vez para a biblioteca (ou solte os arquivos nela), depois arraste qualquer mídia para dentro de um balão. No celular, toque na mídia para inserir no balão selecionado. Atalho: `M`.
- **Arraste do computador** — solte fotos, áudios, vídeos e arquivos `.txt` direto no canvas para criar um balão (ou direto em um balão para adicionar conteúdo). Um `.txt` vira um bloco de texto com o conteúdo do arquivo.
- **Conexões vivas** — arraste a alça à direita de um balão para outro. Cada ligação tem cor, rótulo, animação de fluxo e estilo tracejado.
- **Inspector completo** — edite título, blocos de conteúdo, cor de destaque, cor da ligação e conexões no painel à direita.
- **Mídia de verdade** — envie imagens, vídeos e áudios (ou grave um áudio direto do microfone). Os arquivos ficam no IndexedDB do navegador.
- **Copiloto DeepSeek** — um chat com contexto do fluxo inteiro (balões, mensagens, caminhos e foco atual) para perguntar o que responder, revisar mensagens e destravar caminhos. Ele não finge analisar áudios/fotos/vídeos; trabalha com os textos, tipos e nomes de arquivo. O Copiloto também **cria, edita e exclui balões e ligações** quando você pede as alterações — o app aplica automaticamente e oferece desfazer. Para alterações grandes, peça um grupo por vez. Abra com `K`, conecte sua chave DeepSeek e use uma das skills rápidas. Você pode anexar arquivos de texto, PDF, DOCX e XLSX no chat — o conteúdo é extraído no navegador e enviado junto com a sua pergunta para a DeepSeek.
- **Prévia interativa** — percorra o fluxo dentro de um celular, com o conteúdo composto de cada balão. Caminhos com uma única saída seguem sozinhos; onde há uma condição, você escolhe a resposta.
- **Galeria de modelos** — quatro fluxos prontos (boas-vindas, recuperação de carrinho, qualificação de lead e o rascunho **Suporte Mari Trader — 30 dias** em tom natural, com 37 caminhos e notas internas), além de uma folha em branco. O rascunho da Mari também é adicionado automaticamente à lista de fluxos salvos na primeira abertura. Aplicar um modelo cria um novo fluxo salvo, sem sobrescrever o atual. A biblioteca de mídias vem com exemplos prontos.
- **Atalhos** — desfazer/refazer, duplicar, excluir, enquadrar, zoom de 100%, biblioteca (`M`), fluxos (`F`), salvar (`⌘S`) e mais. Pressione `?` ou abra o menu `···` → “Atalhos e dicas”.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

Build de produção:

```bash
npm run build       # gera em docs/
npm run serve       # pré-visualiza o build em http://localhost:4173
```

## Stack

- React 19 + Vite
- SVG para as ligações e HTML/CSS para o canvas
- IndexedDB para mídias enviadas, `localStorage` para a biblioteca de fluxos, o fluxo ativo e os viewports
- Zero backend — tudo acontece no navegador

## Estrutura

```
src/
  App.jsx                 orquestra canvas, atalhos e estado
  data/flowData.js        tipos, paleta, modelos e helpers
  lib/                    histórico, mídia, geometria e persistência
  components/             topbar, balões, inspector, prévia, modais
public/media/             mídia dos modelos demonstrativos
docs/                     build publicado no GitHub Pages
```

## Notas

- O link **Exportar fluxo atual** salva a estrutura do fluxo, os blocos e a biblioteca. Arquivos enviados pelo usuário ficam no IndexedDB local e não são embutidos no JSON. **Importar como novo fluxo** cria um fluxo separado, preservando o atual.
- A gravação de áudio e o microfone exigem `https://` ou `localhost`.
- O Copiloto usa a API oficial da DeepSeek direto do navegador. É necessário colar uma chave em [platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys); ela fica apenas no `sessionStorage` desta aba e não é enviada para nenhum servidor do flui. O fluxo, a conversa e o conteúdo dos arquivos anexados são enviados à DeepSeek somente quando você pede uma resposta.
- Anexos do Copiloto: **PDF, DOCX, XLSX e arquivos de texto** (TXT, MD, CSV, JSON, HTML etc.), até 5 arquivos de 20 MB por mensagem. O texto é extraído no navegador e limitado a ~65 mil caracteres por envio. PDFs escaneados sem texto selecionável não podem ser lidos; imagens, áudios e vídeos não são suportados pelo modelo de texto da DeepSeek.
- Cada fluxo é salvo no `localStorage` deste navegador, com seu próprio viewport. Para usar em outro computador, exporte/importe cada JSON e envie novamente as mídias locais. Limpar os dados do site apaga os fluxos e as mídias enviadas.
- As imagens de demonstração vêm do Unsplash. O áudio dos modelos é sintetizado localmente.

Feito para fluxos que fluem. ✦
