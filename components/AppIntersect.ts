// Taken from: https://github.com/heavyy/vue-intersect/blob/master/src/index.js
import Vue from 'vue'

const warn = (msg: string) => {
  if (!Vue.config.silent) {
    console.warn(msg)
  }
}

export default Vue.extend({
  name: 'AppIntersect',
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0]
    },
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      required: false,
      default: () => null
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px'
    }
  },
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    // @ts-expect-error
    this.observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          this.$emit('leave', [entries[0]])
        } else {
          this.$emit('enter', [entries[0]])
        }

        this.$emit('change', [entries[0]])
      },
      {
        // @ts-expect-error
        threshold: this.threshold,
        // @ts-expect-error
        root: this.root,
        // @ts-expect-error
        rootMargin: this.rootMargin
      }
    )

    setTimeout(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        warn(
          '[AppIntersect] You may only wrap one element in a <app-intersect> component.'
        )
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        warn(
          '[AppIntersect] You must have one child inside a <app-intersect> component.'
        )
        return
      } else if (!(this.$slots.default[0].elm instanceof Element)) {
        warn("[AppIntersect] Can't find the right element to observe")
        return
      }

      // @ts-expect-error
      this.observer.observe(this.$slots.default[0].elm)
    }, 0)
  },
  destroyed() {
    this.$emit('destroyed')
    // @ts-expect-error
    this.observer.disconnect()
  },
  // @ts-expect-error
  render() {
    return this.$slots.default ? this.$slots.default[0] : null
  }
})
