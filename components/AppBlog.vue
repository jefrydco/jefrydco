<template>
  <article :id="slug" class="blog-item">
    <div class="blog-item__img">
      <app-img :src="img" :alt="title" />
    </div>
    <div class="blog-item__meta">
      <header>
        <h2 class="blog-item__title">
          {{ title }}
        </h2>
        <div class="blog-item__date">
          <span>
            <time :datetime="postedDate">
              {{ $t('postedOn') }}
              {{ formatDate(postedDate) }}
            </time>
          </span>
          •
          <span>
            <time :datetime="updatedDate">
              {{ $t('updatedOn') }}
              {{ formatDate(updatedDate) }}
            </time>
          </span>
          •
          <span>
            {{ Math.ceil(readingTime.minutes.toFixed(2)) }}
            {{ $t('minRead') }}
          </span>
        </div>
      </header>
      <p class="blog-item__summary">
        {{ summary }}
      </p>
      <nuxt-link
        :aria-label="title"
        :to="localePath({ name: 'blog-slug', params: { slug } })"
        class="blog-item__link"
      >
        {{ title }}
      </nuxt-link>
    </div>
  </article>
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
.blog-item {
  @apply mb-12 mx-4 max-w-3xl rounded overflow-hidden shadow relative;
  background-color: var(--card-bg);

  &__img {
    @apply h-64 rounded;
    background-color: var(--inline-code-bg);
  }

  img {
    @apply h-64 w-full object-cover;
  }

  &:hover {
    @apply shadow-lg;
  }

  &__meta {
    @apply p-6;
  }

  &__title {
    @apply capitalize font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-sm;
  }

  &__summary {
    @apply leading-normal mb-0;
  }

  &__link {
    @apply absolute top-0 left-0 w-full h-full overflow-hidden z-0;
    text-indent: -9999px;

    &:focus {
      border: 0.125rem solid var(--text-normal);
    }
  }
}

@screen sm {
  .blog-item {
    &__meta {
      @apply px-16 py-10;
    }
  }
}

body {
  &.dark {
    .blog-item {
      img {
        filter: brightness(0.7);
      }
    }
  }
}
/* purgecss end ignore */
</style>
