export const EDGE_COLORS = [
  { name: 'Violeta', value: '#8b5cf6' },
  { name: 'Ciano', value: '#22d3ee' },
  { name: 'Lima', value: '#a3e635' },
  { name: 'Âmbar', value: '#fbbf24' },
  { name: 'Rosa', value: '#fb7185' },
  { name: 'Azul', value: '#60a5fa' },
  { name: 'Pêssego', value: '#fb923c' },
  { name: 'Orquídea', value: '#e879f9' },
]

export const NODE_ACCENTS = [
  '#a78bfa', '#67e8f9', '#bef264', '#fcd34d',
  '#fda4af', '#93c5fd', '#fdba74', '#f0abfc',
]

export const NODE_TYPES = {
  text: { label: 'Texto', kicker: 'Mensagem', accent: '#a78bfa' },
  audio: { label: 'Áudio', kicker: 'Mensagem de voz', accent: '#67e8f9' },
  image: { label: 'Foto', kicker: 'Mídia', accent: '#fcd34d' },
  video: { label: 'Vídeo', kicker: 'Mídia', accent: '#93c5fd' },
  condition: { label: 'Condição', kicker: 'Ramificação', accent: '#bef264' },
  delay: { label: 'Espera', kicker: 'Automação', accent: '#fda4af' },
  start: { label: 'Início', kicker: 'Gatilho', accent: '#a3e635' },
}

export const ESTIMATED_HEIGHT = {
  text: 188,
  audio: 286,
  image: 390,
  video: 372,
  condition: 170,
  delay: 142,
  start: 58,
}

export const TYPE_ORDER = ['text', 'audio', 'image', 'video', 'condition', 'delay']

const asset = (file) => new URL(`media/${file}`, document.baseURI).href

const node = (id, type, x, y, props = {}) => ({
  id,
  type,
  x,
  y,
  w: type === 'start' ? 156 : 304,
  accent: NODE_TYPES[type].accent,
  title: '',
  text: '',
  ...props,
})

const edge = (id, from, to, color, props = {}) => ({
  id,
  from,
  to,
  color,
  label: '',
  animated: true,
  dashed: false,
  ...props,
})

const welcomeNodes = [
  node('w-start', 'start', 24, 440),
  node('w-hello', 'text', 224, 402, {
    accent: '#a78bfa',
    title: 'Boas-vindas',
    text: 'Oi! Que bom te ver por aqui 👋\nEu sou a Ana, da Casa Nômade. Prepara um café e vem comigo.',
  }),
  node('w-audio', 'audio', 584, 340, {
    accent: '#67e8f9',
    title: 'Um recado rápido',
    text: 'Dá o play, é rapidinho.',
    media: { src: asset('welcome.m4a'), name: 'recado-da-ana.m4a', type: 'audio/mp4' },
  }),
  node('w-condition', 'condition', 944, 414, {
    accent: '#bef264',
    title: 'Oferta de boas-vindas',
    text: 'Quer conhecer o Blend da Casa com 10% off?',
  }),
  node('w-image', 'image', 1304, 170, {
    accent: '#fcd34d',
    title: 'Blend da Casa',
    text: 'Torra média, notas de cacau e caramelo. Moído na hora.',
    media: { src: asset('coffee.webp'), name: 'blend-da-casa.webp', type: 'image/webp' },
  }),
  node('w-coupon', 'text', 1664, 166, {
    accent: '#a78bfa',
    title: 'Cupom liberado',
    text: 'Use **BEMVINDA10** no checkout. Válido até domingo à meia-noite.',
  }),
  node('w-delay', 'delay', 1304, 620, {
    accent: '#fda4af',
    title: 'Se não responder',
    delay: { value: 2, unit: 'horas' },
  }),
  node('w-last', 'text', 1664, 604, {
    accent: '#93c5fd',
    title: 'Última chance',
    text: 'Te guardei o cupom por mais 24h. Quando quiser, é só me chamar ☕',
  }),
]

const welcomeEdges = [
  edge('w-e1', 'w-start', 'w-hello', '#8b5cf6'),
  edge('w-e2', 'w-hello', 'w-audio', '#22d3ee', { label: 'escuta isso' }),
  edge('w-e3', 'w-audio', 'w-condition', '#a3e635'),
  edge('w-e4', 'w-condition', 'w-image', '#a3e635', { label: 'Sim, quero' }),
  edge('w-e5', 'w-image', 'w-coupon', '#fbbf24', { label: 'ver oferta' }),
  edge('w-e6', 'w-condition', 'w-delay', '#fb7185', { label: 'Agora não', dashed: true }),
  edge('w-e7', 'w-delay', 'w-last', '#60a5fa', { label: '2h depois', dashed: true }),
]

const cartNodes = [
  node('c-start', 'start', 24, 442),
  node('c-delay', 'delay', 228, 434, {
    accent: '#fda4af',
    title: 'Deixa esfriar',
    delay: { value: 30, unit: 'minutos' },
  }),
  node('c-text', 'text', 588, 390, {
    accent: '#a78bfa',
    title: 'Carrinho abandonado',
    text: 'Você deixou o Minimal 01 no carrinho 👀\nEle ainda está reservado no seu nome.',
  }),
  node('c-video', 'video', 948, 330, {
    accent: '#93c5fd',
    title: 'Um detalhe a mais',
    text: 'Veja o Minimal 01 em movimento.',
    media: { src: asset('minimal-promo.webm'), poster: asset('minimal-poster.webp'), name: 'minimal-01-promo.webm', type: 'video/webm' },
  }),
  node('c-condition', 'condition', 1308, 420, {
    accent: '#bef264',
    title: 'Bora finalizar?',
    text: 'Posso liberar um cupom especial pra você fechar hoje.',
  }),
  node('c-yes', 'text', 1668, 240, {
    accent: '#bef264',
    title: 'Cupom aplicado',
    text: 'Fechou! Use **VOLTEI10** e o Minimal 01 sai por R$ 459,00. A reserva expira em 15 min.',
  }),
  node('c-no', 'text', 1668, 610, {
    accent: '#fda4af',
    title: 'Tudo bem',
    text: 'Sem pressão. Deixei sua sacola guardada por mais 24h. Se mudar de ideia, é só responder aqui 💛',
  }),
]

