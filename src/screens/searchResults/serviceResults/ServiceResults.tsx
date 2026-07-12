import { useTranslation } from 'react-i18next'
import ResultsLayout from '../../../components/organisms/searchResultsLayout/ResultsLayout'
import useServiceResults from './useServiceResults'

export default function ServiceResults() {
  const { t } = useTranslation()
  const { serviceName, professionals, isLoading, totalCount } = useServiceResults()

  const heading = serviceName
    ? t('service_results_pros_for', { service: serviceName })
    : t('service_results_generic_heading')
  const subtitle = isLoading ? (
    t('service_results_loading')
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
