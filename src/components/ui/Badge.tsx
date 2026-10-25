import type { HTMLAttributes } from 'react'

type BadgeTone =
  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
}

const toneClasses: Record<BadgeTone, string> = {
  primary: 'bg-primary-500/15 text-primary-300',
  success: 'bg-green-400/15 text-green-300',
  warning: 'bg-amber-400/15 text-amber-300',
  danger: 'bg-rose-400/15 text-rose-300',
  info: 'bg-cyan-400/15 text-cyan-300',
  neutral: 'bg-slate-400/15 text-slate-300',
}

function Badge({
  children,
  className = '',
  tone = 'neutral',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
