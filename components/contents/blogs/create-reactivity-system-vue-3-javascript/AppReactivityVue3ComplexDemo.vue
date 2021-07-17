<i18n>
{
  "en": {
    "todo_label": "Enter your todo item here"
  },
  "id": {
    "todo_label": "Masukkan item todo teman-teman di sini"
  }
}
</i18n>

<template>
  <app-demo :path="DEFAULT_PATH" :name="$options.name">
    <div class="app-demo__card demo__card-1">
      <pre class="app-demo__code state"></pre>

      <input
        type="text"
        class="app-demo__form input"
        :aria-label="$t('todo_label')"
      />

      <ul class="list"></ul>

      <div ref="reactivityVue3Script1" class="script"></div>
    </div>
  </app-demo>
</template>

<script lang="ts">
import onetime from 'onetime'
import ExtendableReactivityVue3 from './ExtendableReactivityVue3'

export default ExtendableReactivityVue3.extend({
  name: 'AppReactivityVue3ComplexDemo',
  mounted() {
    const interval = setInterval(() => {
      const reactivityVue3Script1 = this.$refs?.reactivityVue3Script1 as Element
      if (reactivityVue3Script1) {
        this.init(reactivityVue3Script1)
        clearInterval(interval)
      }
    }, 50)
  },
  methods: {
    init: onetime(function (reactivityVue3Script1: Element) {
      const newScript = document.createElement('script')
      const inlineScript =
        document.createTextNode(`if (!window.complexDemoVue3State) {
  window.complexDemoVue3State = (() => {
    function reactivity() {
      const targetMap = new WeakMap()
      let activeEffect = undefined

      function isObject(value) {
        return Object.prototype.toString.call(value) === '[object Object]'
      }

      function reactive(target) {
        return new Proxy(target, {
          get(target, key, receiver) {
            const value = target[key]

            track(target, key)

            if (isObject(value)) {
              return reactive(value)
            }
            if (Array.isArray(value)) {
              return trackArray(target, key)
            }

            return Reflect.get(target, key, receiver)
          },
          set(target, key, value, receiver) {
            trigger(target, key, value)

            return Reflect.set(target, key, value, receiver)
          }
        })
      }

      function track(target, key) {
        let depsMap = targetMap.get(target)
        if (!depsMap) {
          depsMap = new Map()
          targetMap.set(target, depsMap)
        }

        let dep = depsMap.get(key)
        if (!dep) {
          dep = new Set()
          depsMap.set(key, dep)
        }

        if (!dep.has(activeEffect) && typeof activeEffect !== 'undefined') {
          dep.add(activeEffect)
        }

        targetMap.set(target, depsMap)
      }

      function trackArray(target, key) {
        const value = target[key]

        return new Proxy(value, {
          get(arrayTarget, arrayKey) {
            const arrayMethod = arrayTarget[arrayKey]

            if (typeof arrayMethod === 'function') {
              if (['push', 'unshift', 'pop', 'shift', 'splice'].includes(arrayKey)) {
                return function () {
                  const result = Array.prototype[arrayKey].apply(
                    arrayTarget,
                    arguments
                  )

                  trigger(target, key, value)

                  return result
                }
              }
              return arrayMethod.bind(arrayTarget)
            }
            return arrayMethod
          }
        })
      }

      function trigger(target, key, value) {
        const effects = targetMap.get(target).get(key)

        if (effects) {
          effects.forEach((effect) => {
            effect(value)
          })
        }
      }

      function watch(target, key, effect) {
        activeEffect = effect
        const value = target[key]
        effect(value)
        activeEffect = undefined
      }

      function nextTick(callback) {
        setTimeout(callback, 0)
      }

      return {
        reactive,
        watch,
        nextTick
      }
    }

    function dom() {
      const cachedSelect = new Map()

      function select(selector, callback) {
        let el = cachedSelect.get(selector)
        if (!el) {
          el = document.querySelector(selector)
          cachedSelect.set(selector, el)
        }
        callback(el)
      }

      return {
        select
      }
    }

    const { reactive, watch, nextTick } = reactivity()
    const { select } = dom()

    const state = reactive({
      input: '',
      list: []
    })

    function renderState() {
      select('.state', (el) => {
        el.innerText = JSON.stringify(state, null, 2)
      })
    }

    watch(state, 'input', (value) => {
      select('.input', (el) => {
        el.value = value
      })

      nextTick(() => {
        renderState()
      })
    })

    watch(state, 'list', (value) => {
      select('.list', (el) => {
        el.innerHTML = value
          .map((item, i) =>
            '<li>'
              .concat(item, ' <button class="app-demo__form demo__form--custom item-')
              .concat(i, '" data-index="')
              .concat(i, '">x</button></li>')
          )
          .join('')
        value.forEach((item, i) => {
          const button = el.querySelector('.item-'.concat(i))
          button.addEventListener(
            'click',
            (e) => {
              const index = parseInt(e.target.dataset.index)
              state.list.splice(index, 1)
            }
          )
        })
      })

      nextTick(() => {
        renderState()
      })
    })

    select('.input', (el) => {
      el.addEventListener('input', (e) => {
        state.input = e.target.value
      })
      el.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          state.list.push(e.target.value)
          state.input = ''
        }
      })
    })

    return state
  })()
}
`)
      newScript.appendChild(inlineScript)
      reactivityVue3Script1.appendChild(newScript)
    })
  }
})
</script>

<style>
.prose-lg {
  .app-demo__form.app-demo__form--custom {
    @apply ml-2 px-4;
  }
}
</style>
