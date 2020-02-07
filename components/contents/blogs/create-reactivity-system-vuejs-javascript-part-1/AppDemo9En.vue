<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-9">
      <pre class="state"></pre>

      <input type="number" class="input1" min="0" />
      <select class="operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="input2" min="0" />

      <div class="result"></div>

      <script>
        // We put the code inside immediately invoked function expression to avoid polluting global variable
        // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
        let state9 = (function() {
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
            const stateDisplay = document.querySelector('.demo-card-9 .state')

            const resultDisplay = document.querySelector('.demo-card-9 .result')

            const input1Display = document.querySelector('.demo-card-9 .input1')
            const input2Display = document.querySelector('.demo-card-9 .input2')

            const operatorDisplay = document.querySelector(
              '.demo-card-9 .operator'
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

            input1Display.addEventListener('input', function(event) {
              const targetInput1 = event.target
              state.input1 = parseInt(targetInput1.value)
            })
            input2Display.addEventListener('input', function(event) {
              const targetInput2 = event.target
              state.input2 = parseInt(targetInput2.value)
            })

            operatorDisplay.addEventListener('change', function(event) {
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
        window.state9 = state9
      </script>
    </div>
  </app-demo>
</template>

<script>
import AppDemoBase from './AppDemoBase'

export default {
  extends: AppDemoBase
}
</script>
