<script>
import Page from './index'
import { HOSTNAME } from '~/constant'

export default {
  extends: Page,
  head() {
    return {
      title: this.blog && this.blog.title,
      link: [
        {
          rel: 'canonical',
          href: `${HOSTNAME}${this.$route.path}`.replace(/amp((\/.*$)|$)/gi, '')
        }
      ],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.blog && this.blog.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.blog &&
            this.localePath({
              name: 'blog-slug-amp',
              params: { slug: this.blog.slug }
            })}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${HOSTNAME}${this.blog &&
            require(`~/assets/images${this.blog.img}`)}`
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
          content: this.blog && this.blog.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.blog && this.blog.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
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
            mainEntityOfPage: `${HOSTNAME}${this.blog &&
              this.localePath({
                name: 'blog-slug-amp',
                params: { slug: this.blog.slug }
              })}`,
            headline: this.blog && this.blog.title,
            description: this.blog && this.blog.description,
            datePublished: this.blog && this.blog.postedDate,
            dateCreated: this.blog && this.blog.postedDate,
            dateModified: this.blog && this.blog.updatedDate,
            wordcount: this.blog && this.blog.readingTime.words,
            url: `${HOSTNAME}${this.blog &&
              this.localePath({
                name: 'blog-slug-amp',
                params: { slug: this.blog.slug }
              })}`,
            articleBody: this.blog && this.blog.content,
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}${this.blog &&
                require(`~/assets/images${this.blog.img}`)}`,
              height: '1920',
              width: '1080'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Jefrydco',
              sameAs: 'https://www.facebook.com/jefrydco.id',
              logo: {
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
                  '@id': `${HOSTNAME}/blog`,
                  name: 'Blog'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': `${HOSTNAME}${this.blog &&
                    this.localePath({
                      name: 'blog-slug-amp',
                      params: { slug: this.blog.slug }
                    })}`,
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

<style lang="postcss">
/* purgecss start ignore */
html[⚡] {
  .switch {
    @apply hidden;
  }
}
/* purgecss end ignore */
</style>
