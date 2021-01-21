<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-12">
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

      <div class="second"></div>

      <div refs="script12" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo12En',
  updated() {
    this.init()
  },
  methods: {
    init: onetime(function () {
      // @ts-expect-error
      const script12 = this.$refs?.script12 as Element
      if (script12) {
        const newScript = document.createElement('script')
        const inlineScript = document.createTextNode(`if (!window.state12) {
          // We put the code inside immediately invoked function expression to avoid polluting global variable
          // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
          window.state12 = (function () {
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

            const secondState = {
              second: 0
            }

            function main() {
              // We have to prefixed the selector in accordance with the root component class
              // It avoids the script to be applied to all demo
              const stateDisplay = document.querySelector(
                '.demo__card-12 .state'
              )

              const resultDisplay = document.querySelector(
                '.demo__card-12 .result'
              )

              const input1Display = document.querySelector(
                '.demo__card-12 .input1'
              )
              const input2Display = document.querySelector(
                '.demo__card-12 .input2'
              )

              const operatorDisplay = document.querySelector(
                '.demo__card-12 .operator'
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

              /* CODE FOR STOPWATCH */

              const state2Display = document.querySelector(
                '.demo__card-12 .state-2'
              )
              const startButtonDisplay = document.querySelector(
                '.demo__card-12 .start'
              )
              const stopButtonDisplay = document.querySelector(
                '.demo__card-12 .stop'
              )
              const resetButtonDisplay = document.querySelector(
                '.demo__card-12 .reset'
              )
              const secondDisplay = document.querySelector(
                '.demo__card-12 .second'
              )

              function updateStopwatch() {
                state2Display.innerText = JSON.stringify(secondState, null, 2)
                secondDisplay.innerText = secondState.second.toString()
              }

              let idInterval = 0

              function start() {
                idInterval = setInterval(function () {
                  secondState.second = secondState.second + 1
                }, 1000)
              }

              function stop() {
                clearInterval(idInterval)
              }

              function reset() {
                stop()
                secondState.second = 0
              }

              startButtonDisplay.addEventListener('click', function () {
                start()
              })
              stopButtonDisplay.addEventListener('click', function () {
                stop()
              })
              resetButtonDisplay.addEventListener('click', function () {
                reset()
              })

              updateStopwatch()
            }

            // We have to run the method because this script is executed inside vue component
            // document.addEventListener('DOMContentLoaded', main)
            main()

            return {
              calculator: state,
              stopwatch: secondState
            }
          })()
        }`)
        newScript.appendChild(inlineScript)
        script12.appendChild(newScript)
      }
    })
  }
})
</script>
