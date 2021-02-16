<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-1">
      <pre class="demo__code state"></pre>

      <input type="number" class="demo__form input1" min="0" />
      <select class="demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="demo__form input2" min="0" />

      <div class="result"></div>

      <div ref="script1" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo1En',
  mounted() {
    const interval = setInterval(() => {
      const script1 = this.$refs?.script1 as Element
      if (script1) {
        this.init(script1)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script1: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(``)
      newScript.appendChild(inlineScript)
      script1.appendChild(newScript)
    })
  }
})
</script>
