<template>
  <div id="rss" class="rss">
    <a :href="link" target="_blank" rel="noopener noreferrer">RSS</a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    link: {
      type: String,
      default: '',
      required: true
    }
  }
})
</script>
