/**
 * Filter chip options for the BrowseServices screen.
 * Screen-local; not reused elsewhere, so it lives next to useBrowseServices.
 */
export const RATING_OPTIONS = [3, 4, 4.5];
export const DISTANCE_OPTIONS = [1, 5, 15];
export const EXPERIENCE_OPTIONS = [1, 3, 5, 10];

export const EMPTY_FILTERS = {
  minRating: null,
  maxDistance: null,
  minExp: null,
};
