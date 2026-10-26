import type { CoverVariant } from '../../types/manhwa'

const variantGradients: Record<CoverVariant, string> = {
  'indigo-coral': 'linear-gradient(135deg, #4f46e5 0%, #6366f1 30%, #ec4899 70%, #f43f5e 100%)',
  'cyan-violet': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 30%, #8b5cf6 70%, #7c3aed 100%)',
  'amber-rose': 'linear-gradient(135deg, #f59e0b 0%, #f97316 30%, #f43f5e 70%, #e11d48 100%)',
  'emerald-blue': 'linear-gradient(135deg, #10b981 0%, #059669 30%, #06b6d4 70%, #0891b2 100%)',
  'violet-amber': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 30%, #f59e0b 70%, #d97706 100%)',
}

function truncateTitle(title: string, maxLines = 2): string {
  const words = title.split(' ')
  let result = ''
  let lineCount = 0

  for (const word of words) {
    const testLine = result ? `${result} ${word}` : word
    if (testLine.length > 28 && lineCount >= maxLines - 1) {
      if (result) {
        return `${result}…`
      }
      return `${word.slice(0, 25)}…`
    }
    if (testLine.length > 28) {
      lineCount++
      if (lineCount >= maxLines) {
        return `${result}…`
      }
      result = testLine
    } else {
      result = testLine
    }
  }
  return result
}

export function generateCoverSVG(title: string, variant: CoverVariant): string {
  const gradient = variantGradients[variant]
  const displayTitle = truncateTitle(title)
  const lines = displayTitle.split('…')[0].split(' ')

  let line1 = ''
  let line2 = ''

  for (const word of lines) {
    const test = line1 ? `${line1} ${word}` : word
    if (test.length <= 18) {
      line1 = test
    } else if (!line2) {
      line2 = word
    } else {
      const test2 = `${line2} ${word}`
      if (test2.length <= 18) {
        line2 = test2
      } else {
        line2 = `${line2}…`
        break
      }
    }
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <defs>
        <linearGradient id="cover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${gradient.split(',')[0].replace('linear-gradient(135deg, ', '').trim()}" />
          <stop offset="30%" stop-color="${gradient.split(',')[1].trim()}" />
          <stop offset="70%" stop-color="${gradient.split(',')[2].trim()}" />
          <stop offset="100%" stop-color="${gradient.split(',')[3].replace(')', '').trim()}" />
        </linearGradient>
      </defs>
      <rect width="300" height="450" fill="url(#cover-gradient)" />
      <rect x="0" y="0" width="300" height="450" fill="rgba(15, 15, 20, 0.35)" />
      <g font-family="system-ui, -apple-system, sans-serif" fill="white" text-anchor="middle" dominant-baseline="middle">
        <text x="150" y="200" font-size="28" font-weight="700" letter-spacing="-0.02em">${escapeXml(line1)}</text>
        ${line2 ? `<text x="150" y="236" font-size="28" font-weight="700" letter-spacing="-0.02em">${escapeXml(line2)}</text>` : ''}
        <text x="150" y="400" font-size="11" font-weight="400" fill="rgba(255,255,255,0.5)">LexManhwa Demo</text>
      </g>
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${btoa(svg)}`
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&apos;')
}