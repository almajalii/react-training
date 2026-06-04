// Address types — must match the backend contract.
// The API expects `type` as a plain string: "apartment" | "house".
// (See src/network/api/addresses/createAddress.js)
export const ADDRESS_TYPES = Object.freeze({
  APARTMENT: 'apartment',
  HOUSE: 'house',
});

// UI metadata for the type picker. `icon` is a lucide-react component name
// resolved in the form; labelKey / descKey are i18n keys.
export const ADDRESS_TYPE_OPTIONS = [
  { id: ADDRESS_TYPES.APARTMENT, icon: 'Building2', labelKey: 'addr_type_apartment' },
  { id: ADDRESS_TYPES.HOUSE, icon: 'Home', labelKey: 'addr_type_house' },
];
