<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-11">
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

      <hr />

      <pre class="demo__code state-2"></pre>

      <div>
        <button class="btn start">Start</button>
        <button class="btn stop">Stop</button>
        <button class="btn reset">Reset</button>
      </div>

      <div class="detik"></div>

      <div ref="script11" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo11En',
  mounted() {
    const interval = setInterval(() => {
      const script11 = this.$refs?.script11 as Element
      if (script11) {
        this.init(script11)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script11: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.state11) {
          // We put the code inside immediately invoked function expression to avoid polluting global variable
          // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
          window.state11 = (function () {
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
                '.demo__card-11 .state'
              )

              const resultDisplay = document.querySelector(
                '.demo__card-11 .result'
              )

              const input1Display = document.querySelector(
                '.demo__card-11 .input1'
              )
              const input2Display = document.querySelector(
                '.demo__card-11 .input2'
              )

              const operatorDisplay = document.querySelector(
                '.demo__card-11 .operator'
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

              const keyList = Object.keys(state)

              keyList.forEach(function (key) {
                let value = state[key]

                Object.defineProperty(state, key, {
                  enumerable: true,
                  configurable: true,
                  get: function reactiveGetter() {
                    return value
                  },
                  set: function reactiveSetter(newValue) {
                    if (newValue === value) {
                      return
                    }
                    value = newValue
                    updateDisplay()
                    calculateResult()
                  }
                })
              })

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
            }

            // We have to run the method because this script is executed inside vue component
            // document.addEventListener('DOMContentLoaded', main)
            main()

            return state
          })()
        }`)
      newScript.appendChild(inlineScript)
      script11.appendChild(newScript)
    })
  }
})
</script>
