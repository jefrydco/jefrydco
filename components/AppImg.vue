<template>
  <div v-lazy-container="{ selector: 'img' }" class="image-placeholder">
    <img
      :data-src="imageRequired"
      :data-loading="imageRequired.placeholder"
      :width="width"
      :height="height"
      :class="classes"
      :alt="alt"
      src="data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs="
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
      default: 1366
    },
    height: {
      type: [String, Number],
      default: 768
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
:not(html[⚡]) {
  .image-placeholder {
    @apply overflow-hidden;

    img {
      @apply opacity-0 h-full w-full object-cover;
      transition: all ease 0.3s;
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
</style>
