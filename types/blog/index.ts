import type { ReadingTimeType } from '../reading-time'
import type { TocType } from '../toc'

export type BlogDataType = {
  body: Record<string, unknown>
  createdAt: string
  description: string
  dir: string
  extraComponents: string[]
  id: string
  img: string
  imgCreator: string
  path: string
  postedDate: string
  readingTime: ReadingTimeType
  slug: string
  summary: string
  title: string
  toc: TocType
  updatedAt: string
  updatedDate: string
  contributors: string[]
}

export type BlogListDataType = Pick<
  BlogDataType,
  | 'img'
  | 'title'
  | 'description'
  | 'summary'
  | 'postedDate'
  | 'updatedDate'
  | 'slug'
  | 'readingTime'
>[]
