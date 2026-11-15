# flui.

**Estúdio visual de fluxos de mensagens.** Um canvas infinito para desenhar conversas com balões de texto, áudio, foto e vídeo — conectados por linhas que você pode colorir, rotular e testar antes de publicar.

> Demo online: **https://luanzinnnn.github.io/flui-flow/**

---

## O que dá para fazer

- **Canvas livre** — arraste o fundo para navegar, role para dar zoom, use `espaço + arrastar` para mover com precisão. Tudo é salvo automaticamente no navegador.
- **Balões de mensagem** — texto, áudio, foto, vídeo, condição e espera. Adicione pela barra lateral, pelo duplo clique no canvas ou soltando uma conexão no vazio.
- **Conteúdo em camadas** — um mesmo balão pode misturar texto, áudio, foto e vídeo. No painel da direita, use as setas para organizar a ordem dos blocos. O áudio não exige descrição.
- **Biblioteca de mídias** — envie fotos, áudios e vídeos uma vez para a biblioteca (ou solte os arquivos nela), depois arraste qualquer mídia para dentro de um balão. No celular, toque na mídia para inserir no balão selecionado. Atalho: `M`.
- **Conexões vivas** — arraste a alça à direita de um balão para outro. Cada ligação tem cor, rótulo, animação de fluxo e estilo tracejado.
- **Inspector completo** — edite título, blocos de conteúdo, cor de destaque, cor da ligação e conexões no painel à direita.
- **Mídia de verdade** — envie imagens, vídeos e áudios (ou grave um áudio direto do microfone). Os arquivos ficam no IndexedDB do navegador.
- **Prévia interativa** — percorra o fluxo dentro de um celular, com o conteúdo composto de cada balão. Caminhos com uma única saída seguem sozinhos; onde há uma condição, você escolhe a resposta.
- **Galeria de modelos** — três fluxos prontos para editar (boas-vindas, recuperação de carrinho e qualificação de lead), além de uma folha em branco. A biblioteca de mídias vem com exemplos prontos.
- **Atalhos** — desfazer/refazer, duplicar, excluir, enquadrar, zoom de 100%, biblioteca (`M`) e mais. Pressione `?` ou abra o menu `···` → “Atalhos e dicas”.

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
- IndexedDB para mídias enviadas, `localStorage` para o fluxo e o viewport
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

- O link **Exportar JSON** salva a estrutura do fluxo, os blocos e a biblioteca. Arquivos enviados pelo usuário ficam no IndexedDB local e não são embutidos no JSON.
- A gravação de áudio e o microfone exigem `https://` ou `localhost`.
- Os fluxos são salvos no navegador. Para usar em outro computador, exporte/importe o JSON e envie novamente as mídias locais.
- As imagens de demonstração vêm do Unsplash. O áudio dos modelos é sintetizado localmente.

Feito para fluxos que fluem. ✦
