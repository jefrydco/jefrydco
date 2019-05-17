<script>
import AppImg from "./AppImg.vue";

export default {
  /*eslint-disable */
  components: {
    AppImg
  },
  props: ["renderFunc", "staticRenderFuncs"],

  created() {
    this.templateRender = new Function(this.renderFunc)();
    this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
  },

  render(createElement) {
    return this.templateRender
      ? this.templateRender()
      : createElement("div", "Rendering");
  }
  /* eslint-enable */
};
</script>
