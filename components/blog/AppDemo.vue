<i18n>
{
  "id": {
    "demo_notice": "Jika demo di atas tidak bekerja, silahkan muat ulang halaman ini.<br/>Jika masih tidak bisa, silahkan hubungi <a href='https://twitter.com/jefrydco' target='_blank' rel='noopener noreferrer'>@jefrydco</a> di Twitter."
  },
  "en": {
    "demo_notice": "If the demo above doesn't work, please kindly refresh this page.<br/>If it persists, please contact <a href='https://twitter.com/jefrydco' target='_blank' rel='noopener noreferrer'>@jefrydco</a> at Twitter."
  }
}
</i18n>

<template>
  <figure :id="name" class="app-demo">
    <div class="app-demo__card">
      <slot />
    </div>
    <figcaption class="text-sm text-center mt-4">
      <p v-html="$t('demo_notice')"></p>
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
const BASE_URL = 'https://github.com/jefrydco/jefrydco/blob/main/components'

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

<style lang="postcss">
/* purgecss start ignore */
.prose-lg {
  .app-demo {
    &__card {
      @apply rounded p-4;
      background: var(--bg);
    }

    &__code {
      @apply mt-0 mb-4;
    }

    &__form {
      @apply mb-4 py-1 px-2 rounded;
      background-color: var(--card-bg);

      &:not(:last-child) {
        @apply mr-2;
      }

      &:disabled {
        background-color: var(--bg-disabled);
        color: var(--text-disabled);
      }
    }
  }
}
/* purgecss end ignore */
</style>
