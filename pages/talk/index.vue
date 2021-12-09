<template>
  <main id="talk-index">
    <app-profile class="my-12" />
    <app-talk-section
      v-for="(yearItem, i) in talkListByYear"
      :key="i"
      :open="i === 0"
      :title="talkSectionTitle(yearItem.year, yearItem.list.length)"
    >
      <section class="talks__item">
        <app-talk-item
          v-for="talk in yearItem.list"
          :key="talk.slug"
          :img="talk.poster"
          :title="talk.title"
          :slug="talk.slug"
          :start-date="talk.startDate"
          :end-date="talk.endDate"
        ></app-talk-item>
      </section>
    </app-talk-section>
    <app-to-top />
    <app-scroll-indicator />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { groupBy } from '~/utils'

import { HOSTNAME } from '~/constants'

import type { TalkYearItemType, TalkDataType } from '~/types/talk'

export default Vue.extend({
  // @ts-ignore
  async asyncData({ app }) {
    const { locale } = app.i18n

    const talkList: TalkDataType[] = await app
      .$content(`/talk/${locale}`, { deep: true })
      .sortBy('startDate', 'desc')
      .fetch()

    const talkListByYear = Object.entries(
      groupBy<TalkDataType, number>(talkList, (item) =>
        new Date(item.startDate).getFullYear()
      )
    )
      .map(
        ([key, value]) =>
          ({
            year: key,
            list: value
          } as TalkYearItemType)
      )
      .sort((a, z) => parseInt(z.year, 10) - parseInt(a.year, 10))

    return {
      talkListByYear
    }
  },
  data() {
    return {
      // eslint-disable-next-line
      talkListByYear: [] as TalkYearItemType[]
    }
  },
  head() {
    return {
      title: 'Talk',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: `${HOSTNAME}${this.localePath({ name: 'talk' })}/`
        }
      ],
      link: [
        {
          rel: 'amphtml',
          href: `${HOSTNAME}${this.localePath({ name: 'talk-amp' })}/`
        }
      ]
    }
  },
  computed: {
    talkSectionTitle() {
      return (year: string, talkCount: number) =>
        `${year} (${this.$tc('talk', talkCount, { count: talkCount })})`
    }
  }
})
</script>

<style lang="postcss">
/* purgecss start ignore */
.talk-index {
  @apply mb-12 mx-4 max-w-3xl rounded overflow-hidden shadow relative;
}

.talks__item {
  @apply mx-4 grid grid-cols-1 md:grid-cols-2 gap-3;
}
/* purgecss end ignore */
</style>

<i18n>
{
  "en": {
    "talk": "1 talk | {count} talks"
  },
  "id": {
    "talk": "1 talk | {count} talks"
  }
}
</i18n>
