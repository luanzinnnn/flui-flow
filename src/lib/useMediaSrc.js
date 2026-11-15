import { useEffect, useState } from 'react'
import { cachedMediaUrl, resolveMediaUrl } from './mediaStore'

export function useMediaSrc(mediaId) {
  const [src, setSrc] = useState(() => cachedMediaUrl(mediaId))

  useEffect(() => {
    let alive = true
    if (!mediaId) {
      setSrc(null)
      return undefined
    }
    const cached = cachedMediaUrl(mediaId)
    if (cached) {
      setSrc(cached)
      return undefined
    }
    resolveMediaUrl(mediaId)
      .then((url) => {
        if (alive) setSrc(url)
      })
      .catch(() => {
        if (alive) setSrc(null)
      })
    return () => { alive = false }
  }, [mediaId])

  return src
}
