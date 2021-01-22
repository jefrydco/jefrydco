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

  html += `<div class="shiki">`
  html += `<div class="shiki__meta">`
  if (options.langId) {
    html += `<div class="shiki__language">${options.langId}</div>`
  }
  if (options.fileName) {
    html += `<div class="shiki__filename">${options.fileName}</div>`
  }
  html += `</div>`
  html += `<pre class="shiki__pre"><code class="shiki__code">`

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lines.forEach((l, i) => {
    if (l.length === 0) {
      html += `\n`
    } else {
      let htmlLines = ''
      l.forEach((token) => {
        htmlLines += `<div class="shiki__token" style="color: ${token.color}">${escapeHtml(
          token.content
        )}</div>`
      })
      if (lineHighlights?.length) {
        if (lineHighlights?.includes(i + 1)) {
          html += `<div class="shiki__highlight">${htmlLines}</div>`
        } else {
          html += `<div class="shiki__dim">${htmlLines}</div>`
        }
      } else {
        html += `<div class="shiki__line">${htmlLines}</div>`
      }
      // html += `\n`
    }
  })

  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += `</code></pre></div>`
  return html
}
