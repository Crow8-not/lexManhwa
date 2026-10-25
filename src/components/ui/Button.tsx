import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white shadow-glow hover:bg-primary-400 active:bg-primary-600',
  secondary:
    'border border-line bg-elevated text-slate-100 hover:border-primary-400 hover:bg-surface active:bg-canvas',
  ghost: 'text-slate-300 hover:bg-elevated hover:text-white active:bg-surface',
  danger:
    'bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 active:bg-rose-500/35',
}

function Button({
  className = '',
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      type={type}
      {...props}
    />
  )
}

export default Button
