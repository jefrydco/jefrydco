<template>
  <app-card
    class="app-talk-item"
    :title="title"
    :to="localePath({ name: 'talk-slug', params: { slug } })"
  >
    <template #image="">
      <div class="app-talk-item__img">
        <app-img :src="img" :alt="title" round="top" />
      </div>
    </template>
    <template #default="">
      <header class="app-talk-item__header">
        <h2 class="app-talk-item__title">
          {{ title }}
        </h2>
        <div class="app-talk-item__timestamp">
          <time :datetime="startDate">
            {{ formatDate(startDate) }}
          </time>
          •
          <time :datetime="startDate">
            {{ formatTime(startDate) }}
          </time>
          -
          <time :datetime="endDate">
            {{ formatTime(endDate) }}
          </time>
        </div>
      </header>
    </template>
  </app-card>
</template>

<script lang="ts">
import { formatDate } from '~/extendables'

export default formatDate.extend({
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      default: ''
    },
    endDate: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.app-talk-item {
  background-color: var(--card-bg);

  &__header {
    @apply p-6 sm:px-10 sm:py-8;
  }

  &__title {
    @apply capitalize font-bold text-2xl mt-0 mb-2;
  }

  &__img {
    @apply h-64 rounded-t;
    background-color: var(--inline-code-bg);
  }

  &__timestamp {
    @apply leading-normal mb-4 text-sm;
  }

  img {
    @apply h-64 w-full object-cover rounded-b-none;
  }
}
/* purgecss end ignore */
</style>
