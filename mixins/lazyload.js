export default {
  mounted() {
    this.$nextTick(() => {
      document.lazyLoadInstance.update();
    });
  }
};
