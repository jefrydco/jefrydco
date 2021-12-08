import type { LocaleObject } from '@nuxtjs/i18n'

export const HOSTNAME = 'https://jefrydco.id'

export const locales: LocaleObject[] = [
  {
    code: 'id',
    iso: 'id-ID',
    name: 'Bahasa Indonesia',
    file: 'id/index.ts'
  },
  {
    code: 'en',
    iso: 'en-US',
    name: 'English',
    file: 'en/index.ts'
  }
]

export const runtimeCachingList = [
  'https://ajax.cloudflare.com',
  'https://d33wubrfki0l68.cloudfront.net',
  'https://fonts.gstatic.com',
  'https://cdn.ampproject.org',
  'https://firestore.googleapis.com',
  'https://www.google.com',
  'https://www.gstatic.com',
  'https://i3.ytimg.com',
  'https://cari-teks-video-api.vercel.app',
  'https://platform.twitter.com'
]

export const MAXIMAL_BLOG_ITEM = 5
