<template>
  <main id="blog-detail">
    <app-header-link :to="localePath('blog')" label="Blog" />
    <template v-if="blog">
      <div class="blog-detail__img-wrapper">
        <app-img
          :src="blog.img"
          :alt="blog.title"
          :rounded="false"
          class="blog-detail__img"
        ></app-img>
      </div>
      <div class="max-w-4xl mx-auto">
        <article class="blog-detail__card">
          <header class="blog-detail__meta">
            <h1 id="blog-title" class="blog-detail__title">
              {{ blog.title }}
            </h1>
            <div class="blog-detail__date">
              <span>
                <time :datetime="blog.postedDate">
                  {{ $t('postedOn') }}
                  {{ formatDate(blog.postedDate) }}
                </time>
              </span>
              •
              <span>
                <time :datetime="blog.updatedDate">
                  {{ $t('updatedOn') }}
                  {{ formatDate(blog.updatedDate) }}
                </time>
              </span>
              •
              <span>
                {{ Math.ceil(blog.readingTime.minutes.toFixed(2)) }}
                {{ $t('minRead') }}
              </span>
            </div>
          </header>
          <div class="blog-detail__translations">
            {{ $t('readOtherLanguages') }}:
            <nuxt-link
              v-for="locale in availableLocales"
              :key="locale.code"
              :aria-label="locale.name"
              :to="switchLocalePath(locale.code)"
              class="blog__translations__link"
            >
              {{ locale.name }}
            </nuxt-link>
          </div>
          <nuxt-content :document="blog" class="prose prose-lg max-w-none" />
          <footer class="blog-detail__footer">
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
                :href="`https://unsplash.com/@${blog.imgCreator}`"
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
              <a
                :href="blog.editLink"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('editGithub') }}
              </a>
            </p>
          </footer>
        </article>
      </div>
    </template>
    <app-profile class="my-12" />
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue'
import { formatDate } from '~/extendables'
import { HOSTNAME } from '~/constants'
import type { BlogDataType } from '~/types/blog'

export default formatDate.extend({
  data() {
    return {
      availableLocales: [],
      blog: null
    }
  },
  async asyncData({ app, route }) {
    const { locale, locales } = app.i18n
    const { slug } = route.params

    // @ts-expect-error
    const availableLocales = locales.filter((i) => i.code !== locale)
    // @ts-expect-error
    const blog = await app
      .$content(`/${locale}/blog/${slug}`, {
        deep: true
      })
      .fetch<BlogDataType>()
    const fullPath = `${HOSTNAME}/blog/${blog?.slug}`

    return {
      availableLocales,
      blog: {
        ...blog,
        discussLink: `https://twitter.com/intent/tweet?text=Hi%20@jefrydco,%20%0A%0A${encodeURIComponent(
          fullPath
        )}`,
        editLink: `https://github.com/jefrydco/jefrydco/edit/main/contents/${locale}/blog/${slug}.md`
      }
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
  },
  mounted() {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)!
      element.scrollIntoView({})
    }
  }
})
</script>

<style>
/* purgecss start ignore */
.shiki {
  &__token {
    @apply inline;
  }
}
.blog-detail {
  &__img-wrapper {
    @apply h-128;
    background-color: var(--inline-code-bg);
  }

  &__img {
    img {
      @apply w-full h-128;
      filter: brightness(0.7);
    }
  }

  &__card {
    @apply -m-64 mb-4 p-6 mx-4 rounded overflow-hidden shadow relative;
    background-color: var(--card-bg);
  }

  &__meta {
    @apply mb-8;
  }

  &__title {
    @apply font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-sm;
  }

  &__translations {
    @apply leading-normal mb-8 py-3 px-4 rounded-lg border;
    background-color: var(--inline-code-bg);
    border-color: var(--inline-code-border);
    color: var(--inline-code-text);

    a:not(:last-child) {
      @apply mr-3;
    }
  }

  &__footer {
    p {
      @apply mb-3;
    }
  }
}

@screen sm {
  .blog-detail {
    &__card {
      @apply px-16 py-10;
    }
  }
}
/* purgecss end ignore */
</style>
