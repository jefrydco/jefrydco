<template>
  <a :href="localePath(to)" :target="target">
    <slot />
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: [Object, String],
      required: true,
      default() {
        return null
      }
    },
    target: {
      type: String,
      default: null
    }
  }
})
</script>
