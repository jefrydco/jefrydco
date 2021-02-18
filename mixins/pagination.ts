import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      nextPage: null,
      prevPage: null,
      isBeforeFirstPage: false,
      isLastPage: false
    }
  },
  computed: {
    prevLink() {
      if (this.isBeforeFirstPage) {
        return this.localePath('/blog')
      }
      // @ts-expect-error
      return this.localePath(`/blog/page/${this.prevPage}`)
    },
    nextLink() {
      if (!this.isLastPage) {
        // @ts-expect-error
        return this.localePath(`/blog/page/${this.nextPage}`)
      }
      return null
    }
  }
})
