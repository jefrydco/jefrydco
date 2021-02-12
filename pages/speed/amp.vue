<script>
import Page from './index'
import { HOSTNAME } from '~/constants'

export default {
  extends: Page,
  head() {
    return {
      link: [
        {
          hid: 'i18n-can',
          rel: 'canonical',
          href: `${HOSTNAME}${this.localePath({ name: 'speed' })}`
        }
      ]
    }
  }
}
</script>
