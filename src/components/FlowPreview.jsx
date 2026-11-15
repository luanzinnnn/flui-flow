import React, { useMemo } from 'react'

export default function FlowPreview({ flow }) {
  const geometry = useMemo(() => {
    const nodes = (flow.preview?.nodes || []).filter((n) => Number.isFinite(n.x) && Number.isFinite(n.y))
    const edges = flow.preview?.edges || []
    if (!nodes.length) return null
    const minX = Math.min(...nodes.map((n) => n.x))
    const minY = Math.min(...nodes.map((n) => n.y))
    const maxX = Math.max(...nodes.map((n) => n.x + (n.w || 220)))
    const maxY = Math.max(...nodes.map((n) => n.y + (n.h || 100)))
    const width = Math.max(1, maxX - minX)
    const height = Math.max(1, maxY - minY)
    const scale = Math.min(320 / width, 118 / height, 0.5)
    const offsetX = (340 - width * scale) / 2
    const offsetY = (150 - height * scale) / 2
    const map = new Map()
    for (const node of nodes) {
      const nx = offsetX + (node.x - minX) * scale
      const ny = offsetY + (node.y - minY) * scale
      map.set(node.id, { ...node, nx, ny, nw: Math.max(10, (node.w || 220) * scale), nh: Math.max(8, (node.h || 80) * scale) })
    }
    return { nodes: [...map.values()], map, edges }
  }, [flow.preview])

  if (!geometry) {
    return <div className="flow-preview-empty">Fluxo em branco</div>
  }

  const pathFor = (edge) => {
    const a = geometry.map.get(edge.from)
    const b = geometry.map.get(edge.to)
    if (!a || !b) return ''
    const x1 = a.nx + a.nw
    const y1 = a.ny + a.nh / 2
    const x2 = b.nx
    const y2 = b.ny + b.nh / 2
    const dx = Math.max(24, Math.abs(x2 - x1) * 0.42)
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
  }

  return (
    <svg viewBox="0 0 340 150" className="flow-preview-svg" aria-hidden="true">
      <defs>
        <pattern id={`flow-dots-${flow.id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.65" fill="rgba(255,255,255,0.07)" />
        </pattern>
      </defs>
      <rect width="340" height="150" fill={`url(#flow-dots-${flow.id})`} />
      {geometry.edges.map((edge) => (
        <path
          key={edge.id}
          d={pathFor(edge)}
          fill="none"
          stroke={edge.color || '#8b5cf6'}
          strokeWidth="1.3"
          strokeOpacity="0.62"
        />
      ))}
      {geometry.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.nx}
            y={node.ny}
            width={node.nw}
            height={node.nh}
            rx={Math.min(5, node.nh / 2)}
            fill={node.type === 'start' ? 'rgba(163,230,53,0.18)' : `${node.accent || '#8b5cf6'}22`}
            stroke={node.type === 'start' ? '#a3e635' : (node.accent || '#8b5cf6')}
            strokeOpacity={node.type === 'start' ? 0.8 : 0.5}
            strokeWidth="1"
          />
          {node.nw > 24 && <line x1={node.nx + 5} x2={node.nx + Math.min(node.nw - 5, 38)} y1={node.ny + 7} y2={node.ny + 7} stroke={node.accent || '#8b5cf6'} strokeOpacity="0.55" strokeWidth="1" />}
        </g>
      ))}
    </svg>
  )
}
