<template>
  <figure v-lazy-container="{ selector: 'img' }" class="image-placeholder">
    <img
      :data-src="imageRequired.src"
      :data-srcset="imageRequired.srcSet"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt"
      :src="imageRequired.placeholder"
    />
    <figcaption
      v-if="caption && source && sourceLink"
      class="text-sm text-center mt-4"
    >
      {{ $t(captionKey) }}. {{ $t('imageFrom') }}:
      <a :href="sourceLink" rel="noopener noreferrer">{{ source }}</a>
    </figcaption>
  </figure>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  getCurrentInstance
} from '@nuxtjs/composition-api'
import VueI18n from 'vue-i18n'
// eslint-disable-next-line
import type { Locales, LocalesType } from '~/types'

export type AppImgPropsType = {
  src: string
  alt: string
  width?: string | number
  height?: string | number
  classes?: string
  caption?: LocalesType
  source?: string
  sourceLink?: string
}

export default defineComponent<AppImgPropsType>({
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: [String, Number],
      default: 1920
    },
    height: {
      type: [String, Number],
      default: 1080
    },
    classes: {
      type: String,
      default: ''
    },
    caption: {
      type: Object,
      default() {
        return {
          en: {},
          id: {}
        }
      }
    },
    source: {
      type: String,
      default: ''
    },
    sourceLink: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const imageRequired = computed(() => require(`~/assets/images${props.src}`))
    const captionKey = computed(() => {
      return Object.keys(props?.caption?.id ?? {})[0] || null
    })
    const vm = getCurrentInstance()

    function initLocaleI18n() {
      const keys = Object.keys(props?.caption ?? {})
      keys.forEach((key) => {
        vm!.$i18n.mergeLocaleMessage(
          key,
          props?.caption?.[
            key as keyof typeof Locales
          ] as VueI18n.LocaleMessageObject
        )
      })
    }

    initLocaleI18n()

    return {
      captionKey,
      imageRequired
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
html:not([⚡]) {
  .image-placeholder {
    @apply overflow-hidden;

    img {
      @apply opacity-0 object-cover rounded;
      transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    }

    img[lazy='loading'] {
      @apply opacity-100;
      filter: blur(0.9375rem);
    }

    img[lazy='loaded'] {
      @apply opacity-100;
    }
  }
}
/* purgecss end ignore */
</style>
