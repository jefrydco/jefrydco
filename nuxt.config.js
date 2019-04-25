import { isDev, locales } from "./helpers";

import { head, sitemap, feed, build } from "./config";
import nuxtImageLoaderConf from "./config/nuxt-image-loader.conf";

require("dotenv").config();

export default {
  modern: !isDev,

  // https://nuxtjs.org/api/configuration-head
  head,

  // https://nuxtjs.org/api/configuration-modules
  modules: [
    // https://nuxtjs.org/faq/cached-components/
    "@nuxtjs/component-cache",

    // https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",

    // https://pwa.nuxtjs.org/
    "@nuxtjs/pwa",

    // https://github.com/nuxt-community/sitemap-module
    "@nuxtjs/sitemap",

    // https://github.com/nuxt-community/sentry-module
    "@nuxtjs/sentry",

    // https://github.com/nuxt-community/feed-module
    "@nuxtjs/feed",

    // https://github.com/Developmint/nuxt-webfontloader
    "nuxt-webfontloader",

    // https://github.com/nuxt-community/moment-module
    ["@nuxtjs/moment", ["id"]],

    // https://github.com/nuxt-community/nuxt-i18n
    [
      "nuxt-i18n",
      {
        defaultLocale: "id",
        detectBrowserLanguage: false,
        lazy: true,
        langDir: "lang/",
        locales
      }
    ],

    // https://github.com/nuxt-community/analytics-module
    [
      "@nuxtjs/google-analytics",
      {
        id: process.env.GOOGLE_ANALYTICS
      }
    ],

    // https://github.com/reallifedigital/nuxt-image-loader-module
    ["@reallifedigital/nuxt-image-loader-module", nuxtImageLoaderConf]
  ].concat(
    isDev
      ? []
      : [
          // https://github.com/Developmint/nuxt-purgecss
          "nuxt-purgecss"
        ]
  ),

  purgeCSS: {
    mode: "postcss"
  },

  // https://pwa.nuxtjs.org/modules/meta.html
  meta: {
    name: "Jefrydco",
    description: "A personal site of Jefry Dewangga",
    lang: "id",
    ogHost: "https://jefrydco.id",
    twitterCard: "summary_large_image",
    twitterSite: "@jefrydco",
    twitterCreator: "@jefrydco"
  },

  // https://pwa.nuxtjs.org/modules/manifest.html
  manifest: {
    name: "Jefrydco",
    short_name: "Jefrydco",
    start_url: "/?utm_source=homescreen",
    description: "A personal site of Jefry Dewangga",
    lang: "id",
    background_color: "#3D4852"
  },

  sitemap,

  feed,

  webfontloader: {
    google: {
      families: ["Merriweather+Sans", "Bitter", "PT+Mono"]
    }
  },

  // https://nuxtjs.org/api/configuration-loading
  loading: {
    color: "#3D4852",
    failedColor: "#EF5753"
  },

  // https://nuxtjs.org/api/configuration-plugins
  plugins: ["~/plugins/components.client"],

  // https://nuxtjs.org/api/configuration-css
  css: [
    "~/assets/styles/tailwind",
    "~/assets/styles/darcula",
    "~/assets/styles/main"
  ],

  // https://nuxtjs.org/api/configuration-watch
  watch: ["~/server/**/*", "~/config/**/*", "~/helpers/**/*"],

  serverMiddleware: ["~/server/redirect-www-to-non-www"],

  // https://nuxtjs.org/api/configuration-build
  build
};
