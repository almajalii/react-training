import * as Yup from 'yup';
import { ADDRESS_TYPES } from '../../constants/addressTypes';

// Changed from arrow shorthand to block body with curly braces + explicit return
export const addressValidationSchema = (t) => {
  if (!t) throw new Error('addressValidationSchema requires a translation function');

  return Yup.object({
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
        then: (schema) =>
          schema.required(t('addr_val_apartment_required')).matches(/^\d+$/, t('addr_val_apartment_numbers_only')),
        otherwise: (schema) => schema.optional(),
      }),

    floor: Yup.string().trim().matches(/^\d*$/, t('addr_val_floor_numbers_only')).optional(),

    house: Yup.string().trim().optional(),
    additionalDirections: Yup.string().trim().optional(),
  });
};
