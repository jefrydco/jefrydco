export default {
  head() {
    return {
      link: [].concat(
        !this.$route.name.includes("amp")
          ? []
          : [
              {
                rel: "canonical",
                href: `https://jefrydco.id${this.$route.path}`.replace(
                  "/amp",
                  ""
                )
              }
            ]
      )
    };
  }
};
