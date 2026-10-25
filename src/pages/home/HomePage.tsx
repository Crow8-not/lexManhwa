import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import StatusMessage from '../../components/ui/StatusMessage'
import ManhwaCard from '../../components/manhwa/ManhwaCard'
import { manhwas } from '../../data/manhwas'
import { Link } from 'react-router-dom'

const latestUpdates = [...manhwas].sort((first, second) => {
  const firstChapter = Number.parseInt(
    first.latestChapter.replace(/\D/g, ''),
    10,
  )
  const secondChapter = Number.parseInt(
    second.latestChapter.replace(/\D/g, ''),
    10,
  )

  return secondChapter - firstChapter
})

function HomePage() {
  return (
    <main id="inicio" className="surface-grid">
      <section className="mx-auto max-w-content px-4 pb-12 pt-12 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl">
          <Badge tone="primary">Sistema visual · Fase 2</Badge>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:mt-6 sm:text-6xl">
            Historias que merecen
            <span className="block text-primary-300">una pausa.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Una base visual oscura, clara y cómoda para descubrir nuevas
            historias sin perder de vista lo importante: leer.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button>Explorar historias</Button>
            <Button variant="secondary">Ver componentes</Button>
          </div>
        </div>
      </section>

      <section
        id="componentes"
        className="mx-auto max-w-content space-y-6 px-4 pb-12 sm:space-y-8 sm:px-8 sm:pb-16"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Selección visual
          </p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-3xl">
            Una interfaz consistente
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {manhwas.map((manhwa, index) => (
            <ManhwaCard
              key={manhwa.id}
              manhwa={manhwa}
              className={`${
                index >= 15
                  ? 'hidden'
                  : index >= 12
                    ? 'hidden lg:block'
                    : index >= 9
                      ? 'hidden sm:block'
                      : ''
              }`}
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:bg-elevated hover:text-white focus-visible:outline-none"
            to="/explorar"
          >
            Ver más
          </Link>
        </div>
      </section>

      <section
        className="mx-auto max-w-content space-y-6 px-4 pb-12 sm:space-y-8 sm:px-8 sm:pb-16"
        id="ultimas-actualizaciones"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Catálogo temporal
          </p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-3xl">
            Últimas actualizaciones
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Historias ordenadas por su capítulo más reciente.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {latestUpdates.map((manhwa, index) => (
            <ManhwaCard
              key={manhwa.id}
              manhwa={manhwa}
              className={`${
                index >= 15
                  ? 'hidden'
                  : index >= 12
                    ? 'hidden lg:block'
                    : index >= 9
                      ? 'hidden sm:block'
                      : ''
              }`}
            />
          ))}
        </div>
      </section>

      <section
        id="estados"
        className="mx-auto max-w-content space-y-6 px-4 pb-12 sm:space-y-8 sm:px-8 sm:pb-16"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            Feedback
          </p>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-3xl">
            Estados claros para cada momento
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <StatusMessage tone="loading" title="Cargando historias">
            Estamos preparando nuevas recomendaciones.
          </StatusMessage>
          <StatusMessage tone="empty" title="Aún no hay favoritos">
            Guarda una historia y aparecerá aquí.
          </StatusMessage>
          <StatusMessage tone="error" title="No pudimos cargar el contenido">
            Inténtalo de nuevo en unos momentos.
          </StatusMessage>
        </div>
        <Card className="grid min-w-0 gap-5 p-4 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6 sm:p-5">
          <Input
            id="demo-search"
            label="Campo de ejemplo"
            placeholder="Buscar una historia..."
            hint="Los formularios funcionales llegarán en una fase posterior."
          />
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">Publicado</Badge>
            <Badge tone="warning">En pausa</Badge>
            <Badge tone="danger">Error</Badge>
            <Badge tone="neutral">Borrador</Badge>
          </div>
        </Card>
      </section>
    </main>
  )
}

export default HomePage
