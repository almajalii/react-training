import type { ReactNode } from 'react'
// @ts-expect-error
import Header from '../header/Header'
// @ts-expect-error
import Footer from '../footer/Footer'
// @ts-expect-error
import BrowseResults from '../browse/browseResults/BrowseResults'
import type { Professional } from '../../../types/professional'

interface ResultsLayoutProps {
  heading: string
  subtitle: ReactNode
  professionals: Professional[]
  isLoading: boolean
  totalCount: number
}

// Shared shell for any "list of professionals under a heading" screen —
// currently used by both AreaResults and ServiceResults, which were
// otherwise identical JSX with only the heading/data source differing.
export default function ResultsLayout({ heading, subtitle, professionals, isLoading, totalCount }: ResultsLayoutProps) {
  return (
    <div className="min-h-screen bg-page">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-[28px] font-extrabold text-ink tracking-tight mb-1">{heading}</h1>
        <p className="text-muted text-[15px] mb-8">{subtitle}</p>

        <BrowseResults professionals={professionals} loading={isLoading} totalCount={totalCount} />
      </div>

      <Footer />
    </div>
  )
}
