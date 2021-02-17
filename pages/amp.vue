<script lang="ts">
import Page from './index.vue'
import { HOSTNAME } from '~/constants'

export default {
  extends: Page,
  head() {
    return {
      link: [
        {
          hid: 'i18n-can',
          rel: 'canonical',
          href: `${HOSTNAME}${this.localePath({ name: 'index' })}/`
        }
      ]
    }
  }
}
</script>
