const DATABASE_NAME = 'lexmanhwa-demo'
const DATABASE_VERSION = 1
const STORE_NAME = 'images'

let databasePromise: Promise<IDBDatabase | null> | null = null

function isIndexedDbAvailable() {
  return typeof window !== 'undefined' && 'indexedDB' in window
}

function openDatabase(): Promise<IDBDatabase | null> {
  if (!isIndexedDbAvailable()) {
    return Promise.resolve(null)
  }

  if (databasePromise) {
    return databasePromise
  }

  databasePromise = new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION)

      request.onupgradeneeded = () => {
        const database = request.result
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME)
        }
      }

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => resolve(null)
      request.onblocked = () => resolve(null)
    } catch {
      resolve(null)
    }
  })

  return databasePromise
}

function runRequest<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T | null> {
  return openDatabase().then(
    (database) =>
      new Promise<T | null>((resolve) => {
        if (!database) {
          resolve(null)
          return
        }

        try {
          const transaction = database.transaction(STORE_NAME, mode)
          const request = action(transaction.objectStore(STORE_NAME))

          request.onsuccess = () => resolve(request.result)
          request.onerror = () => resolve(null)
          transaction.onabort = () => resolve(null)
          transaction.onerror = () => resolve(null)
        } catch {
          resolve(null)
        }
      }),
  )
}

export async function saveImage(key: string, blob: Blob): Promise<boolean> {
  const result = await runRequest<IDBValidKey>('readwrite', (store) =>
    store.put(blob, key),
  )

  return result !== null
}

export async function getImage(key: string): Promise<Blob | null> {
  const result = await runRequest<Blob | undefined>('readonly', (store) =>
    store.get(key),
  )

  return result instanceof Blob ? result : null
}

export async function deleteImage(key: string): Promise<boolean> {
  const result = await runRequest<undefined>('readwrite', (store) =>
    store.delete(key),
  )

  return result !== null
}

export async function getImageUrl(key: string): Promise<string | null> {
  const blob = await getImage(key)
  if (!blob) {
    return null
  }

  try {
    return URL.createObjectURL(blob)
  } catch {
    return null
  }
}

export function revokeImageUrl(url: string) {
  try {
    URL.revokeObjectURL(url)
  } catch {
    // Ignorar URLs que no sean object URLs.
  }
}
