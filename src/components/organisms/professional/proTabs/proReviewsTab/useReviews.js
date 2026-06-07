import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../../../../../network/api/reviews';
//only runs when reviews tab is active.
const useReviews = (professionalId) => {
  //fetch reviews.
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews', professionalId],
    queryFn: async () => {
      const res = await getReviews(professionalId);
      return Array.isArray(res) ? res : (res?.data ?? []);
    },
    //only run when pro is available.
    enabled: !!professionalId,
  });
  return { reviews, isLoading };
};

export default useReviews;
