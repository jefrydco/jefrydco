<template>
  <div class="header-link">
    <nuxt-link :to="to" class="header-link__anchor">
      {{ label }}
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export type AppHeaderLinkPropsType = {
  to: string
  label: string
}

export default defineComponent<AppHeaderLinkPropsType>({
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  }
})
</script>

<style>
.header-link {
  @apply absolute z-20;
  top: 1.7rem;
  left: 1.5rem;

  &__anchor {
    @apply cursor-pointer py-2 px-4 w-24 rounded shadow no-underline;
    background-color: var(--card-bg);
    color: var(--text-normal);

    &:hover {
      @apply shadow-lg;
    }
  }
}
</style>
