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
  <footer id="pagination" class="pagination">
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
    <app-rss-link :link="rssLink"></app-rss-link>
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
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import AppRssLink from '~/components/AppRssLink.vue'

export default Vue.extend({
  components: {
    AppRssLink
  },
  props: {
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

  &__link {
    &--disabled {
      @apply cursor-not-allowed opacity-50 pointer-events-none;
    }
  }
}
</style>
