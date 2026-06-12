import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPaginatedReviews } from '../../../../../network/api/reviews'
//only runs when reviews tab is active.
const PAGE_SIZE = 5

const useReviews = professionalId => {
  const [page, setPage] = useState(1)
  //fetch reviews.
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', professionalId, page],
    queryFn: async () => {
      const res = await getPaginatedReviews(professionalId, page, PAGE_SIZE)
      return res?.data ?? res
    },

    enabled: !!professionalId,
    keepPreviousData: true,
  })

  return {
    reviews: reviews?.items ?? [],
    totalPages: reviews?.totalPages ?? 1,
    page,
    setPage,
    isLoading,
  }
}

export default useReviews
