import type { NuxtVueI18n } from 'nuxt-i18n'

export const HOSTNAME = 'https://jefrydco.id'

export const locales: NuxtVueI18n.Options.LocaleObject[] = [
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
