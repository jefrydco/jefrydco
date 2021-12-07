<script lang="ts">
import Page from './index.vue'

import { HOSTNAME } from '~/constants'

export default Page.extend({
  // @ts-expect-error
  head() {
    return {
      // @ts-expect-error
      title: this.talk && this.talk.title,
      link: [
        {
          hid: 'i18n-can',
          rel: 'canonical',
          href: `${HOSTNAME}${
            this.talk &&
            this.localePath({
              name: 'talk-slug',
              // @ts-expect-error
              params: { slug: this.talk.slug }
            })
          }/`
        }
      ],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          // @ts-expect-error
          content: this.talk && this.talk.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${
            this.talk &&
            this.localePath({
              name: 'talk-slug',
              // @ts-expect-error
              params: { slug: this.talk.slug }
            })
          }/`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${HOSTNAME}${
            // @ts-expect-error
            this.talk && require(`~/assets/images${this.talk.poster}`)
          }`
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1920'
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '1280'
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          // @ts-expect-error
          content: this.talk && this.talk.title
        },
        {
          hid: 'description',
          name: 'description',
          // @ts-expect-error
          content: this.talk && this.talk.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          // @ts-expect-error
          content: this.talk && this.talk.description
        }
      ]
    }
  }
})
</script>
