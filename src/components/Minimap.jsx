import React, { useMemo } from 'react'
import { getBezier, getFlowBounds } from '../lib/geometry'

const W = 196
const H = 126
const PAD = 12

export default function Minimap({ nodes, edges, sizes, view, canvasSize, shifted, onCenter }) {
  const model = useMemo(() => {
    const bounds = getFlowBounds(nodes, sizes, 60)
    const scale = Math.min((W - PAD * 2) / Math.max(bounds.width, 1), (H - PAD * 2) / Math.max(bounds.height, 1))
    const offsetX = (W - bounds.width * scale) / 2 - bounds.minX * scale
    const offsetY = (H - bounds.height * scale) / 2 - bounds.minY * scale
    const nodeMap = {}
    for (const node of nodes) {
      const s = sizes[node.id]
      nodeMap[node.id] = {
        x: node.x * scale + offsetX,
        y: node.y * scale + offsetY,
        w: (s?.w || node.w || 304) * scale,
        h: (s?.h || 170) * scale,
      }
    }
    const vx = -view.x / view.zoom * scale + offsetX
    const vy = -view.y / view.zoom * scale + offsetY
    const vw = canvasSize.width / view.zoom * scale
    const vh = canvasSize.height / view.zoom * scale
    return { nodeMap, scale, offsetX, offsetY, vx, vy, vw, vh, bounds }
  }, [nodes, sizes, view, canvasSize])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const worldX = (x - model.offsetX) / model.scale
    const worldY = (y - model.offsetY) / model.scale
    onCenter(worldX, worldY)
  }

  return (
    <aside className={`minimap ${shifted ? 'is-shifted' : ''}`} aria-label="Mapa do fluxo">
      <div className="minimap-head">
        <span>mapa</span>
        <span>{nodes.length} balões</span>
      </div>
      <svg width={W} height={H} onClick={handleClick} role="presentation">
        {edges.map((edge) => {
          const from = model.nodeMap[edge.from]
          const to = model.nodeMap[edge.to]
          if (!from || !to) return null
          const geo = getBezier(
            { x: from.x, y: from.y, w: from.w, h: from.h },
            { x: to.x + 2, y: to.y, w: to.w, h: to.h },
          )
          return <path key={edge.id} d={geo.path} stroke={edge.color} strokeOpacity="0.38" strokeWidth="1.2" fill="none" />
        })}
        {nodes.map((node) => {
          const r = model.nodeMap[node.id]
          if (!r) return null
          return (
            <rect
              key={node.id}
              x={r.x}
              y={r.y}
              width={Math.max(2, r.w)}
              height={Math.max(2, r.h)}
              rx={Math.min(3, r.h / 2)}
              fill={node.type === 'start' ? '#a3e635' : node.accent}
              fillOpacity={node.type === 'start' ? 0.9 : 0.55}
            />
          )
        })}
        <rect
          x={model.vx}
          y={model.vy}
          width={model.vw}
          height={model.vh}
          rx="3"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1"
        />
      </svg>
    </aside>
  )
}
