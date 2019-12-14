export default {
  computed: {
    formatDate() {
      return (date) => {
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
    }
  }
}
