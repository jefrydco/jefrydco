<template>
  <main id="blog-index" class="max-w-3xl mx-auto">
    <app-profile class="my-12" />
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
    <app-pagination-link
      :prev-link="prevLink"
      :next-link="nextLink"
      :rss-link="rssLink"
    ></app-pagination-link>
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { pagination } from '~/mixins'
import { paginator, getLastPage, getPrevNextPage } from '~/utils'
import { HOSTNAME } from '~/constants'

import type { BlogListDataType } from '~/types/blog'

export default Vue.extend({
  mixins: [pagination],
  // @ts-ignore
  async asyncData({ app, route, redirect, localePath }) {
    const { locale } = app.i18n
    try {
      const pageNumber = parseInt(route?.params?.number)
      if (pageNumber > 1) {
        // @ts-expect-error
        const blogList = await app
          .$content(`/blog/${locale}`, { deep: true })
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

        const paginatedBlogList = paginator(blogList, pageNumber)

        const lastPage = getLastPage(blogList.length)

        return {
          blogList: paginatedBlogList,
          ...getPrevNextPage(pageNumber, lastPage)
        }
      } else {
        redirect(localePath('/blog'))
      }
    } catch (error) {
      redirect(localePath('/blog'))
    }
  },
  data() {
    return {
      blogList: []
    }
  },
  // @ts-expect-error
  head() {
    const { locales } = this.$i18n
    // @ts-expect-error
    const link = locales.map((locale) => ({
      rel: 'alternate',
      type: 'application/rss+xml',
      href:
        locale.code === 'id'
          ? `${HOSTNAME}/blog.xml`
          : `${HOSTNAME}/${locale.code}/blog.xml`,
      title: `Blog - Jefrydco`
    }))

    return {
      title: 'Blog',
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Blog - Jefrydco'
        },
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'blog' })}/`
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('blogDescription')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('blogDescription')
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
            name: 'Blog - Jefrydco',
            headline: this.$t('blogDescription'),
            description: this.$t('blogDescription'),
            about: this.$t('blogDescription'),
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
            }))
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
