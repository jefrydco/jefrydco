<template>
  <article class="acd">
    <div class="acd__card" :class="{ 'acd__card--inset': inset }">
      <header class="acd__meta">
        <h1 :id="slug" class="acd__title">
          {{ title }}
        </h1>
        <div class="acd__date">
          <time :datetime="postedDate">
            {{ $t('postedOn') }}
            {{ formatDate(postedDate) }}
          </time>
          •
          <time :datetime="updatedDate">
            {{ $t('updatedOn') }}
            {{ formatDate(updatedDate) }}
          </time>
          <template v-if="readingTime">
            •
            <span>
              {{ Math.ceil(readingTime) }}
              {{ $t('minRead') }}
            </span>
          </template>
        </div>
      </header>
      <div class="acd__translations">
        {{ $t('readOtherLanguages') }}:
        <a
          v-for="locale in locales"
          :key="locale.code"
          :aria-label="locale.name"
          :href="getTranslationsLink(locale.code)"
          class="acd__translations-link"
        >
          {{ locale.name }}
        </a>
      </div>
      <slot />
    </div>
  </article>
</template>

<script lang="ts">
import { formatDate } from '~/extendables'

export default formatDate.extend({
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    },
    slug: {
      type: String,
      required: true,
      default: ''
    },
    locales: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    postedDate: {
      type: String,
      required: true,
      default: ''
    },
    updatedDate: {
      type: String,
      required: true,
      default: ''
    },
    readingTime: {
      type: String,
      default: ''
    },
    inset: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    addTrailingSlash() {
      return (url: string) => {
        if (url.endsWith('/')) {
          return url
        }
        return `${url}/`
      }
    },
    getTranslationsLink() {
      return (localeCode: string) => {
        const localePath = this.switchLocalePath(localeCode) as string
        if (localePath.includes('#')) {
          const newPath = localePath.split('#')[0]
          return this.addTrailingSlash(newPath)
        }
        return this.addTrailingSlash(localePath)
      }
    }
  },
  mounted() {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)!
      element.scrollIntoView({})
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.prose-lg {
  hr {
    @apply my-5;
  }

  code {
    @apply rounded;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply mt-12 mb-5 py-2 px-3 rounded-l-lg;
    background-image: linear-gradient(
      to right,
      rgba(245, 158, 11, 0.2) 50%,
      rgba(245, 101, 101, 0)
    );
  }

  h2,
  h3 {
    > a {
      &:focus {
        @apply outline-none;
      }

      &::before {
        @apply absolute -ml-8 pr-2 opacity-0;
        content: '#';
        color: var(--text-link);
      }
    }

    &:hover {
      > a {
        &::before {
          @apply opacity-100;
        }
      }
    }
  }

  h1 {
    @apply text-2xl;
  }

  h2 {
    @apply text-xl;
  }

  h3 {
    @apply text-lg;
  }

  h4 {
    @apply text-base;
  }

  h5 {
    @apply text-sm;
  }

  h6 {
    @apply text-xs;
  }

  h1 + h2,
  h2 + h3,
  h3 + h4,
  h5 + h6 {
    @apply mt-5;
  }

  ul {
    @apply list-disc;
  }

  ol {
    @apply list-decimal list-inside;
  }

  ul,
  ol {
    @apply ml-8;

    li {
      @apply mb-3 pl-3;

      p {
        @apply mb-0;
      }

      ul,
      ol {
        @apply my-3 ml-4;
      }
    }
  }

  > ul > li > *:last-child,
  > ol > li > *:last-child,
  > ul > li > *:first-child,
  > ol > li > *:first-child {
    @apply my-0;
  }

  blockquote,
  quote {
    @apply leading-loose mb-8 py-3 px-4 border-l-4 italic;
    border-color: var(--inline-code-border);

    p:only-child {
      @apply mt-0 mb-0;
    }
  }

  .shiki {
    @apply rounded-lg;
    background-color: #1a202c;
    color: #e2e8f0;

    &__pre {
      @apply my-0 p-0;
    }

    &__pre,
    &__code {
      border-radius: 0 0 0.5rem 0.5rem;
      color: #e2e8f0;
    }

    &__dim {
      @apply opacity-50;
      transition: opacity 0.3s cubic-bezier(0.55, 0, 0.1, 1);
    }

    &__meta {
      @apply flex justify-between;
      padding: 0.5rem 1rem;
    }

    &__highlight {
      &::before {
        border-left: 0.3rem solid var(--text-link);
        background-color: rgba(203, 213, 224, 0.1);
        background-image: linear-gradient(
          to right,
          rgba(203, 213, 224, 0.1) 50%,
          rgba(203, 213, 224, 0)
        );
      }
    }

    &__error {
      padding: 0.375rem 0;

      span {
        color: #e2e8f0;
      }

      &::before {
        border-left: 0.3rem solid var(--error);
        background-color: rgba(245, 101, 101, 0.1);
        background-image: linear-gradient(
          to right,
          rgba(245, 101, 101, 0.3) 50%,
          rgba(245, 101, 101, 0)
        );
      }
    }

    &__highlight,
    &__error {
      @apply relative opacity-100;

      span {
        @apply relative z-10;
      }

      &::before {
        @apply absolute h-full z-0 top-0 bottom-0;
        content: '';
        left: -1.55rem;
        right: -1.5rem;
      }
    }

    &__code {
      border-top-width: 1px;
      background-color: #1a202c;
      border-color: #2d3748;
      padding: 1rem 1.5rem;
    }

    &:hover {
      .shiki {
        &__dim {
          @apply opacity-100;
        }
      }
    }
  }

  .embed,
  .nuxt-content-highlight,
  .app-demo,
  .app-img {
    @apply mb-8;
  }
}

.acd {
  @apply max-w-4xl mx-auto;

  &__card {
    @apply mb-4 p-6 mx-4 rounded overflow-hidden shadow relative sm:px-16;
    background-color: var(--card-bg);

    &--inset {
      @apply -mt-64 sm:py-14;
    }
  }

  &__meta {
    @apply mb-8;
  }

  &__title {
    @apply font-bold text-2xl mt-0 mb-4;
  }

  &__date {
    @apply leading-normal mb-4 text-sm;
  }

  &__translations {
    @apply leading-normal mb-8 py-3 px-4 rounded-lg border;
    background-color: var(--inline-code-bg);
    border-color: var(--inline-code-border);
    color: var(--inline-code-text);

    a:not(:last-child) {
      @apply mr-3;
    }
  }
}

.shiki {
  &__line,
  &__block,
  &__dim,
  &__highlight {
    @apply block;
  }

  &__token {
    &--color-282A36 {
      color: #282a36;
    }
    &--color-F8F8F2 {
      color: #f8f8f2;
    }
    &--color-44475A {
      color: #44475a;
    }
    &--color-6272A4 {
      color: #6272a4;
    }
    &--color-8BE9FD {
      color: #8be9fd;
    }
    &--color-50FA7B {
      color: #50fa7b;
    }
    &--color-FFB86C {
      color: #ffb86c;
    }
    &--color-FF79C6 {
      color: #ff79c6;
    }
    &--color-BD93F9 {
      color: #bd93f9;
    }
    &--color-FF5555 {
      color: #ff5555;
    }
    &--color-F1FA8C {
      color: #f1fa8c;
    }
  }
}

@media (max-width: 992px) {
  .prose {
    h2,
    h3 {
      > a {
        @apply ml-5;

        &::before {
          @apply opacity-100 -ml-5;
        }
      }
    }
  }
}
/* purgecss end ignore */
</style>
