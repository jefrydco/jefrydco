<template>
  <figure v-lazy-container="{ selector: 'img' }" class="image__placeholder">
    <img
      :data-src="imageRequired.src"
      :data-srcset="imageRequired.srcSet"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="
        `${!rounded ? 'image__image--rounded-none' : ''} ${classes}`.trim()
      "
      :alt="alt"
      :src="imageRequired.placeholder"
      class="image__image"
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
import Vue from 'vue'

export default Vue.extend({
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
    },
    rounded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    imageRequired() {
      return require(`~/assets/images${this.src}`)
    },
    captionKey() {
      return Object.keys(this?.caption?.id ?? {})[0] || null
    }
  },
  created() {
    // @ts-expect-error
    this.initLocaleI18n()
  },
  methods: {
    initLocaleI18n() {
      // @ts-expect-error
      const keys = Object.keys(this?.caption ?? {})
      keys.forEach((key) => {
        // @ts-expect-error
        this.$i18n.mergeLocaleMessage(key, this?.caption[key])
      })
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
html:not([⚡]) {
  .image__placeholder {
    @apply overflow-hidden;
  }

  .image__image {
    @apply opacity-0 object-cover rounded;
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

    &--rounded-none {
      @apply rounded-none;
    }
  }

  .image__image[lazy='loading'] {
    @apply opacity-100;
    filter: blur(0.9375rem);
  }

  .image__image[lazy='loaded'] {
    @apply opacity-100;
  }
}
/* purgecss end ignore */
</style>
