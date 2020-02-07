<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-11">
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

      <hr />

      <pre class="state-2"></pre>

      <div>
        <button class="mulai">Mulai</button>
        <button class="berhenti">Berhenti</button>
        <button class="reset">Reset</button>
      </div>

      <div class="detik"></div>

      <script>
        // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
        // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
        const state11 = (function() {
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
            // Kita harus memberi awalan selektor sesuai dengan kelas akar komponen
            // Hal tersebut mencegah scrip dieksekusi untuk semua demo
            const tampilanKeadaan = document.querySelector(
              '.demo-card-11 .state'
            )

            const tampilanHasil = document.querySelector(
              '.demo-card-11 .result'
            )

            const tampilanInput1 = document.querySelector(
              '.demo-card-11 .input1'
            )
            const tampilanInput2 = document.querySelector(
              '.demo-card-11 .input2'
            )

            const tampilanOperator = document.querySelector(
              '.demo-card-11 .operator'
            )

            function mutakhirkanTampilan() {
              tampilanKeadaan.innerText = JSON.stringify(state, null, 2)
              tampilanHasil.innerText = state.result.toString()

              tampilanInput1.value = state.input1.toString()
              tampilanInput2.value = state.input2.toString()

              tampilanOperator.value = state.operator
            }

            function kalkulasiHasil() {
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

            const daftarKunci = Object.keys(state)

            daftarKunci.forEach(function(kunci) {
              let nilai = state[kunci]

              Object.defineProperty(state, kunci, {
                enumerable: true,
                configurable: true,
                get: function pengambilReaktif() {
                  return nilai
                },
                set: function pengaturReaktif(nilaiBaru) {
                  if (nilaiBaru === nilai) {
                    return
                  }
                  nilai = nilaiBaru
                  mutakhirkanTampilan()
                  kalkulasiHasil()
                }
              })
            })

            mutakhirkanTampilan()

            tampilanInput1.addEventListener('input', function(peristiwa) {
              const targetInput1 = peristiwa.target
              state.input1 = parseInt(targetInput1.value)
            })
            tampilanInput2.addEventListener('input', function(peristiwa) {
              const targetInput2 = peristiwa.target
              state.input2 = parseInt(targetInput2.value)
            })

            tampilanOperator.addEventListener('change', function(peristiwa) {
              const targetOperator = peristiwa.target
              const selectedOperator = targetOperator.selectedOptions[0].value
              state.operator = selectedOperator
            })
          }

          // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
          // document.addEventListener('DOMContentLoaded', main)
          main()

          return state
        })()
        window.state11 = state11
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
