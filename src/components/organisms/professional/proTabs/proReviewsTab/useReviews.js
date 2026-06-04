import { useQuery } from '@tanstack/react-query';
import { getReviews } from '../../../../../network/api/reviews';

const useReviews = (professionalId) => {
  const { data: reviews = [], isLoading } = useQuery({
    //default value for reviews is an empty array to prevent undefined errors
    queryKey: ['reviews', professionalId], //cache key to identify the query
    queryFn: async () => {
      const res = await getReviews(professionalId);
      return Array.isArray(res) ? res : (res?.data ?? []);
    },
    enabled: !!professionalId, //prevent the query from running if professionalId is not provided
  });

  return { reviews, isLoading };
};

export default useReviews;
