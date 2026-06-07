import { Wrench, Zap, Snowflake, Hammer, Paintbrush2, SprayCan, PackageOpen, Plug } from 'lucide-react';

// Maps backend category names to Lucide icon components.
export const CATEGORY_ICON_MAP = {
  plumbing: Wrench,
  'electrical work': Zap,
  'ac repair': Snowflake,
  carpentry: Hammer,
  painting: Paintbrush2,
  cleaning: SprayCan,
  'moving services': PackageOpen,
  'appliance repair': Plug,
};

// Returns the Lucide icon component for a given category name, or a default if not found.
export const getIconForCategory = (name = '') => CATEGORY_ICON_MAP[name.toLowerCase().trim()] ?? Wrench;

// Maps URL-friendly slugs to backend category IDs (for building API requests from URLs).
export const CATEGORY_SLUG_TO_ID = {
  plumbing: 1,
  electrical: 2,
  ac: 3,
  carpentry: 4,
  painting: 5,
  cleaning: 6,
  moving: 7,
  appliance: 8,
};

// Inverse mapping of CATEGORY_SLUG_TO_ID for converting backend category IDs to URL slugs.
export const CATEGORY_ID_TO_SLUG = Object.fromEntries(
  Object.entries(CATEGORY_SLUG_TO_ID).map(([slug, id]) => [id, slug]),
);

// Frontend-only descriptions keyed by backend category ID.
// The backend Category model has no description field — these live here.
export const CATEGORY_DESCRIPTIONS = {
  1: 'Expert solutions for leaks, pipe installations, and faucet repairs.',
  2: 'Expert solutions for wiring, circuit repairs, and light fixture installations.',
  3: 'Expert solutions for unit maintenance, cooling issues, and professional cleaning.',
  4: 'Expert solutions for furniture assembly, door repairs, and custom woodwork.',
  5: 'Expert solutions for interior walls, exterior finishes, and ceiling touch-ups.',
  6: 'Expert solutions for deep home cleaning, sanitization, and professional tidying.',
  7: 'Expert solutions for secure packing, heavy furniture transport, and efficient unloading.',
  8: 'Expert solutions for refrigerators, washing machines, and kitchen appliances.',
};

export const CATEGORY_DESCRIPTIONS_AR = {
  1: 'حلول متخصصة للتسربات وتركيب الأنابيب وإصلاح الصنابير.',
  2: 'حلول متخصصة للتمديدات الكهربائية وإصلاح الدوائر وتركيب الإضاءة.',
  3: 'حلول متخصصة لصيانة الوحدات ومشاكل التبريد والتنظيف الاحترافي.',
  4: 'حلول متخصصة لتركيب الأثاث وإصلاح الأبواب والأعمال الخشبية المخصصة.',
  5: 'حلول متخصصة للجدران الداخلية والواجهات الخارجية وتجديد الأسقف.',
  6: 'حلول متخصصة للتنظيف العميق والتعقيم والترتيب الاحترافي.',
  7: 'حلول متخصصة للتغليف الآمن ونقل الأثاث الثقيل والتفريغ الفعّال.',
  8: 'حلول متخصصة للثلاجات والغسالات والأجهزة المنزلية.',
};
