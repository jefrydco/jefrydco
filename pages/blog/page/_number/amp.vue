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
  async asyncData({ app, route, redirect }) {
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
        redirect(app.localePath('/blog'))
      }
    } catch (error) {
      redirect(app.localePath('/blog'))
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
        locale.code === 'id'
          ? `${HOSTNAME}/blog.xml`
          : `${HOSTNAME}/${locale.code}/blog.xml`,
      title: `Blog - Jefrydco`
    }))

    return {
      title: 'Blog',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'blog-amp' })}/`
        }
      ],
      link: [
        ...link,
        {
          hid: 'i18n-can',
          rel: 'canonical',
          href: `${HOSTNAME}${this.localePath({ name: 'blog' })}/`
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
                name: 'blog-slug-amp',
                params: { slug: blog.slug }
              })}/`,
              headline: blog.title,
              description: blog.description,
              datePublished: blog.postedDate,
              dateCreated: blog.postedDate,
              dateModified: blog.updatedDate,
              wordcount: blog.readingTime.words,
              url: `${HOSTNAME}${this.localePath({
                name: 'blog-slug-amp',
                params: { slug: blog.slug }
              })}/`,
              image: {
                '@type': 'imageObject',
                url: `${HOSTNAME}${require(`~/assets/images/blog${blog.img}`)}`,
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
                  '@id': `${HOSTNAME}${this.localePath({ name: 'blog-amp' })}/`,
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
      return `${HOSTNAME}/blog/${locale}.xml`
    }
  }
})
</script>
