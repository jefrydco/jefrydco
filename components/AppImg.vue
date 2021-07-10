<template>
  <figure v-lazy-container="{ selector: 'img' }" class="image__placeholder">
    <img
      :data-src="imageRequired.src"
      :data-srcset="imageRequired.srcSet"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="`${computedClasses} ${classes}`.trim()"
      :alt="alt"
      :src="imageRequired.placeholder"
      class="image__image"
    />
    <figcaption v-if="caption && source && sourceLink" class="image__caption">
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
    round: {
      type: String,
      default: 'all',
      validator(value) {
        return ['all', 'none', 'top'].includes(value)
      }
    }
  },
  computed: {
    imageRequired() {
      return require(`~/assets/images${this.src}`)
    },
    captionKey() {
      return Object.keys(this?.caption?.id ?? {})[0] || null
    },
    computedClasses() {
      let computedClass = 'image__image--rounded'
      if (this.round === 'none') {
        computedClass = `${computedClass} image__image--rounded-none`
      }
      if (this.round === 'top') {
        computedClass = `${computedClass} image__image--rounded-top`
      }
      return computedClass
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
  .image {
    &__placeholder {
      @apply overflow-hidden;
      background-color: var(--inline-code-bg);
    }

    &__image {
      @apply opacity-0 object-cover;
      transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);

      &--rounded {
        @apply rounded;
      }

      &--rounded-top {
        @apply rounded-b-none;
      }

      &--rounded-none {
        @apply rounded-none;
      }
    }

    &__image[lazy='loading'] {
      @apply opacity-100;
      filter: blur(0.9375rem);
    }

    &__image[lazy='loaded'] {
      @apply opacity-100;
    }

    &__caption {
      @apply text-sm text-center mt-4;
    }
  }
}
/* purgecss end ignore */
</style>
