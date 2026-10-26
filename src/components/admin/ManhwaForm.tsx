import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'
import { slugify } from '../../lib/utils/slug'
import type { DemoState } from '../../types/manhwa'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ImageUpload from '../ui/ImageUpload'
import ChapterList from './ChapterList'

type ManhwaFormData = {
  title: string
  slug: string
  author: string
  artist: string
  genre: string
  status: 'ongoing' | 'completed' | 'hiatus'
  description: string
  coverImageKey?: string
}

type ManhwaFormProps = {
  manhwaId?: string
  initialData?: ManhwaFormData
  onClose: () => void
}

const STATUSES = ['ongoing', 'completed', 'hiatus'] as const
const COVER_VARIANTS = [
  'indigo-coral',
  'cyan-violet',
  'amber-rose',
  'emerald-blue',
  'violet-amber',
] as const

export default function ManhwaForm({
  manhwaId,
  initialData,
  onClose,
}: ManhwaFormProps) {
  const navigate = useNavigate()
  const { manhwas, setDemoState } = useDemoCatalog()
  const [isEditing] = useState(!!manhwaId)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [newGenre, setNewGenre] = useState('')
  const [timestamp] = useState(() => Date.now())

  const otherManhwas = useMemo(
    () => (manhwaId ? manhwas.filter((m) => m.id !== manhwaId) : manhwas),
    [manhwas, manhwaId],
  )

  const genres = useMemo(() => {
    const genreSet = new Set(manhwas.map((m) => m.genre))
    return Array.from(genreSet).sort()
  }, [manhwas])

  const initialFormData = useMemo<ManhwaFormData>(
    () => ({
      title: initialData?.title || '',
      slug:
        initialData?.slug ||
        (initialData?.title ? slugify(initialData.title) : ''),
      author: initialData?.author || '',
      artist: initialData?.artist || '',
      genre: initialData?.genre || '',
      status: initialData?.status || 'ongoing',
      description: initialData?.description || '',
      coverImageKey: initialData?.coverImageKey,
    }),
    [initialData],
  )

  const [formData, setFormData] = useState<ManhwaFormData>(initialFormData)

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }))
  }

  const validate = (): boolean => {
    if (!formData.title.trim()) {
      setError('El título es obligatorio')
      return false
    }
    if (!formData.slug.trim()) {
      setError('El slug es obligatorio')
      return false
    }
    if (
      otherManhwas.some(
        (m) => m.title.toLowerCase() === formData.title.toLowerCase(),
      )
    ) {
      setError('Ya existe un manhwa con este título')
      return false
    }
    if (otherManhwas.some((m) => m.slug === formData.slug)) {
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

    if (isEditing && manhwaId) {
      setDemoState((state: DemoState) => ({
        ...state,
        manhwas: state.manhwas.map((m) =>
          m.id === manhwaId ? { ...m, ...formData, slug: formData.slug } : m,
        ),
      }))
    } else {
      const newTimestamp = Date.now()
      const newManhwa = {
        id: `manhwa-${newTimestamp}`,
        title: formData.title,
        slug: formData.slug,
        author: formData.author,
        artist: formData.artist,
        genre: formData.genre,
        status: formData.status,
        description: formData.description,
        latestChapter: 'Sin capítulos',
        cover:
          COVER_VARIANTS[Math.floor(Math.random() * COVER_VARIANTS.length)],
        coverImageKey: formData.coverImageKey,
      }
      setDemoState((state: DemoState) => ({
        ...state,
        manhwas: [...state.manhwas, newManhwa],
      }))
      navigate(`/admin/manhwa/${newManhwa.id}`, { replace: true })
    }

    setIsSaving(false)
    onClose()
  }

  const handleDelete = () => {
    if (
      !manhwaId ||
      !confirm(
        '¿Eliminar este manhwa y TODOS sus capítulos? Esta acción no se puede deshacer.',
      )
    )
      return

    setDemoState((state: DemoState) => ({
      ...state,
      manhwas: state.manhwas.filter((m) => m.id !== manhwaId),
      chapters: state.chapters.filter((c) => c.manhwaId !== manhwaId),
    }))
    onClose()
    navigate('/admin', { replace: true })
  }

  const handleGenreSelect = (genre: string) => {
    setFormData((prev) => ({ ...prev, genre }))
    setNewGenre('')
  }

  const coverKeyPrefix = useMemo(
    () => (manhwaId ? `cover-${manhwaId}` : `cover-new-${timestamp}`),
    [manhwaId, timestamp],
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-auto bg-surface rounded-2xl border border-line">
        <div className="sticky top-0 p-4 border-b border-line bg-surface/95 backdrop-blur-sm flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100">
            {isEditing ? 'Editar manhwa' : 'Nuevo manhwa'}
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

          <Input
            label="Título"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Título del manhwa"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              hint="Se genera automáticamente, editable"
            />
            <Input
              label="Autor"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              required
              placeholder="Autor"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Artista"
              value={formData.artist}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, artist: e.target.value }))
              }
              placeholder="Artista (opcional)"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Género
              </label>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Button
                    key={genre}
                    variant={formData.genre === genre ? 'primary' : 'secondary'}
                    type="button"
                    size="sm"
                    onClick={() => handleGenreSelect(genre)}
                  >
                    {genre}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => setNewGenre('nuevo')}
                >
                  + Nuevo
                </Button>
              </div>
              {newGenre === 'nuevo' && (
                <Input
                  label="Nuevo género"
                  value={newGenre}
                  onChange={(e) => {
                    setNewGenre(e.target.value)
                    setFormData((prev) => ({ ...prev, genre: e.target.value }))
                  }}
                  placeholder="Nombre del género"
                  autoFocus
                />
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select
              className="min-h-11 w-full rounded-xl border border-line bg-ink px-3.5 text-sm text-white"
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value as typeof formData.status,
                }))
              }
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status === 'ongoing'
                    ? 'En publicación'
                    : status === 'completed'
                      ? 'Completado'
                      : 'En pausa'}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Descripción
            </label>
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors hover:border-slate-500 focus:border-primary-400 focus:outline-none resize-y"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Descripción del manhwa"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              Portada
            </label>
            <ImageUpload
              value={formData.coverImageKey}
              onChange={(key) =>
                setFormData((prev) => ({ ...prev, coverImageKey: key }))
              }
              keyPrefix={coverKeyPrefix}
              label="Imagen de portada"
            />
          </div>

          {isEditing && manhwaId && (
            <div className="border-t border-line pt-6">
              <ChapterList manhwaId={manhwaId} />
            </div>
          )}

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
