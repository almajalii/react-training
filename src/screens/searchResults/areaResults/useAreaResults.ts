import { useParams, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import getProfessionalsByArea from '../../../network/api/search/getProfessionalsByArea'
import type { Professional } from '../../../types/professional'

export default function useAreaResults() {
  const { areaId } = useParams<{ areaId: string }>()
  const location = useLocation()
  // Area name is passed via navigation state from ServiceSearch, so we don't
  // need a second request just to display a heading. Falls back to a generic
  // label if the page was reached directly by URL instead of by clicking.
  const areaName = (location.state as { areaName?: string } | null)?.areaName ?? null

  const numericAreaId = Number(areaId)

  const { data, isLoading } = useQuery({
    queryKey: ['professionals-by-area', numericAreaId],
    queryFn: () => getProfessionalsByArea({ areaId: numericAreaId }),
    enabled: !isNaN(numericAreaId),
  })

  const professionals: Professional[] = data ?? []

  return { professionals, isLoading, areaName, totalCount: professionals.length }
}
