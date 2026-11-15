import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, AudioLines, ChevronRight, Clock3, Copy, Film, GitBranch,
  Image as ImageIcon, Link2, Mic, Square, Trash2, Type, Upload, Video, X,
} from 'lucide-react'
import { EDGE_COLORS, NODE_ACCENTS, NODE_TYPES } from '../data/flowData'
import { useMediaSrc } from '../lib/useMediaSrc'

const NODE_ICON = {
  text: Type,
  audio: Mic,
  image: ImageIcon,
  video: Video,
  condition: GitBranch,
  delay: Clock3,
  start: PlayIcon,
}

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function Section({ title, aside, children }) {
  return (
    <section className="inspector-section">
      <div className="section-head">
        <span>{title}</span>
        {aside}
      </div>
      {children}
    </section>
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`switch ${checked ? 'is-on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span>{label}</span>
      <i><b /></i>
    </button>
  )
}

function formatBytes(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function useRecorder(onRecorded, onError) {
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const chunksRef = useRef([])
  const timerRef = useRef(null)
  const mountedRef = useRef(true)

  useEffect(() => () => {
    mountedRef.current = false
    clearInterval(timerRef.current)
    try { recorderRef.current?.state === 'recording' && recorderRef.current.stop() } catch { /* noop */ }
    streamRef.current?.getTracks().forEach((t) => t.stop())
  }, [])

  const stop = () => {
    clearInterval(timerRef.current)
    try {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') recorderRef.current.stop()
    } catch {
      setRecording(false)
    }
  }

  const start = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      onError?.('Seu navegador não permite gravar áudio aqui. Tente enviar um arquivo.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4']
      const mimeType = candidates.find((type) => MediaRecorder.isTypeSupported?.(type))
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
      chunksRef.current = []
      recorder.ondataavailable = (e) => { if (e.data?.size) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const type = recorder.mimeType || 'audio/webm'
        const blob = new Blob(chunksRef.current, { type })
        stream.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        if (mountedRef.current) {
          setRecording(false)
          setSeconds(0)
          onRecorded?.(blob)
        }
      }
      recorder.start()
      recorderRef.current = recorder
      setSeconds(0)
      setRecording(true)
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    } catch {
      onError?.('Não consegui acessar o microfone. Verifique a permissão do navegador.')
    }
  }

  return { recording, seconds, start, stop }
}

function RecorderButton({ onRecorded, onError }) {
  const { recording, seconds, start, stop } = useRecorder(onRecorded, onError)
  return (
    <button
      type="button"
      className={`record-btn ${recording ? 'is-recording' : ''}`}
      onClick={recording ? stop : start}
    >
      {recording ? <Square size={12} fill="currentColor" /> : <Mic size={14} />}
      {recording ? `Parar · ${String(Math.floor(seconds / 60)).padStart(1, '0')}:${String(seconds % 60).padStart(2, '0')}` : 'Gravar áudio'}
      {recording && <span className="recording-dot" />}
    </button>
  )
}

function MediaManager({ node, onPickMedia, onUploadFile, onRemoveMedia, onRecorded, onError }) {
  const [dragging, setDragging] = useState(false)
  const src = useMediaSrc(node.mediaId)
  const fallback = node.media?.src
  const hasMedia = Boolean(node.mediaId || fallback)
  const Icon = node.type === 'image' ? ImageIcon : node.type === 'video' ? Film : AudioLines
  const noun = node.type === 'image' ? 'foto' : node.type === 'video' ? 'vídeo' : 'áudio'

  return (
    <div className="media-manager">
      {!hasMedia ? (
        <div
          className={`dropzone ${dragging ? 'is-dragging' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            const file = e.dataTransfer.files?.[0]
            if (file) onUploadFile(file, node)
          }}
        >
          <span className="dropzone-icon"><Icon size={20} /></span>
          <strong>Solte uma {noun} aqui</strong>
          <span>ou escolha um arquivo do seu computador</span>
          <button type="button" className="small-btn" onClick={() => onPickMedia(node)}>
            <Upload size={13} /> Escolher arquivo
          </button>
        </div>
      ) : (
        <div className="media-file">
          <span className="media-file-icon"><Icon size={16} /></span>
          <div>
            <strong>{node.media?.name || `Sua ${noun}`}</strong>
            <small>{formatBytes(node.media?.size) || (src ? 'pronto para tocar' : 'carregando…')}</small>
          </div>
          <span className="file-live" />
        </div>
      )}

      {node.type === 'audio' && (
        <RecorderButton
          onRecorded={(blob) => onRecorded(blob, node)}
          onError={onError}
        />
      )}

      {hasMedia && (
        <div className="media-actions">
          <button type="button" className="small-btn" onClick={() => onPickMedia(node)}>
            <Upload size={13} /> Trocar
          </button>
          <button type="button" className="small-btn danger" onClick={() => onRemoveMedia(node)}>
            <Trash2 size={13} /> Remover
          </button>
        </div>
      )}
    </div>
  )
}

