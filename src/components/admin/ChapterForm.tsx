import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'
import { slugify } from '../../lib/utils/slug'
import type { DemoState } from '../../types/manhwa'
import Button from '../ui/Button'
import Input from '../ui/Input'
import PageManager from './PageManager'

type ChapterFormData = {
  number: number
  title: string
  slug: string
  pages: Array<{
    id: string
    pageNumber: number
    imageUrl?: string
    imageKey?: string
  }>
}

type ChapterFormProps = {
  manhwaId: string
  chapterId?: string
  initialData?: ChapterFormData
  onClose: () => void
}

export default function ChapterForm({ manhwaId, chapterId, initialData, onClose }: ChapterFormProps) {
  const navigate = useNavigate()
  const { chapters, setDemoState } = useDemoCatalog()
  const [isEditing] = useState(!!chapterId)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState<ChapterFormData>(() => ({
    number: initialData?.number || 1,
    title: initialData?.title || '',
    slug: initialData?.slug || (initialData?.title ? slugify(initialData.title) : ''),
    pages: initialData?.pages || [],
  }))

  const existingChapters = chapters.filter((c) => c.manhwaId === manhwaId)
  const otherChapters = chapterId
    ? existingChapters.filter((c) => c.id !== chapterId)
    : existingChapters

  const handleNumberChange = (value: number) => {
    setFormData((prev) => ({ ...prev, number: value }))
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }))
  }

  const handleSlugChange = (slug: string) => {
    setFormData((prev) => ({ ...prev, slug }))
  }

  const handlePagesChange = (pages: ChapterFormData['pages']) => {
    setFormData((prev) => ({ ...prev, pages }))
  }

  const validate = (): boolean => {
    if (!formData.title.trim()) {
      setError('El título es obligatorio')
      return false
    }
    if (formData.number <= 0) {
      setError('El número debe ser mayor que 0')
      return false
    }
    if (otherChapters.some((c) => c.number === formData.number)) {
      setError(`Ya existe un capítulo con el número ${formData.number}`)
      return false
    }
    if (otherChapters.some((c) => c.slug === formData.slug)) {
      setError('El slug ya existe, cámbialo manualmente')
      return false
    }
    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (!validate()) return

    setIsSaving(true)

    const chapterSlug = formData.slug || slugify(formData.title)

    if (isEditing && chapterId) {
      setDemoState((state: DemoState) => ({
        ...state,
        chapters: state.chapters.map((c) =>
          c.id === chapterId
            ? {
                ...c,
                number: formData.number,
                title: formData.title,
                slug: chapterSlug,
                pages: formData.pages,
              }
            : c,
        ),
      }))
    } else {
      const newChapter = {
        id: `${manhwaId}-capitulo-${formData.number}-${Date.now()}`,
        manhwaId,
        number: formData.number,
        title: formData.title,
        slug: chapterSlug,
        pages: formData.pages,
      }
      setDemoState((state: DemoState) => ({
        ...state,
        chapters: [...state.chapters, newChapter],
      }))
    }

    setIsSaving(false)
    onClose()
    navigate(`/admin/manhwa/${manhwaId}`, { replace: true })
  }

  const handleDelete = () => {
    if (!chapterId || !confirm('¿Eliminar este capítulo y todas sus páginas?')) return

    setDemoState((state: DemoState) => ({
      ...state,
      chapters: state.chapters.filter((c) => c.id !== chapterId),
    }))
    onClose()
    navigate(`/admin/manhwa/${manhwaId}`, { replace: true })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-surface rounded-2xl border border-line">
        <div className="sticky top-0 p-4 border-b border-line bg-surface/95 backdrop-blur-sm flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100">
            {isEditing ? 'Editar capítulo' : 'Nuevo capítulo'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {error && (
            <div className="rounded-lg bg-rose-500/15 border border-rose-500/30 p-3 text-sm text-rose-300">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Número"
              type="number"
              value={formData.number}
              onChange={(e) => handleNumberChange(Number(e.target.value) || 0)}
              required
              min={1}
            />
            <Input
              label="Slug"
              value={formData.slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              hint="Se genera automáticamente desde el título"
            />
          </div>

          <Input
            label="Título"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Título del capítulo"
          />

          <PageManager
            pages={formData.pages}
            chapterId={chapterId || `${manhwaId}-capitulo-${formData.number}`}
            onPagesChange={handlePagesChange}
          />

          <div className="sticky bottom-0 p-4 border-t border-line bg-surface/95 backdrop-blur-sm flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancelar
            </Button>
            {isEditing && (
              <Button variant="danger" type="button" onClick={handleDelete}>
                Eliminar
              </Button>
            )}
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}