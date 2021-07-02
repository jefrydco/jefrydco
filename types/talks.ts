import type { ReadingTimeType } from './reading-time'

export type TalksDataType = {
  title: string
  description: string
  poster: string
  slide: string
  playback: string
  sourceCode: string
  writeUp: string
  startDate: string
  endDate: string
  dir: string
  body: Record<string, unknown>
  readingTime: ReadingTimeType
}

export type TalksYearItemType = {
  year: string
  list: TalksDataType[]
}
