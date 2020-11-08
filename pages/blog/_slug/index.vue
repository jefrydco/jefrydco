<template>
  <main id="blog-detail">
    <template v-if="blog">
      <app-img
        :src="blog.img"
        :alt="blog.title"
        class="blog-detail__img"
      ></app-img>
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
              <span v-if="index !== blog.contributors.length - 1" :key="`${contributor}_separator`">{{ separator(index) }}</span>
                >
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
    <app-header-link :to="localePath('blog')" label="Blog" />
    <app-profile class="my-12" />
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import type { VueConstructor } from 'vue'
import {
  defineComponent,
  getCurrentInstance,
  useFetch,
  ref,
  computed,
  onMounted
} from '@nuxtjs/composition-api'
import type { NuxtVueI18n } from 'nuxt-i18n'
import { useDate } from '~/compositions'
import type { BlogDataType } from '~/types/blog'

function useSeparator(
  vm: InstanceType<VueConstructor>,
  blog: BlogDataType
): (index: number) => string {
  return (index: number) => {
    const length = blog.contributors && blog.contributors.length
    if (length === 2 || (length >= 3 && index === length - 2)) {
      return ` ${vm.$t('and')}`
    }
    if (length > 2 && index !== length - 1) {
      return `, `
    }
    return ``
  }
}

function useAvailableLocales(vm: InstanceType<VueConstructor>, locale: string) {
  const locales = vm.$i18n.locales as NuxtVueI18n.Options.LocaleObject[]
  const availableLocales = ref<NuxtVueI18n.Options.LocaleObject[]>()
  availableLocales.value = locales.filter((i) => i.code !== locale)
  return availableLocales
}

function useScrollIntoView() {
  const hash = window.location.hash
  if (hash) {
    const element = document.querySelector(hash) as HTMLHeadingElement
    element.scrollIntoView()
  }
}

export default defineComponent({
  setup() {
    const vm = getCurrentInstance()
    const locale = vm?.$i18n.locale
    const formatDate = useDate(vm!)
    const slug = vm?.$route.params.slug
    const blog = ref<BlogDataType>()
    const availableLocales = useAvailableLocales(vm!, locale!)

    const { fetch } = useFetch(async () => {
      const _blog = await vm!
        .$content(`/${locale}/blog/${slug}`, { deep: true })
        .fetch<BlogDataType>()
      blog.value = _blog as BlogDataType
    })
    fetch()

    const separator = computed(() => useSeparator(vm!, blog.value!))

    onMounted(() => {
      useScrollIntoView()
    })

    return {
      formatDate,
      blog,
      availableLocales,
      separator
    }
  }
})
</script>

<style>
/* purgecss start ignore */
.blog-detail {
  &__img {
    @apply -m-40;

    img {
      @apply w-full h-128 object-cover;
      filter: brightness(0.7);
    }
  }

  &__card {
    @apply mb-4 p-6 mx-4 rounded overflow-hidden shadow relative;
    background-color: var(--card-bg);
  }

  &__meta {
    @apply mb-8;
  }

  &__title {
    @apply font-bold text-2xl mt-0 mb-4 leading-loose;
  }

  &__date {
    @apply leading-normal mb-4 text-base;
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
