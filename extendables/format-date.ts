import Vue from 'vue'

export default Vue.extend({
  computed: {
    formatDate() {
      return (date: string) => {
        if (!date) {
          return ''
        }
        const locale = this.$i18n.locale || 'id-ID'
        return new Date(date).toLocaleDateString(locale, {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      }
    },
    formatTime() {
      return (date: string) => {
        if (!date) {
          return ''
        }
        const locale = this.$i18n.locale || 'id-ID'
        return new Date(date).toLocaleTimeString(locale, {
          hour12: true,
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    }
  }
})
