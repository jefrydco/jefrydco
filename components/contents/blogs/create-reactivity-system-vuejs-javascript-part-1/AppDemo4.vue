<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo-card demo-card-4">
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
        const keadaan4 = (function() {
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
              '.demo-card-4 .keadaan'
            )
            tampilanKeadaan.innerText = JSON.stringify(keadaan, null, 2)

            const tampilanHasil = document.querySelector('.demo-card-4 .hasil')
            tampilanHasil.innerText = keadaan.hasil.toString()

            const tampilanInput1 = document.querySelector(
              '.demo-card-4 .input1'
            )
            const tampilanInput2 = document.querySelector(
              '.demo-card-4 .input2'
            )

            tampilanInput1.value = keadaan.input1.toString()
            tampilanInput2.value = keadaan.input2.toString()
          }

          // document.addEventListener('DOMContentLoaded', mulai)

          // We have to run the method because this script is executed inside vue component
          mulai()

          return keadaan
        })()
        window.keadaan4 = keadaan4
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
