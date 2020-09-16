<template>
  <!-- Adapted from: https://github.com/777666222244466/vue-scroll-indicator/blob/master/src/components/VueScrollIndicator.vue -->
  <div id="scroll-indicator" class="scroll-indicator">
    <div class="scroll-indicator__progress" :style="{ width }"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
  onBeforeUnmount
} from '@nuxtjs/composition-api'

function useScrollIndicator() {
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  const width = computed(() => {
    const divided = scrollTop.value / scrollHeight.value
    if (isNaN(divided)) {
      return `0%`
    }
    return `${divided * 100}%`
  })

  function scrollHandler() {
    scrollTop.value =
      document.body.scrollTop || document.documentElement.scrollTop
    scrollHeight.value =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  }

  onMounted(() => {
    window.addEventListener('load', scrollHandler)
    window.addEventListener('scroll', scrollHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('load', scrollHandler)
    window.removeEventListener('scroll', scrollHandler)
  })

  return width
}

export default defineComponent({
  setup() {
    const width = useScrollIndicator()

    return {
      width
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
