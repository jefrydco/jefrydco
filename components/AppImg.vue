<template>
  <div v-lazy-container="{ selector: 'img' }" class="image-placeholder">
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
  </div>
</template>

<script>
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
    }
  },
  computed: {
    imageRequired() {
      return require(`~/assets/images${this.src}`)
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
