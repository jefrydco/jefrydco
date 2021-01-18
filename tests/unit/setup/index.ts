import { config, RouterLinkStub } from '@vue/test-utils'
import {
  mockNuxtColorMode,
  mockNuxtContext,
  mockRoute
} from '~/tests/unit/mocks'

config.stubs = {
  nuxt: true,
  'no-ssr': true,
  'nuxt-link': RouterLinkStub
}

config.mocks = {
  $colorMode: mockNuxtColorMode,
  $route: mockRoute,
  $nuxt: {
    context: {
      ...mockNuxtContext,
      route: mockRoute
    }
  }
}
