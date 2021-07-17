<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card app-demo__card-13">
      <pre class="app-demo__code keadaan"></pre>

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

      <pre class="app-demo__code keadaan-2"></pre>

      <div>
        <button class="btn mulai">Mulai</button>
        <button class="btn berhenti">Berhenti</button>
        <button class="btn reset">Reset</button>
      </div>

      <div class="detik"></div>

      <div ref="script13" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableCreateReactivity2 from './ExtendableCreateReactivity2'

export default ExtendableCreateReactivity2.extend({
  name: 'AppDemo13Id',
  mounted() {
    const interval = setInterval(() => {
      const script13 = this.$refs?.script13 as Element
      if (script13) {
        this.init(script13)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (script13: Element) {
      const newScript = document.createElement('script')
      const inlineScript = document.createTextNode(`if (!window.keadaan13) {
          // Kita meletakkan kode di dalam ekspresi fungsi yang dipanggil secara langsung untuk mencegah mengotori variabel global
          // Kita juga mengganti fungsi panah menjadi fungsi anonim karena fungsi panah akan diserialisasi oleh Nuxt.
          window.keadaan13 = (function () {
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
                '.app-demo__card-13 .keadaan'
              )

              const tampilanHasil = document.querySelector(
                '.app-demo__card-13 .hasil'
              )

              const tampilanInput1 = document.querySelector(
                '.app-demo__card-13 .input1'
              )
              const tampilanInput2 = document.querySelector(
                '.app-demo__card-13 .input2'
              )

              const tampilanOperator = document.querySelector(
                '.app-demo__card-13 .operator'
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
                '.app-demo__card-13 .keadaan-2'
              )
              const tampilanTombolMulai = document.querySelector(
                '.app-demo__card-13 .mulai'
              )
              const tampilanTombolBerhenti = document.querySelector(
                '.app-demo__card-13 .berhenti'
              )
              const tampilanTombolReset = document.querySelector(
                '.app-demo__card-13 .reset'
              )
              const tampilanDetik = document.querySelector(
                '.app-demo__card-13 .detik'
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

              /* SISTEM REAKTIVITAS BANYAK PEKERJAAN */

              class Pengintai {
                constructor() {
                  this.daftarPekerjaan = []
                }

                simpanPekerjaan() {
                  if (Pengintai.pekerjaan) {
                    this.daftarPekerjaan.push(Pengintai.pekerjaan)
                  }
                }

                jalankanPekerjaan() {
                  this.daftarPekerjaan.forEach(function (pekerjaan) {
                    pekerjaan()
                  })
                }
              }
              Pengintai.pekerjaan = null

              function observasi(objek) {
                const daftarKunci = Object.keys(objek)

                daftarKunci.forEach(function (kunci) {
                  let nilai = objek[kunci]
                  const pengintai = new Pengintai()

                  Object.defineProperty(objek, kunci, {
                    enumerable: true,
                    configurable: true,
                    get: function pengambilReaktif() {
                      pengintai.simpanPekerjaan()
                      return nilai
                    },
                    set: function pengaturReaktif(nilaiBaru) {
                      if (nilaiBaru === nilai) {
                        return
                      }
                      nilai = nilaiBaru
                      pengintai.jalankanPekerjaan()
                    }
                  })
                })
              }

              function pelaksana(pekerjaan) {
                Pengintai.pekerjaan = pekerjaan
                pekerjaan()
                Pengintai.pekerjaan = null
              }

              observasi(keadaan)
              observasi(keadaanDetik)

              pelaksana(mutakhirkanTampilan)
            }

            // Kita harus menjalankan fungsi karena skrip ini dieksekusi di dalam komponen vue
            // document.addEventListener('DOMContentLoaded', mulai)
            mulai()

            return {
              kalkulator: keadaan,
              penghitungDetik: keadaanDetik
            }
          })()
        }`)
      newScript.appendChild(inlineScript)
      script13.appendChild(newScript)
    })
  }
})
</script>
