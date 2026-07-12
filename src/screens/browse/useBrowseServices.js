import { useState, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getPagedProfessionals, filterProfessionals } from '../../network/api'
import { CATEGORY_SLUG_TO_ID } from '../../constants/categories'

const PAGE_SIZE = 10
//cache key format: ['professionals-paged', 'categorySlug|filtersAsJson', page]
export const profPageKey = (contextKey, page) => ['professionals-paged', contextKey, page]

export function useBrowseServices(categorySlug, filters) {
  const [page, setPage] = useState(1)
  const queryClient = useQueryClient()
  // Derive categoryId and whether any filters are active from the inputs
  const categoryId = categorySlug ? CATEGORY_SLUG_TO_ID[categorySlug] : undefined
  const hasActiveFilters =
    filters.minRating != null || filters.maxDistance != null || filters.minExp != null
  // Create a stable contextKey that changes whenever categorySlug or filters change
  const contextKey = `${categorySlug ?? ''}|${JSON.stringify(filters)}`

  const {
    data: pageData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: profPageKey(contextKey, page),
    queryFn: async () => {
      const res = hasActiveFilters
        ? await filterProfessionals({
            categoryId,
            minRating: filters.minRating ?? undefined,
            maxDistance: filters.maxDistance ?? undefined,
            minExp: filters.minExp ?? undefined,
            page,
            pageSize: PAGE_SIZE,
          })
        : await getPagedProfessionals({ categoryId, page, pageSize: PAGE_SIZE })
      const p = res?.data ?? res
      // returns { items: Professional[], totalCount: number, page: number, totalPages: number }
      return {
        items: p?.items ?? [],
        totalCount: p?.totalCount ?? 0,
        page: p?.page ?? page,
        totalPages: p?.totalPages ?? 1,
      }
    },
    placeholderData: prev => prev, // keep showing old data while loading new page
    staleTime: 5 * 60 * 1000, // 5 minutes — cache each page for a while to avoid refetching when user scrolls back up or toggles filters off and on
  })
  // Combine items from all loaded pages
  const professionals = (() => {
    const all = []
    const seen = new Set()
    for (let p = 1; p <= page; p++) {
      const cached = queryClient.getQueryData(profPageKey(contextKey, p))
      for (const pro of cached?.items ?? []) {
        if (!seen.has(pro.id)) {
          all.push(pro)
          seen.add(pro.id)
        }
      }
    }
    return all
  })()

  const totalCount = pageData?.totalCount ?? 0
  const hasMore = pageData ? pageData.page < pageData.totalPages : false

  const loadMore = useCallback(() => {
    if (!hasMore || isFetching) return
    setPage(p => p + 1)
  }, [hasMore, isFetching])

  const [prevContextKey, setPrevContextKey] = useState(contextKey)
  const isResetting = prevContextKey !== contextKey
  if (prevContextKey !== contextKey) {
    setPrevContextKey(contextKey)
    setPage(1)
  }

  return {
    professionals,
    loading: (isLoading && page === 1) || isResetting,
    isFetchingMore: isFetching && page > 1,
    hasMore,
    loadMore,
    totalCount,
  }
}
