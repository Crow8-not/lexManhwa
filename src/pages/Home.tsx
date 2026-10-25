import { manhwas } from '../data/manhwas'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">LexManhwa</h1>
        <p className="mt-4 text-slate-400">Descubrí y leé manhwas.</p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Últimas actualizaciones</h2>
        <ul className="grid gap-4">
          {manhwas.map(m => (
            <li key={m.id} className="p-4 rounded-xl bg-elevated">
              <strong>{m.title}</strong> — {m.latestChapter}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Populares</h2>
        <ul className="grid gap-4">
          {manhwas.slice(0, 5).map(m => (
            <li key={m.id} className="p-4 rounded-xl bg-elevated">
              <strong>{m.title}</strong> — {m.genre}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
