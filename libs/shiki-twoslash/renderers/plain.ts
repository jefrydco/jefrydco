import { ShikiRenderOptions } from '../types'
import { escapeHtml } from '../utils'

/** You don't have a language which shiki twoslash can handle, make a DOM compatible version  */
export function plainTextRenderer(code: string, options: ShikiRenderOptions) {
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
  html += escapeHtml(code)

  html = html.replace(/\n*$/, '') // Get rid of final new lines
  html += `</code></div></pre>`
  return html
}
