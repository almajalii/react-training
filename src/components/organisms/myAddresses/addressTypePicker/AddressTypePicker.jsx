// Apartment / House toggle buttons used inside the address form

import { ADDRESS_TYPE_OPTIONS } from '../../../../constants/addressTypes';
import { gfx } from '../../../../styles/themeColors';

export default function AddressTypePicker({ value, onChange, t }) {
  return (
    <div className="mb-4">
      <label className={gfx.label}>{t('addr_type_label')}</label>
      <div className="grid grid-cols-2 gap-3">
        {ADDRESS_TYPE_OPTIONS.map(({ id, Icon, labelKey }) => {
          const active = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
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
  );
}
