<template>
  <figure
    :aria-label="label"
    class="youtube embed embed__16/9"
    tabindex="0"
    @click="play"
    @keydown.space.enter="play"
  >
    <transition name="fade">
      <div v-if="!isPlayed" class="youtube__image">
        <img :src="thumbnailUrl" :alt="label" width="816" height="459" />
      </div>
      <div v-else class="youtube__embed">
        <iframe
          :src="embedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </transition>
  </figure>
</template>

<script lang="ts">
import Vue from 'vue'
import { stringifyUrl } from 'query-string'

export default Vue.extend({
  props: {
    youtubeId: {
      required: true,
      default: '',
      validator: (val) => typeof val === 'string' || val === null
    },
    label: {
      type: String,
      default: 'YouTube Video'
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    start: {
      type: Number,
      default: 0
    },
    controllable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isPlayed: false
    }
  },
  computed: {
    thumbnailUrl() {
      if (this.youtubeId) {
        return `https://i3.ytimg.com/vi/${this.youtubeId}/maxresdefault.jpg`
      }
      return require('~/assets/images/default/video.jpg')
    },
    embedUrl() {
      if (this.youtubeId) {
        return stringifyUrl({
          url: `https://www.youtube.com/embed/${this.youtubeId}`,
          query: {
            hl: 'en',
            cc_lang_pref: 'en',
            cc_load_policy: 1,
            autoplay: 1,
            start: this.start,
            rel: 0,
            controls: this.controllable ? 1 : 0
          }
        })
      }
      return null
    }
  },
  watch: {
    youtubeId(youtubeId) {
      if (!youtubeId) {
        // @ts-expect-error
        this.isPlayed = false
      }
    },
    isPlaying: {
      handler(isPlaying) {
        // @ts-expect-error
        this.isPlayed = isPlaying
      },
      immediate: true
    }
  },
  methods: {
    play() {
      // @ts-expect-error
      if (this.youtubeId) {
        // @ts-expect-error
        this.isPlayed = true
        this.$emit('play')
      }
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.youtube {
  @apply cursor-pointer;
  padding-top: 56.25%;

  &__image,
  &__embed iframe {
    @apply absolute top-0 left-0 bottom-0 h-full w-full;
    border: 0;
  }

  &__image {
    img {
      @apply h-full;
    }

    &::before,
    &::after {
      @apply absolute block;
    }

    &::before {
      @apply top-0 left-0 w-full h-full rounded;
      background-color: rgba(45, 55, 72, 0.3);
      content: '';
      transition: background-color 0.3s cubic-bezier(0.55, 0, 0.1, 1);

      &:hover {
        background-color: rgba(45, 55, 72, 0.1);
      }
    }

    &::after {
      @apply w-12 h-12 rounded-full shadow no-underline text-center text-2xl;
      background-color: var(--bg);
      color: var(--text-normal);
      content: '▸';
      line-height: 1.8;
      top: calc(50% - 1.5rem);
      left: calc(50% - 1.5rem);

      &:hover {
        @apply shadow-lg;
      }
    }
  }
}
/* purgecss end ignore */
</style>
