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
              params: { slug: this.talk && this.talk.slug }
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
              params: { slug: this.talk && this.talk.slug }
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
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationEvent',
            // @ts-expect-error
            name: this.talk && this.talk.title,
            // @ts-expect-error
            startDate: this.talk && this.talk.startDate,
            // @ts-expect-error
            endDate: this.talk && this.talk.endDate,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
            location: {
              '@type': 'VirtualLocation',
              url:
                // @ts-expect-error
                (this.talk && this.talk.playback) ||
                `${HOSTNAME}${
                  this.talk &&
                  this.localePath({
                    name: 'talk-slug',
                    // @ts-expect-error
                    params: { slug: this.talk.slug }
                  })
                }/`
            },
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}${require(`~/assets/images${
                // @ts-expect-error
                this.talk && this.talk.poster
              }`)}`,
              height: '1920',
              width: '614'
            },
            // @ts-expect-error
            description: this.talk && this.talk.description,
            offers: {
              '@type': 'Offer',
              url: `${HOSTNAME}${
                this.talk &&
                this.localePath({
                  name: 'talk-slug',
                  // @ts-expect-error
                  params: { slug: this.talk.slug }
                })
              }/`,
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            performer: {
              '@type': 'Person',
              name: 'Jefry Dewangga',
              alternateName: 'Jefrydco',
              image: {
                '@type': 'imageObject',
                url: `${HOSTNAME}/icon.png`,
                width: '2739',
                height: '3102'
              }
            },
            organizer: {
              '@type': 'Organization',
              // @ts-expect-error
              name: this.talk && this.talk.organizer,
              // @ts-expect-error
              url: this.talk && this.talk.organizerUrl
            }
          })
        }
      ]
    }
  }
})
</script>
