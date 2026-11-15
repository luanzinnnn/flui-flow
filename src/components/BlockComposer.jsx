import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowUp, AudioLines, FolderOpen, Image as ImageIcon,
  Mic, Plus, Square, Trash2, Type, Upload, Video,
} from 'lucide-react'
import { BLOCK_META } from '../data/flowData'
import { useMediaSrc } from '../lib/useMediaSrc'
import AudioPlayer from './AudioPlayer'

const BLOCK_ICON = {
  text: Type,
  audio: Mic,
  image: ImageIcon,
  video: Video,
}

function formatBytes(bytes) {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function useRecorder(onRecorded, onError) {
  const [recording, setRecording] = useState(false)
  const [starting, setStarting] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const startingRef = useRef(false)
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
    if (recording || startingRef.current) return
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      onError?.('Seu navegador não permite gravar áudio aqui. Tente enviar um arquivo.')
      return
    }
    startingRef.current = true
    setStarting(true)
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
    } finally {
      startingRef.current = false
      if (mountedRef.current) setStarting(false)
    }
  }

  return { recording, starting, seconds, start, stop }
}

function RecorderButton({ onRecorded, onError, hasMedia }) {
  const { recording, starting, seconds, start, stop } = useRecorder(onRecorded, onError)
  return (
    <button
      type="button"
      className={`record-btn ${recording ? 'is-recording' : ''} ${starting ? 'is-starting' : ''}`}
      onClick={recording ? stop : start}
      disabled={starting}
      title={starting ? 'Preparando microfone…' : undefined}
    >
      {recording ? <Square size={12} fill="currentColor" /> : <Mic size={13} />}
      {starting
        ? 'Preparando microfone…'
        : recording
          ? `Parar · ${String(Math.floor(seconds / 60)).padStart(1, '0')}:${String(seconds % 60).padStart(2, '0')}`
          : (hasMedia ? 'Gravar novo' : 'Gravar áudio')}
      {recording && <span className="recording-dot" />}
    </button>
  )
}

function MediaPreview({ block, src, layout = 'block' }) {
  if (!src) return null
  if (block.kind === 'audio') {
    return (
      <div className={`composer-audio ${layout === 'thumb' ? 'is-thumb' : ''}`}>
        <AudioPlayer src={src} accent={BLOCK_META.audio.accent} compact={layout === 'thumb'} />
      </div>
    )
  }
  if (block.kind === 'image') {
    return <img className={`composer-thumb ${layout}`} src={src} alt={block.media?.name || 'Imagem'} />
  }
  if (block.kind === 'video') {
    return (
      <div className={`composer-video-thumb ${layout}`}>
        {block.media?.poster ? (
          <img src={block.media.poster} alt="" />
        ) : (
          <video src={src} muted playsInline preload="metadata" />
        )}
        <span><Video size={12} /> vídeo</span>
      </div>
    )
  }
  return null
}

function MediaBlockComposer({ node, block, onPickBlockMedia, onRecorded, onError }) {
  const resolved = useMediaSrc(block.mediaId)
  const src = resolved || block.media?.src
  const hasMedia = Boolean(src)
  const Icon = BLOCK_ICON[block.kind] || ImageIcon
  const noun = block.kind === 'audio' ? 'áudio' : block.kind === 'image' ? 'foto' : 'vídeo'

  return (
    <div className="block-media-body">
      <div className={`composer-preview ${hasMedia ? 'has-media' : 'is-empty'}`}>
        {hasMedia ? (
          <MediaPreview block={block} src={src} />
        ) : (
          <div className="composer-empty-media">
            <span><Icon size={19} /></span>
            <strong>Sem {noun} ainda</strong>
            <small>Envie um arquivo ou grave um áudio.</small>
          </div>
        )}
      </div>
      {hasMedia && (
        <div className="composer-file-meta">
          <span>{block.media?.name || `Seu ${noun}`}</span>
          <small>{formatBytes(block.media?.size) || 'pronto'}</small>
        </div>
      )}
      <div className="composer-media-actions">
        <button type="button" className="small-btn" onClick={() => onPickBlockMedia(node, block)}>
          <Upload size={12} /> {hasMedia ? 'Trocar' : 'Escolher arquivo'}
        </button>
        {block.kind === 'audio' && (
          <RecorderButton
            hasMedia={hasMedia}
            onRecorded={(blob) => onRecorded(blob, node, block)}
            onError={onError}
          />
        )}
      </div>
    </div>
  )
}

