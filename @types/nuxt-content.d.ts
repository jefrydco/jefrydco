import type { DumpOptions as yamlOptions } from 'js-yaml'
import type { OptionsV2 as xmlOptions } from 'xml2js'
import type { CSVParseParam as csvOptions } from 'csvtojson/v2/Parameters'

type extendOrOverwrite<T> = ((old: T) => T) | T

declare module '@nuxt/types' {
  interface Configuration {
    content?: {
      watch?: boolean
      liveEdit?: boolean
      apiPrefix?: string
      dir?: string
      fullTextSearchFields?: extendOrOverwrite<Array<string>>
      nestedProperties?: extendOrOverwrite<Array<string>>
      markdown?: {
        remarkPlugins?: extendOrOverwrite<
          Array<string | [string, Record<string, unknown>]>
        >
        rehypePlugins?: extendOrOverwrite<
          Array<string | [string, Record<string, unknown>]>
        >
        prism?: {
          theme?: string | false
        }
      }
      yaml?: yamlOptions
      csv?: csvOptions
      xml?: xmlOptions
      extendParser?: {
        [extension: string]: (file: string) => any
      }
    }
  }
}
