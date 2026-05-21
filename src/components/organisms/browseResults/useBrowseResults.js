import { useTranslation } from 'react-i18next';

export function useBrowseResults() {
  const { t } = useTranslation();
  const SKELETON_COUNT = 6;
  return { t, SKELETON_COUNT };
}
