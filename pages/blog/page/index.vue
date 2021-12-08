<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  asyncData({ redirect, localePath }) {
    return redirect(localePath('/blog'))
  },
  render(h) {
    return h('div')
  }
})
</script>
