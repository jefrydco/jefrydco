import type { ReadingTimeType } from './reading-time'

export type TalkDataType = {
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

export type TalkYearItemType = {
  year: string
  list: TalkDataType[]
}
