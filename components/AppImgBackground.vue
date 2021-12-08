<template>
  <div
    v-lazy:background-image="imageRequired.src"
    role="img"
    :aria-label="alt"
    class="app-img-background"
  ></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  },
  computed: {
    imageRequired() {
      return require(`~/assets/images${this.src}`)
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.app-img-background {
  @apply bg-contain bg-center bg-no-repeat;
  background-color: var(--inline-code-bg);
}

.app-img-background[lazy='loading'] {
  @apply opacity-100;
  filter: blur(0.9375rem);
}

.app-img-background[lazy='loaded'] {
  @apply opacity-100;
}
/* purgecss end ignore */
</style>
