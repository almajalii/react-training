import {
  Wrench,
  Zap,
  Snowflake,
  Hammer,
  Paintbrush2,
  SprayCan,
  PackageOpen,
  Plug,
} from 'lucide-react';

/**
 * Service-category metadata — single source of truth.
 * Used by CategorySection, BrowseFilters, BrowsePageHeader, and anywhere else
 * that needs to enumerate or look up categories.
 *
 * The numeric API id mapping lives in `screens/browse/useBrowseServices.js`
 * (CATEGORY_ID_MAP) — keep that file as the only place that knows the API
 * contract shape.
 */
export const CATEGORIES = [
  { slug: 'plumbing', Icon: Wrench, nameKey: 'category_plumbing', subKey: 'category_plumbing_sub' },
  {
    slug: 'electrical',
    Icon: Zap,
    nameKey: 'category_electrical',
    subKey: 'category_electrical_sub',
  },
  { slug: 'ac', Icon: Snowflake, nameKey: 'category_ac', subKey: 'category_ac_sub' },
  {
    slug: 'carpentry',
    Icon: Hammer,
    nameKey: 'category_carpentry',
    subKey: 'category_carpentry_sub',
  },
  {
    slug: 'painting',
    Icon: Paintbrush2,
    nameKey: 'category_painting',
    subKey: 'category_painting_sub',
  },
  {
    slug: 'cleaning',
    Icon: SprayCan,
    nameKey: 'category_cleaning',
    subKey: 'category_cleaning_sub',
  },
  { slug: 'moving', Icon: PackageOpen, nameKey: 'category_moving', subKey: 'category_moving_sub' },
  {
    slug: 'appliance',
    Icon: Plug,
    nameKey: 'category_appliance',
    subKey: 'category_appliance_sub',
  },
];

export const findCategoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug) || null;
