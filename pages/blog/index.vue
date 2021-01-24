<template>
  <main id="blog-index" class="max-w-3xl mx-auto">
    <div class="my-12">
      <app-profile />
    </div>
    <section>
      <app-blog
        v-for="blog in blogList"
        :key="blog.slug"
        :img="blog.img"
        :title="blog.title"
        :summary="blog.summary"
        :posted-date="blog.postedDate"
        :updated-date="blog.updatedDate"
        :reading-time="blog.readingTime"
        :slug="blog.slug"
      />
    </section>
    <app-rss-link :link="rssLink" />
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { BlogListDataType } from '~/types/blog'

import { HOSTNAME } from '~/constants'

export default Vue.extend({
  async asyncData({ app }) {
    const { locale } = app.i18n

    // @ts-expect-error
    const blogList = await app
      .$content(`/${locale}/blog`, { deep: true })
      .only([
        'img',
        'title',
        'description',
        'summary',
        'postedDate',
        'updatedDate',
        'slug',
        'readingTime'
      ])
      .sortBy('postedDate', 'desc')
      .fetch<BlogListDataType>()

    return {
      blogList
    }
  },
  data() {
    return {
      blogList: []
    }
  },
  head() {
    const { locales } = this.$i18n
    // @ts-expect-error
    const link = locales.map((locale) => ({
      rel: 'alternate',
      type: 'application/rss+xml',
      href:
        // @ts-expect-error
        locale.code === 'id'
          ? `${HOSTNAME}/blog.xml`
          : // @ts-expect-error
            `${HOSTNAME}/${locale.code}/blog.xml`,
      title: `Blog - Jefrydco`
    }))

    return {
      title: 'Blog',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'blog' })}/`
        }
      ],
      link: [
        ...link,
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.localePath({ name: 'blog-amp' })}/`
        }
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Blog',
            name: 'Jefrydco',
            headline: 'A personal site of Jefry Dewangga',
            description: 'A personal site of Jefry Dewangga',
            about: 'A personal site of Jefry Dewangga',
            keywords: 'jefrydco, Jefry Dewangga',
            genre: ['Personal', 'Tutorial', 'Programming', 'Review', 'Science'],
            copyrightYear: new Date().getFullYear(),
            dateCreated: '2017-03-12',
            inLanguage: ['English', 'Bahasa Indonesia'],
            isAccessibleForFree: 'true',
            isFamilyFriendly: 'true',
            license: 'https://opensource.org/licenses/MIT',
            image: {
              '@type': 'imageObject',
              url: `${HOSTNAME}/icon.png`,
              width: '2739',
              height: '3102'
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
            // @ts-expect-error
            blogPosts: this.blogList.map((blog) => ({
              '@type': 'blogPosting',
              mainEntityOfPage: `${HOSTNAME}${this.localePath({
                name: 'blog-slug',
                params: { slug: blog.slug }
              })}/`,
              headline: blog.title,
              description: blog.description,
              datePublished: blog.postedDate,
              dateCreated: blog.postedDate,
              dateModified: blog.updatedDate,
              wordcount: blog.readingTime.words,
              url: `${HOSTNAME}${this.localePath({
                name: 'blog-slug',
                params: { slug: blog.slug }
              })}/`,
              image: {
                '@type': 'imageObject',
                url: `${HOSTNAME}${require(`~/assets/images${blog.img}`)}`,
                height: '1920',
                width: '614'
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
            }))
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
              }
            ]
          })
        }
      ]
    }
  },
  computed: {
    rssLink() {
      const { locale } = this.$i18n
      if (locale === 'id') {
        return `${HOSTNAME}/blog.xml`
      }
      return `${HOSTNAME}/${locale}/blog.xml`
    }
  }
})
</script>
