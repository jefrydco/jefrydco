<template>
  <div id="blog-index">
    <div class="max-w-3xl my-12 ml-auto mr-auto">
      <app-profile />
    </div>
    <div class="max-w-3xl ml-auto mr-auto">
      <main>
        <app-blog
          v-for="blog in blogs"
          :key="blog.id"
          :img="blog.img"
          :title="blog.title"
          :description="blog.description"
          :posted-date="blog.postedDate"
          :updated-date="blog.updatedDate"
          :reading-time="blog.readingTime"
          :slug="blog.slug"
        />
      </main>
    </div>
    <div class="max-w-4xl my-12 ml-auto mr-auto text-center">
      <a :href="rssLink" target="_blank" rel="noopener noreferrer">RSS</a>
    </div>
  </div>
</template>

<script>
import readingTime from 'reading-time'
import AppProfile from '~/components/AppProfile'
import AppBlog from '~/components/AppBlog'

import slugs from '~/contents/blogs'

import { HOSTNAME } from '~/constant'

export default {
  components: {
    AppProfile,
    AppBlog
  },
  async asyncData({ app, redirect }) {
    const { locale, defaultLocale } = app.i18n

    async function asyncImport(slug) {
      let blog = null
      if (locale === defaultLocale) {
        blog = await import(`~/contents/blogs/${slug}/index.md`)
        return {
          ...blog.attributes,
          readingTime: readingTime(blog.html)
        }
      }
      blog = await import(`~/contents/blogs/${slug}/index.${locale}.md`)
      return {
        ...blog.attributes,
        readingTime: readingTime(blog.html)
      }
    }

    const blogs = await Promise.all(slugs.map((slug) => asyncImport(slug)))
    return {
      blogs
    }
  },
  data() {
    return {
      blogs: []
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
  },
  head() {
    const { locales } = this.$i18n
    const link = locales
      .map((locale) => {
        let href = null
        if (locale.code === 'id') {
          href = `${HOSTNAME}/blog.xml`
        } else {
          href = `${HOSTNAME}/${locale.code}/blog.xml`
        }
        return {
          rel: 'alternate',
          type: 'application/rss+xml',
          href,
          title: `Blog - Jefrydco`
        }
      })
      .concat({
        rel: 'amphtml',
        href: `${HOSTNAME}${this.localePath({ name: 'blog-amp' })}`
      })
    return {
      title: 'Blog',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'blog' })}`
        }
      ],
      link,
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
            blogPosts: this.blogs.map((blog) => ({
              '@type': 'blogPosting',
              mainEntityOfPage: `${HOSTNAME}${this.localePath({
                name: 'blog-slug',
                params: { slug: blog.slug }
              })}`,
              headline: blog.title,
              description: blog.description,
              datePublished: blog.postedDate,
              dateCreated: blog.postedDate,
              dateModified: blog.updatedDate,
              wordcount: blog.readingTime.words,
              url: `${HOSTNAME}${this.localePath({
                name: 'blog-slug',
                params: { slug: blog.slug }
              })}`,
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
                  '@id': `${HOSTNAME}${this.localePath({ name: 'blog' })}`,
                  name: 'Blog'
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