const cartEdges = [
  edge('c-e1', 'c-start', 'c-delay', '#fb923c'),
  edge('c-e2', 'c-delay', 'c-text', '#fb7185', { label: '30 min', dashed: true }),
  edge('c-e3', 'c-text', 'c-video', '#60a5fa', { label: 'olha só' }),
  edge('c-e4', 'c-video', 'c-condition', '#a3e635'),
  edge('c-e5', 'c-condition', 'c-yes', '#a3e635', { label: 'Quero fechar' }),
  edge('c-e6', 'c-condition', 'c-no', '#fb7185', { label: 'Agora não', dashed: true }),
]

const leadNodes = [
  node('l-start', 'start', 24, 420),
  node('l-hello', 'text', 228, 388, {
    accent: '#a78bfa',
    title: 'Primeiro contato',
    text: 'Antes de tudo, prazer! Sou o Léo, do Norte Studio. A gente desenha marcas que vendem.',
  }),
  node('l-audio', 'audio', 588, 336, {
    accent: '#67e8f9',
    title: 'Me conta rapidinho',
    text: 'Só quero entender seu momento antes de te mostrar qualquer coisa.',
    media: { src: asset('lead.m4a'), name: 'recado-do-leo.m4a', type: 'audio/mp4' },
  }),
  node('l-condition', 'condition', 948, 416, {
    accent: '#bef264',
    title: 'Qualificação',
    text: 'Você já vende pela internet hoje?',
  }),
  node('l-yes', 'text', 1308, 228, {
    accent: '#bef264',
    title: 'Bom sinal',
    text: 'Show! Então você já tem produto e audiência. O próximo passo é organizar a jornada de compra.',
  }),
  node('l-image', 'image', 1668, 184, {
    accent: '#fcd34d',
    title: 'Case rápido',
    text: 'A Casa Nômade reposicionou a marca e triplicou a conversão em 60 dias.',
    media: { src: asset('coffee.webp'), name: 'case-casa-nomade.webp', type: 'image/webp' },
  }),
  node('l-no', 'text', 1308, 628, {
    accent: '#fda4af',
    title: 'Tudo começa agora',
    text: 'Sem estresse. A gente monta seu primeiro funil do zero, no seu ritmo.',
  }),
]

const leadEdges = [
  edge('l-e1', 'l-start', 'l-hello', '#8b5cf6'),
  edge('l-e2', 'l-hello', 'l-audio', '#22d3ee'),
  edge('l-e3', 'l-audio', 'l-condition', '#a3e635'),
  edge('l-e4', 'l-condition', 'l-yes', '#a3e635', { label: 'Sim, vendo' }),
  edge('l-e5', 'l-yes', 'l-image', '#fbbf24', { label: 'ver case' }),
  edge('l-e6', 'l-condition', 'l-no', '#fb7185', { label: 'Ainda não', dashed: true }),
]

export const TEMPLATES = [
  {
    id: 'welcome',
    name: 'Boas-vindas que encantam',
    short: 'Casa Nômade',
    description: 'Receba, aqueça e converta com áudio, foto e oferta.',
    tag: 'E-commerce',
    palette: ['#8b5cf6', '#22d3ee', '#fbbf24'],
    title: 'Boas-vindas · Casa Nômade',
    nodes: welcomeNodes,
    edges: welcomeEdges,
  },
  {
    id: 'cart',
    name: 'Recuperação de carrinho',
    short: 'Rota 7',
    description: 'Espera estratégica, vídeo do produto e cupom na hora certa.',
    tag: 'Vendas',
    palette: ['#fb7185', '#a3e635', '#60a5fa'],
    title: 'Carrinho abandonado · Rota 7',
    nodes: cartNodes,
    edges: cartEdges,
  },
  {
    id: 'lead',
    name: 'Qualificação de lead',
    short: 'Norte Studio',
    description: 'Uma conversa leve que separa curioso de cliente.',
    tag: 'Serviços',
    palette: ['#a78bfa', '#fbbf24', '#fb923c'],
    title: 'Qualificação de lead · Norte Studio',
    nodes: leadNodes,
    edges: leadEdges,
  },
]

export function createDocFromTemplate(template) {
  const clone = template ? structuredClone(template) : null
  return {
    version: 1,
    templateId: clone?.id || 'blank',
    title: clone?.title || 'Fluxo sem título',
    nodes: clone?.nodes || [
      node('blank-start', 'start', 420, 360),
    ],
    edges: clone?.edges || [],
  }
}

export function createBlankDoc() {
  return createDocFromTemplate(null)
}

export function uid(prefix = 'id') {
  return `${prefix}-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`
}

export function nodeHeight(node) {
  return ESTIMATED_HEIGHT[node.type] || 200
}

export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
