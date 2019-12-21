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
      } else {
        this.isDark = false
      }
      if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
        const darkModeMediaQuery = window.matchMedia(
          '(prefers-color-scheme: dark)'
        )
        if (darkModeMediaQuery.matches) {
          this.isDark = true
        } else {
          this.isDark = false
        }
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
