// Adapted from: https://stackoverflow.com/a/57051556
export function groupBy<T, K extends keyof any>(
  list: T[],
  getKey: (item: T) => K
) {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem)
    if (!previous[group]) previous[group] = []
    previous[group].push(currentItem)
    return previous
  }, {} as Record<K, T[]>)
}
