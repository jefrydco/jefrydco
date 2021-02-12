export type SetTimeoutReturnType = ReturnType<typeof setTimeout>

export type Vtt = {
  id?: number
  start: number
  end: number
  text: string
}

export enum PaginationUrlType {
  First,
  Last,
  Prev,
  Next
}

export type VideoMeta = {
  title: string
  channelName: string
  channelUrl: string
  channelLogoUrl: string
}

export type ResponseData = {
  data: Vtt[]
  meta: VideoMeta
}

export type ResponseDataWithPagination = ResponseData & {
  first: string
  last: string
  prev: string
  next: string
  total: number
  page: number
}

export type ResponseDataFormatterOptions = {
  url?: string
  page?: number
  size?: number
  dataLength?: number
  meta: VideoMeta
}

export type ResponseDataType = ResponseData | ResponseDataWithPagination

export type VttWithMeta = {
  data: Vtt[]
  meta: VideoMeta
}

export type TimedTextReturns = {
  timedText: string
  meta: VideoMeta
}

export type SearchOptions = {
  url: boolean
}

export type ResetOptions = {
  isToggling?: boolean
  isReRun?: boolean
}
