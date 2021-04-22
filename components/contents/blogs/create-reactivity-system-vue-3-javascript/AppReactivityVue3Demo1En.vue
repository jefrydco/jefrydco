<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-1">
      <pre class="demo__code state"></pre>

      <input type="text" class="demo__form" />

      <ul>
        <li>Hello</li>
      </ul>

      <div ref="reactivityVue3Script1" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableReactivityVue3 from './ExtendableReactivityVue3'

export default ExtendableReactivityVue3.extend({
  name: 'AppReactivityVue3Demo1En',
  mounted() {
    const interval = setInterval(() => {
      const reactivityVue3Script1 = this.$refs?.reactivityVue3Script1 as Element
      if (reactivityVue3Script1) {
        this.init(reactivityVue3Script1)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (reactivityVue3Script1: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(``)
      newScript.appendChild(inlineScript)
      reactivityVue3Script1.appendChild(newScript)
    })
  }
})
</script>
