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

<script>
import { isExists } from '~/utils'

export default {
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
  computed: {
    imageRequired() {
      return require(`~/assets/images${this.src}`)
    },
    captionKey() {
      if (isExists(this.caption)) {
        return Object.keys(this.caption.id)[0]
      }
      return null
    }
  },
  created() {
    this.initLocaleI18n()
  },
  methods: {
    initLocaleI18n() {
      if (isExists(this.caption)) {
        const keys = Object.keys(this.caption)
        keys.forEach((key) => {
          this.$i18n.mergeLocaleMessage(key, this.caption[key])
        })
      }
    }
  }
}
</script>

<style lang="postcss">
/* purgecss start ignore */
html:not([⚡]) {
  .image-placeholder {
    @apply overflow-hidden;

    img {
      @apply opacity-0 object-cover;
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
