import React, { useRef, useState } from 'react'
import {
  AudioLines, Film, FolderOpen, Image as ImageIcon, Plus, Upload, X,
} from 'lucide-react'
import { useMediaSrc } from '../lib/useMediaSrc'

const KIND_META = {
  audio: { label: 'Áudio', icon: AudioLines, color: '#67e8f9' },
  image: { label: 'Foto', icon: ImageIcon, color: '#fcd34d' },
  video: { label: 'Vídeo', icon: Film, color: '#93c5fd' },
}

function AssetCard({ asset, onInsert }) {
  const [dragging, setDragging] = useState(false)
  const resolved = useMediaSrc(asset.mediaId)
  const src = resolved || asset.media?.src
  const poster = asset.media?.poster
  const meta = KIND_META[asset.kind] || KIND_META.image
  const Icon = meta.icon

  const dragStart = (e) => {
    e.dataTransfer.setData('application/x-flui-asset', asset.id)
    e.dataTransfer.setData('text/plain', `flui:${asset.id}`)
    e.dataTransfer.effectAllowed = 'copy'
    setDragging(true)
  }

  return (
    <div
      className={`asset-card ${dragging ? 'is-dragging' : ''}`}
      draggable
      role="button"
      tabIndex={0}
      aria-label={`Inserir ${asset.label || asset.name}`}
      title="Arraste para um balão ou clique para inserir"
      onDragStart={dragStart}
      onDragEnd={() => setDragging(false)}
      onClick={() => onInsert(asset)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onInsert(asset)
        }
      }}
    >
      <div className="asset-thumb" style={{ '--asset-color': meta.color }}>
        {asset.kind === 'image' && src ? (
          <img src={src} alt="" draggable="false" loading="lazy" />
        ) : asset.kind === 'video' && (poster || src) ? (
          poster ? <img src={poster} alt="" draggable="false" loading="lazy" /> : <video src={src} muted playsInline preload="metadata" />
        ) : (
          <div className="asset-icon-tile">
            <Icon size={22} />
            {asset.kind === 'audio' && (
              <span className="asset-wave" aria-hidden="true">
                {[7, 13, 19, 11, 23, 16, 9, 20, 13, 7, 17, 10].map((h, i) => <i key={i} style={{ height: `${h}px` }} />)}
              </span>
            )}
          </div>
        )}
        <span className="asset-kind" style={{ '--asset-color': meta.color }}>{meta.label}</span>
        {asset.kind === 'video' && (
          <span className="asset-video-badge"><Film size={10} /> vídeo</span>
        )}
      </div>
      <div className="asset-info">
        <strong>{asset.label || asset.name || meta.label}</strong>
        <span>{asset.seed ? 'modelo · ' : ''}arraste ou toque</span>
      </div>
      <span className="asset-add"><Plus size={12} /></span>
    </div>
  )
}

export default function MediaShelf({ open, assets, selectedNode, onClose, onUpload, onUploadFiles, onInsert }) {
  const [fileDrag, setFileDrag] = useState(false)
  const dragDepth = useRef(0)
  if (!open) return null

  const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes('Files')
  const onDragEnter = (e) => {
    if (!hasFiles(e)) return
    e.preventDefault()
    dragDepth.current += 1
    setFileDrag(true)
  }
  const onDragOver = (e) => {
    if (!hasFiles(e)) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
  const onDragLeave = () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setFileDrag(false)
  }
  const onDrop = (e) => {
    if (!hasFiles(e)) return
    e.preventDefault()
    dragDepth.current = 0
    setFileDrag(false)
    const files = Array.from(e.dataTransfer.files || [])
    if (files.length) onUploadFiles?.(files)
  }

  return (
    <aside
      className={`media-shelf ${fileDrag ? 'is-file-drag' : ''}`}
      aria-label="Biblioteca de mídias"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="shelf-head">
        <div className="shelf-title">
          <span className="shelf-eyebrow"><FolderOpen size={12} /> biblioteca</span>
          <div>
            <h3>Mídias do fluxo</h3>
            <p>Envie uma vez, use em quantos balões quiser.</p>
          </div>
        </div>
        <div className="shelf-actions">
          <button type="button" className="shelf-upload" onClick={onUpload}>
            <Upload size={13} /> Enviar mídia
          </button>
          <button type="button" className="shelf-close" onClick={onClose} aria-label="Fechar biblioteca">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="shelf-divider" />

      {assets.length === 0 ? (
        <div className="shelf-empty">
          <span><FolderOpen size={21} /></span>
          <strong>Sua biblioteca está vazia</strong>
          <p>Envie fotos, áudios ou vídeos e depois arraste para qualquer balão.</p>
          <button type="button" className="small-btn" onClick={onUpload}><Upload size={13} /> Enviar primeira mídia</button>
        </div>
      ) : (
        <div className="asset-strip">
          <button type="button" className="asset-upload-card" onClick={onUpload}>
            <span><Plus size={18} /></span>
            <strong>Enviar</strong>
            <small>foto, áudio ou vídeo</small>
          </button>
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onInsert={onInsert} />
          ))}
        </div>
      )}

      <div className="shelf-foot">
        <span>
          <strong>{assets.length}</strong> {assets.length === 1 ? 'mídia' : 'mídias'}
        </span>
        <span className="shelf-hint">
          {selectedNode
            ? <>Clique para adicionar ao balão <strong>{selectedNode.title || 'selecionado'}</strong>.</>
            : 'Arraste para um balão ou clique para criar um novo.'}
        </span>
        <span className="shelf-mobile-note">toque em uma mídia para usar</span>
      </div>

      {fileDrag && (
        <div className="shelf-drop-overlay" aria-hidden="true">
          <span><Upload size={18} /></span>
          Solte para enviar à biblioteca
        </div>
      )}
    </aside>
  )
}
