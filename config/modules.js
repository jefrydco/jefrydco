/* eslint-disable import/first */
require('dotenv').config()

import { HOSTNAME } from '../constant'
import i18n from '../locales/config'

export default [
  // https://pwa.nuxtjs.org/
  '@nuxtjs/pwa',

  // https://github.com/nuxt-community/sitemap-module
  '@nuxtjs/sitemap',

  // https://github.com/nuxt-community/sentry-module
  [
    '@nuxtjs/sentry',
    {
      dsn: process.env.SENTRY_DSN
    }
  ],

  // https://github.com/nuxt-community/feed-module
  '@nuxtjs/feed',

  // https://github.com/nuxt-community/nuxt-i18n
  ['nuxt-i18n', i18n],

  // https://github.com/nuxt-community/analytics-module
  [
    '@nuxtjs/google-analytics',
    {
      id: process.env.GOOGLE_ANALYTICS
    }
  ],

  // https://github.com/geeogi/nuxt-responsive-loader
  [
    'nuxt-responsive-loader',
    {
      size: 1920,
      placeholder: true,
      quality: 60,
      adapter: require('responsive-loader/sharp')
    }
  ],

  // https://github.com/nuxt-community/robots-module
  [
    '@nuxtjs/robots',
    {
      Sitemap: `${HOSTNAME}/sitemap.xml`
    }
  ]
]
