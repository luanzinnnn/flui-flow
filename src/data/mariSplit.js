import { MARI_SUPPORT_TEMPLATE } from './mariFlow.js'

export const MARI_PACK_REVISION = 1
export const MARI_PACK_MARKER = 'flui:mari-split-pack:v1'
export const MARI_MAP_FLOW_ID = 'mari-pack-map'
export const MARI_OLD_TEMPLATE_ID = 'mari-suporte-30d'

const clone = (value) => JSON.parse(JSON.stringify(value))
const base = MARI_SUPPORT_TEMPLATE
const baseNodes = Array.isArray(base.nodes) ? base.nodes : []
const baseEdges = Array.isArray(base.edges) ? base.edges : []
const nodeById = new Map(baseNodes.map((node) => [node.id, node]))
const groupNodes = baseNodes
  .filter((node) => node.id.startsWith('mari-group-'))
  .sort((a, b) => Number(a.id.split('-').pop()) - Number(b.id.split('-').pop()))

const groupForPath = new Map()
for (const edge of baseEdges) {
  if (edge.from.startsWith('mari-group-') && edge.to.startsWith('mari-path-')) {
    groupForPath.set(edge.to, edge.from)
  }
}

const nameFromGroup = (title) => String(title || '').replace(/^Grupo\s+\d+\s*·\s*/i, '')
const shortPathLabel = (title) => (String(title || '').match(/^\[[^\]]+\]/)?.[0] || String(title || '')).slice(0, 40)

export const MARI_GROUP_DEFS = groupNodes.map((group, index) => {
  const number = Number(group.id.split('-').pop())
  const numberText = String(number).padStart(2, '0')
  return {
    number,
    numberText,
    groupNodeId: group.id,
    groupTitle: group.title,
    groupName: nameFromGroup(group.title),
    accent: group.accent,
    flowId: `mari-flow-${numberText}`,
    flowTitle: `Mari ${numberText} · ${nameFromGroup(group.title)}`,
    pathIds: baseEdges
      .filter((edge) => edge.from === group.id && edge.to.startsWith('mari-path-'))
      .map((edge) => edge.to),
    index,
  }
})

const defByGroupNode = new Map(MARI_GROUP_DEFS.map((def) => [def.groupNodeId, def]))

const pathNodeFor = (id) => nodeById.get(id)
const groupForPathId = (id) => defByGroupNode.get(groupForPath.get(id))

function buildGroupDoc(def) {
  const groupNode = nodeById.get(def.groupNodeId)
  const pathSet = new Set(def.pathIds)
  const hub = {
    ...clone(groupNode),
    x: 50,
    y: 150,
    note: groupNode.note || `Grupo ${def.numberText} do fluxo Mari · 30 dias.`,
  }
  const start = {
    id: 'mari-start',
    type: 'start',
    x: 50,
    y: 40,
    w: 156,
    accent: '#a3e635',
    title: '',
    blocks: [],
  }
  const pathNodes = def.pathIds.map((id, index) => {
    const node = clone(pathNodeFor(id))
    node.x = 60 + (index % 3) * 350
    node.y = 390 + Math.floor(index / 3) * 430
    return node
  })
  const edges = [{
    id: `${def.flowId}-start`,
    from: 'mari-start',
    to: hub.id,
    label: 'escolher assunto',
    color: def.accent,
    animated: false,
    dashed: false,
  }]
  for (const pathNode of pathNodes) {
    edges.push({
      id: `${def.flowId}-hub-${pathNode.id}`,
      from: hub.id,
      to: pathNode.id,
      label: shortPathLabel(pathNode.title),
      hideLabel: true,
      color: def.accent,
      animated: false,
      dashed: false,
    })
  }

  // Ligações que continuam dentro do mesmo grupo.
  const within = baseEdges.filter((edge) => (
    edge.from.startsWith('mari-path-')
    && pathSet.has(edge.from)
    && pathSet.has(edge.to)
  ))
  within.forEach((edge, index) => {
    edges.push({
      ...clone(edge),
      id: `${def.flowId}-within-${index + 1}`,
      animated: true,
    })
  })

  // Cada saída para outro grupo vira um cartão-ponte clicável.
  const cross = baseEdges.filter((edge) => (
    edge.from.startsWith('mari-path-')
    && pathSet.has(edge.from)
    && edge.to.startsWith('mari-path-')
    && !pathSet.has(edge.to)
  ))
  const references = cross.map((edge, index) => {
    const targetNode = pathNodeFor(edge.to)
    const targetGroup = groupForPathId(edge.to)
    if (!targetNode || !targetGroup) return null
    const refId = `${def.flowId}-ref-${index + 1}`
    const ref = {
      id: refId,
      type: 'reference',
      x: 1110,
      y: 390 + index * 190,
      w: 304,
      accent: targetGroup.accent,
      title: targetNode.title,
      targetFlowId: targetGroup.flowId,
      targetFlowTitle: targetGroup.flowTitle,
      targetNodeId: targetNode.id,
      targetNodeTitle: targetNode.title,
      sourceNodeId: edge.from,
      note: `Atalho para o fluxo ${targetGroup.flowTitle}, caminho ${targetNode.title}. O atendimento continua lá.`,
    }
    edges.push({
      id: `${def.flowId}-cross-${index + 1}`,
      from: edge.from,
      to: refId,
      label: edge.label,
      color: edge.color || targetGroup.accent,
      animated: false,
      dashed: true,
    })
    return ref
  }).filter(Boolean)

  return {
    version: 3,
    templateId: def.flowId,
    mariPackRevision: MARI_PACK_REVISION,
    title: def.flowTitle,
    nodes: [start, hub, ...pathNodes, ...references],
    edges,
    library: [],
  }
}

