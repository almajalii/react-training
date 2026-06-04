// Build a one-line, human-readable address from the API address shape.
// Mirrors the label logic used in the booking flow (BookingStep2 / useCreateBooking)
// so an address reads the same wherever it appears.
export const formatAddressLine = (addr, t) => {
  if (!addr) return '';
  const parts = [addr.street, addr.buildingName];
  if (addr.apartmentNumber) parts.push(`${t('addr_apt_short')} ${addr.apartmentNumber}`);
  if (addr.floor) parts.push(`${t('addr_floor_short')} ${addr.floor}`);
  if (addr.house) parts.push(addr.house);
  return parts.filter(Boolean).join(', ');
};
