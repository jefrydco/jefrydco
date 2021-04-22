<template>
  <div class="garbage-collector">
    <blockquote ref="observed" class="twitter-tweet">
      <p lang="en" dir="ltr">
        I&#39;m from the island of Java, Indonesia. <br />I am the Java Garbage
        Collector.
        <a href="https://t.co/R5kfKYfP6c">pic.twitter.com/R5kfKYfP6c</a>
      </p>
      &mdash; Jesslyn 🇮🇩 (@jtannady)
      <a
        href="https://twitter.com/jtannady/status/981547257479778307?ref_src=twsrc%5Etfw"
      >
        April 4, 2018
      </a>
    </blockquote>

    <div ref="garbageCollectorScript" class="script"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import onetime from 'onetime'

export default Vue.extend({
  data() {
    return {
      observer: null as IntersectionObserver
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.initTwitterEmbed()
          this.$nextTick(() => {
            this.observer.disconnect()
          })
        }
      },
      {
        rootMargin: '0 0 100px 0'
      }
    )
    this.observer.observe(this.$refs.observed)
  },
  destroyed() {
    this.observer.disconnect()
  },
  methods: {
    initTwitterEmbed: onetime(function () {
      const garbageCollectorScript = this.$refs.garbageCollectorScript

      const newScript = document.createElement('script')
      newScript.async = true
      newScript.src = 'https://platform.twitter.com/widgets.js'

      garbageCollectorScript.appendChild(newScript)
    })
  }
})
</script>

<style>
.twitter-tweet {
  @apply mx-auto;
}
</style>
