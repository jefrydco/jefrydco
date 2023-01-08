<i18n>
{
  "en": {
    "title": "Video Title",
    "channel_name": "Channel Name",
    "by": "by",
    "note": "Note:",
    "demo_notices": [
      "Only YouTube video that <strong>has English subtitle</strong> is supported.",
      "<strong>Can't be used</strong> on <strong>copyrighted YouTube video</strong>, such as music video.",
      "Each YouTube URL <strong>takes a longer time to search at first</strong> because the cache isn't available yet.",
      "To minimize the data usage, the auto demo feature <strong>only runs if this demo section is visible</strong> on your browser viewport."
    ],
    "not_searching": "Not looking for any keyword, try enter some keyword.",
    "searching_keyword_less_than_three": "The keyword should be more than 3 characters, please add more.",
    "searching": "Please wait, searching for \"<strong>{keyword}</strong>\".....",
    "searching_error": "There is something wrong, please try again later or use another keyword.",
    "input_youtube_url_label": "YouTube URL",
    "input_keyword_label": "Search Keyword",
    "auto_demo": "Auto Demo",
    "auto_demo_start": "Start @:auto_demo",
    "auto_demo_stop": "Stop @:auto_demo",
    "timer": "Timer: {timer}s",
    "play_video_at": "Play Video at {time}s",
    "reset": "Reset",
    "search_result_info": "{total} search results found. Currently on page {page}",
    "first_page": "Next Page",
    "last_page": "Last Page",
    "next_page": "Next Page",
    "prev_page": "Prev Page"
  },
  "id": {
    "title": "Judul Video",
    "channel_name": "Nama Kanal (<em>Channel</em>)",
    "by": "oleh",
    "note": "Catatan:",
    "demo_notices": [
      "Hanya video YouTube yang <strong>memiliki <em>subtitle</em> berbahasa Inggris</strong> yang didukung.",
      "<strong>Tidak dapat digunakan</strong> pada <strong>video YouTube berhak cipta</strong>, seperti musik video.",
      "Setiap pranala YouTube <strong>memerlukan waktu yang lebih lama saat pertama kali dicari</strong> karena temboloknya (<em>cache</em>) belum tersedia.",
      "Untuk mengurangi penggunaan data, fitur demo otomatis <strong>hanya berjalan jika bagian demo ini terlihat</strong> di layar peramban (<em>browser</em>) teman-teman."
    ],
    "not_searching": "Tidak sedang mencari kata kunci apapun, coba masukkan sebuah kata kunci.",
    "searching_keyword_less_than_three": "Kata kunci yang digunakan harus lebih banyak dari 3 karakter ya.",
    "searching": "Tunggu ya, sedang mencari kata kunci \"<strong>{keyword}</strong>\".....",
    "searching_error": "Sepertinya ada yang salah nih, coba beberapa saat lagi atau coba menggunakan kata kunci lain ya.",
    "input_youtube_url_label": "Pranala YouTube",
    "input_keyword_label": "Kata Kunci Pencarian",
    "auto_demo": "Demo Otomatis",
    "auto_demo_start": "Mulai @:auto_demo",
    "auto_demo_stop": "Hentikan @:auto_demo",
    "timer": "Timer: {timer}s",
    "play_video_at": "Putar video pada detik ke-{time}",
    "reset": "Atur Ulang",
    "search_result_info": "{total} hasil pencarian ditemukan. Saat ini berada pada halaman ke-{page}",
    "first_page": "Halaman Pertama",
    "last_page": "Halaman Terakhir",
    "next_page": "Halaman Berikutnya",
    "prev_page": "Halaman Sebelumnya"
  }
}
</i18n>

