import type { ColorModeInstance } from '~/types'

declare module '@nuxt/vue-app' {
  interface Context {
    $colorMode: ColorModeInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $colorMode: ColorModeInstance
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $colorMode: ColorModeInstance
  }
}
