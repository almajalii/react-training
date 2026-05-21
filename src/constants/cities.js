export const CITIES = [
  { id: 1, name: 'Amman', nameAr: 'عمّان' },
  { id: 2, name: 'Irbid', nameAr: 'إربد' },
  { id: 3, name: 'Zarqa', nameAr: 'الزرقاء' },
  { id: 4, name: 'Aqaba', nameAr: 'العقبة' },
];

export const getCityById = (id) => CITIES.find((c) => c.id === id) ?? null;
