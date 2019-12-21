<template>
  <div v-if="blog !== null && typeof blog !== 'undefined'" id="blog">
    <div class="header">
      <div class="header__img">
        <app-img :src="blog.img" :alt="blog.title" />
      </div>
      <div class="header__back">
        <nuxt-link :to="localePath('blog')" class="header__back__link">
          Blog
        </nuxt-link>
      </div>
    </div>
    <div class="max-w-4xl ml-auto mr-auto">
      <div class="blog">
        <div class="blog__content">
          <main>
            <article>
              <header>
                <div class="blog__meta">
                  <h1 id="blog-title" class="blog__title">
                    {{ blog.title }}
                  </h1>
                  <div class="blog__date">
                    <span>
                      <time :datetime="blog.postedDate">
                        Posted on
                        {{ formatDate(blog.postedDate) }}
                      </time>
                    </span>
                    •
                    <span>
                      <time :datetime="blog.updatedDate">
                        Updated on
                        {{ formatDate(blog.updatedDate) }}
                      </time>
                    </span>
                    •
                    <span>
                      {{ Math.ceil(blog.readingTime.minutes.toFixed(2)) }}
                      {{ $t('minRead') }}
                    </span>
                  </div>
                </div>
              </header>
              <div class="blog__translations">
                {{ $t('readOtherLanguages') }}:
                <nuxt-link
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  :aria-label="locale.name"
                  :to="switchLocalePath(locale.code)"
                >
                  {{ locale.name }}
                </nuxt-link>
              </div>
              <!-- eslint-disable-next-line -->
              <component :is="blog.component" />
              <footer>
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
          </main>
        </div>
      </div>
    </div>
    <div class="max-w-4xl my-12 ml-auto mr-auto">
      <app-profile />
    </div>
    <client-only>
      <vue-scroll-indicator
        height="2px"
        color="var(--text-normal)"
        background="var(--bg)"
      />
    </client-only>
    <app-to-top />
  </div>
</template>

<script>
import readingTime from 'reading-time'

import AppProfile from '~/components/AppProfile'
import AppToTop from '~/components/AppToTop'

import { formatDate } from '~/mixins'

import { HOSTNAME } from '~/constant'

export default {
  components: {
    AppProfile,
    AppToTop
  },
  mixins: [formatDate],
  data() {
    return {
      availableLocales: [],
      blog: null
    }
  },
  created() {
    const slug = this.$route && this.$route.params && this.$route.params.slug
    const locale = this.$i18n.locale
    const locales = this.$i18n.locales
    const defaultLocale = this.$i18n.defaultLocale
    const availableLocales = locales.filter((i) => i.code !== locale)
    let editPath = null
    let blog = null
    try {
      if (locale === defaultLocale) {
        editPath = `contents/blogs/${slug}/index.md`
        blog = require(`~/contents/blogs/${slug}/index.md`)
      } else {
        editPath = `contents/blogs/${slug}/index.${locale}.md`
        blog = require(`~/contents/blogs/${slug}/index.${locale}.md`)
      }
      if (blog !== null && typeof blog !== 'undefined') {
        const fullPath = `${HOSTNAME}/blog/${blog.attributes.slug}`
        this.availableLocales = availableLocales
        this.blog = {
          img: blog.attributes.img,
          imgCreator: blog.attributes.imgCreator,
          title: blog.attributes.title,
          description: blog.attributes.description,
          postedDate: blog.attributes.postedDate,
          updatedDate: blog.attributes.updatedDate,
          slug: blog.attributes.slug,
          readingTime: readingTime(blog.html),
          component: blog.vue.component,
          fullPath,
          discussLink: `https://twitter.com/search?q=${encodeURIComponent(
            fullPath
          )}`,
          editLink: `https://github.com/jefrydco/jefrydco/edit/master/${editPath}`
        }
      }
    } catch (error) {
      this.$router.replace(this.localePath({ name: 'blog' }))
    }
  },
  head() {
    return {
      title: this.blog && this.blog.title,
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.blog &&
            this.localePath({
              name: 'blog-slug-amp',
              params: { slug: this.blog.slug }
            })}`
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
              name: 'blog-slug',
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
                name: 'blog-slug',
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
                name: 'blog-slug',
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
                  '@id': `${HOSTNAME}${this.localePath({ name: 'blog' })}`,
                  name: 'Blog'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@id': `${HOSTNAME}${this.blog &&
                    this.localePath({
                      name: 'blog-slug',
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
.header {
  @apply w-full relative;

  img {
    @apply w-screen h-128 object-cover;
  }

  &__back {
    @apply absolute z-20;
    top: 1.7rem;
    left: 1.5rem;

    &__link {
      @apply cursor-pointer py-2 px-4 w-24 rounded shadow no-underline;
      background-color: var(--card-bg);
      color: var(--text-normal);

      &:focus {
        @apply outline-none;
      }

      &:hover {
        @apply shadow-lg;
      }

      svg {
        @apply block m-auto;
        stroke: var(--text-normal);
      }
    }
  }
}

.table-of-contents {
  ol {
    counter-reset: list-item;
  }

  li {
    @apply block;
    counter-increment: list-item;
  }

  li:before {
    content: counters(list-item, '.') ' ';
  }
}

footer {
  p {
    @apply mb-3;
  }
}

.blog {
  @apply mb-12 mx-4 rounded overflow-hidden shadow relative -mt-64;
  background-color: var(--card-bg);

  img {
    @apply w-full h-auto mb-8;
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

  &__content {
    @apply p-6;
  }

  &__meta {
    @apply mb-8;
  }

  &__title {
    @apply font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-base;
  }

  &__link {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden z-0;
    text-indent: -9999px;
  }
}

@screen sm {
  .blog {
    &__content {
      @apply px-16 py-10;
    }
  }
}

body {
  &.dark {
    .header {
      img {
        filter: brightness(0.7);
      }
    }
  }
}
/* purgecss end ignore */
</style>
