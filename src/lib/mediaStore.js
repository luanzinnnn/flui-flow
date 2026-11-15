const DB_NAME = 'flui-media'
const STORE = 'media'
const DB_VERSION = 1

let dbPromise = null
const urlCache = new Map()
const pending = new Map()

function openDB() {
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) return reject(new Error('IndexedDB indisponível'))
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

export async function putMedia(blob, meta = {}) {
  const id = `m-${crypto.randomUUID?.() || Math.random().toString(36).slice(2)}`
  const db = await openDB()
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({ blob, meta, createdAt: Date.now() }, id)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
  const url = URL.createObjectURL(blob)
  urlCache.set(id, url)
  return { id, url }
}

export async function getMediaRecord(id) {
  if (!id) return null
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    const req = tx.objectStore(STORE).get(id)
    req.onsuccess = () => resolve(req.result || null)
    req.onerror = () => reject(req.error)
  })
}

export async function resolveMediaUrl(id) {
  if (!id) return null
  if (urlCache.has(id)) return urlCache.get(id)
  if (pending.has(id)) return pending.get(id)
  const promise = getMediaRecord(id).then((record) => {
    if (!record?.blob) return null
    const url = URL.createObjectURL(record.blob)
    urlCache.set(id, url)
    return url
  }).finally(() => pending.delete(id))
  pending.set(id, promise)
  return promise
}

export function cachedMediaUrl(id) {
  return id ? urlCache.get(id) || null : null
}

export async function deleteMedia(id) {
  if (!id) return
  const cached = urlCache.get(id)
  if (cached) URL.revokeObjectURL(cached)
  urlCache.delete(id)
  const db = await openDB()
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).delete(id)
    tx.oncomplete = resolve
    tx.onerror = () => reject(tx.error)
  })
}
