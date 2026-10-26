import { useState } from 'react'
import { useDemoCatalog } from '../../lib/demo/hooks'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import ChapterForm from './ChapterForm'

type Chapter = {
  id: string
  manhwaId: string
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

type ChapterListProps = {
  manhwaId: string
}

export default function ChapterList({ manhwaId }: ChapterListProps) {
  const { chapters } = useDemoCatalog()
  const [showForm, setShowForm] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)

  const manhwaChapters = chapters
    .filter((c) => c.manhwaId === manhwaId)
    .sort((a, b) => a.number - b.number)

  const handleNewChapter = () => {
    setEditingChapter(null)
    setShowForm(true)
  }

  const handleEditChapter = (chapter: Chapter) => {
    setEditingChapter(chapter)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingChapter(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-100">
          Capítulos ({manhwaChapters.length})
        </h3>
        <Button onClick={handleNewChapter} size="sm">
          Nuevo capítulo
        </Button>
      </div>

      {manhwaChapters.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-slate-400">No hay capítulos. Crea el primero.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {manhwaChapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 text-center">
                  <span className="text-sm font-mono font-semibold text-slate-300">
                    {String(chapter.number).padStart(2, '0')}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-slate-100 truncate">
                    {chapter.title}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {chapter.pages.length} páginas
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">{chapter.slug}</Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditChapter(chapter)}
                >
                  Editar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {showForm && (
        <ChapterForm
          manhwaId={manhwaId}
          chapterId={editingChapter?.id}
          initialData={editingChapter ?? undefined}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
