<template>
  <div class="mx-auto">
    <nuxt />
    <app-switch-theme v-model="isDark" />
  </div>
</template>

<script>
import AppSwitchTheme from '~/components/AppSwitchTheme'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    AppSwitchTheme
  },
  data() {
    return {
      isDark: false
    }
  },
  mounted() {
    this.initColorScheme()
  },
  methods: {
    initColorScheme() {
      const isDark = Cookie.get('d')
      if (isDark && Boolean(isDark)) {
        this.isDark = true
      }
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        const darkModeMediaQuery = window.matchMedia(
          '(prefers-color-scheme: dark)'
        )
        darkModeMediaQuery.addListener((e) => {
          const darkModeOn = e.matches
          this.isDark = darkModeOn
        })
      }
    }
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()

    return {
      title: this.$t('description'),
      bodyAttrs: {
        class: this.isDark ? 'dark' : 'light'
      },
      ...i18nSeo
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
