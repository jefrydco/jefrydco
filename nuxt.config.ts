import { resolve } from 'path'
import DotEnv from 'dotenv'
import { $content } from '@nuxt/content'
import { AstUtility, ThematicBlock } from '@nuxt/content/types/highlighter'
import { EnumChangefreq } from 'sitemap'
import { Integrations } from '@sentry/tracing'
import { multirange } from 'multi-integer-range'

import type { NuxtOptions } from '@nuxt/types'
import type { Feed } from 'feed'
import type { SitemapItemOptions } from 'sitemap'

import { HOSTNAME, locales } from './constants'
import {
  createShikiHighlighter,
  renderCodeToHTML,
  runTwoSlash
} from './libs/shiki-twoslash'
import ampify from './libs/ampify'

import type { ReadingTimeType } from './types'
import type { BlogListDataType } from './types/blog'

DotEnv.config()

const isProductionBuild = process.env.NODE_ENV === 'production'

export default {
  // https://nuxtjs.org/guides/configuration-glossary/configuration-target
  target: 'static',

  // https://nuxtjs.org/guides/configuration-glossary/configuration-head
  head: {
    titleTemplate(pageTitle) {
      if (pageTitle) {
        return `${pageTitle} - Jefrydco`
      }
      return 'Jefrydco'
    },
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1'
      },
      {
        hid: 'og:image:alt',
        name: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Jefrydco'
      },
      { property: 'fb:admins', content: 100003000286186 },
      {
        property: 'fb:app_id',
        content: 267913173658573
      },
      { property: 'fb:pages', content: 632770976865033 },
      {
        name: 'google-site-verification',
        content: 'uDWa7gsQlLiIe_Nk0fG5AvaW8vyEyOFuAZNDdmaZB4M'
      }
    ],
    link: [
      {
        rel: 'webmention',
        href: 'https://webmention.io/jefrydco.id/webmention'
      },
      {
        rel: 'pingback',
        href: 'https://webmention.io/jefrydco.id/xmlrpc'
      },
      {
        type: 'text/plain',
        rel: 'author',
        href: `${HOSTNAME}/humans.txt`
      },
      {
        rel: 'preconnect',
        href: 'https://d33wubrfki0l68.cloudfront.net'
      },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com'
      }
    ],
    // Taken from: https://github.com/manniL/lichter.io/blob/master/config/head.js
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'WebSite',
          name: 'Jefrydco',
          headline: 'A personal site of Jefry Dewangga',
          description: 'A personal site of Jefry Dewangga',
          about: 'A personal site of Jefry Dewangga',
          keywords: 'jefrydco, Jefry Dewangga',
          genre: ['Personal', 'Tutorial', 'Programming', 'Review', 'Science'],
          copyrightYear: new Date().getFullYear(),
          dateCreated: '2017-03-12',
          inLanguage: ['Bahasa Indonesia', 'English'],
          isAccessibleForFree: 'true',
          isFamilyFriendly: 'true',
          license: 'https://opensource.org/licenses/MIT',
          image: {
            '@type': 'imageObject',
            url: `${HOSTNAME}/icon.png`,
            width: '2739',
            height: '3102'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${HOSTNAME}`
          },
          publisher: {
            '@type': 'Organization',
            name: 'Jefrydco',
            sameAs: 'https://www.facebook.com/jefrydco.id',
            logo: {
              '@type': 'imageObject',
              url: `${HOSTNAME}/icon.png`,
              width: '2739',
              height: '3102'
            }
          },
          creator: {
            '@type': 'Person',
            name: 'Jefry Dewangga',
            alternateName: 'Jefrydco',
            birthDate: '1998-03-12',
            gender: { '@type': 'GenderType', alternateName: 'Male' },
            url: [
              `${HOSTNAME}`,
              'https://jefrydco.tumblr.com/',
              'https://jefrydco.blogspot.com/',
              'https://jefrydco.wordpress.com/'
            ],
            sameAs: [
              'https://about.me/jefrydco',
              'https://angel.co/jefrydco',
              'https://behance.net/jefrydco',
              'https://dribbble.com/jefrydco',
              'https://foursquare.com/jefrydco',
              'https://github.com/jefrydco',
              'https://goodreads.com/jefrydco',
              'https://instagram.com/jefrydco',
              'https://medium.com/@jefrydco',
              'https://pinterest.com/jefrydco',
              'https://plus.google.com/+JefryDewangga',
              'https://quora.com/jefrydco',
              'https://reddit.com/user/jefrydco',
              'https://soundcloud.com/jefrydco',
              'https://stackoverflow.com/users/7711812/jefry-dewangga',
              'https://twitter.com/jefrydco',
              'https://vimeo.com/jefrydco',
              'https://www.facebook.com/jefrydco',
              'https://www.last.fm/user/jefrydco',
              'https://www.linkedin.com/in/jefrydco/',
              'https://www.xing.com/profile/Jefry_Dewangga'
            ]
          }
        })
      }
    ]
  },

  loading: {
    color: 'var(--text-normal)',
    failedColor: '#f56565'
  },

  // https://nuxtjs.org/guides/configuration-glossary/configuration-components
  components: true,

  // https://nuxtjs.org/guides/configuration-glossary/configuration-plugins
  plugins: ['~/plugins/vue-lazyload.client'],

  // https://nuxtjs.org/guides/configuration-glossary/configuration-css
  css: ['~/assets/styles/transitions', '~/assets/styles/app'],

  // https://nuxtjs.org/guides/configuration-glossary/configuration-modules
  modules: [
    // https://content.nuxtjs.org/
    '@nuxt/content',

    // https://github.com/nuxt-community/modules/tree/master/packages/browserconfig
    '@nuxtjs/browserconfig',

    // https://github.com/nuxt-community/feed-module
    '@nuxtjs/feed',

    // https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',

    // https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',

    // https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',

    // https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry',

    // https://github.com/nuxt-community/nuxt-i18n
    'nuxt-i18n',

    // https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap'
  ],

  // https://nuxtjs.org/guides/configuration-glossary/configuration-modules#buildmodules
  buildModules: [
    // https://typescript.nuxtjs.org/guide/setup.html#installation
    '@nuxt/typescript-build',

    // https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',

    // https://github.com/nuxt-community/analytics-module
    '@nuxtjs/google-analytics',

    // https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',

    // https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',

    '~/buildModules/nuxt-responsive-loader'
  ],

  // https://content.nuxtjs.org/
  content: {
    dir: 'contents',
    liveEdit: false,
    markdown: {
      remarkPlugins: ['remark-toc'],
      remarkToc: {
        heading: 'daftar isi|toc|table[ -]of[ -]contents?',
        maxDepth: 3,
        ordered: true
      },
      async highlighter() {
        const highlighter = await createShikiHighlighter({
          // @ts-ignore
          theme: resolve(__dirname, 'themes/dracula.json')
        })
        return (
          rawCode: string,
          lang: string,
          { lineHighlights, fileName }: ThematicBlock,
          { node }: AstUtility
        ) => {
          const lineHighlightList: number[] = []
          if (lineHighlights) {
            lineHighlightList.push(...multirange(lineHighlights).toArray())
          }
          if (node.meta) {
            if ((node.meta as string).includes('twoslash')) {
              const twoslashResults = runTwoSlash(rawCode, lang)
              return renderCodeToHTML(
                twoslashResults.code,
                lang,
                ['twoslash'],
                lineHighlightList,
                { fileName },
                highlighter,
                twoslashResults
              )
            }
            if ((node.meta as string).includes('tsconfig')) {
              return renderCodeToHTML(
                rawCode,
                lang,
                ['tsconfig'],
                lineHighlightList,
                { fileName }
              )
            }
          }
          return renderCodeToHTML(rawCode, lang, [], lineHighlightList, {
            fileName
          })
        }
      }
    }
  },

  // https://github.com/nuxt-community/modules/tree/master/packages/browserconfig
  browserconfig: {
    TileColor: '#2D3748'
  },

  // https://github.com/nuxt-community/google-fonts-module
  googleFonts: {
    download: true,
    display: 'swap',
    families: {
      Bitter: true,
      'Merriweather Sans': true,
      'Fira Code': true
    }
  },

  // https://pwa.nuxtjs.org
  pwa: {
    // https://pwa.nuxtjs.org/modules/meta.html
    meta: {
      name: 'Jefrydco',
      description: 'A personal site of Jefry Dewangga',
      lang: 'id',
      ogHost: `${HOSTNAME}`,
      twitterCard: 'summary_large_image',
      twitterSite: '@jefrydco',
      twitterCreator: '@jefrydco'
    },

    // https://pwa.nuxtjs.org/modules/manifest.html
    manifest: {
      name: 'Jefrydco',
      short_name: 'Jefrydco',
      description: 'A personal site of Jefry Dewangga',
      lang: 'id',
      background_color: '#2D3748',
      theme_color: '#2D3748'
    },

    // https://pwa.nuxtjs.org/modules/workbox.html
    workbox: {
      offlineAnalytics: true,
      runtimeCaching: [
        {
          urlPattern: 'https://ajax.cloudflare.com/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://d33wubrfki0l68.cloudfront.net/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://fonts.gstatic.com/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://cdn.ampproject.org/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://firestore.googleapis.com/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://www.google.com/.*',
          handler: 'staleWhileRevalidate'
        },
        {
          urlPattern: 'https://www.gstatic.com/.*',
          handler: 'staleWhileRevalidate'
        }
      ]
    }
  },

  // https://github.com/nuxt-community/robots-module
  robots: {
    Sitemap: `${HOSTNAME}/sitemap.xml`
  },

  // https://github.com/nuxt-community/sentry-module
  sentry: {
    dsn: process.env.SENTRY_DSN,
    clientConfig: {
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 0.5,
      tracingOptions: {
        trackComponents: true
      }
    }
  },

  // https://github.com/nuxt-community/nuxt-i18n
  i18n: {
    vueI18n: {
      silentTranslationWarn: true
    },
    baseUrl: 'https://jefrydco.id',
    seo: false,
    defaultLocale: 'id',
    detectBrowserLanguage: false,
    lazy: true,
    langDir: 'locales/',
    vueI18nLoader: true,
    locales
  },

  // https://typescript.nuxtjs.org/guide/lint.html
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,vue}'
      }
    }
  },

  // https://github.com/nuxt-community/color-mode-module
  colorMode: {
    fallback: 'dark'
  },

  // https://github.com/nuxt-community/analytics-module
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS
  },

  // https://github.com/nuxt-community/stylelint-module
  stylelint: {
    fix: true
  },

  // https://tailwindcss.nuxtjs.org/
  tailwindcss: {
    viewer: false
  },

  responsiveLoader: {
    size: 1920,
    placeholder: true,
    quality: 60,
    adapter: require('responsive-loader/sharp')
  },

  // https://github.com/nuxt-community/feed-module
  feed() {
    return locales.map((locale) => {
      const path =
        locale.code === 'id' ? '/blog.xml' : `/${locale.code}/blog.xml`

      return {
        path,
        type: 'rss2',
        async create(feed: Feed) {
          feed.options = {
            title: 'Blog - Jefrydco',
            id: `${HOSTNAME}${path}`,
            link: `${HOSTNAME}${path}`,
            language: locale.code,
            description: 'A personal site of Jefry Dewangga.',
            copyright: new Date().getFullYear().toString()
          }

          feed.addContributor({
            name: 'Jefry Dewangga',
            email: 'jefrydco@gmail.com',
            link: `${HOSTNAME}`
          })

          // @ts-expect-error
          const contents: BlogListDataType = await $content(`/id/blog`, {
            deep: true
          })
            .only(['title', 'slug', 'img', 'postedDate', 'summary'])
            .sortBy('postedDate', 'desc')
            .fetch<BlogListDataType>()

          contents.forEach((content) => {
            feed.addItem({
              title: content.title,
              id:
                locale.code === 'id'
                  ? `${HOSTNAME}/blog/${content.slug}/`
                  : `${HOSTNAME}/${locale.code}/blog/${content.slug}/`,
              link:
                locale.code === 'id'
                  ? `${HOSTNAME}/blog/${content.slug}/`
                  : `${HOSTNAME}/${locale.code}/blog/${content.slug}/`,
              date: new Date(content.postedDate),
              description: content.summary
            })
          })
        }
      }
    })
  },

  // https://sitemap.nuxtjs.org/
  sitemap: {
    hostname: HOSTNAME,
    gzip: true,
    async routes(): Promise<Partial<SitemapItemOptions>[]> {
      // @ts-expect-error
      const contents: BlogListDataType = await $content(`/id/blog`, {
        deep: true
      })
        .only(['slug', 'updatedDate'])
        .sortBy('postedDate', 'desc')
        .fetch<BlogListDataType>()

      function generateSitemap(
        { isAmp }: { isAmp?: boolean } = { isAmp: false }
      ) {
        return locales
          .map((locale) =>
            locale.code === 'id'
              ? (contents.map((content) => ({
                  url: isAmp
                    ? `/blog/${content.slug}/amp/`
                    : `/blog/${content.slug}/`,
                  changefreq: EnumChangefreq.DAILY,
                  priority: 1,
                  lastmod: new Date(content.updatedDate).toISOString()
                })) as Partial<SitemapItemOptions>[])
              : (contents.map((content) => ({
                  url: isAmp
                    ? `/${locale.code}/blog/${content.slug}/amp/`
                    : `/${locale.code}/blog/${content.slug}/`,
                  changefreq: EnumChangefreq.DAILY,
                  priority: 1,
                  lastmod: new Date(content.updatedDate).toISOString()
                })) as Partial<SitemapItemOptions>[])
          )
          .flat()
      }

      return [...generateSitemap(), ...generateSitemap({ isAmp: true })]
    }
  },

  // https://nuxtjs.org/guides/configuration-glossary/configuration-generate
  generate: {
    async routes() {
      // @ts-expect-error
      const contents: BlogListDataType = await $content(`/id/blog`, {
        deep: true
      })
        .only(['slug'])
        .sortBy('postedDate', 'desc')
        .fetch<BlogListDataType>()

      return locales
        .map((locale) =>
          locale.code === 'id'
            ? contents.map((content) => `/blog/${content.slug}/amp/`)
            : contents.map(
                (content) => `/${locale.code}/blog/${content.slug}/amp/`
              )
        )
        .flat()
    }
  },

  hooks: {
    'content:file:beforeInsert': (document: any) => {
      if (document.extension === '.md') {
        document.readingTime = require('reading-time')(
          document.text as string
        ) as ReadingTimeType
      }
    },
    // This hook is called before saving the html to flat file
    'generate:page': (page: any) => {
      if (isProductionBuild && /\/amp((\/.*$)|$)/gi.test(page.route)) {
        page.html = ampify(page.html)
      }
    },
    // This hook is called before serving the html to the browser
    'render:route': (url: string, page: any) => {
      if (isProductionBuild && /\/amp((\/.*$)|$)/gi.test(url)) {
        page.html = ampify(page.html)
      }
    }
  },

  // https://nuxtjs.org/api/configuration-build
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {}
      }
    },
    extend(_config, { isDev, isClient }) {
      if (isDev && isClient) {
        _config.module?.rules.push({
          enforce: 'pre',
          test: /\.(ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            fix: true
          }
        })
      }
    }
  }
} as Partial<NuxtOptions>
