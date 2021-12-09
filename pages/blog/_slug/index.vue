<template>
  <main id="bd">
    <app-header-link :to="localePath('blog')" :label="$t('blog')" />
    <template v-if="blog">
      <div class="bd__img-wrapper">
        <app-img
          :src="blog.img"
          :alt="blog.title"
          round="none"
          class="bd__img"
        ></app-img>
      </div>
      <app-card-detail
        :title="blog.title"
        :slug="blog.slug"
        :posted-date="blog.postedDate"
        :updated-date="blog.updatedDate"
        :reading-time="blog.readingTime.minutes.toFixed(2)"
        :locales="availableLocales"
        inset=""
      >
        <nuxt-content :document="blog" class="prose prose-lg max-w-none" />
        <footer class="bd__footer">
          <p v-if="blog.contributors && blog.contributors.length > 0">
            {{ $t('contributor') }}:
            <template v-for="(contributor, index) in blog.contributors">
              <a
                :key="`${contributor}_link`"
                :href="`https://github.com/${contributor}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                @{{ contributor }}
              </a>
              <!-- eslint-disable-next-line -->
              <span
                v-if="index !== blog.contributors.length - 1"
                :key="`${contributor}_separator`"
              >
                {{ separator(index) }}
              </span>
            </template>
          </p>
          <p>
            {{ $t('coverImageFrom') }}
            <a
              :href="`https://unsplash.com/@${blog.imgCreator}?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText`"
              target="_blank"
              rel="noopener noreferrer"
            >
              @{{ blog.imgCreator }}
            </a>
          </p>
          <p>
            <a
              :href="blog.discussLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ $t('discussTwitter') }}
            </a>
            <span> • </span>
            <a :href="blog.editLink" target="_blank" rel="noopener noreferrer">
              {{ $t('editGithub') }}
            </a>
          </p>
        </footer>
      </app-card-detail>
    </template>
    <app-profile class="my-12" />
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { HOSTNAME } from '~/constants'

import type { BlogDataType } from '~/types/blog'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ app, route, redirect, localePath }) {
    try {
      // @ts-ignore
      const { locale, locales } = app.i18n
      const { slug } = route.params

      // @ts-expect-error
      const availableLocales = locales.filter((i) => i.code !== locale)
      const blog: BlogDataType = await app
        .$content(`/blog/${locale}/${slug}`, {
          deep: true
        })
        .fetch()
      const fullPath = `${HOSTNAME}/blog/${blog?.slug}`

      return {
        availableLocales,
        blog: {
          ...blog,
          discussLink: `https://twitter.com/intent/tweet?text=Hi%20@jefrydco,%20%0A%0A${encodeURIComponent(
            fullPath
          )}`,
          editLink: `https://github.com/jefrydco/jefrydco/edit/main/contents/blog/${locale}/${slug}.md`
        }
      }
    } catch {
      redirect(localePath('/blog'))
    }
  },
  data() {
    return {
      // eslint-disable-next-line
      availableLocales: [],
      // eslint-disable-next-line
      blog: null
    }
  },
  head() {
    return {
      // @ts-expect-error
      title: this.blog && this.blog.title,
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${
            // @ts-expect-error
            this.blog &&
            this.localePath({
              name: 'blog-slug-amp',
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
            this.localePath({
              name: 'blog-slug',
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
              this.localePath({
                name: 'blog-slug',
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
              this.localePath({
                name: 'blog-slug',
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
            name: 'Blog',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@id': `${HOSTNAME}${this.localePath({ name: 'blog' })}/`,
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
                    this.localePath({
                      name: 'blog-slug',
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
  },
  computed: {
    separator() {
      return (index: number) => {
        // @ts-expect-error
        const length = this.blog.contributors && this.blog.contributors.length
        if (length === 2 || (length >= 3 && index === length - 2)) {
          return ` ${this.$t('and')} `
        }
        if (length > 2 && index !== length - 1) {
          return `, `
        }
        return ``
      }
    }
  }
})
</script>

<style>
/* purgecss start ignore */
.bd {
  &__img-wrapper {
    @apply h-128;
  }

  &__img {
    img {
      @apply w-full h-128;
      filter: brightness(0.7);
    }
  }

  &__footer {
    p {
      @apply mb-3;
    }
  }
}
/* 'ol > li, ul > li': {
  'padding-left': '0'
},
'blockquote p:only-child, quote p:only-child': {
  marginTop: theme('spacing.0')
} */
/* purgecss end ignore */
</style>