<template>
  <app-intersect @enter="onDemoEnter" @leave="onDemoLeave">
    <app-demo :path="DEFAULT_PATH" :name="$options.name">
      <app-youtube-video
        ref="youtubeVideo"
        :is-playing="isPlaying"
        :youtube-id="youtubeId"
        :start="currentStart"
        @play="onYoutubeVideoPlay"
      ></app-youtube-video>

      <h2 v-if="isMetaAvailable" class="app-demo__heading">
        "{{ results.meta.title }}"
        {{ $t('by') }}
        <a
          :href="results.meta.channelUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ results.meta.channelName }}
        </a>
      </h2>
      <h2 v-else class="app-demo__heading">
        "{{ $t('title') }}" {{ $t('by') }}
        <span v-html="$t('channel_name')"></span>
      </h2>

      <blockquote>
        <strong>{{ $t('note') }}</strong>
        <ul>
          <li
            v-for="(notice, i) in $t('demo_notices')"
            :key="i"
            v-html="notice"
          ></li>
        </ul>
      </blockquote>

      <app-text-input
        id="youtube-url"
        v-model="youtubeUrl"
        full-width=""
        :label="$t('input_youtube_url_label')"
        @focus="resetAll({ isToggling: false, isReRun: false })"
      ></app-text-input>
      <app-text-input
        id="keyword"
        v-model="keyword"
        full-width=""
        :label="$t('input_keyword_label')"
        @focus="resetAll({ isToggling: false, isReRun: false })"
      ></app-text-input>

      <div class="mb-8">
        <p
          class="app-demo__p"
          :class="{ 'demo__p--error': isSearchingError }"
          v-html="searchInfo"
        ></p>
        <p class="app-demo__p">{{ $t('timer', { timer }) }}</p>
      </div>
      <button class="app-demo__form" @click="toggleAutoDemo">
        {{ isAutoDemoRun ? $t('auto_demo_stop') : $t('auto_demo_start') }}
      </button>
      <button class="app-demo__form" @click="resetAll({ isToggling: false })">
        {{ $t('reset') }}
      </button>

      <hr />

      <div class="mb-8">
        <p class="app-demo__p">
          {{
            $t('search_result_info', {
              page: results.page,
              total: results.total
            })
          }}
        </p>
      </div>
      <button
        v-for="nav in navButtonStructure"
        :key="nav"
        :disabled="!results[nav] || isOnlyPage"
        class="app-demo__form"
        @click="navigate(results[nav])"
      >
        {{ $t(`${nav}_page`) }}
      </button>

      <hr />

      <ul>
        <li v-for="(item, i) in results.data" :key="i">
          <p v-html="item.text"></p>
          <button class="app-demo__form" @click="onSelectItemText(item)">
            {{ $t('play_video_at', { time: item.start }) }}
          </button>
        </li>
      </ul>
    </app-demo>
  </app-intersect>
</template>

<script lang="ts">
import type Vue from 'vue'
import debounceFn from 'debounce-fn'
import { stringifyUrl } from 'query-string'
import randomItem from 'random-item'
import rfdc from 'rfdc'
import defu from 'defu'

import ExtendableSearchText from './ExtendableSearchText'
import AppIntersect from '~/components/AppIntersect'
import AppYoutubeVideo from '~/components/AppYoutubeVideo.vue'

import { isExists, isNotEmptyString } from '~/utils'

import type {
  ResponseDataWithPagination,
  Vtt,
  SearchOptions,
  ResetOptions,
  SetTimeoutReturnType
} from '~/types/blog/search-closed-captions-text-youtube-video'

import {
  MAXIMUM_AUTO_TYPE_INTERVAL,
  MAXIMUM_AUTO_TYPE_KEYWORD_INTERVAL,
  MAXIMUM_TIMER_INTERVAL,
  KEYWORD_LIST,
  DEFAULT_RESULTS,
  API_URL,
  YOUTUBE_WATCH_URL
} from '~/constants/blog/search-closed-captions-text-youtube-video/constant'

const clone = rfdc()

