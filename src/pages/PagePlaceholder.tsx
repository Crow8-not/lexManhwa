import type { ReactNode } from 'react'

type PagePlaceholderProps = {
  eyebrow: string
  title: string
  children: ReactNode
}

function PagePlaceholder({ eyebrow, title, children }: PagePlaceholderProps) {
  return (
    <main className="surface-grid flex min-h-[calc(100vh-137px)] items-center px-4 py-16 sm:px-8">
      <section className="mx-auto w-full max-w-content">
        <div className="max-w-2xl rounded-2xl border border-line/80 bg-surface p-6 shadow-card sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-300">{children}</p>
        </div>
      </section>
    </main>
  )
}

export default PagePlaceholder
