import Vue from "vue";
import VueTestUtils from "@vue/test-utils";

Vue.config.silent = true;

// Mock Nuxt components
VueTestUtils.config.stubs.nuxt = "<div><slot /></div>";
VueTestUtils.config.stubs["nuxt-link"] = "<a><slot /></a>";
VueTestUtils.config.stubs["no-ssr"] = "<span><slot /></span>";
