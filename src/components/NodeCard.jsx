import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight, AudioLines, Clock3, Film, GitBranch, GripVertical, Image as ImageIcon,
  ImagePlus, Layers, Mic, Play, Plus, SlidersHorizontal, Type, Video,
} from 'lucide-react'
import { BLOCK_META, NODE_TYPES } from '../data/flowData'
import { useMediaSrc } from '../lib/useMediaSrc'
import { getBlockKinds, isMessageNode } from '../lib/content'
import AudioPlayer from './AudioPlayer'
import RichText from './RichText'

const TYPE_ICON = {
  text: Type,
  audio: Mic,
  image: ImageIcon,
  video: Video,
  condition: GitBranch,
  delay: Clock3,
}

const BLOCK_ICON = {
  text: Type,
  audio: Mic,
  image: ImageIcon,
  video: Video,
}

function AutoGrowTextarea({ value, onChange, onBlur, placeholder }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(74, el.scrollHeight)}px`
    el.focus()
    el.setSelectionRange(el.value.length, el.value.length)
  }, [])

  return (
    <textarea
      ref={ref}
      className="node-edit node-block-edit"
      value={value}
      placeholder={placeholder}
      rows={2}
      spellCheck="false"
      data-no-drag
      onPointerDown={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        onChange(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = `${Math.max(74, e.target.scrollHeight)}px`
      }}
      onBlur={onBlur}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || ((e.metaKey || e.ctrlKey) && e.key === 'Enter')) {
          e.preventDefault()
          e.currentTarget.blur()
        }
      }}
    />
  )
}

function MediaMissing({ kind, node, block, onPickBlockMedia }) {
  const icons = { image: ImagePlus, video: Film, audio: AudioLines }
  const Icon = icons[kind] || ImagePlus
  const copy = {
    image: 'Adicionar uma foto',
    video: 'Adicionar um vídeo',
    audio: 'Adicionar um áudio',
  }[kind]
  return (
    <button
      type="button"
      className="node-media-missing"
      onClick={() => onPickBlockMedia(node, block)}
      data-no-drag
    >
      <span className="media-missing-icon"><Icon size={18} /></span>
      <span>{copy}</span>
      <span className="media-missing-hint">clique para escolher</span>
    </button>
  )
}

function VideoBlock({ src, poster }) {
  const [started, setStarted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => { setStarted(false) }, [src])

  return (
    <div className="node-video" data-no-drag>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        onPointerDown={(e) => e.stopPropagation()}
        onPlay={() => setStarted(true)}
      />
      {!started && (
        <button
          type="button"
          className="video-play"
          aria-label="Reproduzir vídeo"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            setStarted(true)
            videoRef.current?.play().catch(() => {})
          }}
        >
          <Play size={18} fill="currentColor" />
        </button>
      )}
      <span className="media-tag"><Play size={11} fill="currentColor" /> vídeo</span>
    </div>
  )
}

function MediaBlockView({ node, block, onPickBlockMedia }) {
  const resolved = useMediaSrc(block.mediaId)
  const src = resolved || block.media?.src

  if (!src) {
    return <MediaMissing kind={block.kind} node={node} block={block} onPickBlockMedia={onPickBlockMedia} />
  }

  if (block.kind === 'audio') {
    return (
      <div className="node-audio" style={{ '--accent': node.accent }}>
        <AudioPlayer src={src} accent={node.accent} />
      </div>
    )
  }

  if (block.kind === 'image') {
    return (
      <div className="node-photo">
        <img src={src} alt={block.media?.name || node.title || 'Foto do fluxo'} draggable="false" loading="lazy" />
        <span className="media-tag"><ImageIcon size={11} /> foto</span>
      </div>
    )
  }

  if (block.kind === 'video') {
    return <VideoBlock src={src} poster={block.media?.poster} />
  }

  return null
}

export default function NodeCard({
  node, selected, isTarget, connecting, editingBlockId, outEdges,
  onMeasure, onPointerDown, onStartConnect, onOpen, onDoubleClick,
  onStartEditBlock, onBlockTextChange, onEndEditBlock, onPickBlockMedia,
  onDropAsset,
}) {
  const ref = useRef(null)
  const dragDepth = useRef(0)
  const [dragOver, setDragOver] = useState(false)
  const start = node.type === 'start'
  const message = isMessageNode(node)
  const blocks = Array.isArray(node.blocks) ? node.blocks : []
  const kinds = getBlockKinds(node)
  const oneKind = kinds.length === 1 ? kinds[0] : null
  let Icon = TYPE_ICON[node.type] || Type
  let headerLabel = NODE_TYPES[node.type]?.label || 'Balão'
  if (message) {
    if (oneKind) {
      Icon = BLOCK_ICON[oneKind] || Layers
      headerLabel = NODE_TYPES[oneKind]?.label || BLOCK_META[oneKind]?.label || 'Conteúdo'
    } else if (kinds.length > 1) {
      Icon = Layers
      headerLabel = 'Conteúdo'
    } else {
      Icon = Layers
      headerLabel = 'Mensagem'
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      const box = entry.borderBoxSize?.[0]
      const w = Math.round(box?.inlineSize || el.offsetWidth)
      const h = Math.round(box?.blockSize || el.offsetHeight)
      onMeasure(node.id, w, h)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [node.id, onMeasure])

  const hasDragPayload = (e) => {
    const types = Array.from(e.dataTransfer?.types || [])
    return types.includes('application/x-flui-asset') || types.includes('text/plain')
  }

  const onDragEnter = (e) => {
    if (!message || !hasDragPayload(e)) return
    e.preventDefault()
    dragDepth.current += 1
    setDragOver(true)
  }
  const onDragOver = (e) => {
    if (!message || !hasDragPayload(e)) return
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'copy'
  }
  const onDragLeave = (e) => {
    if (!message) return
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setDragOver(false)
  }
  const onDrop = (e) => {
    if (!message) return
    e.preventDefault()
    e.stopPropagation()
    dragDepth.current = 0
    setDragOver(false)
    const assetId = e.dataTransfer.getData('application/x-flui-asset')
      || (e.dataTransfer.getData('text/plain')?.startsWith('flui:') ? e.dataTransfer.getData('text/plain').slice(5) : '')
    if (assetId) onDropAsset(node.id, assetId)
  }

  const cls = [
    'node',
    start ? 'node-start' : '',
    selected ? 'is-selected' : '',
    isTarget ? 'is-target' : '',
    connecting ? 'is-connecting' : '',
    editingBlockId ? 'is-editing' : '',
    dragOver ? 'is-drop-target' : '',
    node.type === 'condition' ? 'node-condition' : '',
    node.type === 'delay' ? 'node-delay' : '',
  ].filter(Boolean).join(' ')

  const handleDoubleClick = (e) => {
    if (e.target.closest('button, textarea, video, input')) return
    onDoubleClick(node)
  }

  return (
    <div
      ref={ref}
      className={cls}
      style={{
        transform: `translate3d(${node.x}px, ${node.y}px, 0)`,
        width: start ? 156 : 304,
        '--accent': node.accent,
      }}
      data-node-id={node.id}
      onPointerDown={(e) => onPointerDown(e, node)}
      onDoubleClick={handleDoubleClick}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {start ? (
        <div className="start-card">
          <span className="start-orb"><Play size={11} fill="currentColor" /></span>
          <span className="start-copy">
            <strong>Início</strong>
            <small>gatilho do fluxo</small>
          </span>
          <span className="start-live" />
        </div>
      ) : (
        <>
          <div className="node-glow" />
          <div className="node-head">
            <span className="node-type-icon" style={{ color: node.accent, background: `${node.accent}18`, borderColor: `${node.accent}35` }}>
              <Icon size={14} />
            </span>
            <span className="node-kind">{headerLabel}</span>
            {message && blocks.length > 1 && <span className="node-block-count">{blocks.length}</span>}
            <button
              type="button"
              className="node-open"
              data-no-drag
              aria-label="Abrir propriedades"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onOpen(node) }}
            >
              <SlidersHorizontal size={14} />
            </button>
            <span className="node-grip" aria-hidden="true"><GripVertical size={14} /></span>
          </div>

          {node.type === 'condition' ? (
            <div className="condition-body">
              <div className="condition-flag"><GitBranch size={11} /> se</div>
              <h3 className="node-title">{node.title || 'Nova condição'}</h3>
              {node.text && <p className="node-text"><RichText text={node.text} /></p>}
              <div className="condition-branches">
                {outEdges.length ? outEdges.slice(0, 3).map((e) => (
                  <span className="branch-chip" key={e.id}>
                    <i style={{ background: e.color }} />
                    {e.label || 'caminho'}
                  </span>
                )) : (
                  <span className="branch-empty">Arraste a alça → para criar caminhos</span>
                )}
              </div>
            </div>
          ) : node.type === 'delay' ? (
            <div className="delay-body">
              <div className="delay-clock"><Clock3 size={19} /></div>
              <div>
                <div className="delay-value">
                  <strong>{node.delay?.value ?? 2}</strong>
                  <span>{node.delay?.unit || 'horas'}</span>
                </div>
                <p className="delay-caption">de espera antes de continuar</p>
              </div>
            </div>
          ) : message ? (
            <div className="node-message-content">
              {node.title && <h3 className="node-title">{node.title}</h3>}
              {blocks.length > 0 ? (
                <div className="node-blocks">
                  {blocks.map((block) => (
                    <div className={`node-block node-block-${block.kind}`} key={block.id}>
                      {block.kind === 'text' ? (
                        editingBlockId === block.id ? (
                          <AutoGrowTextarea
                            value={block.text}
                            placeholder="Escreva a mensagem…"
                            onChange={(value) => onBlockTextChange(node, block, value)}
                            onBlur={onEndEditBlock}
                          />
                        ) : (
                          <div
                            className="node-text-wrap"
                            onDoubleClick={(e) => {
                              e.stopPropagation()
                              onStartEditBlock(node, block)
                            }}
                          >
                            {block.text ? (
                              <p className="node-text"><RichText text={block.text} /></p>
                            ) : (
                              <p className="node-text is-placeholder">Escreva a mensagem…</p>
                            )}
                          </div>
                        )
                      ) : (
                        <MediaBlockView node={node} block={block} onPickBlockMedia={onPickBlockMedia} />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="node-empty-content">
                  <span><Plus size={12} /></span>
                  Adicione texto ou mídia neste balão
                </div>
              )}
            </div>
          ) : null}

          {!start && (
            <div className="node-foot">
              <div className="foot-dots">
                {outEdges.slice(0, 4).map((e) => <i key={e.id} style={{ background: e.color }} />)}
                {outEdges.length === 0 && <i className="foot-dot-idle" />}
              </div>
              <span>{outEdges.length === 0 ? 'sem saída' : outEdges.length === 1 ? '1 saída' : `${outEdges.length} saídas`}</span>
              <span className="foot-spacer" />
              <span className="foot-hint">ajustar</span>
              <button
                type="button"
                className="foot-open"
                data-no-drag
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => { e.stopPropagation(); onOpen(node) }}
              >
                <ArrowUpRight size={12} />
              </button>
            </div>
          )}
        </>
      )}

      {dragOver && (
        <div className="node-drop-overlay" aria-hidden="true">
          <span><ImagePlus size={19} /></span>
          solte no balão
        </div>
      )}

      {!start && (
        <div className="port port-in" aria-hidden="true">
          <span className="port-core" />
        </div>
      )}
      <div
        className="port port-out"
        role="button"
        aria-label="Arraste para conectar"
        title="Arraste para conectar"
        data-no-drag
        onPointerDown={(e) => onStartConnect(e, node)}
      >
        <span className="port-core" />
        <span className="port-plus"><Plus size={10} /></span>
      </div>
      {selected && <span className="node-selected-ring" aria-hidden="true" />}
    </div>
  )
}
