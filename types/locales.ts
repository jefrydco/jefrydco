import VueI18n from 'vue-i18n'

export enum Locales {
  en = 'en',
  id = 'id'
}

export type LocalesType = {
  [key in keyof typeof Locales]: VueI18n.LocaleMessage
}
