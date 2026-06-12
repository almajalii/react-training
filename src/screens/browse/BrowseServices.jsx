import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import BrowseFilters from '../../components/organisms/Browse/browseFilters/BrowseFilters'
import BrowsePageHeader from '../../components/organisms/Browse/BrowsePageHeader/BrowsePageHeader'
import BrowseResults from '../../components/organisms/Browse/browseResults/BrowseResults'
import Footer from '../../components/organisms/footer/Footer'
import Header from '../../components/organisms/header/Header'
import { EMPTY_FILTERS } from './browseFiltersConstants'
import { useBrowseServices } from './useBrowseServices'

export default function BrowseServices() {
  const { categoryId: categorySlug } = useParams()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const { professionals, loading, isFetchingMore, hasMore, loadMore, totalCount } =
    useBrowseServices(categorySlug, filters)

  // Sentinel div for infinite scrolling.
  //place invisible div at bottom of results,
  //watched by IntersectionObserver that triggers loadMore when scrolled into view
  const sentinelRef = useRef(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore()
        //true when sentinel is visible, triggering loadMore to fetch next page
      },
      { threshold: 0.1 } //triggers when 10% of the div is visible
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <BrowsePageHeader categorySlug={categorySlug} />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        <BrowseFilters categorySlug={categorySlug} filters={filters} onChange={setFilters} />
        <div>
          <BrowseResults professionals={professionals} loading={loading} totalCount={totalCount} />

          {/* Invisible sentinel — triggers loadMore when scrolled into view */}
          <div ref={sentinelRef} className="h-4" />

          {/* Bottom spinner — shows while next page is loading */}
          {isFetchingMore && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand" />
            </div>
          )}

          {/* End of results */}
          {!hasMore && professionals.length > 0 && !loading && (
            <p className="text-center text-muted text-sm py-6">You've seen all professionals</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
