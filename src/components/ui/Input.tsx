import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
}

function Input({ id, label, hint, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-200" htmlFor={id}>
        {label}
      </label>
      <input
        className={`min-h-11 w-full rounded-xl border border-line bg-ink px-3.5 text-sm text-white placeholder:text-slate-500 transition-colors hover:border-slate-500 focus:border-primary-400 focus:outline-none ${className}`}
        id={id}
        {...props}
      />
      {hint ? <p className="text-xs text-slate-400">{hint}</p> : null}
    </div>
  )
}

export default Input
