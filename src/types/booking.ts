export type BookingStatus =
  | 'Pending'
  | 'Accepted'
  | 'OnTheWay'
  | 'Arrived'
  | 'InProgress'
  | 'Completed'
  | 'Cancelled'
  | 'Declined'

export interface Booking {
  id: string
  status: BookingStatus
  ref?: string
  professionalId: string
  professionalName: string
  professionalImageUrl?: string
  professionalRole?: string
  serviceName: string
  serviceNameAr?: string
  servicePrice: number
  scheduledDate: string
  scheduledTime: string
  address: string
  description?: string
  imageUrls?: string[]
  updatedAt?: string
}
export interface NewBooking {
  professionalId: string
  serviceName: string
  serviceNameAr?: string
  servicePrice: string
  scheduledDate: string
  scheduledTime: string
  address: string
  description: string
  imageUrls: string[]
}

export interface BookingFormValues {
  serviceName: string
  serviceNameAr: string
  servicePrice: string
  scheduledDate: string
  scheduledTime: string
  address: string
  addressId: string
  description: string
}

export interface BookingProService {
  serviceId: number
  name: string
  nameAr?: string
  minPrice?: number
  maxPrice?: number
}

export interface WorkingHour {
  day: string
  openTime: string
  closeTime: string
}

export interface BookingPro {
  id: string
  name: string
  category: string
  categoryAr?: string
  profileImageUrl?: string
  services?: BookingProService[]
  workingHours?: WorkingHour[]
}

export interface DateSlot {
  iso: string
  label: string
  num: number
  month: string
  fullDay: string
}

export interface SavedAddress {
  id: string
  area: string
  street: string
  buildingName: string
  apartmentNumber?: string
}
