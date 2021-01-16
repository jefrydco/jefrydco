<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    this.$router.replace('/')
  },
  render(h) {
    return h('div')
  }
})
</script>
