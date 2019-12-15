<script>
import Page from './index'

export default {
  extends: Page,
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: `${this.$route.path}`.replace(/\/amp((\/.*$)|$)/gi, '')
        }
      ]
    }
  }
}
</script>
