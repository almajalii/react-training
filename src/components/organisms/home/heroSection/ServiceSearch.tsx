import { useRef, useEffect } from 'react'
import { Search, Star, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
// @ts-expect-error
import { gfx } from '../../../../styles/themeColors'
// @ts-expect-error
import ProAvatar from '../../../atoms/proAvatar/ProAvatar'
import useServiceSearch from './useServiceSearch'
import type { SearchService, SearchProfessional, SearchArea } from '../../../../types/search'

// Bolds the substring of `text` that matches `query`, case-insensitive.
function highlightMatch(text: string, query: string) {
  if (!query) return text
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i === -1) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="font-bold text-brand">{text.slice(i, i + query.length)}</span>
      {text.slice(i + query.length)}
    </>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-4 pt-4 pb-2 text-[12px] font-bold uppercase tracking-wider text-faint">{children}</div>
}

export default function ServiceSearch() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const wrapRef = useRef<HTMLDivElement>(null)

  const {
    query,
    setQuery,
    isOpen,
    openDropdown,
    closeDropdown,
    services,
    professionals,
    areas,
    hasResults,
    isLoading,
    shouldSearch,
    pickService,
    pickProfessional,
    pickArea,
  } = useServiceSearch()

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) closeDropdown()
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen, closeDropdown])

  return (
    <div className="relative w-full max-w-4xl" ref={wrapRef}>
      <div
        className={`flex items-center gap-3.5 px-5 h-15 rounded-2xl border-[1.5px] bg-surface transition-all
          ${isOpen ? 'border-brand ring-2 ring-focus' : 'border-line hover:border-brand-soft'}`}
      >
        <Search size={20} className="text-muted shrink-0" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={openDropdown}
          placeholder={t('hero_search_placeholder') ?? 'What do you need fixed? Or search an area…'}
          className="flex-1 bg-transparent outline-none text-[16px] text-ink placeholder:text-faint"
        />
      </div>

      {isOpen && shouldSearch && (
        <div className={`${gfx.cardLg} absolute left-0 right-0 mt-3 z-20 max-h-128 overflow-y-auto py-2 shadow-xl`}>
          {isLoading && (
            <div className="flex items-center justify-center gap-2 px-4 py-8 text-muted">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand" />
              <span className="text-[14.5px]">{t('hero_search_loading') ?? 'Searching…'}</span>
            </div>
          )}

          {!isLoading && !hasResults && (
            <p className="text-[14.5px] text-muted px-4 py-8 text-center">
              {t('hero_search_no_results') ?? `No matches for "${query}"`}
            </p>
          )}

          {!isLoading && areas.length > 0 && (
            <>
              <SectionLabel>{t('hero_search_areas') ?? 'Areas'}</SectionLabel>
              {areas.map((area: SearchArea) => (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => pickArea(area)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-page-2 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-tint flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-brand" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-ink">
                      {highlightMatch(isAr && area.nameAr ? area.nameAr : area.name, query)}
                    </div>
                    <div className="text-[13px] text-muted mt-0.5">
                      {t('hero_search_view_pros') ?? 'View professionals in this area'}
                    </div>
                  </div>
                </button>
              ))}
            </>
          )}

          {!isLoading && services.length > 0 && (
            <>
              <SectionLabel>{t('hero_search_services') ?? 'Services'}</SectionLabel>
              {services.map((svc: SearchService) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => pickService(svc)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-page-2 transition-colors text-left"
                >
                  <span className="text-[15px] text-ink font-medium">
                    {highlightMatch(isAr && svc.nameAr ? svc.nameAr : svc.name, query)}
                  </span>
                  <span className="text-[13px] text-muted shrink-0 font-mono">
                    {svc.availableProfessionalCount} {t('browse_pros_available') ?? 'pros available'}
                  </span>
                </button>
              ))}
            </>
          )}

          {!isLoading && professionals.length > 0 && (
            <>
              <SectionLabel>{t('hero_search_professionals') ?? 'Professionals'}</SectionLabel>
              {professionals.map((pro: SearchProfessional, i: number) => (
                <button
                  key={pro.id}
                  type="button"
                  onClick={() => pickProfessional(pro)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-page-2 transition-colors text-left"
                >
                  <ProAvatar name={pro.name} imageUrl={pro.profileImageUrl} index={i} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-ink truncate">{highlightMatch(pro.name, query)}</div>
                    <div className="text-[13px] text-muted">
                      {isAr && pro.categoryAr ? pro.categoryAr : pro.category}
                    </div>
                  </div>
                  {pro.rating != null && (
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={13} className="text-brand fill-brand" />
                      <span className="text-[13.5px] font-semibold text-ink">{pro.rating.toFixed(1)}</span>
                    </div>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
