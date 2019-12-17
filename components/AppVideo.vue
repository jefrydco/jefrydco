<template>
  <div :class="`embed embed__${size}`">
    <video :src="videoRequired" autoplay loop muted playsinline />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '16/9',
      validator: (val) => ['square', '16/9', '4/3', '21/9'].includes(val)
    }
  },
  computed: {
    videoRequired() {
      return require(`~/assets/videos${this.src}`)
    }
  }
}
</script>
