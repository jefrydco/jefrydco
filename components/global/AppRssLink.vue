<template>
  <div id="rss" class="rss">
    <a :href="link" target="_blank" rel="noopener noreferrer">RSS</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export type AppRssLinkProps = {
  link: string
}

export default defineComponent<AppRssLinkProps>({
  props: {
    link: {
      type: String,
      default: '',
      required: true
    }
  }
})
</script>

<style>
.rss {
  @apply my-12 text-center;
}
</style>
