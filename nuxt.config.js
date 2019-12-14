/* eslint-disable import/first */
require('dotenv').config()

import path from 'path'

import fm from 'front-matter'

import MarkdownIt from 'markdown-it'
import mip from 'markdown-it-prism'
import mila from 'markdown-it-link-attributes'
import mia from 'markdown-it-anchor'
import mitdr from 'markdown-it-toc-done-right'
import slugify from '@sindresorhus/slugify'

import { VUE_COMPONENT, HTML } from 'frontmatter-markdown-loader/mode'

import blogPaths from './contents/blogs'

import { locales, readFileAsync, flattenDeep, ampify, isDev } from './utils'

import i18n from './locales/config'

const md = new MarkdownIt({
  html: true,
  typographer: true
})
md.use(mip)
md.use(mila, {
  pattern: /(http|https|ftp|ftps):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/,
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
})
md.use(mia, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '🔗',
  slugify
})
md.use(mitdr, {
  slugify
})

export default {
  mode: 'universal',

  modern: !isDev,

  /*
   ** Headers of the page
   */
  head: {
    titleTemplate(title) {
      if (title) {
        return `${title} - Jefrydco`
      }
      return 'Jefrydco'
    },
    meta: [
      { charset: 'utf-8' },
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
        property: 'fb:appid',
        content: 267913173658573
      },
      { property: 'fb:pages', content: 632770976865033 }
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
        href: 'https://jefrydco.id/humans.txt'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com'
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
            url: 'https://jefrydco.id/icon.png',
            width: '2739',
            height: '3102'
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://jefrydco.id'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Jefrydco',
            sameAs: 'https://www.facebook.com/jefrydco.id',
            logo: {
              '@type': 'imageObject',
              url: 'https://jefrydco.id/icon.png',
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
              'https://jefrydco.id',
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
  css: ['~/assets/css/darcula'],

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

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.pcss'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
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

    // https://github.com/nuxt-community/html-minifier-module
    ['@nuxtjs/html-minifier', { log: 'once', logHtml: true }]
  ],

  feed: () => {
    const feedList = locales.map((locale) => {
      let path = null
      if (locale.code === 'id') {
        path = `/blog.xml`
      } else {
        path = `/${locale.code}/blog.xml`
      }
      return {
        path,
        type: 'rss2',
        async create(feed) {
          feed.options = {
            title: 'Blog - Jefrydco',
            id: `https://jefrydco.id${path}`,
            link: `https://jefrydco.id${path}`,
            language: locale.code,
            description: 'A personal site of Jefry Dewangga.'
          }

          feed.addContributor({
            name: 'Jefry Dewangga',
            email: 'jefrydco@gmail.com',
            link: 'https://jefrydco.id'
          })

          const feedItems = await Promise.all(
            blogPaths.map(async (blogPath) => {
              let blogs = null
              if (locale.code === 'id') {
                blogs = await readFileAsync(
                  `./contents/blogs/${blogPath}/index.md`
                )
              } else {
                blogs = await readFileAsync(
                  `./contents/blogs/${blogPath}/index.${locale.code}.md`
                )
              }
              const { attributes } = await fm(blogs.toString())

              if (locale.code === 'id') {
                return {
                  title: attributes.title,
                  id: `https://jefrydco.id/blog/${attributes.slug}`,
                  link: `https://jefrydco.id/blog/${attributes.slug}`,
                  image: `https://jefrydco.id${attributes.img}`,
                  date: attributes.date,
                  description: attributes.description,
                  content: attributes.summary
                }
              } else {
                return {
                  title: attributes.title,
                  id: `https://jefrydco.id/blog/${attributes.slug}`,
                  link: `https://jefrydco.id/${locale.code}/blog/${attributes.slug}`,
                  image: `https://jefrydco.id/${attributes.img}`,
                  date: attributes.date,
                  description: attributes.description,
                  content: attributes.summary
                }
              }
            })
          )

          feedItems.forEach((feedItem) => {
            feed.addItem(feedItem)
          })
        }
      }
    })

    return feedList
  },

  sitemap: {
    hostname: 'https://jefrydco.id',
    gzip: true,
    async routes() {
      let routes = await Promise.all(
        locales.map((locale) => {
          return Promise.all(
            blogPaths.map(async (blogPath) => {
              let blogs = null
              if (locale.code === 'id') {
                blogs = await readFileAsync(
                  `./contents/blogs/${blogPath}/index.md`
                )
              } else {
                blogs = await readFileAsync(
                  `./contents/blogs/${blogPath}/index.${locale.code}.md`
                )
              }
              const { attributes } = await fm(blogs.toString())

              if (locale.code === 'id') {
                return {
                  url: `/blog/${blogPath}`,
                  changefreq: 'daily',
                  priority: 1,
                  lastmodISO: new Date(attributes.updatedDate).toISOString()
                }
              } else {
                return {
                  url: `${locale.code}/blog/${blogPath}`,
                  changefreq: 'daily',
                  priority: 1,
                  lastmodISO: new Date(attributes.updatedDate).toISOString()
                }
              }
            })
          )
        })
      )
      routes = flattenDeep(routes)
      return routes
    }
  },

  pwa: {
    // https://pwa.nuxtjs.org/modules/meta.html
    meta: {
      name: 'Jefrydco',
      description: 'A personal site of Jefry Dewangga',
      lang: 'id',
      ogHost: 'https://jefrydco.id',
      twitterCard: 'summary_large_image',
      twitterSite: '@jefrydco',
      twitterCreator: '@jefrydco'
    },

    // https://pwa.nuxtjs.org/modules/manifest.html
    manifest: {
      name: 'Jefrydco',
      short_name: 'Jefrydco',
      start_url: '/?utm_source=homescreen',
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
        }
      ]
    }
  },

  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-mixins': {},
        'postcss-simple-vars': {},
        'postcss-nested': {}
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      // https://github.com/nuxt-community/dotenv-module/issues/11#issuecomment-376780588
      config.node = {
        fs: 'empty'
      }

      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          mode: [VUE_COMPONENT, HTML],
          vue: {
            root: 'dynamic-markdown'
          },
          markdown(body) {
            return md.render(body)
          }
        }
      })

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            fix: true
          }
        })
      }
    }
  },

  generate: {
    routes: []
      .concat(blogPaths.map((blogPath) => `/blog/${blogPath}`))
      .concat(blogPaths.map((blogPath) => `/blog/${blogPath}/amp`))
      .concat(blogPaths.map((blogPath) => `/en/blog/${blogPath}`))
      .concat(blogPaths.map((blogPath) => `/en/blog/${blogPath}/amp`))
  },

  hooks: {
    // This hook is called before saving the html to flat file
    'generate:page': (page) => {
      if (/\/amp((\/.*$)|$)/gi.test(page.route)) {
        page.html = ampify(page.html)
      }
    },
    // This hook is called before serving the html to the browser
    'render:route': (url, page, { req, res }) => {
      if (/\/amp((\/.*$)|$)/gi.test(url)) {
        page.html = ampify(page.html)
      }
    }
  }
}
