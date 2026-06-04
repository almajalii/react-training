import * as Yup from 'yup';
import { ADDRESS_TYPES } from '../../constants/addressTypes';

// Mirrors the API address shape:
// { type, area, street, buildingName, apartmentNumber, floor, house, additionalDirections }
// `apartmentNumber` / `floor` only matter for apartments; `house` only for houses.
export const addressValidationSchema = (t) =>
  Yup.object({
    type: Yup.string()
      .oneOf([ADDRESS_TYPES.APARTMENT, ADDRESS_TYPES.HOUSE], t('addr_val_type_invalid'))
      .required(t('addr_val_type_required')),
    area: Yup.string().trim().required(t('addr_val_area_required')),
    street: Yup.string().trim().required(t('addr_val_street_required')),
    buildingName: Yup.string().trim().optional(),
    apartmentNumber: Yup.string()
      .trim()
      .when('type', {
        is: ADDRESS_TYPES.APARTMENT,
        then: (schema) => schema.required(t('addr_val_apartment_required')),
        otherwise: (schema) => schema.optional(),
      }),
    floor: Yup.string().trim().optional(),
    house: Yup.string().trim().optional(),
    additionalDirections: Yup.string().trim().optional(),
  });
