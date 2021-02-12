import type { HtmlRendererOptions } from 'shiki'

export type ShikiRenderOptions = HtmlRendererOptions & {
  fileName?: string
}
