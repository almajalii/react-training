import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import search from '../../../../network/api/search/search'
import type { SearchService, SearchProfessional, SearchArea } from '../../../../types/search'

const DEBOUNCE_MS = 300
const MIN_QUERY_LENGTH = 2

export default function useServiceSearch() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [query])

  const trimmedQuery = debouncedQuery.trim()
  const shouldSearch = trimmedQuery.length >= MIN_QUERY_LENGTH

  const { data, isLoading } = useQuery({
    queryKey: ['search', trimmedQuery],
    queryFn: () => search(trimmedQuery),
    enabled: shouldSearch,
    staleTime: 60 * 1000,
  })

  const services: SearchService[] = data?.services ?? []
  const professionals: SearchProfessional[] = data?.professionals ?? []
  const areas: SearchArea[] = data?.areas ?? []
  const hasResults = services.length > 0 || professionals.length > 0 || areas.length > 0

  const pickService = (svc: SearchService) => {
    setIsOpen(false)
    navigate(`/service/${svc.id}`, {
      state: { serviceName: svc.name, categoryId: svc.categoryId, categoryName: svc.categoryName },
    })
  }

  const pickProfessional = (pro: SearchProfessional) => {
    setIsOpen(false)
    navigate(`/pro/${pro.id}`)
  }

  // Passes the area's display name via navigation state so AreaResults can
  // show a heading immediately without a second lookup request.
  const pickArea = (area: SearchArea) => {
    setIsOpen(false)
    navigate(`/area/${area.id}`, { state: { areaName: area.name } })
  }

  const openDropdown = () => setIsOpen(true)
  const closeDropdown = () => setIsOpen(false)

  return {
    query,
    setQuery,
    isOpen,
    openDropdown,
    closeDropdown,
    services,
    professionals,
    areas,
    hasResults,
    isLoading: isLoading && shouldSearch,
    shouldSearch,
    pickService,
    pickProfessional,
    pickArea,
  }
}
