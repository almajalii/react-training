import { useFormik } from 'formik';
import { Building2, Home, X, MapPin, Locate } from 'lucide-react';
import { Button } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import FormField from '../../molecules/formField/FormField';
import FormRow from '../../molecules/formRow/FormRow';
import { gfx } from '../../../styles/themeColors';
import { ADDRESS_TYPES } from '../../../constants/addressTypes';
import { addressValidationSchema } from '../../../screens/myAddresses/addressValidationSchema';

const TYPE_OPTIONS = [
  { id: ADDRESS_TYPES.APARTMENT, Icon: Building2, labelKey: 'addr_type_apartment' },
  { id: ADDRESS_TYPES.HOUSE, Icon: Home, labelKey: 'addr_type_house' },
];

// Default center: Amman, Jordan
const DEFAULT_CENTER = { lat: 31.9539, lng: 35.9106 };

function MapPicker({ lat, lng, onChange }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [locating, setLocating] = useState(false);
  const [leafletReady, setLeafletReady] = useState(false);

  // Lazy-load Leaflet CSS + JS once
  useEffect(() => {
    if (window.L) {
      setLeafletReady(true);
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []);

  // Init map once Leaflet is ready and container is mounted
  useEffect(() => {
    if (!leafletReady || !containerRef.current || mapRef.current) return;

    const center = lat && lng ? [lat, lng] : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];

    const map = window.L.map(containerRef.current, { zoomControl: true }).setView(center, 15);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom brand-colored pin icon
    const icon = window.L.divIcon({
      className: '',
      html: `<div style="
        width:32px;height:32px;background:#ED8936;border:3px solid #fff;
        border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    const marker = window.L.marker(center, { icon, draggable: true }).addTo(map);

    marker.on('dragend', (e) => {
      const { lat: newLat, lng: newLng } = e.target.getLatLng();
      onChange(newLat, newLng);
    });

    map.on('click', (e) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      marker.setLatLng([newLat, newLng]);
      onChange(newLat, newLng);
    });

    mapRef.current = map;
    markerRef.current = marker;
  }, [leafletReady]);

  // Keep marker in sync if lat/lng are set externally (e.g. GPS)
  useEffect(() => {
    if (!mapRef.current || !markerRef.current || !lat || !lng) return;
    markerRef.current.setLatLng([lat, lng]);
    mapRef.current.setView([lat, lng], mapRef.current.getZoom());
  }, [lat, lng]);

  const handleLocate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => setLocating(false),
      { timeout: 8000 }
    );
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className={gfx.label}>
          <MapPin className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
          Location on map
          <span className="text-faint font-normal ml-1">(optional)</span>
        </label>
        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="flex items-center gap-1.5 text-[12px] font-medium text-brand hover:text-brand-strong
            transition-colors disabled:opacity-50"
        >
          <Locate className="w-3.5 h-3.5" />
          {locating ? 'Locating…' : 'Use my location'}
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden border border-line"
        style={{ height: 200 }}
      />

      {lat && lng && (
        <p className="mt-1.5 text-[12px] text-muted font-mono">
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      )}

      <p className="mt-1 text-[12px] text-faint">
        Tap the map or drag the pin to set the exact location.
      </p>
    </div>
  );
}

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
      latitude: address?.latitude ?? null,
      longitude: address?.longitude ?? null,
    },
    validationSchema: addressValidationSchema(t),
    onSubmit: async (values) => {
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
        latitude: values.latitude,
        longitude: values.longitude,
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

          <div className="mb-4">
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

          {/* Map picker */}
          <MapPicker
            lat={formik.values.latitude}
            lng={formik.values.longitude}
            onChange={(lat, lng) => {
              formik.setFieldValue('latitude', lat);
              formik.setFieldValue('longitude', lng);
            }}
          />

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
