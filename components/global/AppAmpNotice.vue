<i18n>
{
  "id": {
    "amp_notice": "Kamu membuka versi AMP halaman ini, jika ingin menggunakan fitur interaktifnya silahkan beralih ke halaman versi biasanya melalui"
  },
  "en": {
    "amp_notice": "You open the AMP version of this page, if you want to use the interactive features, please switch to the normal version via"
  }
}
</i18n>

<template>
  <blockquote v-if="$route.name.includes('amp')">
    <p>
      {{ $t('amp_notice') }},
      <app-locale-path-link :to="to">
        {{ label }}
      </app-locale-path-link>
    </p>
  </blockquote>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    to: {
      type: [Object, String],
      required: true,
      default() {
        return null
      }
    },
    label: {
      type: String,
      required: true,
      default: ''
    }
  }
})
</script>
