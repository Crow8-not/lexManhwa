import type { HTMLAttributes } from 'react'

function Card({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <article
      className={`rounded-2xl border border-line/80 bg-surface shadow-card ${className}`}
      {...props}
    >
      {children}
    </article>
  )
}

export default Card
