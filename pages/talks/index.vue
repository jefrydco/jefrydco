<template>
  <main id="talks-index">
    <app-profile class="my-12" />
    <app-talks-section
      v-for="(yearItem, i) in talkListByYear"
      :key="i"
      :open="i === 0"
      :title="yearItem.year"
    >
      <section class="talks__item">
        <app-talks-item
          v-for="talk in yearItem.list"
          :key="talk.slug"
          :img="talk.poster"
          :title="talk.title"
          :slug="talk.slug"
          :start-date="talk.startDate"
          :end-date="talk.endDate"
        ></app-talks-item>
      </section>
    </app-talks-section>
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupBy } from '~/utils'

import { HOSTNAME } from '~/constants'

import type { TalksYearItemType, TalksDataType } from '~/types/talks'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ app }) {
    const { locale } = app.i18n

    // @ts-expect-error
    const talkList = await app
      .$content(`/talks/${locale}`, { deep: true })
      .sortBy('startDate', 'desc')
      .fetch<TalksDataType[]>()

    const talkListByYear = Object.entries(
      groupBy<TalksDataType, number>(talkList, (item) =>
        new Date(item.startDate).getFullYear()
      )
    )
      .map(
        ([key, value]) =>
          ({
            year: key,
            list: value
          } as TalksYearItemType)
      )
      .sort((a, z) => parseInt(z.year) - parseInt(a.year))

    return {
      talkListByYear
    }
  },
  data() {
    return {
      talkListByYear: [] as TalksYearItemType[]
    }
  },
  head() {
    return {
      title: 'Talks',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'talks' })}/`
        }
      ],
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.localePath({ name: 'talks-amp' })}/`
        }
      ]
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.talks-index {
  @apply mb-12 mx-4 max-w-3xl rounded overflow-hidden shadow relative;
}

.talks__item {
  @apply mx-4 grid grid-cols-1 md:grid-cols-2 gap-3;
}
/* purgecss end ignore */
</style>
