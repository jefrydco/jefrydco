<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  // @ts-expect-error
  asyncData({ app, redirect }) {
    return redirect(app.localePath('/blog'))
  },
  render(h) {
    return h('div')
  }
})
</script>
