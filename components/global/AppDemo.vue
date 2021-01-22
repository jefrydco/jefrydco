<i18n>
{
  "id": {
    "demo_notice": "Jika demo di atas tidak bekerja, silahkan muat ulang halaman ini"
  },
  "en": {
    "demo_notice": "If the demo above doesn't work, please kindly refresh this page"
  }
}
</i18n>

<template>
  <figure :id="name" class="demo">
    <slot />
    <figcaption class="text-sm text-center mt-4">
      <p>{{ $t('demo_notice') }}.</p>
      <p>
        {{ $t('editDemoGithub') }}
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
          {{ name }}
        </a>
        .
      </p>
    </figcaption>
  </figure>
</template>

<script lang="ts">
import Vue from 'vue'
const BASE_URL = 'https://github.com/jefrydco/jefrydco/tree/master/components'

export default Vue.extend({
  props: {
    path: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    githubUrl() {
      if (this.path) {
        return `${BASE_URL}/${this.path}/${this.name}.vue`
      }
      return BASE_URL
    }
  }
})
</script>
