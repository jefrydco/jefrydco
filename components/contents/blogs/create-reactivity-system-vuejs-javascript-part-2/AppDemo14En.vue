<template>
  <app-demo
    :path="DEFAULT_PATH"
    :name="$options.name"
    class="app-demo__card-14"
  >
    <pre class="app-demo__code state"></pre>

    <input type="number" class="app-demo__form input1" min="0" />
    <select class="app-demo__form operator">
      <option value="+">&plus;</option>
      <option value="-">&minus;</option>
      <option value="*">&times;</option>
      <option value="/">&divide;</option>
    </select>
    <input type="number" class="app-demo__form input2" min="0" />

    <div class="hasil"></div>

    <hr />

    <pre class="app-demo__code state-2"></pre>

    <div>
      <button class="app-demo__form start">Start</button>
      <button class="app-demo__form stop">Stop</button>
      <button class="app-demo__form reset">Reset</button>
    </div>

    <div class="second"></div>

    <div ref="script14" class="script"></div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo14En',
  mounted() {
    const interval = setInterval(() => {
      const script14 = this.$refs?.script14 as Element
      if (script14) {
        this.init(script14)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script14: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.state14) {
          // We put the code inside immediately invoked function expression to avoid polluting global variable
          // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
          window.state14 = (function () {
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
              const tampilanKeadaan = document.querySelector(
                '.app-demo__card-14 .state'
              )

              const resultDisplay = document.querySelector(
                '.app-demo__card-14 .hasil'
              )

              const input1Display = document.querySelector(
                '.app-demo__card-14 .input1'
              )
              const input2Display = document.querySelector(
                '.app-demo__card-14 .input2'
              )

              const operatorDisplay = document.querySelector(
                '.app-demo__card-14 .operator'
              )

              function updateDisplay() {
                tampilanKeadaan.innerText = JSON.stringify(state, null, 2)
                resultDisplay.innerText = state.result.toString()

                input1Display.value = state.input1.toString()
                input2Display.value = state.input2.toString()

                operatorDisplay.value = state.operator
              }

              function calculateResult() {
                switch (state.operator) {
                  case OPERATOR.PLUS:
                    state.hasil = state.input1 + state.input2
                    break
                  case OPERATOR.SUBSTRACT:
                    state.hasil = state.input1 - state.input2
                    break
                  case OPERATOR.MULTIPLY:
                    state.hasil = state.input1 * state.input2
                    break
                  case OPERATOR.DIVIDE:
                    state.hasil = state.input1 / state.input2
                    break
                  default:
                    break
                }
              }

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
                '.app-demo__card-14 .state-2'
              )
              const startButtonDisplay = document.querySelector(
                '.app-demo__card-14 .start'
              )
              const stopButttonDisplay = document.querySelector(
                '.app-demo__card-14 .stop'
              )
              const resetButtonDisplay = document.querySelector(
                '.app-demo__card-14 .reset'
              )
              const secondDisplay = document.querySelector(
                '.app-demo__card-14 .second'
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
              stopButttonDisplay.addEventListener('click', function () {
                stop()
              })
              resetButtonDisplay.addEventListener('click', function () {
                reset()
              })

              updateStopwatch()

              /* REACTIVITY SYSTEM FOR MULTIPLE TASKS */

              class Watcher {
                constructor() {
                  this.taskList = []
                }

                saveTask() {
                  if (Watcher.task) {
                    this.taskList.push(Watcher.task)
                  }
                }

                runTask() {
                  this.taskList.forEach(function (task) {
                    task()
                  })
                }
              }
              Watcher.task = null

              function observe(object) {
                const keyList = Object.keys(object)

                keyList.forEach(function (key) {
                  let value = object[key]
                  const pengintai = new Watcher()

                  Object.defineProperty(object, key, {
                    enumerable: true,
                    configurable: true,
                    get: function reactiveGetter() {
                      pengintai.saveTask()
                      return value
                    },
                    set: function reactiveSetter(newValue) {
                      if (newValue === value) {
                        return
                      }
                      value = newValue
                      pengintai.runTask()
                    }
                  })
                })
              }

              function runner(task) {
                Watcher.task = task
                task()
                Watcher.task = null
              }

              observe(state)
              observe(secondState)

              runner(updateDisplay)
              runner(calculateResult)
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
      script14.appendChild(newScript)
    })
  }
})
</script>
