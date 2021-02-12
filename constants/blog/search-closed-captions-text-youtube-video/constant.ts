import type { ResponseDataWithPagination } from '~/types/blog/search-closed-captions-text-youtube-video'

export const MAXIMUM_AUTO_TYPE_INTERVAL = 15000
export const MAXIMUM_AUTO_TYPE_KEYWORD_INTERVAL = 250
export const MAXIMUM_TIMER_INTERVAL = MAXIMUM_AUTO_TYPE_INTERVAL / 1000
export const API_URL = 'https://cari-teks-video-api.vercel.app/api/search'
export const YOUTUBE_WATCH_URL = 'https://www.youtube.com/watch'

export const KEYWORD_LIST: Record<string, string[]> = {
  CWu29PRCUvQ: ['Revolution', 'Human', 'Species'], // "When Time Became History - The Human Era" by Kurzgesagt – In a Nutshell
  klnvttPfOUM: ['Web', 'Page', 'Great'], // "web.dev LIVE 2020: Day Three" by Google Chrome Developers
  QRt7LjqJ45k: ['Slow', 'Aging', 'Reverse'], // "How to Slow Aging (and even reverse it)" by Veritasium
  '2oVYQpbrQu4': ['SpaceX', 'Elon', 'Industry'], // "SpaceX: Revolutionizing the Space Industry" by Aperture
  'nx2-4l4s4Nw': ['Nuclear', 'Energy', 'Humanity'], // "Consumed by the Apocalypse" by LEMMiNO
  '0vdltv7kqU4': ['People', 'Drug', 'Micro'], // "Microdosing Psychedelics" by Freethink
  'okpg-lVWLbE': ['Student', 'Problem', 'Education'] // "6 Problems with our School System" by Next School
}

export const DEFAULT_RESULTS = {
  data: [],
  meta: {
    title: '',
    channelName: '',
    channelUrl: '',
    channelLogoUrl: ''
  },
  first: '',
  last: '',
  prev: '',
  next: '',
  total: 0,
  page: 0
} as ResponseDataWithPagination
