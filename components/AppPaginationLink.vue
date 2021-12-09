<i18n>
{
  "en": {
    "page": "Page",
    "prev": "Previous @:page",
    "next": "Next @:page"
  },
  "id": {
    "page": "Halaman",
    "prev": "@:page Sebelumnya",
    "next": "@:page Berikutnya"
  }
}
</i18n>

<template>
  <footer
    id="pagination"
    class="pagination"
    :class="{ 'pagination--rss-only': !isPaginated }"
  >
    <template v-if="isPaginated">
      <nuxt-link v-if="prevLink" :to="prevLink" class="pagination__link">
        {{ $t('prev') }}
      </nuxt-link>
      <a
        v-else
        href=""
        aria-disabled="true"
        class="pagination__link pagination__link--disabled"
        @click="preventDefault"
        @keydown.space.enter="preventDefault"
      >
        {{ $t('prev') }}
      </a>
    </template>
    <app-rss-link :link="rssLink"></app-rss-link>
    <template v-if="isPaginated">
      <nuxt-link v-if="nextLink" :to="nextLink" class="pagination__link">
        {{ $t('next') }}
      </nuxt-link>
      <a
        v-else
        href=""
        aria-disabled="true"
        class="pagination__link pagination__link--disabled"
        @click="preventDefault"
        @keydown.space.enter="preventDefault"
      >
        {{ $t('next') }}
      </a>
    </template>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isPaginated: {
      type: Boolean,
      default: true
    },
    prevLink: {
      type: String,
      default: ''
    },
    nextLink: {
      type: String,
      default: ''
    },
    rssLink: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    preventDefault($event: Event) {
      $event.preventDefault()
    }
  }
})
</script>

<style lang="postcss">
.pagination {
  @apply my-12 mx-4 flex flex-wrap justify-between content-center;

  &--rss-only {
    @apply justify-center;
  }

  &__link {
    @apply mb-3;

    &--disabled {
      @apply cursor-not-allowed opacity-50 pointer-events-none;
    }
  }
}
</style>
