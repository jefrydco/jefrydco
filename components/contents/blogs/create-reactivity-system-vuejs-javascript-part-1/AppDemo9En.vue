<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name" class="app-demo__card-9">
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

    <div ref="script9" class="script"></div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity1 from './ExtendableCreateReactivity1'

export default ExtendableCreateReactivity1.extend({
  name: 'AppDemo9En',
  mounted() {
    const interval = setInterval(() => {
      const script9 = this.$refs?.script9 as Element
      if (script9) {
        this.init(script9)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script9: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.state9) {
          // We put the code inside immediately invoked function expression to avoid polluting global variable
          // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
          window.state9 = (function () {
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
                '.app-demo__card-9 .state'
              )

              const resultDisplay = document.querySelector(
                '.app-demo__card-9 .result'
              )

              const input1Display = document.querySelector(
                '.app-demo__card-9 .input1'
              )
              const input2Display = document.querySelector(
                '.app-demo__card-9 .input2'
              )

              const operatorDisplay = document.querySelector(
                '.app-demo__card-9 .operator'
              )

              function updateDisplay() {
                stateDisplay.innerText = JSON.stringify(state, null, 2)
                resultDisplay.innerText = state.result.toString()

                input1Display.value = state.input1.toString()
                input2Display.value = state.input2.toString()

                operatorDisplay.value = state.operator
              }

              function calculateResult() {
                switch (state.operator) {
                  case OPERATOR.PLUS:
                    state.result = state.input1 + state.input2
                    break
                  case OPERATOR.SUBSTRACT:
                    state.result = state.input1 - state.input2
                    break
                  case OPERATOR.MULTIPLY:
                    state.result = state.input1 * state.input2
                    break
                  case OPERATOR.DIVIDE:
                    state.result = state.input1 / state.input2
                    break
                  default:
                    break
                }
              }

              updateDisplay()

              input1Display.addEventListener('input', function (event) {
                const targetInput1 = event.target
                state.input1 = parseInt(targetInput1.value)
              })
              input2Display.addEventListener('input', function (event) {
                const targetInput2 = event.target
                state.input2 = parseInt(targetInput2.value)
              })

              operatorDisplay.addEventListener('change', function (event) {
                const targetOperator = event.target
                const selectedOperator = targetOperator.selectedOptions[0].value
                state.operator = selectedOperator
              })

              let input1 = state['input1']

              Object.defineProperty(state, 'input1', {
                enumerable: true,
                configurable: true,
                get: function reactiveGetter() {
                  return input1
                },
                set: function reactiveSetter(newValue) {
                  input1 = newValue
                  calculateResult()
                  updateDisplay()
                }
              })
            }

            // We have to run the method because this script is executed inside vue component
            // document.addEventListener('DOMContentLoaded', main)
            main()

            return state
          })()
        }`)
      newScript.appendChild(inlineScript)
      script9.appendChild(newScript)
    })
  }
})
</script>
