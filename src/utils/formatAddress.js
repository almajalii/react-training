export const formatAddressLine = (addr, t) => {
  //safety check
  if (!addr || !t) return '';
  //fields that are always present: street and buildingName
  const parts = [addr.street, addr.buildingName];
  if (addr.apartmentNumber) parts.push(`${t('addr_apt_short')} ${addr.apartmentNumber}`);
  if (addr.floor) parts.push(`${t('addr_floor_short')} ${addr.floor}`);
  if (addr.house) parts.push(addr.house);
  return parts.filter(Boolean).join(', ');
};
