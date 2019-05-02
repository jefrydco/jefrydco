<script>
import Page from "./index";
import amp from "~/mixins/amp";

export default {
  extends: Page,
  mixins: [amp]
};
</script>

<style lang="postcss">
@import "~/assets/styles/mixins.pcss";

html[⚡] {
  .header {
    &__img {
      @mixin aspect-ratio picture, 16, 4.5;

      &:before {
        @apply hidden;
      }
    }
  }
  .blog {
    margin-top: -10rem;
  }
  .switch {
    @apply hidden;
  }
}
@media (max-width: 767px) {
  html[⚡] {
    .blog {
      margin-top: -3rem;
    }
  }
}
</style>
