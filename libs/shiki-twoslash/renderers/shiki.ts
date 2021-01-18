import type { IThemedToken } from 'shiki'
import { ShikiRenderOptions } from '../types'
import { escapeHtml } from '../utils'

type Lines = IThemedToken[][]

export function defaultShikiRenderer(
  lines: Lines,
  options: ShikiRenderOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineHighlights?: number[]
) {
  let html = ''

  html += `<pre class="shiki">`
  html += `<div class="shiki__meta">`
  if (options.langId) {
    html += `<div class="shiki__language">${options.langId}</div>`
  }
  if (options.fileName) {
    html += `<div class="shiki__filename">${options.fileName}</div>`
  }
  html += `</div>`
  html += `<div class="shiki__code"><code>`

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lines.forEach((l, i) => {
    if (l.length === 0) {
      html += `\n`
    } else {
      let htmlLines = ''
      l.forEach((token) => {
        htmlLines += `<span style="color: ${token.color}">${escapeHtml(
          token.content
        )}</span>`
      })
      if (lineHighlights?.length) {
        if (lineHighlights?.includes(i + 1)) {
          html += `<div class="highlight">${htmlLines}</div>`
        } else {
          html += `<div class="dim">${htmlLines}</div>`
        }
      } else {
        html += `<div class="line">${htmlLines}</div>`
      }
      // html += `\n`
    }
  })

  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += `</code></div></pre>`
  return html
}
