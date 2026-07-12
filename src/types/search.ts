// Types for the unified search feature (GET /search).
// Confirmed against the Flutter app's SearchRemoteDataSourceImpl for `services`.
// `professionals` shape is assumed from ProCard/useProCard (same ProfessionalModel
// reused for both search and by-area lookups per the Flutter source) — not yet
// verified against a real /search response, since search results may be trimmed
// compared to full browse listings.

export interface SearchService {
  id: number
  name: string
  nameAr?: string | null
  categoryId: number
  categoryName: string
  availableProfessionalCount: number
}

export interface SearchProfessional {
  id: string
  name: string
  profileImageUrl?: string
  category: string
  categoryAr?: string
  rating?: number
  reviewCount?: number
  isVerified?: boolean
  experienceYears?: number
}

// Not used by ServiceSearch (address/area picker is out of scope), but the API
// returns it regardless, so it's typed for completeness rather than left as `any`.
export interface SearchArea {
  id: number
  name: string
  nameAr?: string
  cityId?: number
}

export interface SearchResults {
  professionals: SearchProfessional[]
  areas: SearchArea[]
  services: SearchService[]
}
