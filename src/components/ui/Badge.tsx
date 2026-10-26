import type { HTMLAttributes } from 'react'

type BadgeTone =
  'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
type BadgeSize = 'sm' | 'md'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  size?: BadgeSize
}

const toneClasses: Record<BadgeTone, string> = {
  primary: 'bg-primary-500/15 text-primary-300',
  success: 'bg-green-400/15 text-green-300',
  warning: 'bg-amber-400/15 text-amber-300',
  danger: 'bg-rose-400/15 text-rose-300',
  info: 'bg-cyan-400/15 text-cyan-300',
  neutral: 'bg-slate-400/15 text-slate-300',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
}

function Badge({
  children,
  className = '',
  tone = 'neutral',
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
