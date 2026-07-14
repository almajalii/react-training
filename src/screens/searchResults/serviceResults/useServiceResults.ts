import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// @ts-expect-error
import { getPagedProfessionals } from '../../../network/api'
import type { Professional } from '../../../types/professional'

interface ServiceNavState {
  serviceName?: string
  categoryId?: number
  categoryName?: string
}

export default function useServiceResults() {
  const { serviceId } = useParams<{ serviceId: string }>()
  const location = useLocation()
  const state = (location.state as ServiceNavState | null) ?? {}
  const numericServiceId = Number(serviceId)

  // Backend only filters professionals by category, not by an exact service.
  // But each professional's own `services[]` array carries a `serviceId`, so
  // we fetch the category (the widest available filter) and narrow down
  // client-side to only pros who actually offer this exact service.
  const { data: pageData, isLoading } = useQuery({
    queryKey: ['professionals-paged', state.categoryId, 1],
    queryFn: async () => {
      const res = await getPagedProfessionals({ categoryId: state.categoryId, page: 1, pageSize: 50 })
      const p = res?.data ?? res
      return p?.items ?? []
    },
    enabled: state.categoryId != null,
  })

  const allInCategory: Professional[] = pageData ?? []
  const professionals = allInCategory.filter(pro => pro.services?.some(s => s.serviceId === numericServiceId))

  return {
    serviceName: state.serviceName ?? null,
    categoryName: state.categoryName ?? null,
    professionals,
    isLoading,
    totalCount: professionals.length,
  }
}
