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
import type { VueConstructor } from 'vue'
import {
  defineComponent,
  useFetch,
  useMeta,
  getCurrentInstance,
  ref
} from '@nuxtjs/composition-api'
import type { NuxtVueI18n } from 'nuxt-i18n'
import { HOSTNAME } from '~/constants'
import { BlogListDataType } from '~/types/blog'

function useBlogHeadLink(vm: InstanceType<VueConstructor>) {
  const locales = vm.$i18n.locales as NuxtVueI18n.Options.LocaleObject[]
  const link = locales.map((locale) => {
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
  return link
}

function useBlogHead(vm: InstanceType<VueConstructor>) {
  const link = useBlogHeadLink(vm)

  return {
    title: 'Blog',
    meta: [
      {
        hid: 'og:url',
        name: 'og:url',
        property: 'og:url',
        content: `${HOSTNAME}${vm?.localePath({ name: 'blog' })}`
      }
    ],
    link: [
      ...link,
      {
        rel: 'amphtml',
        href: `${HOSTNAME}${vm?.localePath({ name: 'blog-amp' })}`
      }
    ]
  }
}

function useBlogJsonLd(
  vm: InstanceType<VueConstructor>,
  blogList: BlogListDataType
) {
  return {
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
          blogPosts: blogList.map((blog) => ({
            '@type': 'blogPosting',
            mainEntityOfPage: `${HOSTNAME}${vm.localePath({
              name: 'blog-slug',
              params: { slug: blog.slug }
            })}`,
            headline: blog.title,
            description: blog.description,
            datePublished: blog.postedDate,
            dateCreated: blog.postedDate,
            dateModified: blog.updatedDate,
            wordcount: blog.readingTime.words,
            url: `${HOSTNAME}${vm.localePath({
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
                '@id': `${HOSTNAME}${vm.localePath({ name: 'blog' })}`,
                name: 'Blog'
              }
            }
          ]
        })
      }
    ]
  }
}

export default defineComponent({
  setup() {
    const vm = getCurrentInstance()
    const locale = vm?.$i18n.locale
    const rssLink = ref(
      locale === 'id'
        ? `${HOSTNAME}/blog.xml`
        : `${HOSTNAME}/${locale}/blog.xml`
    )

    const blogHead = useBlogHead(vm!)

    const { __dangerouslyDisableSanitizers, script } = useMeta({
      title: blogHead.title,
      meta: blogHead.meta,
      link: blogHead.link
    })

    const blogList = ref<BlogListDataType>()
    const { fetch } = useFetch(async () => {
      const _blogList = await vm!
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

      const _blogJsonLd = useBlogJsonLd(vm!, _blogList as BlogListDataType)
      __dangerouslyDisableSanitizers.value =
        _blogJsonLd.__dangerouslyDisableSanitizers
      script.value = _blogJsonLd.script

      blogList.value = _blogList as BlogListDataType
    })
    fetch()

    return {
      blogList,
      rssLink
    }
  },
  head: {}
})
</script>
