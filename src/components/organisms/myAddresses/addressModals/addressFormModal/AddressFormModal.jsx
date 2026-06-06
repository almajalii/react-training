import { Button } from '@heroui/react';
import { useFormik } from 'formik';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import { ADDRESS_TYPES } from '../../../../../constants/addressTypes';
import { addressValidationSchema } from '../../../../../screens/myAddresses/addressValidationSchema';
import { buildAddressPayload } from '../../../../../screens/myAddresses/addressFormUtils';
import { gfx } from '../../../../../styles/themeColors';
import FormField from '../../../../molecules/formField/FormField';
import FormRow from '../../../../molecules/formRow/FormRow';
import MapPicker from '../../../../molecules/mapPicker/MapPicker';
import ModalShell from '../../../../molecules/modalShell/ModalShell';
import AddressTypePicker from '../../addressTypePicker/AddressTypePicker';

export default function AddressFormModal({ mode, address, t, onClose, onSave, isSaving }) {
  const isEdit = mode === 'edit';
  const validationSchema = useMemo(() => addressValidationSchema(t), [t]);

  const formik = useFormik({
    initialValues: {
      type: address?.type || ADDRESS_TYPES.APARTMENT,
      area: address?.area || '',
      street: address?.street || '',
      buildingName: address?.buildingName || '',
      apartmentNumber: address?.apartmentNumber || '',
      floor: address?.floor || '',
      house: address?.house || '',
      additionalDirections: address?.additionalDirections || '',
      latitude: address?.latitude ?? null,
      longitude: address?.longitude ?? null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!onSave) return;
      await onSave(buildAddressPayload(values, isEdit, address));
    },
  });

  const isApartment = formik.values.type === ADDRESS_TYPES.APARTMENT;

  return (
    <ModalShell onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-line">
        <h2 className="text-xl font-extrabold text-ink">{isEdit ? t('addr_edit_title') : t('addr_add_title')}</h2>
        <button type="button" onClick={onClose} className="text-muted hover:text-ink transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={formik.handleSubmit} className="px-6 py-5 overflow-y-auto">
        {/* Apartment / House picker */}
        <AddressTypePicker value={formik.values.type} onChange={(id) => formik.setFieldValue('type', id)} t={t} />

        {/* Area + Street */}
        <FormRow>
          <FormField
            label={t('addr_area')}
            name="area"
            placeholder={t('addr_area_placeholder')}
            value={formik.values.area}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.area}
            touched={formik.touched.area}
          />
          <FormField
            label={t('addr_street')}
            name="street"
            placeholder={t('addr_street_placeholder')}
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.street}
            touched={formik.touched.street}
          />
        </FormRow>

        {/* Building name */}
        <FormField
          label={t('addr_building')}
          name="buildingName"
          placeholder={t('addr_building_placeholder')}
          value={formik.values.buildingName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.buildingName}
          touched={formik.touched.buildingName}
        />

        {/* Apartment fields or House field — switches based on selected type */}
        {isApartment ? (
          <FormRow>
            <FormField
              label={t('addr_apartment')}
              name="apartmentNumber"
              placeholder={t('addr_apartment_placeholder')}
              value={formik.values.apartmentNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.apartmentNumber}
              touched={formik.touched.apartmentNumber}
            />
            <FormField
              label={t('addr_floor')}
              name="floor"
              placeholder={t('addr_floor_placeholder')}
              value={formik.values.floor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.floor}
              touched={formik.touched.floor}
            />
          </FormRow>
        ) : (
          <FormField
            label={t('addr_house')}
            name="house"
            placeholder={t('addr_house_placeholder')}
            value={formik.values.house}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.house}
            touched={formik.touched.house}
          />
        )}

        {/* Additional directions — optional */}
        <div className="mb-4">
          <label className={gfx.label}>
            {t('addr_directions')} <span className="text-faint font-normal">({t('addr_optional')})</span>
          </label>
          <textarea
            name="additionalDirections"
            rows={3}
            placeholder={t('addr_directions_placeholder')}
            value={formik.values.additionalDirections}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink
              text-sm placeholder:text-faint focus:border-brand focus:ring-2
              focus:ring-focus outline-none transition-all resize-none"
          />
        </div>

        {/* Map picker — updates latitude and longitude in formik */}
        <MapPicker
          lat={formik.values.latitude}
          lng={formik.values.longitude}
          onChange={(lat, lng) => {
            formik.setFieldValue('latitude', lat);
            formik.setFieldValue('longitude', lng);
          }}
        />

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button type="button" onPress={onClose} className={`${gfx.btnSecondary} px-5 h-11 cursor-pointer`}>
            {t('addr_cancel')}
          </Button>
          <Button
            type="submit"
            isLoading={isSaving}
            isDisabled={isSaving}
            className={`${gfx.btnPrimary} px-6 h-11 cursor-pointer`}
          >
            {isEdit ? t('addr_save_changes') : t('addr_add_title')}
          </Button>
        </div>
      </form>
    </ModalShell>
  );
}