export default ExtendableSearchText.extend({
  name: 'AppSearchYoutubeClosedCaptionsDemo',
  components: {
    AppIntersect,
    AppYoutubeVideo
  },
  data() {
    return {
      isSearchingError: false,
      isSearching: false,
      youtubeId: '',
      youtubeUrl: '',
      keyword: '',
      results: clone(DEFAULT_RESULTS),
      currentStart: 0,
      isPlaying: false,
      navButtonStructure: ['first', 'prev', 'next', 'last'],

      isAutoDemoRun: true,
      timer: MAXIMUM_TIMER_INTERVAL,
      arrayOfKeywordSplitted: [] as string[],
      arrayOfKeyword: [] as string[],
      currentYoutubeId: '',
      keywordList: KEYWORD_LIST,
      intervalIdAutoTypeKeyword: [] as SetTimeoutReturnType[],
      intervalIdAutoType: [] as SetTimeoutReturnType[],
      intervalTimer: [] as SetTimeoutReturnType[]
    }
  },
  computed: {
    isMetaAvailable() {
      if (isExists(this.results.meta)) {
        // @ts-expect-error
        return Object.values(this.results.meta).every((_: string) =>
          isNotEmptyString(_)
        )
      }
      return false
    },
    searchInfo() {
      if (!this.isSearchingError) {
        if (isNotEmptyString(this.keyword) && this.keyword.length <= 3) {
          return this.$t('searching_keyword_less_than_three')
        }

        if (this.isSearching) {
          // @ts-expect-error
          return this.$t('searching', { keyword: this.keyword })
        }
        return this.$t('not_searching')
      }
      return this.$t('searching_error')
    },
    isOnlyPage() {
      // @ts-expect-error
      return Math.ceil(this.results.total / 10) === 1
    }
  },
  watch: {
    keyword(keyword: string) {
      if (isNotEmptyString(keyword) && keyword.length > 3) {
        this.search(keyword)
      }
    },
    youtubeUrl(youtubeUrl: string) {
      if (isNotEmptyString(youtubeUrl) && this.keyword.length > 3) {
        this.search(youtubeUrl)
      }
    },
    isAutoDemoRun(isAutoDemoRun) {
      if (isAutoDemoRun) {
        if (this.intervalIdAutoType.length > 1) {
          this.intervalIdAutoType.slice(0, -1).forEach((interval) => {
            clearInterval(interval)
          })
          this.intervalIdAutoType = [
            this.intervalIdAutoType.pop() as SetTimeoutReturnType
          ]
        } else {
          clearInterval(this.intervalIdAutoType.shift())
        }
        this.initAutoType()
      }
    }
  },
  mounted() {
    setTimeout(this.initAutoType, 1000)
  },
  beforeDestroy() {
    this.clearAllInterval()
  },
  methods: {
    search: debounceFn(
      async function (
        keywordOrUrl: string,
        options: SearchOptions = { url: false }
      ) {
        try {
          // @ts-expect-error
          this.isSearchingError = false
          // @ts-expect-error
          this.isSearching = true

          const url = stringifyUrl({
            url: API_URL,
            query: {
              // @ts-expect-error
              url: this.youtubeUrl,
              q: keywordOrUrl
            }
          })
          const results: ResponseDataWithPagination = await fetch(
            !options.url ? url : keywordOrUrl,
            {
              method: 'POST'
            }
          )
            .then((_) => (_.ok ? _.json() : clone(DEFAULT_RESULTS)))
            .then((_) => {
              // @ts-expect-error
              this.setYoutubeId()
              return _
            })

          // @ts-expect-error
          this.results = results
        } catch (error) {
          console.error(error)
          // @ts-expect-error
          this.isSearchingError = true
        } finally {
          // @ts-expect-error
          this.isSearching = false
        }
      },
      { wait: 250 }
    ),
    setYoutubeId() {
      // RegEx taken from: https://stackoverflow.com/a/6904504
      const result =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi.exec(
          this.youtubeUrl || ''
        ) as RegExpExecArray
      if (result) {
        this.youtubeId = result[1]
      } else {
        this.youtubeId = ''
      }
    },
    initAutoType() {
      this.timer = MAXIMUM_TIMER_INTERVAL
      this.isPlaying = false
      this.autoTypeInterval()
      this.intervalIdAutoType.push(
        setInterval(this.autoTypeInterval, MAXIMUM_AUTO_TYPE_INTERVAL)
      )
    },
    autoTypeInterval() {
      const youtubeId = this.typeYoutubeUrl()
      const keyword = this.getRandomKeyword(youtubeId)
      this.typeKeyword(keyword)

      this.intervalTimer.push(
        setInterval(() => {
          if (this.timer - 1 > 0) {
            this.timer = this.timer - 1
          } else {
            this.timer = MAXIMUM_TIMER_INTERVAL
            if (this.intervalTimer.length > 1) {
              this.intervalTimer.slice(0, -1).forEach((interval) => {
                clearInterval(interval)
              })
              this.intervalTimer = [
                this.intervalTimer.pop() as SetTimeoutReturnType
              ]
            } else {
              clearInterval(this.intervalTimer.shift())
            }
          }
        }, 1000)
      )
    },
    typeYoutubeUrl() {
      const youtubeId = randomItem(Object.keys(KEYWORD_LIST))
      this.youtubeUrl = stringifyUrl({
        url: YOUTUBE_WATCH_URL,
        query: {
          v: youtubeId
        }
      })
      return youtubeId
    },
    getRandomKeyword(youtubeId: string) {
      return randomItem(KEYWORD_LIST[youtubeId])
    },
    typeKeyword(keyword: string) {
      this.keyword = ''
      this.arrayOfKeywordSplitted = []
      this.arrayOfKeywordSplitted = keyword.split('')

      this.typeKeywordInterval()
      this.intervalIdAutoTypeKeyword.push(
        setInterval(
          this.typeKeywordInterval,
          MAXIMUM_AUTO_TYPE_KEYWORD_INTERVAL
        )
      )
    },
    typeKeywordInterval() {
      this.keyword = `${this.keyword}${
        this.arrayOfKeywordSplitted.shift() || ''
      }`
      if (this.arrayOfKeywordSplitted.length === 0) {
        if (this.intervalIdAutoTypeKeyword.length > 1) {
          this.intervalIdAutoTypeKeyword.slice(0, -1).forEach((interval) => {
            clearInterval(interval)
          })
          this.intervalIdAutoTypeKeyword = [
            this.intervalIdAutoTypeKeyword.pop() as SetTimeoutReturnType
          ]
        } else {
          clearInterval(this.intervalIdAutoTypeKeyword.shift())
        }
      }
    },
    navigate(url: string) {
      this.resetAll({
        isToggling: false,
        isReRun: false
      })
      this.search(url, { url: true })
    },
    toggleAutoDemo() {
      this.resetAll()
    },
    clearAllInterval() {
      this.intervalTimer.forEach((interval) => {
        clearInterval(interval)
      })
      this.intervalIdAutoTypeKeyword.forEach((interval) => {
        clearInterval(interval)
      })
      this.intervalIdAutoType.forEach((interval) => {
        clearInterval(interval)
      })
      this.intervalTimer = []
      this.intervalIdAutoTypeKeyword = []
      this.intervalIdAutoType = []
    },
    resetAll(options?: ResetOptions) {
      const defaultOptions = { isToggling: true, isReRun: true }
      const mergedOptions = defu(options || {}, defaultOptions)

      this.clearAllInterval()
      this.timer = MAXIMUM_TIMER_INTERVAL

      if (mergedOptions.isToggling) {
        this.isAutoDemoRun = !this.isAutoDemoRun
      } else {
        this.isAutoDemoRun = false
        if (mergedOptions.isReRun) {
          this.$nextTick(() => {
            this.isAutoDemoRun = true
          })
        }
      }
    },
    scrollToYoutubeVideo() {
      const youtubeVideo = (this.$refs.youtubeVideo as Vue).$el as HTMLElement
      if (youtubeVideo) {
        youtubeVideo.scrollIntoView({})
        youtubeVideo.focus()
      }
    },
    onSelectItemText(item: Vtt) {
      this.currentStart = item.start
      this.scrollToYoutubeVideo()
      this.resetAll({ isToggling: false, isReRun: false })
      this.isPlaying = false
      this.$nextTick(() => {
        this.isPlaying = true
      })
    },
    onYoutubeVideoPlay() {
      this.isPlaying = true
      this.resetAll({ isToggling: false, isReRun: false })
    },
    onDemoEnter() {
      if (!this.isAutoDemoRun) {
        this.resetAll({ isToggling: false })
      }
    },
    onDemoLeave() {
      if (this.isAutoDemoRun) {
        this.resetAll({ isToggling: false, isReRun: false })
      }
    }
  }
})
</script>

<style lang="postcss">
p.app-demo__p {
  @apply mb-0;

  &--error {
    color: var(--error);
  }
}
h2.app-demo__heading {
  @apply mt-0 mb-8;

  > a {
    &:focus {
      outline: 0.125rem solid var(--text-normal);
      outline-offset: 0.25rem;
    }

    &::before {
      @apply hidden;
    }
  }
}
@media (max-width: 992px) {
  h2.app-demo__heading {
    > a {
      &::before {
        @apply ml-0;
      }
    }
  }
}
</style>
