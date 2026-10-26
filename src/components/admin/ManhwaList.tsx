import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDemoCatalog } from '../../lib/demo/hooks'
import { getImageUrl } from '../../lib/demo/images'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ManhwaForm from './ManhwaForm'

type ManhwaListProps = {
  manhwas: Array<{
    id: string
    title: string
    slug: string
    author: string
    artist: string
    genre: string
    status: 'ongoing' | 'completed' | 'hiatus'
    description: string
    latestChapter: string
    cover: string
    coverImage?: string
    coverImageKey?: string
  }>
}

export default function ManhwaList() {
  const navigate = useNavigate()
  const { manhwas } = useDemoCatalog()
  const [showForm, setShowForm] = useState(false)
  const [editingManhwa, setEditingManhwa] = useState<ManhwaListProps['manhwas'][0] | null>(null)
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})

  const loadCoverPreview = async (manhwa: ManhwaListProps['manhwas'][0]) => {
    if (manhwa.coverImageKey) {
      const url = await getImageUrl(manhwa.coverImageKey)
      if (url) {
        setPreviewUrls((prev) => ({ ...prev, [manhwa.id]: url }))
      }
    } else if (manhwa.coverImage) {
      setPreviewUrls((prev) => ({ ...prev, [manhwa.id]: manhwa.coverImage! }))
    }
  }

  const statusTones: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
    ongoing: 'success',
    completed: 'primary',
    hiatus: 'warning',
  }

  const handleNewManhwa = () => {
    setEditingManhwa(null)
    setShowForm(true)
  }

  const handleEditManhwa = (manhwa: ManhwaListProps['manhwas'][0]) => {
    setEditingManhwa(manhwa)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingManhwa(null)
  }

  const handleDeleteManhwa = (manhwaId: string) => {
    if (!confirm('¿Eliminar este manhwa y TODOS sus capítulos? Esta acción no se puede deshacer.')) return

    // The actual deletion is handled in ManhwaForm, but we can also do it here
    // For now, we'll let ManhwaForm handle it when editing
    navigate(`/admin/manhwa/${manhwaId}`, { replace: true })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100">Manhwas ({manhwas.length})</h2>
        <Button onClick={handleNewManhwa}>
          Nuevo manhwa
        </Button>
      </div>

      {manhwas.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-slate-400">No hay manhwas registrados. Crea el primero.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {manhwas.map((manhwa) => {
            loadCoverPreview(manhwa)
            return (
              <Card key={manhwa.id} className="p-4 flex items-center gap-4">
                <div className="relative w-16 h-24 flex-shrink-0">
                  {previewUrls[manhwa.id] ? (
                    <img
                      src={previewUrls[manhwa.id]}
                      alt={manhwa.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-900/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-400/50">
                        {manhwa.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-100 truncate">{manhwa.title}</h3>
                  <p className="text-sm text-slate-400 truncate">{manhwa.author} · {manhwa.artist}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge tone={statusTones[manhwa.status] || 'neutral'} size="sm">
                      {manhwa.status === 'ongoing' ? 'En publicación' : manhwa.status === 'completed' ? 'Completado' : 'En pausa'}
                    </Badge>
                    <Badge tone="neutral" size="sm">{manhwa.genre}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditManhwa(manhwa)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteManhwa(manhwa.id)}>
                    Eliminar
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {showForm && (
        <ManhwaForm
          manhwaId={editingManhwa?.id}
          initialData={editingManhwa ?? undefined}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}