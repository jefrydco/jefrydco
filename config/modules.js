import { isDev, locales } from "./utils";
import { nuxtImageLoaderConf } from "./config";

require("dotenv").config();

export default [
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
);
