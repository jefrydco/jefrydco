<template>
  <main id="blog-detail">
    <app-header-link :to="`${localePath('blog')}/`" label="Blog" />
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
            <a
              v-for="locale in availableLocales"
              :key="locale.code"
              :aria-label="locale.name"
              :href="`${switchLocalePath(locale.code)}/`"
              class="blog__translations__link"
            >
              {{ locale.name }}
            </a>
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
.prose {
  hr {
    @apply my-5;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply mt-12 mb-5;
  }

  h2,
  h3 {
    > a {
      &:focus {
        @apply outline-none;
      }

      &::before {
        @apply absolute -ml-5 pr-2 opacity-0;
        content: '#';
        color: var(--text-link);
      }
    }

    &:hover {
      > a {
        &::before {
          @apply opacity-100;
        }
      }
    }
  }

  h1 {
    @apply text-2xl;
  }

  h2 {
    @apply text-xl;
  }

  h3 {
    @apply text-lg;
  }

  h4 {
    @apply text-base;
  }

  h5 {
    @apply text-sm;
  }

  h6 {
    @apply text-xs;
  }

  h1 + h2,
  h2 + h3,
  h3 + h4,
  h5 + h6 {
    @apply mt-5;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal list-inside;
  }

  ul,
  ol {
    @apply ml-8;

    li {
      @apply mb-3;

      p {
        @apply mb-0;
      }

      ul,
      ol {
        @apply my-3 ml-4;
      }
    }
  }

  blockquote,
  quote {
    @apply leading-loose mb-8 py-3 px-4 border-l-4 italic;
    border-color: var(--inline-code-border);

    p:only-child {
      @apply mb-0;
    }
  }

  .shiki {
    @apply rounded-lg;
    background-color: #1a202c;
    color: #e2e8f0;

    &__pre,
    &__code {
      border-radius: 0 0 0.5rem 0.5rem;
      color: #e2e8f0;
    }

    &__dim {
      @apply opacity-50;
      transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    }

    &__meta {
      @apply flex justify-between;
      padding: 0.5rem 1rem;
    }

    &__highlight {
      &::before {
        border-left: 0.3rem solid var(--text-link);
        background-color: rgba(203, 213, 224, 0.1);
        background-image: linear-gradient(
          to right,
          rgba(203, 213, 224, 0.1) 50%,
          rgba(203, 213, 224, 0)
        );
      }
    }

    &__error {
      padding: 0.375rem 0;

      span {
        color: #e2e8f0;
      }

      &::before {
        border-left: 0.3rem solid var(--error);
        background-color: rgba(245, 101, 101, 0.1);
        background-image: linear-gradient(
          to right,
          rgba(245, 101, 101, 0.3) 50%,
          rgba(245, 101, 101, 0)
        );
      }
    }

    &__highlight,
    &__error {
      @apply relative opacity-100;

      span {
        @apply relative z-10;
      }

      &::before {
        @apply absolute h-full z-0 top-0 bottom-0;
        content: '';
        left: -1.05rem;
        right: -1.05rem;
      }
    }

    &__code {
      background-color: #1a202c;
      border-color: #2d3748;
      padding: 0.5rem 1rem;
    }

    &:hover {
      .shiki {
        &__dim {
          @apply opacity-100;
        }
      }
    }
  }

  .embed,
  .demo,
  .nuxt-content-highlight,
  .image__placeholder {
    @apply mb-8;
  }

  .demo {
    blockquote,
    quote {
      border-color: var(--inline-code-text);
    }

    .btn,
    .textarea,
    .input {
      background-color: var(--card-bg);
    }

    &__card {
      @apply rounded p-4;
      background-color: var(--bg);
    }

    &__code {
      @apply mb-4;
      padding: 0.5rem 1rem;
    }

    &__interactive {
      @apply p-4;
      border-color: var(--inline-code-bg);
    }

    &--combined {
      .demo {
        &__interactive {
          @apply border-t-2 border-l-2 border-r-2 rounded-t-lg;
        }

        &__card:not(.demo-card--custom--floating) {
          @apply rounded-none;
        }

        &__code {
          @apply rounded-b-lg rounded-t-none;
        }
      }
    }
  }

  .btn,
  .textarea,
  .input,
  .demo__form {
    @apply mb-4 py-1 px-2 rounded;

    &:not(:last-child) {
      @apply mr-2;
    }

    &:disabled {
      background-color: var(--bg-disabled);
      color: var(--text-disabled);
    }
  }

  .radio,
  .checkbox {
    &__label,
    &__input {
      @apply cursor-pointer;
    }

    &__label {
      @apply inline-flex items-center;
    }

    &__input {
      color: var(--inline-code-bg);

      &:focus {
        @apply shadow-none border-none;
        outline: 0.125rem solid var(--text-normal);
      }
    }
  }

  .btn,
  .textarea,
  .input {
    background-color: var(--bg);
  }

  .demo__form {
    background-color: var(--card-bg);
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

.shiki {
  &__line,
  &__block,
  &__dim,
  &__highlight {
    @apply block;
  }

  &__token {
    &--color-282A36 {
      color: #282a36;
    }
    &--color-F8F8F2 {
      color: #f8f8f2;
    }
    &--color-44475A {
      color: #44475a;
    }
    &--color-6272A4 {
      color: #6272a4;
    }
    &--color-8BE9FD {
      color: #8be9fd;
    }
    &--color-50FA7B {
      color: #50fa7b;
    }
    &--color-FFB86C {
      color: #ffb86c;
    }
    &--color-FF79C6 {
      color: #ff79c6;
    }
    &--color-BD93F9 {
      color: #bd93f9;
    }
    &--color-FF5555 {
      color: #ff5555;
    }
    &--color-F1FA8C {
      color: #f1fa8c;
    }
  }
}

@media (max-width: 992px) {
  .prose {
    h2,
    h3 {
      > a {
        @apply ml-5;

        &::before {
          @apply opacity-100;
        }
      }
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
