<script>
import Page from './index'
import { HOSTNAME } from '~/constant'

export default {
  extends: Page,
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${HOSTNAME}${this.localePath({ name: 'index' })}`
        }
      ]
    }
  }
}
</script>
