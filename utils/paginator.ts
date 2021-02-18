import { MAXIMAL_BLOG_ITEM } from '../constants'
import type { BlogListDataType } from '../types/blog'

// Taken from: https://stackoverflow.com/a/42761393
export function paginator(
  array: BlogListDataType,
  pageNumber: number,
  pageSize: number = MAXIMAL_BLOG_ITEM
) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
}

export function getLastPage(
  arrayLength: number,
  pageSize: number = MAXIMAL_BLOG_ITEM
) {
  return Math.ceil(arrayLength / pageSize)
}

export function getPrevNextPage(currentpage: number, lastPage: number) {
  let nextPage: number | null = currentpage + 1
  let prevPage: number | null = currentpage - 1
  const isLastPage = nextPage > lastPage
  const isBeforeFirstPage = prevPage <= 1

  if (isLastPage) {
    nextPage = null
  }

  if (isBeforeFirstPage) {
    prevPage = null
  }

  return {
    nextPage,
    prevPage,
    isBeforeFirstPage,
    isLastPage
  }
}

export function getPageList(lastPage: number) {
  return Array.from({ length: lastPage - 1 }, (_, i) => i + 2)
}
