import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { formatDuration } from '../data/flowData'

const BAR_COUNT = 36

function seededBars(seed) {
  let h = 0
  const str = String(seed || 'flui')
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 99991
  const bars = []
  for (let i = 0; i < BAR_COUNT; i += 1) {
    h = (h * 1103515245 + 12345 + i * 37) % 2147483647
    const base = 26 + (h % 60)
    const envelope = 0.72 + 0.28 * Math.sin((i / BAR_COUNT) * Math.PI)
    bars.push(Math.max(18, Math.round(base * envelope)))
  }
  return bars
}

export default function AudioPlayer({ src, accent = '#67e8f9', compact = false }) {
  const audioRef = useRef(null)
  const waveRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [time, setTime] = useState(0)
  const [error, setError] = useState(false)
  const bars = useMemo(() => seededBars(src), [src])
  const progress = duration > 0 ? Math.min(1, time / duration) : 0

  useEffect(() => {
    setPlaying(false)
    setTime(0)
    setDuration(0)
    setError(false)
  }, [src])

  const toggle = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio || !src) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => setError(true))
    }
  }

  const seek = (e) => {
    e.stopPropagation()
    const audio = audioRef.current
    const rect = waveRef.current?.getBoundingClientRect()
    if (!audio || !rect || !duration) return
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setTime(audio.currentTime)
  }

  return (
    <div
      className={`audio-player ${compact ? 'is-compact' : ''} ${error ? 'has-error' : ''}`}
      style={{ '--audio-accent': accent }}
      data-no-drag
      onPointerDown={(e) => e.stopPropagation()}
    >
      {src && (
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration
            if (Number.isFinite(d)) setDuration(d)
          }}
          onDurationChange={(e) => {
            const d = e.currentTarget.duration
            if (Number.isFinite(d)) setDuration(d)
          }}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); setTime(0) }}
          onError={() => setError(true)}
        />
      )}
      <button type="button" className="audio-play" onClick={toggle} aria-label={playing ? 'Pausar áudio' : 'Ouvir áudio'}>
        {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" style={{ marginLeft: 1 }} />}
      </button>
      <div className="audio-wave" ref={waveRef} onClick={seek} role="presentation">
        {bars.map((height, i) => (
          <span
            key={i}
            className={`audio-bar ${i / bars.length <= progress ? 'is-past' : ''}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <span className="audio-time">{error ? 'erro' : formatDuration(time || duration)}</span>
    </div>
  )
}
