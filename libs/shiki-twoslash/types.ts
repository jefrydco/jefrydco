import type { HtmlRendererOptions } from 'shiki/dist/renderer'

export type ShikiRenderOptions = HtmlRendererOptions & {
  fileName?: string
}
