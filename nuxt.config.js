import { isDev } from "./config/utils";

import { head, modules, purgeCSS, sitemap, feed, build } from "./config";

export default {
  modern: !isDev,

  // https://nuxtjs.org/api/configuration-head
  head,

  // https://nuxtjs.org/api/configuration-modules
  modules,

  purgeCSS,

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

  // https://nuxtjs.org/api/configuration-servermiddleware
  serverMiddleware: ["~/server/redirect-www-to-non-www"],

  // https://nuxtjs.org/api/configuration-build
  build
};
