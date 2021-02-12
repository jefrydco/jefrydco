const os = require('os')

function formatDate(date: Date) {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  let day = '' + d.getDate()
  const year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}
const psiReports = require(`../psi-reports/report-${formatDate(
  new Date()
)}.json`)
process.stdout.write(`${JSON.stringify(psiReports, null, 2)}${os.EOL}`)
