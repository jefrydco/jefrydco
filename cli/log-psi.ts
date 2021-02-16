import os from 'os'
import availableReports from '../psi-reports/available-reports.json'

const psiReports = require(`../psi-reports/${availableReports.latest}`)

process.stdout.write(`${JSON.stringify(psiReports, null, 2)}${os.EOL}`)
