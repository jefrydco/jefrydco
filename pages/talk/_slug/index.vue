<template>
  <main id="talk-detail">
    <app-header-link :to="localePath('talk')" :label="$t('talk')" />
    <template v-if="talk">
      <transition name="fade" mode="out-in">
        <div
          v-if="talk.playback && illustration === ILLUSTRATION_OPTIONS.PLAYBACK"
          class="td__video"
        >
          <div class="td__video-sizer">
            <app-youtube-video
              :youtube-id="getYoutubeId(talk.playback)"
            ></app-youtube-video>
          </div>
        </div>
        <app-img-background
          v-if="talk.poster && illustration === ILLUSTRATION_OPTIONS.POSTER"
          :src="talk.poster"
          :alt="talk.title"
          class="td__poster"
        ></app-img-background>
      </transition>
      <div class="max-w-4xl mx-auto">
        <article class="td__card">
          <header class="td__header">
            <h1 :id="talk.slug" class="td__title">
              {{ talk.title }}
            </h1>
            <div class="td__timestamp">
              <time :datetime="talk.startDate">
                {{ formatDate(talk.startDate) }}
              </time>
              •
              <time :datetime="talk.startDate">
                {{ formatTime(talk.startDate) }}
              </time>
              -
              <time :datetime="talk.endDate">
                {{ formatTime(talk.endDate) }}
              </time>
            </div>
          </header>
          <div class="td__translations">
            {{ $t('readOtherLanguages') }}:
            <a
              v-for="locale in availableLocales"
              :key="locale.code"
              :aria-label="locale.name"
              :href="getTranslationsLink(locale.code)"
              class="td__translations__link"
            >
              {{ locale.name }}
            </a>
          </div>
          <div
            v-if="talk.playback && talk.poster"
            class="td__switch-illustration"
          >
            <button
              class="td__btn"
              @click="illustration = ILLUSTRATION_OPTIONS.PLAYBACK"
            >
              {{ $t('playback') }}
            </button>
            <button
              class="td__btn"
              @click="illustration = ILLUSTRATION_OPTIONS.POSTER"
            >
              {{ $t('poster') }}
            </button>
          </div>
          <div class="td__resources">
            <p v-if="talk.slide">
              {{ $t('slide') }}:
              <a :href="talk.slide">
                {{ talk.slide }}
              </a>
            </p>
            <p v-if="talk.writeUp">
              {{ $t('write_up') }}:
              <a :href="talk.writeUp">
                {{ talk.writeUp }}
              </a>
            </p>
          </div>
          <nuxt-content :document="talk" class="prose prose-lg max-w-none" />
        </article>
      </div>
    </template>
    <app-profile class="my-12" />
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import { formatDate } from '~/extendables'
import { HOSTNAME } from '~/constants'
import { getYoutubeId } from '~/utils'

import type { TalkDataType } from '~/types/talk'

enum ILLUSTRATION_OPTIONS {
  PLAYBACK,
  POSTER
}

export default formatDate.extend({
  data() {
    return {
      availableLocales: [],
      talk: null,
      illustration: ILLUSTRATION_OPTIONS.POSTER,
      ILLUSTRATION_OPTIONS
    }
  },
  async asyncData({ app, route, redirect, localePath }) {
    try {
      const { locale, locales } = app.i18n
      const { slug } = route.params

      // @ts-expect-error
      const availableLocales = locales.filter((i) => i.code !== locale)
      const talk: TalkDataType = await app
        .$content(`/talk/${locale}/${slug}`, {
          deep: true
        })
        .fetch()

      let illustration = ILLUSTRATION_OPTIONS.POSTER

      if (talk.playback) {
        illustration = ILLUSTRATION_OPTIONS.PLAYBACK
      }

      return {
        availableLocales,
        talk: {
          ...talk,
          editLink: `https://github.com/jefrydco/jefrydco/edit/main/contents/blog/${locale}/${slug}.md`
        },
        illustration
      }
    } catch {
      redirect(localePath('/talk'))
    }
  },
  head() {
    return {
      // @ts-expect-error
      title: this.talk && this.talk.title,
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${
            // @ts-expect-error
            this.talk &&
            this.localePath({
              name: 'talk-slug-amp',
              // @ts-expect-error
              params: { slug: this.talk.slug }
            })
          }/`
        }
      ],
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          // @ts-expect-error
          content: this.talk && this.talk.title
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${
            // @ts-expect-error
            this.talk &&
            this.localePath({
              name: 'talk-slug',
              // @ts-expect-error
              params: { slug: this.talk.slug }
            })
          }/`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `${HOSTNAME}${
            // @ts-expect-error
            this.talk && require(`~/assets/images${this.talk.poster}`)
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
          content: this.talk && this.talk.title
        },
        {
          hid: 'description',
          name: 'description',
          // @ts-expect-error
          content: this.talk && this.talk.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          // @ts-expect-error
          content: this.talk && this.talk.description
        }
      ]
    }
  },
  computed: {
    getYoutubeId() {
      return (youtubeUrl: string) => getYoutubeId(youtubeUrl)
    },
    addTrailingSlash() {
      return (url: string) => {
        if (url.endsWith('/')) {
          return url
        }
        return `${url}/`
      }
    },
    getTranslationsLink() {
      return (localeCode: string) => {
        const localePath = this.switchLocalePath(localeCode) as string
        if (localePath.includes('#')) {
          const newPath = localePath.split('#')[0]
          return this.addTrailingSlash(newPath)
        }
        return this.addTrailingSlash(localePath)
      }
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
@media (max-width: 640px) {
  .td {
    &__video,
    &__video-sizer {
      min-height: 14rem;
    }
  }
}
.td {
  &__poster {
    @apply h-128;
  }
  &__video {
    background-color: var(--inline-code-bg);
    min-height: 31rem;
  }
  &__video-sizer {
    @apply w-full mx-auto sm:w-2/3;
  }
  &__card {
    @apply mb-4 p-6 mx-4 rounded overflow-hidden shadow relative sm:px-16 sm:py-14;
    background-color: var(--card-bg);
  }
  &__header {
    @apply mb-8;
  }
  &__title {
    @apply font-bold text-2xl mt-0 mb-2;
  }
  &__timestamp {
    @apply leading-normal mb-4 text-sm;
  }
  &__switch-illustration,
  &__resources {
    @apply mb-4;
  }
  &__resources {
    p:not(:last-child) {
      @apply mb-2;
    }
  }
  &__btn {
    @apply mb-4 py-1 px-2 rounded;
    background-color: var(--bg);

    &:not(:last-child) {
      @apply mr-2;
    }

    &:disabled {
      background-color: var(--bg-disabled);
      color: var(--text-disabled);
    }
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
}
/* purgecss end ignore */
</style>

<i18n>
{
  "en": {
    "playback": "Playback",
    "poster": "Poster",
    "slide": "Slide",
    "write_up": "Write up"
  },
  "id": {
    "playback": "Rekaman Ulang",
    "poster": "Poster",
    "slide": "Salindia",
    "write_up": "Tulisan"
  }
}
</i18n>
