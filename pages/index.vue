<template>
  <div id="home" class="flex flex-wrap items-center justify-center h-screen">
    <div class="flex-initial">
      <app-profile />
    </div>
  </div>
</template>

<script>
import AppProfile from '~/components/AppProfile'

export default {
  components: {
    AppProfile
  }
}
</script>
