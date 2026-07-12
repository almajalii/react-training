// Shape used wherever a full professional listing is shown (ProCard, Browse
// results, Area results). Derived from actual usage in ProCard.jsx / useProCard.js
// — not yet formally typed anywhere else in the codebase, so this is the first
// pass. Fields marked optional match how ProCard already guards them (`pro.rating != null`, etc.)

export interface ProfessionalServiceArea {
  cityId: number
}

export interface ProfessionalService {
  serviceId: number
  name: string
  nameAr?: string | null
  minPrice: number | null
  maxPrice: number | null
}

export interface Professional {
  id: string
  name: string
  profileImageUrl?: string
  category: string
  categoryAr?: string
  experienceYears?: number
  rating?: number
  reviewCount?: number
  isVerified?: boolean
  isAvailable?: boolean
  serviceAreas?: ProfessionalServiceArea[]
  services?: ProfessionalService[]
}
