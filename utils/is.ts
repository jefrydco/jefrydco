export function isExists(obj: unknown) {
  return obj !== null && typeof obj !== 'undefined'
}

export function isNotEmptyString(string: string) {
  return typeof string === 'string' && string.length > 0
}
