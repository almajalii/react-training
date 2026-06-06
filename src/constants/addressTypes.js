import { Building2, Home } from 'lucide-react';

// The API expects : "apartment" | "house".
export const ADDRESS_TYPES = Object.freeze({
  APARTMENT: 'apartment',
  HOUSE: 'house',
});

// The options for the address type dropdown, with icons and label keys for localization.
export const ADDRESS_TYPE_OPTIONS = [
  { id: ADDRESS_TYPES.APARTMENT, Icon: Building2, labelKey: 'addr_type_apartment' },
  { id: ADDRESS_TYPES.HOUSE, Icon: Home, labelKey: 'addr_type_house' },
];
