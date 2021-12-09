<script lang="ts">
import Page from './index.vue'
import { HOSTNAME } from '~/constants'

export default {
  extends: Page,
  // @ts-expect-error
  head() {
    return {
      // @ts-expect-error
      title: this.blog && this.blog.title,
      link: [
        {
          hid: 'i18n-can',
          rel: 'canonical',
          href: `${HOSTNAME}${
            // @ts-expect-error
            this.blog &&
            // @ts-expect-error
            this.localePath({
              name: 'blog-slug',
              // @ts-expect-error
              params: { slug: this.blog.slug }
            })
          }/`
        }
      ],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          // @ts-expect-error
          content: this.blog && this.blog.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${
            // @ts-expect-error
            this.blog &&
            // @ts-expect-error
            this.localePath({
              name: 'blog-slug-amp',
              // @ts-expect-error
              params: { slug: this.blog.slug }
            })
          }/`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${HOSTNAME}${
            // @ts-expect-error
            this.blog && require(`~/assets/images${this.blog.img}`)
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
          content: this.blog && this.blog.title
        },
        {
          hid: 'description',
          name: 'description',
          // @ts-expect-error
          content: this.blog && this.blog.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          // @ts-expect-error
          content: this.blog && this.blog.description
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'blogPosting',
            mainEntityOfPage: `${HOSTNAME}${
              // @ts-expect-error
              this.blog &&
              // @ts-expect-error
              this.localePath({
                name: 'blog-slug-amp',
                // @ts-expect-error
                params: { slug: this.blog.slug }
              })
            }/`,
            // @ts-expect-error
            headline: this.blog && this.blog.title,
            // @ts-expect-error
            description: this.blog && this.blog.description,
            // @ts-expect-error
            datePublished: this.blog && this.blog.postedDate,
            // @ts-expect-error
            dateCreated: this.blog && this.blog.postedDate,
            // @ts-expect-error
            dateModified: this.blog && this.blog.updatedDate,
            // @ts-expect-error
            wordcount: this.blog && this.blog.readingTime.words,
            url: `${HOSTNAME}${
              // @ts-expect-error
              this.blog &&
              // @ts-expect-error
              this.localePath({
                name: 'blog-slug-amp',
                // @ts-expect-error
                params: { slug: this.blog.slug }
              })
            }/`,
            // @ts-expect-error
            articleBody: this.blog && this.blog.content,
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}${
                // @ts-expect-error
                this.blog && require(`~/assets/images${this.blog.img}`)
              }`,
              height: '1920',
              width: '1080'
            },
            publisher: {
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
            author: {
              '@type': 'Person',
              name: 'Jefry Dewangga'
            }
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  // @ts-expect-error
                  '@id': `${HOSTNAME}${this.localePath({ name: 'blog-amp' })}/`,
                  name: 'Blog'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': `${HOSTNAME}${
                    // @ts-expect-error
                    this.blog &&
                    // @ts-expect-error
                    this.localePath({
                      name: 'blog-slug-amp',
                      // @ts-expect-error
                      params: { slug: this.blog.slug }
                    })
                  }/`,
                  // @ts-expect-error
                  name: this.blog && this.blog.title
                }
              }
            ]
          })
        }
      ]
    }
  }
}
</script>
