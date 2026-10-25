import type { ReactNode } from 'react'

type StatusMessageProps = {
  title: string
  children: ReactNode
  tone: 'loading' | 'empty' | 'error'
}

const toneClasses = {
  loading: 'border-primary-400/30 bg-primary-500/10 text-primary-200',
  empty: 'border-line bg-surface text-slate-300',
  error: 'border-rose-400/30 bg-rose-500/10 text-rose-200',
}

function StatusMessage({ title, children, tone }: StatusMessageProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${toneClasses[tone]}`}
      role={tone === 'error' ? 'alert' : undefined}
    >
      <div className="flex min-w-0 items-start gap-3">
        {tone === 'loading' ? (
          <span
            aria-hidden="true"
            className="mt-1 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        ) : null}
        <div className="min-w-0">
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-sm opacity-80">{children}</p>
        </div>
      </div>
    </div>
  )
}

export default StatusMessage
