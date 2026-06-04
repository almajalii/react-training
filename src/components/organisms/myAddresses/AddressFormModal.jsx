import { useFormik } from 'formik';
import { Building2, Home, X } from 'lucide-react';
import { Button } from '@heroui/react';
import FormField from '../../molecules/formField/FormField';
import FormRow from '../../molecules/formRow/FormRow';
import { gfx } from '../../../styles/themeColors';
import { ADDRESS_TYPES } from '../../../constants/addressTypes';
import { addressValidationSchema } from '../../../screens/myAddresses/addressValidationSchema';

const TYPE_OPTIONS = [
  { id: ADDRESS_TYPES.APARTMENT, Icon: Building2, labelKey: 'addr_type_apartment' },
  { id: ADDRESS_TYPES.HOUSE, Icon: Home, labelKey: 'addr_type_house' },
];

export default function AddressFormModal({ mode, address, t, onClose, onSave, isSaving }) {
  const isEdit = mode === 'edit';

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
    },
    validationSchema: addressValidationSchema(t),
    onSubmit: async (values) => {
      // Keep only the fields relevant to the chosen type before sending.
      const isApartment = values.type === ADDRESS_TYPES.APARTMENT;
      const payload = {
        type: values.type,
        area: values.area.trim(),
        street: values.street.trim(),
        buildingName: values.buildingName.trim(),
        apartmentNumber: isApartment ? values.apartmentNumber.trim() : '',
        floor: isApartment ? values.floor.trim() : '',
        house: isApartment ? '' : values.house.trim(),
        additionalDirections: values.additionalDirections.trim(),
        ...(isEdit ? { id: address.id, isDefault: address.isDefault } : {}),
      };
      await onSave(payload);
    },
  });

  const isApartment = formik.values.type === ADDRESS_TYPES.APARTMENT;

  return (
    <div
      className="fixed inset-0 z-9998 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface border border-line rounded-3xl shadow-card-lg max-h-[90vh] flex flex-col overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-line">
          <h2 className="text-xl font-extrabold text-ink tracking-tight">
            {isEdit ? t('addr_edit_title') : t('addr_add_title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('addr_close')}
            className="text-muted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="px-6 py-5 overflow-y-auto">
          {/* Type picker */}
          <div className="mb-4">
            <label className={gfx.label}>{t('addr_type_label')}</label>
            <div className="grid grid-cols-2 gap-3">
              {TYPE_OPTIONS.map(({ id, Icon, labelKey }) => {
                const active = formik.values.type === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => formik.setFieldValue('type', id)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-[1.5px] font-medium transition-all
                      ${
                        active
                          ? 'border-brand bg-brand-tint text-brand-strong'
                          : 'border-line bg-surface text-ink hover:border-brand-soft'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {t(labelKey)}
                  </button>
                );
              })}
            </div>
          </div>

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

          <div className="mb-2">
            <label className={gfx.label}>
              {t('addr_directions')}{' '}
              <span className="text-faint font-normal">({t('addr_optional')})</span>
            </label>
            <textarea
              name="additionalDirections"
              rows={3}
              placeholder={t('addr_directions_placeholder')}
              value={formik.values.additionalDirections}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink text-sm
                placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-focus
                outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className={`${gfx.btnSecondary} px-5 h-11 cursor-pointer`}
            >
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
      </div>
    </div>
  );
}
