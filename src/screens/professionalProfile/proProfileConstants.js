export const PRO_PROFILE_TABS = [
  { key: 'about', labelKey: 'pro_about' },
  { key: 'services', labelKey: 'pro_services' },
  { key: 'reviews', labelKey: 'pro_reviews' },
];
//maps through them to get the translated label for each tab using the provided translation function `t`.
export const buildProTabs = (t) =>
  PRO_PROFILE_TABS.map(({ key, labelKey }) => ({ key, label: t(labelKey) }));