function EdgePreview({ edge }) {
  return (
    <div className="edge-preview" style={{ '--edge-color': edge.color }}>
      <svg viewBox="0 0 300 80" preserveAspectRatio="none" aria-hidden="true">
        <path className="preview-halo" d="M8 40 C 90 40, 210 40, 292 40" />
        <path
          className="preview-line"
          d="M8 40 C 90 40, 210 40, 292 40"
          strokeDasharray={edge.dashed ? '8 8' : undefined}
        />
        {edge.animated && <path className="preview-flow" d="M8 40 C 90 40, 210 40, 292 40" />}
        <circle cx="8" cy="40" r="4" fill="currentColor" opacity=".55" />
        <circle cx="292" cy="40" r="4" fill="currentColor" />
      </svg>
      <span>{edge.label || 'sem rótulo'}</span>
    </div>
  )
}

export default function Inspector({
  selected, node, edge, sourceNode, targetNode, outEdges, nodes,
  onClose, onPatchNode, onPatchEdge, onDelete, onDuplicate,
  onPickMedia, onUploadFile, onRemoveMedia, onRecorded,
  onSelectEdge, onError,
}) {
  const scrollRef = useRef(null)
  const selectionKey = selected ? `${selected.type}:${selected.id}` : ''

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [selectionKey])

  if (!selected) return null

  if (selected.type === 'edge' && edge) {
    return (
      <aside className="inspector" key={selectionKey} aria-label="Propriedades da ligação">
        <div className="inspector-head">
          <span className="inspector-eyebrow"><Link2 size={12} /> ligação</span>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Fechar painel"><X size={16} /></button>
        </div>
        <div className="inspector-scroll" ref={scrollRef}>
          <div className="inspector-title-block">
            <h2>Uma conexão com <em>personalidade.</em></h2>
            <p>Cor, rótulo e movimento. A linha também conta parte da história.</p>
          </div>

          <div className="edge-route">
            <span className="route-node">
              <i style={{ background: sourceNode?.accent || '#a78bfa' }} />
              <span>{sourceNode?.title || (sourceNode?.type === 'start' ? 'Início' : 'Balão')}</span>
            </span>
            <ArrowRight size={14} />
            <span className="route-node">
              <i style={{ background: targetNode?.accent || '#67e8f9' }} />
              <span>{targetNode?.title || 'Balão'}</span>
            </span>
          </div>

          <Section title="Rótulo">
            <input
              className="text-input"
              value={edge.label}
              placeholder="Ex.: Sim, quero · 24h depois"
              onChange={(e) => onPatchEdge({ label: e.target.value }, `edge-label:${edge.id}`)}
              maxLength={48}
            />
            <p className="field-hint">Aparece no meio da linha e nas opções da prévia.</p>
          </Section>

          <Section title="Cor da ligação">
            <div className="swatch-grid">
              {EDGE_COLORS.map((color) => (
                <button
                  type="button"
                  key={color.value}
                  className={`color-swatch ${edge.color.toLowerCase() === color.value.toLowerCase() ? 'is-active' : ''}`}
                  style={{ '--swatch': color.value }}
                  onClick={() => onPatchEdge({ color: color.value })}
                  aria-label={color.name}
                  title={color.name}
                >
                  <span />
                </button>
              ))}
              <label className="custom-color" title="Cor personalizada">
                <input type="color" value={edge.color} onChange={(e) => onPatchEdge({ color: e.target.value })} />
                <span>+</span>
              </label>
            </div>
          </Section>

          <Section title="Estilo">
            <div className="switch-stack">
              <Switch checked={edge.animated} onChange={(v) => onPatchEdge({ animated: v })} label="Fluxo animado" />
              <Switch checked={edge.dashed} onChange={(v) => onPatchEdge({ dashed: v })} label="Linha tracejada" />
            </div>
          </Section>

          <Section title="Prévia">
            <EdgePreview edge={edge} />
          </Section>

          <div className="inspector-actions">
            <button type="button" className="danger-btn" onClick={onDelete}>
              <Trash2 size={14} /> Excluir ligação
            </button>
          </div>
          <p className="undo-hint">Você pode desfazer com <kbd>⌘</kbd><kbd>Z</kbd>.</p>
        </div>
      </aside>
    )
  }

  if (!node) return null
  const Icon = NODE_ICON[node.type] || Type
  const isStart = node.type === 'start'
  const isMedia = ['audio', 'image', 'video'].includes(node.type)
  const incoming = (selected.type === 'node') ? [] : []
  const contentLabel = node.type === 'condition' ? 'Detalhe da condição' : isMedia ? 'Legenda' : 'Mensagem'
  const contentPlaceholder = node.type === 'condition'
    ? 'Explique o critério deste caminho…'
    : isMedia
      ? 'Escreva uma legenda para acompanhar a mídia…'
      : 'Escreva a mensagem que será enviada…'

  return (
    <aside className="inspector" key={selectionKey} aria-label="Propriedades do balão">
      <div className="inspector-head">
        <span className="inspector-eyebrow"><Icon size={12} /> {NODE_TYPES[node.type]?.label || 'balão'}</span>
        <button type="button" className="panel-close" onClick={onClose} aria-label="Fechar painel"><X size={16} /></button>
      </div>
      <div className="inspector-scroll" ref={scrollRef}>
        <div className="inspector-title-block">
          <h2>{isStart ? <>O começo de <em>tudo.</em></> : node.type === 'condition' ? <>Um caminho, <em>duas histórias.</em></> : node.type === 'delay' ? <>O tempo certo, <em>sempre.</em></> : <>Dê voz ao <em>seu balão.</em></>}</h2>
          <p>
            {isStart
              ? 'Todo fluxo parte daqui. Arraste a alça para ligar a primeira mensagem.'
              : node.type === 'condition'
                ? 'Cada ligação que sai deste balão é uma resposta possível.'
                : node.type === 'delay'
                  ? 'Uma pausa estratégica antes da próxima mensagem.'
                  : 'Edite o conteúdo, a mídia e a cor deste balão.'}
          </p>
        </div>

        {!isStart && (
          <>
            <Section title="Identificação">
              <label className="field-label" htmlFor={`node-title-${node.id}`}>
                {node.type === 'condition' ? 'Nome da condição' : node.type === 'delay' ? 'Nome da espera' : 'Título do balão'}
              </label>
              <input
                id={`node-title-${node.id}`}
                className="text-input"
                value={node.title}
                placeholder="Ex.: Boas-vindas"
                onChange={(e) => onPatchNode({ title: e.target.value }, `node-title:${node.id}`)}
                maxLength={64}
              />
            </Section>

            {node.type === 'delay' ? (
              <Section title="Tempo de espera">
                <div className="delay-input-row">
                  <input
                    className="text-input"
                    type="number"
                    min="1"
                    max="999"
                    value={node.delay?.value ?? 2}
                    onChange={(e) => onPatchNode({ delay: { ...node.delay, value: Math.max(1, Number(e.target.value) || 1) } })}
                  />
                  <select
                    className="select-input"
                    value={node.delay?.unit || 'horas'}
                    onChange={(e) => onPatchNode({ delay: { ...node.delay, unit: e.target.value } })}
                  >
                    <option value="minutos">minutos</option>
                    <option value="horas">horas</option>
                    <option value="dias">dias</option>
                  </select>
                </div>
                <p className="field-hint">A prévia mostra a pausa e segue para o próximo balão.</p>
              </Section>
            ) : (
              <Section title="Conteúdo">
                <label className="field-label" htmlFor={`node-text-${node.id}`}>{contentLabel}</label>
                <textarea
                  id={`node-text-${node.id}`}
                  className="text-area"
                  value={node.text}
                  placeholder={contentPlaceholder}
                  rows={4}
                  onChange={(e) => onPatchNode({ text: e.target.value }, `node-text:${node.id}`)}
                  maxLength={900}
                />
                <div className="field-meta">
                  <span>Use **palavra** para negrito.</span>
                  <span>{node.text.length}/900</span>
                </div>
              </Section>
            )}

            {isMedia && (
              <Section title={node.type === 'audio' ? 'Áudio' : node.type === 'image' ? 'Foto' : 'Vídeo'}>
                <MediaManager
                  node={node}
                  onPickMedia={onPickMedia}
                  onUploadFile={onUploadFile}
                  onRemoveMedia={onRemoveMedia}
                  onRecorded={onRecorded}
                  onError={onError}
                />
                <p className="field-hint">
                  {node.type === 'audio' ? 'Aceita MP3, M4A, WAV, OGG ou uma gravação nova.' : node.type === 'image' ? 'Aceita JPG, PNG, WebP ou GIF.' : 'Aceita MP4, WebM ou MOV.'}
                </p>
              </Section>
            )}

            <Section title="Aparência">
              <div className="swatch-grid">
                {NODE_ACCENTS.map((color) => (
                  <button
                    type="button"
                    key={color}
                    className={`color-swatch ${node.accent.toLowerCase() === color.toLowerCase() ? 'is-active' : ''}`}
                    style={{ '--swatch': color }}
                    onClick={() => onPatchNode({ accent: color })}
                    aria-label={`Cor ${color}`}
                  >
                    <span />
                  </button>
                ))}
                <label className="custom-color" title="Cor personalizada">
                  <input type="color" value={node.accent} onChange={(e) => onPatchNode({ accent: e.target.value })} />
                  <span>+</span>
                </label>
              </div>
            </Section>

            <Section
              title="Saídas"
              aside={<span className="section-count">{outEdges.length}</span>}
            >
              {outEdges.length === 0 ? (
                <div className="connections-empty">
                  <span className="connections-empty-line" />
                  Arraste a alça à direita do balão para conectar o próximo passo.
                </div>
              ) : (
                <div className="connections-list">
                  {outEdges.map((out) => {
                    const target = nodes.find((n) => n.id === out.to)
                    return (
                      <button type="button" className="connection-row" key={out.id} onClick={() => onSelectEdge(out.id)}>
                        <i style={{ background: out.color }} />
                        <span>
                          <strong>{out.label || 'Sem rótulo'}</strong>
                          <small>para {target?.title || (target?.type === 'start' ? 'Início' : 'balão')}</small>
                        </span>
                        <ChevronRight size={14} />
                      </button>
                    )
                  })}
                </div>
              )}
            </Section>
          </>
        )}

        {isStart && (
          <Section title="Saídas" aside={<span className="section-count">{outEdges.length}</span>}>
            {outEdges.length === 0 ? (
              <div className="connections-empty">
                <span className="connections-empty-line" />
                Arraste a alça à direita para criar a primeira ligação.
              </div>
            ) : (
              <div className="connections-list">
                {outEdges.map((out) => {
                  const target = nodes.find((n) => n.id === out.to)
                  return (
                    <button type="button" className="connection-row" key={out.id} onClick={() => onSelectEdge(out.id)}>
                      <i style={{ background: out.color }} />
                      <span>
                        <strong>{out.label || 'Primeira mensagem'}</strong>
                        <small>para {target?.title || 'balão'}</small>
                      </span>
                      <ChevronRight size={14} />
                    </button>
                  )
                })}
              </div>
            )}
          </Section>
        )}

        {!isStart && (
          <div className="inspector-actions">
            <button type="button" className="secondary-btn" onClick={onDuplicate}>
              <Copy size={14} /> Duplicar
            </button>
            <button type="button" className="danger-btn" onClick={onDelete}>
              <Trash2 size={14} /> Excluir
            </button>
          </div>
        )}
        <p className="undo-hint">Tudo salvo automaticamente. Desfaça com <kbd>⌘</kbd><kbd>Z</kbd>.</p>
      </div>
    </aside>
  )
}
