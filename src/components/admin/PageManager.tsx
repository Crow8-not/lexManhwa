import { useState, useCallback, useEffect, useMemo } from 'react'
import { getImageUrl } from '../../lib/demo/images'
import Button from '../ui/Button'
import Card from '../ui/Card'
import ImageUpload from '../ui/ImageUpload'

type ChapterPage = {
  id: string
  pageNumber: number
  imageUrl?: string
  imageKey?: string
}

type PageManagerProps = {
  pages: ChapterPage[]
  chapterId: string
  onPagesChange: (pages: ChapterPage[]) => void
}

export default function PageManager({
  pages: initialPages,
  chapterId,
  onPagesChange,
}: PageManagerProps) {
  const [pages, setPages] = useState<ChapterPage[]>(initialPages)
  const [asyncPreviewUrls, setAsyncPreviewUrls] = useState<
    Record<string, string>
  >({})

  const syncPreviewUrls = useMemo(() => {
    const urls: Record<string, string> = {}
    for (const page of pages) {
      if (page.imageUrl) {
        urls[page.id] = page.imageUrl
      }
    }
    return urls
  }, [pages])

  useEffect(() => {
    for (const page of pages) {
      if (page.imageKey) {
        getImageUrl(page.imageKey).then((url) => {
          if (url) {
            setAsyncPreviewUrls((prev) => ({ ...prev, [page.id]: url }))
          }
        })
      }
    }
  }, [pages])

  const previewUrls = useMemo(
    () => ({ ...syncPreviewUrls, ...asyncPreviewUrls }),
    [syncPreviewUrls, asyncPreviewUrls],
  )

  const handleImageKeyChange = useCallback(
    (pageId: string, imageKey: string | undefined) => {
      setPages((prev) =>
        prev.map((page) => (page.id === pageId ? { ...page, imageKey } : page)),
      )
    },
    [],
  )

  const addPage = () => {
    const newPageNumber =
      pages.length > 0 ? Math.max(...pages.map((p) => p.pageNumber)) + 1 : 1
    const newPage: ChapterPage = {
      id: `${chapterId}-page-${newPageNumber}-${Date.now()}`,
      pageNumber: newPageNumber,
    }
    const newPages = [...pages, newPage]
    setPages(newPages)
    onPagesChange(newPages)
  }

  const removePage = (pageId: string) => {
    if (!confirm('¿Eliminar esta página?')) return
    const newPages = pages
      .filter((p) => p.id !== pageId)
      .map((page, index) => ({ ...page, pageNumber: index + 1 }))
    setPages(newPages)
    onPagesChange(newPages)
  }

  const movePageUp = (index: number) => {
    if (index <= 0) return
    const newPages = [...pages]
    const temp = newPages[index]
    newPages[index] = { ...newPages[index - 1], pageNumber: index + 1 }
    newPages[index - 1] = { ...temp, pageNumber: index }
    setPages(newPages)
    onPagesChange(newPages)
  }

  const movePageDown = (index: number) => {
    if (index >= pages.length - 1) return
    const newPages = [...pages]
    const temp = newPages[index]
    newPages[index] = { ...newPages[index + 1], pageNumber: index + 2 }
    newPages[index + 1] = { ...temp, pageNumber: index + 1 }
    setPages(newPages)
    onPagesChange(newPages)
  }

  const keyPrefix = `page-${chapterId}`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Páginas ({pages.length})
        </h3>
        <Button variant="secondary" onClick={addPage} size="sm">
          Añadir página
        </Button>
      </div>

      {pages.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-slate-400">
            No hay páginas. Añade la primera página.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {pages.map((page, index) => (
            <Card key={page.id} className="p-4 flex items-center gap-4">
              <div className="flex items-center gap-3 w-24 flex-shrink-0">
                <span className="text-sm font-mono text-slate-400 w-8 text-right">
                  {String(page.pageNumber).padStart(2, '0')}
                </span>
                {previewUrls[page.id] ? (
                  <img
                    src={previewUrls[page.id]}
                    alt={`Página ${page.pageNumber}`}
                    className="w-24 h-32 object-cover rounded border border-line"
                  />
                ) : (
                  <div className="w-24 h-32 rounded border border-line/50 bg-surface/50 flex items-center justify-center">
                    <span className="text-xs text-slate-500">Sin imagen</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <ImageUpload
                  value={page.imageKey}
                  onChange={(key) => handleImageKeyChange(page.id, key)}
                  keyPrefix={`${keyPrefix}-${page.pageNumber}`}
                  label={`Página ${page.pageNumber}`}
                />
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => movePageUp(index)}
                    disabled={index === 0}
                    aria-label="Subir página"
                  >
                    ↑
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => movePageDown(index)}
                    disabled={index === pages.length - 1}
                    aria-label="Bajar página"
                  >
                    ↓
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removePage(page.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
