import type { VueConstructor } from 'vue'

export function useDate(vm: InstanceType<VueConstructor>) {
  return (date: string) => {
    if (!date) {
      return ''
    }
    const locale = vm?.$i18n.locale || 'id-ID'
    return new Date(date).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }
}
