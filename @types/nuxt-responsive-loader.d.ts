import type { NuxtResponsiveLoaderOptions } from '~/types'

declare module '@nuxt/types/config/index' {
  interface NuxtOptions {
    responsiveLoader: NuxtResponsiveLoaderOptions
  }
}
