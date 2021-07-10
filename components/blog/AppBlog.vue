<template>
  <app-card
    class="app-blog"
    :title="title"
    :to="localePath({ name: 'blog-slug', params: { slug } })"
  >
    <template #image="">
      <div class="app-blog__img">
        <app-img :src="img" :alt="title" round="top" />
      </div>
    </template>
    <template #default="">
      <div class="app-blog__header">
        <header>
          <h2 class="app-blog__title">
            {{ title }}
          </h2>
          <div class="app-blog__meta">
            <time :datetime="postedDate">
              {{ $t('postedOn') }}
              {{ formatDate(postedDate) }}
            </time>
            •
            <time :datetime="updatedDate">
              {{ $t('updatedOn') }}
              {{ formatDate(updatedDate) }}
            </time>
            •
            <span>
              {{ Math.ceil(readingTime.minutes.toFixed(2)) }}
              {{ $t('minRead') }}
            </span>
          </div>
        </header>
        <p class="app-blog__summary">
          {{ summary }}
        </p>
      </div>
    </template>
  </app-card>
</template>

<script lang="ts">
import AppCard from '~/components/AppCard.vue'

import { formatDate } from '~/extendables'

export default formatDate.extend({
  components: {
    AppCard
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    summary: {
      type: String,
      default: ''
    },
    postedDate: {
      type: String,
      default: ''
    },
    updatedDate: {
      type: String,
      default: ''
    },
    readingTime: {
      type: Object,
      default() {
        return null
      }
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
.app-blog {
  &__header {
    @apply p-8 sm:px-14 sm:py-10;
  }

  &__title {
    @apply capitalize font-bold text-2xl mt-0 mb-2;
  }

  &__img {
    @apply h-64 rounded-t;
  }

  &__meta {
    @apply leading-normal mb-4 text-sm;
  }

  &__summary {
    @apply leading-normal mb-0;
  }

  img {
    @apply h-64 w-full object-cover;
  }
}

body {
  &.dark {
    .app-blog {
      img {
        filter: brightness(0.7);
      }
    }
  }
}
/* purgecss end ignore */
</style>
