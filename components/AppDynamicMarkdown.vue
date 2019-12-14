<script lang="js">
// import hljs from 'highlight.js/lib/highlight'

// import javascript from 'highlight.js/lib/languages/javascript'
// import css from 'highlight.js/lib/languages/css'
// import xml from 'highlight.js/lib/languages/xml'
// import json from 'highlight.js/lib/languages/json'
// import typescript from 'highlight.js/lib/languages/typescript'
// import bash from 'highlight.js/lib/languages/bash'

// import 'nord-highlightjs/dist/nord.css'

// hljs.registerLanguage('javascript', javascript)
// hljs.registerLanguage('css', css)
// hljs.registerLanguage('xml', xml)
// hljs.registerLanguage('json', json)
// hljs.registerLanguage('typescript', typescript)
// hljs.registerLanguage('bash', bash)

export default {

  props: {
    renderFunc: {
      type: String,
      default: ''
    },
    staticRenderFuncs: {
      type: String,
      default: ''
    },
    extraComponent: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      templateRender(createElement) {
        return createElement('div', 'Rendering...')
      }
    }
  },

  computed: {
    // extraComponentLoader () {
    //   if (!this.extraComponent) {
    //     return null
    //   }
    //   return () => import(`~/components/blog/${this.extraComponent}.vue`)
    // }
  },

  mounted() {
    // this.initHighlightJs()
  },

  created () {
    this.init()
  },

  methods: {
    // initHighlightJs () {
    //   const targets = document.querySelectorAll('code')
    //   targets.forEach((target) => {
    //     hljs.highlightBlock(target)
    //   })
    // },
    init() {
      // eslint-disable-next-line
      this.templateRender = new Function(this.renderFunc)()
      // eslint-disable-next-line
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)()
    }
  },

  render (createElement) {
    if (this.templateRender !== null && typeof this.templateRender !== 'undefined') {
      return this.templateRender(createElement)
    }
    return createElement('div', 'Rendering...')
  }
}
</script>
