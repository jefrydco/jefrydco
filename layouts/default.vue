<template>
  <div class="mx-auto">
    <nuxt />
    <app-switch-theme />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useMeta
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const vm = getCurrentInstance()
    const i18nSeo = vm?.$nuxtI18nSeo()
    useMeta({
      title: vm?.$t('description') as string,
      ...i18nSeo
    })
  },
  head: {}
})
</script>