export const MARI_GROUP_TEMPLATES = MARI_GROUP_DEFS.map(buildGroupDoc)
export const MARI_GROUP_TEMPLATE_BY_ID = new Map(MARI_GROUP_TEMPLATES.map((doc) => [doc.templateId, doc]))

const mapRefs = MARI_GROUP_DEFS.map((def, index) => ({
  id: `mari-map-ref-${def.numberText}`,
  type: 'reference',
  x: 660 + (index % 3) * 350,
  y: 150 + Math.floor(index / 3) * 250,
  w: 304,
  accent: def.accent,
  title: def.groupTitle,
  targetFlowId: def.flowId,
  targetFlowTitle: def.flowTitle,
  targetNodeId: def.groupNodeId,
  targetNodeTitle: def.groupTitle,
  description: `${def.pathIds.length} caminhos de atendimento`,
  note: `Abre o fluxo ${def.flowTitle}.`,
}))

const mapHub = {
  id: 'mari-map-hub',
  type: 'condition',
  x: 220,
  y: 260,
  w: 304,
  accent: '#c4b5fd',
  title: 'Mapa dos grupos',
  text: 'Cada grupo agora é um fluxo separado. Abra um cartão para entrar no grupo; os atalhos dentro de cada fluxo levam aos outros grupos.',
  note: 'Mapa do pacote Mari · 30 dias. Cada cartão abre um fluxo separado; os fluxos se conectam pelos atalhos.',
}

const mapStart = {
  id: 'mari-map-start',
  type: 'start',
  x: 40,
  y: 300,
  w: 156,
  accent: '#a3e635',
  title: '',
  blocks: [],
}

export const MARI_MAP_TEMPLATE = {
  version: 3,
  templateId: MARI_MAP_FLOW_ID,
  mariPackRevision: MARI_PACK_REVISION,
  title: 'Mari · Mapa dos grupos',
  nodes: [mapStart, mapHub, ...mapRefs],
  edges: [
    {
      id: 'mari-map-start-edge',
      from: mapStart.id,
      to: mapHub.id,
      label: 'mapa',
      color: '#c4b5fd',
      animated: false,
      dashed: false,
    },
    ...MARI_GROUP_DEFS.map((def) => ({
      id: `mari-map-edge-${def.numberText}`,
      from: mapHub.id,
      to: `mari-map-ref-${def.numberText}`,
      label: `${def.numberText} · ${def.groupName}`,
      hideLabel: true,
      color: def.accent,
      animated: false,
      dashed: false,
    })),
  ],
  library: [],
}

export function createMariPack() {
  return {
    map: clone(MARI_MAP_TEMPLATE),
    groups: MARI_GROUP_TEMPLATES.map(clone),
  }
}

export const MARI_EXPECTED_FLOW_IDS = [MARI_MAP_FLOW_ID, ...MARI_GROUP_DEFS.map((def) => def.flowId)]
