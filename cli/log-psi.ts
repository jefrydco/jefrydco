const os = require('os')

const availableReports = require('../psi-reports/available-reports.json')
const psiReports = require(`../psi-reports/${availableReports.latest}`)
process.stdout.write(`${JSON.stringify(psiReports, null, 2)}${os.EOL}`)
