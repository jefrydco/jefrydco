import { isDev } from './utils'

import {
  head,
  modules,
  feed,
  sitemap,
  pwa,
  build,
  generate,
  hooks
} from './config'

export default {
  mode: 'universal',

  /**
   * Modern mode on production
   */
  modern: !isDev,

  /*
   ** Headers of the page
   */
  head,

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: 'var(--text-normal)',
    failedColor: '#EF5753'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/styles/darcula'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-lazyload',
    '~/plugins/components.client',
    '~/plugins/components'
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  /**
   * Tailwind CSS configuration
   */
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.pcss'
  },

  /*
   ** Nuxt.js modules
   */
  modules,

  /**
   * Feed configuration
   */
  feed,

  /**
   * Sitemap configuration
   */
  sitemap,

  /**
   * PWA configuration
   */
  pwa,

  /*
   ** Build configuration
   */
  build,

  /**
   * Generate all routes
   */
  generate,

  /**
   * Listener to Nuxt event to generate amp version of all pages
   */
  hooks
}
