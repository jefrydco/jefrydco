<template>
  <div id="home" class="flex flex-wrap items-center justify-center h-screen">
    <div class="flex-initial">
      <app-profile />
    </div>
  </div>
</template>

<script>
import AppProfile from '~/components/AppProfile'

import { HOSTNAME } from '~/constant'

export default {
  components: {
    AppProfile
  },
  head() {
    return {
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.localePath({ name: 'amp' })}`
        }
      ]
    }
  }
}
</script>
