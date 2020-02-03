<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-9">
      <pre class="keadaan"></pre>

      <input type="number" class="input1" min="0" />
      <select class="operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="input2" min="0" />

      <div class="hasil"></div>

      <script>
        // We put the code inside immediately invoked function expression to avoid polluting global variable
        // We also change the arrow function to anonymous function because the arrow function will serialized by Nuxt.
        const keadaan9 = (function() {
          const OPERATOR = {
            TAMBAH: '+',
            KURANG: '-',
            KALI: '*',
            BAGI: '/'
          }

          const keadaan = {
            hasil: 0,
            operator: OPERATOR.TAMBAH,
            input1: 0,
            input2: 0
          }

          function mulai() {
            // We have to prefixed the selector in accordance with the root component class
            // It avoids the script to be applied to all demo
            const tampilanKeadaan = document.querySelector(
              '.demo-card-9 .keadaan'
            )

            const tampilanHasil = document.querySelector('.demo-card-9 .hasil')

            const tampilanInput1 = document.querySelector(
              '.demo-card-9 .input1'
            )
            const tampilanInput2 = document.querySelector(
              '.demo-card-9 .input2'
            )

            const tampilanOperator = document.querySelector(
              '.demo-card-9 .operator'
            )

            function mutakhirkanTampilan() {
              tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)
              tampilanHasil.innerText = keadaan.hasil.toString()

              tampilanInput1.value = keadaan.input1.toString()
              tampilanInput2.value = keadaan.input2.toString()

              tampilanOperator.value = keadaan.operator
            }

            function kalkulasiHasil() {
              switch (keadaan.operator) {
                case OPERATOR.TAMBAH:
                  keadaan.hasil = keadaan.input1 + keadaan.input2
                  break
                case OPERATOR.KURANG:
                  keadaan.hasil = keadaan.input1 - keadaan.input2
                  break
                case OPERATOR.KALI:
                  keadaan.hasil = keadaan.input1 * keadaan.input2
                  break
                case OPERATOR.BAGI:
                  keadaan.hasil = keadaan.input1 / keadaan.input2
                  break
                default:
                  break
              }
            }

            mutakhirkanTampilan()

            tampilanInput1.addEventListener('input', function(peristiwa) {
              const targetInput1 = peristiwa.target
              keadaan.input1 = parseInt(targetInput1.value)
            })
            tampilanInput2.addEventListener('input', function(peristiwa) {
              const targetInput2 = peristiwa.target
              keadaan.input2 = parseInt(targetInput2.value)
            })

            tampilanOperator.addEventListener('change', function(peristiwa) {
              const targetOperator = peristiwa.target
              const selectedOperator = targetOperator.selectedOptions[0].value
              keadaan.operator = selectedOperator
            })

            let input1 = keadaan['input1']

            Object.defineProperty(keadaan, 'input1', {
              enumerable: true,
              configurable: true,
              get: function pengambilReaktif() {
                return input1
              },
              set: function pengaturReaktif(nilaiBaru) {
                input1 = nilaiBaru
                kalkulasiHasil()
                mutakhirkanTampilan()
              }
            })
          }

          // document.addEventListener('DOMContentLoaded', mulai)

          // We have to run the method because this script is executed inside vue component
          mulai()

          return keadaan
        })()
        window.keadaan9 = keadaan9
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
