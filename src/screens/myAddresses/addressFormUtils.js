import { ADDRESS_TYPES } from '../../constants/addressTypes';
// Utility function to build the address payload for API requests
export const buildAddressPayload = (values, isEdit, address) => {
  const isApartment = values.type === ADDRESS_TYPES.APARTMENT;
  return {
    type: values.type,
    area: values.area.trim(),
    street: values.street.trim(),
    buildingName: values.buildingName.trim(),
    apartmentNumber: isApartment ? values.apartmentNumber.trim() : '',
    floor: isApartment ? values.floor.trim() : '',
    house: isApartment ? '' : values.house.trim(),
    additionalDirections: values.additionalDirections.trim(),
    latitude: values.latitude,
    longitude: values.longitude,
    ...(isEdit && address ? { id: address.id, isDefault: address.isDefault } : {}),
  };
};
