<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="demo__card demo__card-12">
      <pre class="demo__display keadaan"></pre>

      <input type="number" class="demo__form input1" min="0" />
      <select class="demo__form operator">
        <option value="+">&plus;</option>
        <option value="-">&minus;</option>
        <option value="*">&times;</option>
        <option value="/">&divide;</option>
      </select>
      <input type="number" class="demo__form input2" min="0" />

      <div class="hasil"></div>

      <hr />

      <pre class="keadaan-2"></pre>

      <div>
        <button class="mulai">Mulai</button>
        <button class="berhenti">Berhenti</button>
        <button class="reset">Reset</button>
      </div>

      <div class="detik"></div>

      <script>
        if (!window.keadaan12) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan12 = (function () {
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

            const keadaanDetik = {
              detik: 0
            }

            function mulai() {
              // Kita harus memberi awalan selektor sesuai dengan kelas akar komponen
              // Hal tersebut mencegah scrip dieksekusi untuk semua demo
              const tampilanKeadaan = document.querySelector(
                '.demo__card-12 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.demo__card-12 .hasil'
              )

              const tampilanInput1 = document.querySelector(
                '.demo__card-12 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.demo__card-12 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.demo__card-12 .operator'
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

              const daftarKunci = Object.keys(keadaan)

              daftarKunci.forEach(function (kunci) {
                let nilai = keadaan[kunci]

                Object.defineProperty(keadaan, kunci, {
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

              tampilanInput1.addEventListener('input', function (peristiwa) {
                const targetInput1 = peristiwa.target
                keadaan.input1 = parseInt(targetInput1.value)
              })
              tampilanInput2.addEventListener('input', function (peristiwa) {
                const targetInput2 = peristiwa.target
                keadaan.input2 = parseInt(targetInput2.value)
              })

              tampilanOperator.addEventListener('change', function (peristiwa) {
                const targetOperator = peristiwa.target
                const selectedOperator = targetOperator.selectedOptions[0].value
                keadaan.operator = selectedOperator
              })

              /* KODE UNTUK PENGHITUNG WAKTU */

              const tampilanKeadaan2 = document.querySelector(
                '.demo__card-12 .keadaan-2'
              )
              const tampilanTombolMulai = document.querySelector(
                '.demo__card-12 .mulai'
              )
              const tampilanTombolBerhenti = document.querySelector(
                '.demo__card-12 .berhenti'
              )
              const tampilanTombolReset = document.querySelector(
                '.demo__card-12 .reset'
              )
              const tampilanDetik = document.querySelector(
                '.demo__card-12 .detik'
              )

              function mutakhirkanPenghitungDetik() {
                tampilanKeadaan2.innerText = JSON.stringify(
                  keadaanDetik,
                  null,
                  2
                )
                tampilanDetik.innerText = keadaanDetik.detik.toString()
              }

              let idInterval = 0

              function mulai() {
                idInterval = setInterval(function () {
                  keadaanDetik.detik = keadaanDetik.detik + 1
                }, 1000)
              }

              function berhenti() {
                clearInterval(idInterval)
              }

              function reset() {
                berhenti()
                keadaanDetik.detik = 0
              }

              tampilanTombolMulai.addEventListener('click', function () {
                mulai()
              })
              tampilanTombolBerhenti.addEventListener('click', function () {
                berhenti()
              })
              tampilanTombolReset.addEventListener('click', function () {
                reset()
              })

              mutakhirkanPenghitungDetik()
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return {
              kalkulator: keadaan,
              penghitungDetik: keadaanDetik
            }
          })()
        }
      </script>
    </div>
  </app-demo>
</template>

<script lang="ts">
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo12Id'
})
</script>
