import { useTranslation } from 'react-i18next'
import ResultsLayout from '../../../components/organisms/searchResultsLayout/ResultsLayout'
import useAreaResults from './useAreaResults'

export default function AreaResults() {
  const { t } = useTranslation()
  const { professionals, isLoading, areaName, totalCount } = useAreaResults()

  const heading = areaName ? t('area_results_pros_in', { area: areaName }) : t('area_results_generic_heading')
  const subtitle = isLoading ? (
    t('area_results_loading')
  ) : (
    <>
      <span className="font-semibold text-ink">{totalCount}</span> {t('browse_pros_available')}
    </>
  )

  return (
    <ResultsLayout
      heading={heading}
      subtitle={subtitle}
      professionals={professionals}
      isLoading={isLoading}
      totalCount={totalCount}
    />
  )
}
