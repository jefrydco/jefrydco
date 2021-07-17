<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card demo__card-2">
      <pre class="app-demo__code state"></pre>

      <input type="number" class="app-demo__form input1" min="0" />
      <select class="app-demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="app-demo__form input2" min="0" />

      <div class="result"></div>

      <div ref="script2" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo2En',
  mounted() {
    const interval = setInterval(() => {
      const script2 = this.$refs?.script2 as Element
      if (script2) {
        this.init(script2)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script2: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.state2) {
            // We put the code inside immediately invoked function expression to avoid polluting global variable
            // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
            window.state2 = (function () {
              const OPERATOR = {
                PLUS: '+',
                SUBSTRACT: '-',
                MULTIPLY: '*',
                DIVIDE: '/'
              }

              const state = {
                result: 0,
                operator: OPERATOR.PLUS,
                input1: 0,
                input2: 0
              }

              function main() {
                // We have to prefixed the selector in accordance with the root component class
                // It avoids the script to be applied to all demo
                const stateDisplay = document.querySelector(
                  '.app-demo__card-2 .state'
                )
                stateDisplay.innerText = JSON.stringify(state, null, 2)
              }

              // We have to run the method because this script is executed inside vue component
              // document.addEventListener('DOMContentLoaded', main)
              main()

              return state
            })()
          }`)
      newScript.appendChild(inlineScript)
      script2.appendChild(newScript)
    })
  }
})
</script>
