import {
  BLOCK_META, SEED_LIBRARY, uid,
} from '../data/flowData'

export const MESSAGE_TYPES = new Set(['text', 'audio', 'image', 'video'])
export const MEDIA_KINDS = new Set(['audio', 'image', 'video'])
export const BLOCK_KINDS = new Set(['text', 'audio', 'image', 'video'])

const hashString = (value) => {
  let hash = 2166136261
  const str = String(value || '')
  for (let i = 0; i < str.length; i += 1) {
    hash ^= str.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

export const isMessageNode = (node) => Boolean(node && MESSAGE_TYPES.has(node.type))

export function makeTextBlock(text = '') {
  return { id: uid('blk'), kind: 'text', text }
}

export function makeMediaBlock(kind, asset = null) {
  return {
    id: uid('blk'),
    kind,
    mediaId: asset?.mediaId || null,
    media: asset?.media ? { ...asset.media } : null,
  }
}

export function normalizeBlock(raw, fallbackKind = 'text') {
  if (!raw || !BLOCK_KINDS.has(raw.kind)) return null
  if (raw.kind === 'text') {
    return {
      id: typeof raw.id === 'string' ? raw.id : uid('blk'),
      kind: 'text',
      text: String(raw.text || ''),
    }
  }
  const hasMedia = Boolean(raw.mediaId || raw.media?.src || raw.media?.name)
  return {
    id: typeof raw.id === 'string' ? raw.id : uid('blk'),
    kind: raw.kind || fallbackKind,
    mediaId: raw.mediaId || null,
    media: hasMedia && raw.media ? { ...raw.media } : null,
  }
}

export function blockHasMedia(block) {
  return Boolean(block?.mediaId || block?.media?.src || block?.media?.name)
}

export function blockSrc(block, resolved) {
  return resolved || block?.media?.src || null
}

export function getBlockKinds(node) {
  return [...new Set((node?.blocks || []).map((b) => b.kind))]
}

export function mediaKindFromFile(file) {
  const type = String(file?.type || '').toLowerCase()
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if (type.startsWith('audio/')) return 'audio'
  const name = String(file?.name || '').toLowerCase()
  if (/\.(png|jpe?g|webp|gif|avif|svg)$/.test(name)) return 'image'
  if (/\.(mp4|webm|mov|m4v|ogv)$/.test(name)) return 'video'
  if (/\.(mp3|m4a|aac|wav|ogg|oga|webm)$/.test(name)) return 'audio'
  return null
}

export function assetKey(asset) {
  if (!asset) return null
  if (asset.mediaId) return `id:${asset.mediaId}`
  if (asset.media?.src) return `src:${asset.media.src}`
  return `asset:${asset.id}`
}

export function makeLibraryAsset({ kind, mediaId = null, media, label, createdAt = Date.now(), seed = false }) {
  const name = media?.name || label || BLOCK_META[kind]?.label || 'Mídia'
  return {
    id: mediaId ? `asset-${mediaId}` : `src-${hashString(media?.src || name)}`,
    kind,
    label: label || name.replace(/\.[^.]+$/, ''),
    name,
    mediaId,
    media: media ? { ...media } : null,
    createdAt,
    seed,
  }
}

export function collectAssetsFromNodes(nodes) {
  const assets = []
  for (const node of nodes || []) {
    for (const block of node.blocks || []) {
      if (!MEDIA_KINDS.has(block.kind)) continue
      if (!blockHasMedia(block)) continue
      assets.push(makeLibraryAsset({
        kind: block.kind,
        mediaId: block.mediaId || null,
        media: block.media || { name: 'Mídia', type: '' },
        createdAt: 0,
      }))
    }
  }
  return assets
}

export function mergeLibraries(...libraries) {
  const map = new Map()
  for (const library of libraries) {
    for (const asset of library || []) {
      if (!asset || !MEDIA_KINDS.has(asset.kind)) continue
      if (!asset.mediaId && !asset.media?.src && !asset.media?.name) continue
      const key = assetKey(asset)
      if (!key) continue
      if (!map.has(key)) {
        const name = asset.name || asset.media?.name || asset.label || 'Mídia'
        map.set(key, {
          ...asset,
          id: asset.id || `asset-${hashString(key)}`,
          label: asset.label || String(name).replace(/\.[^.]+$/, ''),
          name,
          media: asset.media ? { ...asset.media } : null,
        })
      } else {
        const prev = map.get(key)
        // Preserve the nicer seed label, but enrich missing fields.
        map.set(key, {
          ...prev,
          ...asset,
          label: prev.label || asset.label,
          media: { ...(prev.media || {}), ...(asset.media || {}) },
        })
      }
    }
  }
  return Array.from(map.values())
}

export function normalizeDoc(input) {
  if (!input || !Array.isArray(input.nodes)) return input
  const nodes = input.nodes.map((node) => {
    if (!isMessageNode(node)) {
      return { ...node, blocks: [] }
    }
    let blocks = Array.isArray(node.blocks)
      ? node.blocks.map((block) => normalizeBlock(block)).filter(Boolean)
      : []
    const hasLegacyMedia = Boolean(node.mediaId || node.media)
    const hasLegacyText = Boolean(node.text)
    if ((!blocks.length || (blocks.length < 2 && !blocks.some((b) => b.kind !== 'text'))) && (hasLegacyMedia || hasLegacyText)) {
      const migrated = []
      if (node.type === 'text') {
        migrated.push(makeTextBlock(node.text || ''))
      } else {
        migrated.push(normalizeBlock({
          id: uid('blk'),
          kind: node.type,
          mediaId: node.mediaId || null,
          media: node.media || null,
        }))
        // audio captions were only descriptions; drop them to keep audio lean
        if (node.text && node.type !== 'audio') migrated.push(makeTextBlock(node.text))
      }
      // Prefer legacy migration only when it adds content not already represented.
      if (!blocks.length) blocks = migrated
    }
    // Ensure every block has a stable id.
    blocks = blocks.map((block) => ({ ...block, id: block.id || uid('blk') }))
    const { text, media, mediaId, ...rest } = node
    return { ...rest, blocks }
  })

  const library = mergeLibraries(
    SEED_LIBRARY,
    input.library || [],
    collectAssetsFromNodes(nodes),
  )

  return { ...input, version: 3, nodes, library }
}

export function assetToBlock(asset) {
  return makeMediaBlock(asset.kind, asset)
}

export function findEmptyMediaBlock(blocks, kind) {
  return (blocks || []).find((block) => block.kind === kind && !blockHasMedia(block)) || null
}

export function describeBlock(block) {
  if (!block) return 'bloco'
  if (block.kind === 'text') return block.text?.trim()?.slice(0, 46) || 'Texto vazio'
  return block.media?.name || BLOCK_META[block.kind]?.label || 'Mídia'
}
