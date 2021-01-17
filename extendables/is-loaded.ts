import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      isLoaded: false
    }
  },
  mounted() {
    window.addEventListener('load', this.setLoaded)
    this.$watch('$route.name', this.setLoaded, { immediate: true })
  },
  beforeDestroy() {
    window.removeEventListener('load', this.setLoaded)
  },
  methods: {
    setLoaded() {
      setTimeout(() => {
        this.isLoaded = true
      }, 1000)
    }
  }
})
