<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-14">
      <pre class="state"></pre>

      <input type="number" class="input1" min="0" />
      <select class="operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="input2" min="0" />

      <div class="hasil"></div>

      <hr />

      <pre class="state-2"></pre>

      <div>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
        <button class="reset">Reset</button>
      </div>

      <div class="second"></div>

      <script>
        if (!window.state14) {
          // We put the code inside immediately invoked function expression to avoid polluting global variable
          // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
          window.state14 = (function () {
            const OPERATOR = {
              PLUS: '+',
              SUBSTRACT: '-',
              MULTIPLY: '*',
              DIVIDE: '/',
            }

            const state = {
              result: 0,
              operator: OPERATOR.PLUS,
              input1: 0,
              input2: 0,
            }

            const secondState = {
              second: 0,
            }

            function main() {
              // We have to prefixed the selector in accordance with the root component class
              // It avoids the script to be applied to all demo
              const tampilanKeadaan = document.querySelector(
                '.demo-card-14 .state'
              )

              const resultDisplay = document.querySelector(
                '.demo-card-14 .hasil'
              )

              const input1Display = document.querySelector(
                '.demo-card-14 .input1'
              )
              const input2Display = document.querySelector(
                '.demo-card-14 .input2'
              )

              const operatorDisplay = document.querySelector(
                '.demo-card-14 .operator'
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
                '.demo-card-14 .state-2'
              )
              const startButtonDisplay = document.querySelector(
                '.demo-card-14 .start'
              )
              const stopButttonDisplay = document.querySelector(
                '.demo-card-14 .stop'
              )
              const resetButtonDisplay = document.querySelector(
                '.demo-card-14 .reset'
              )
              const secondDisplay = document.querySelector(
                '.demo-card-14 .second'
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
                    },
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
              stopwatch: secondState,
            }
          })()
        }
      </script>
    </div>
  </app-demo>
</template>

<script>
import AppDemoBase from './AppDemoBase'

export default {
  extends: AppDemoBase,
}
</script>
