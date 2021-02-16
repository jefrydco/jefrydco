<template>
  <a :href="`${localePath(to)}/`">
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
    }
  }
})
</script>
