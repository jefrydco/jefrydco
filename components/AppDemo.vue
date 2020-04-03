<template>
  <figure :id="name" class="demo">
    <slot />
    <figcaption class="text-sm text-center mt-4">
      {{ $t('editDemoGithub') }}
      <a :href="githubUrl" target="_blank" rel="noopener noreferrer">
        {{ name }}
      </a>
    </figcaption>
  </figure>
</template>

<script>
const BASE_URL = 'https://github.com/jefrydco/jefrydco/tree/master/components'

export default {
  props: {
    path: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    githubUrl() {
      if (this.path) {
        return `${BASE_URL}/${this.path}/${this.name}.vue`
      }
      return BASE_URL
    },
  },
}
</script>
