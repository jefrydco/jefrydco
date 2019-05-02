export default {
  head() {
    return {
      link: [].concat(
        !/\/amp((\/.*$)|$)/gi.test(this.$route.path)
          ? []
          : [
              {
                rel: "canonical",
                href: `${this.$route.path}`.replace(/\/amp((\/.*$)|$)/gi, "")
              }
            ]
      )
    };
  }
};
