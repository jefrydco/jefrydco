<template>
  <details class="app-talk-section">
    <summary class="app-talk-section__summary">
      {{ title }}
    </summary>
    <slot />
  </details>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.app-talk-section {
  @apply max-w-4xl mx-auto;

  &__summary {
    @apply mb-5 mx-4 py-2 px-3 rounded-l-lg cursor-pointer;
    background-image: linear-gradient(
      to right,
      rgba(245, 158, 11, 0.2) 50%,
      rgba(245, 101, 101, 0)
    );
  }
}
/* purgecss end ignore */
</style>
