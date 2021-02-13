<template>
  <div id="home" class="flex flex-wrap items-center justify-center h-screen">
    <div class="flex-initial">
      <app-profile />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { HOSTNAME } from '~/constants'

export default Vue.extend({
  head() {
    return {
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.localePath({ name: 'amp' })}/`
        }
      ]
    }
  }
})
</script>
