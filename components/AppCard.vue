<template>
  <article :id="slug" class="app-card">
    <slot name="image" />
    <slot />
    <nuxt-link
      :aria-label="title"
      :to="localePath({ name: 'blog-slug', params: { slug } })"
      class="app-card__link"
    >
      {{ title }}
    </nuxt-link>
  </article>
</template>

<script lang="ts">
import { formatDate } from '~/extendables'

export default formatDate.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.app-card {
  @apply mb-12 mx-4 max-w-3xl rounded overflow-hidden shadow relative hover:shadow-lg;
  background-color: var(--card-bg);

  &__link {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden z-0;
    text-indent: -9999px;

    &:focus {
      border: 0.125rem solid var(--text-normal);
    }
  }
}
/* purgecss end ignore */
</style>