export default function BlockComposer({
  node, blocks = [], onPatchBlock, onAddTextBlock, onAddAudioBlock,
  onOpenLibrary, onPickBlockMedia, onRemoveBlock, onMoveBlock,
  onRecorded, onError,
}) {
  return (
    <div className="block-composer">
      {blocks.length === 0 ? (
        <div className="blocks-empty">
          <span className="blocks-empty-icon"><Type size={17} /></span>
          <strong>Monte este balão</strong>
          <p>Adicione textos e mídias e arraste para organizar a ordem que quiser.</p>
        </div>
      ) : (
        <div className="block-list">
          {blocks.map((block, index) => {
            const Icon = BLOCK_ICON[block.kind] || Type
            return (
              <div className={`composer-block composer-block-${block.kind}`} key={block.id}>
                <div className="composer-block-head">
                  <span className="composer-order">{String(index + 1).padStart(2, '0')}</span>
                  <span className="composer-kind-icon" style={{ color: BLOCK_META[block.kind]?.accent || node.accent }}>
                    <Icon size={13} />
                  </span>
                  <span className="composer-kind">{BLOCK_META[block.kind]?.label || 'Bloco'}</span>
                  <div className="composer-block-actions">
                    <button
                      type="button"
                      className="mini-icon-btn"
                      aria-label="Mover bloco para cima"
                      title="Mover para cima"
                      disabled={index === 0}
                      onClick={() => onMoveBlock(node.id, block.id, -1)}
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      type="button"
                      className="mini-icon-btn"
                      aria-label="Mover bloco para baixo"
                      title="Mover para baixo"
                      disabled={index === blocks.length - 1}
                      onClick={() => onMoveBlock(node.id, block.id, 1)}
                    >
                      <ArrowDown size={12} />
                    </button>
                    <button
                      type="button"
                      className="mini-icon-btn danger"
                      aria-label="Excluir bloco"
                      title="Excluir bloco"
                      onClick={() => onRemoveBlock(node.id, block.id)}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {block.kind === 'text' ? (
                  <div className="composer-text">
                    <textarea
                      className="text-area composer-textarea"
                      value={block.text}
                      rows={3}
                      placeholder="Escreva a mensagem…"
                      onChange={(e) => onPatchBlock(node.id, block.id, { text: e.target.value }, `block-text:${block.id}`)}
                      maxLength={1200}
                    />
                    <div className="composer-text-meta">
                      <span>Use **palavra** para negrito.</span>
                      <span>{block.text.length}/1200</span>
                    </div>
                  </div>
                ) : (
                  <MediaBlockComposer
                    node={node}
                    block={block}
                    onPickBlockMedia={onPickBlockMedia}
                    onRecorded={onRecorded}
                    onError={onError}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      <div className="add-block-row">
        <button type="button" className="add-block-btn" onClick={() => onAddTextBlock(node.id)}>
          <Plus size={12} /> <Type size={12} /> Texto
        </button>
        <button type="button" className="add-block-btn" onClick={() => onAddAudioBlock(node.id)}>
          <Plus size={12} /> <AudioLines size={12} /> Áudio
        </button>
        <button type="button" className="add-block-btn library" onClick={onOpenLibrary}>
          <FolderOpen size={12} /> Biblioteca
        </button>
      </div>
      <p className="field-hint composer-hint">Você também pode arrastar uma mídia da biblioteca direto para o balão.</p>
    </div>
  )
}
