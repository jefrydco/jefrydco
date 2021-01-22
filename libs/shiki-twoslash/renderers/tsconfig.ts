import type { IThemedToken } from 'shiki'
import { escapeHtml } from '../utils'
import { tsconfig } from '../tsconfig-oneliners.generated'
import { ShikiRenderOptions } from '../types'

type Lines = IThemedToken[][]

/** Uses tmLanguage scopes to determine what the content of the token is */
const tokenIsJSONKey = (token: IThemedToken) => {
  if (!token.explanation) return false
  return token.explanation.find((e) =>
    e.scopes.find((s) => s.scopeName.includes('support.type.property-name'))
  )
}

/** Can you look up the token in the tsconfig reference? */
const isKeyInTSConfig = (token: IThemedToken) => {
  if (token.content === '"') return
  // const name = token.content.slice(1, token.content.length - 1)
  // console.log({ content: token.content, available: token.content in tsconfig })
  return token.content in tsconfig
}

/**
 * Renders a TSConfig JSON object with additional LSP-ish information
 * @param lines the result of shiki highlighting
 * @param options shiki display options
 */
export function tsconfigJSONRenderer(
  lines: Lines,
  options: ShikiRenderOptions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lineHighlights?: number[]
) {
  let html = ''

  html += `<div class="shiki shiki--tsconfig shiki--lsp">`
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
        // This means we're looking at a token which could be '"module"', '"', '"compilerOptions"' etc
        if (tokenIsJSONKey(token) && isKeyInTSConfig(token)) {
          // const key = token.content.slice(1, token.content.length - 1)
          const key = token.content
          const oneliner = (tsconfig as Record<string, string>)[key]
          // prettier-ignore
          htmlLines += `<div class="shiki__token" style="color: ${token.color}"><data-lsp lsp="${oneliner}">${escapeHtml(key)}</data-lsp></div>`
        } else {
          htmlLines += `<div class="shiki__token" style="color: ${token.color}">${escapeHtml(
            token.content
          )}</div>`
        }
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
