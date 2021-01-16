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
  head() {
    const i18nSeo = this.$nuxtI18nSeo()

    return {
      title: this.$t('description'),
      bodyAttrs: {
        class: this.isDark ? 'dark' : 'light'
      },
      ...i18nSeo
    }
  },
  mounted() {
    this.initColorScheme()
  },
  methods: {
    initColorScheme() {
      const isDark = Cookie.get('d')
      if (isDark) {
        if (parseInt(isDark)) {
          this.isDark = true
        }
      } else if (
        window.matchMedia('(prefers-color-scheme)').media !== 'not all'
      ) {
        const darkModeMediaQuery = window.matchMedia(
          '(prefers-color-scheme: dark)'
        )
        if (darkModeMediaQuery.matches) {
          this.isDark = true
        }
        darkModeMediaQuery.addListener((e) => {
          const darkModeOn = e.matches
          this.isDark = darkModeOn
        })
      }
    }
  }
}
</script>
