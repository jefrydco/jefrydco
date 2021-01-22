<template>
  <!-- Adapted from: https://github.com/777666222244466/vue-scroll-indicator/blob/master/src/components/VueScrollIndicator.vue -->
  <div id="scroll-indicator" class="scroll-indicator">
    <div class="scroll-indicator__progress" :style="{ width }"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      scrollTop: 0,
      scrollHeight: 0
    }
  },
  computed: {
    width() {
      // @ts-expect-error
      const divided = this.scrollTop / this.scrollHeight
      if (isNaN(divided)) {
        return '0%'
      }
      return `${divided * 100}%`
    }
  },
  mounted() {
    window.addEventListener('load', this.scrollHandler)
    window.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('load', this.scrollHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  },
  methods: {
    scrollHandler() {
      this.scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      this.scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
    }
  }
})
</script>

<style>
.scroll-indicator {
  @apply w-full fixed top-0 left-0 right-0 z-30;
  height: 0.125rem;
  background: var(--bg);

  &__progress {
    @apply w-0 h-full;
    background: var(--text-normal);
  }
}
</style>
