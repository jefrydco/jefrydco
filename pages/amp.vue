<script lang="ts">
import Page from './index.vue'
import { HOSTNAME } from '~/constants'

export default {
  extends: Page,
  // @ts-expect-error
  head() {
    return {
      link: [
        {
          hid: 'i18n-can',
          rel: 'canonical',
          // @ts-expect-error
          href: `${HOSTNAME}${this.localePath({ name: 'index' })}/`
        }
      ]
    }
  }
}
</script>
