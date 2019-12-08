<template>
  <div class="container mx-auto">
    <nuxt />
    <app-switch-theme v-model="isDark" />
  </div>
</template>

<script>
import LazyLoad from "vanilla-lazyload";
import AppSwitchTheme from "~/components/AppSwitchTheme";

import { types } from "~/store";

export default {
  head() {
    return {
      bodyAttrs: {
        class: this.isDark ? "dark" : "light"
      }
    };
  },
  components: {
    AppSwitchTheme
  },
  computed: {
    isDark: {
      get() {
        return this.$store.state.isDark;
      },
      set(value) {
        this.$store.commit(types.SET_DARK, value);
      }
    }
  },
  mounted() {
    if (!document.lazyLoadInstance) {
      document.lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        use_native: true
      });
    }
  }
};
</script>
