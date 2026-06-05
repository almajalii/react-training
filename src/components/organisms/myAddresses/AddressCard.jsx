import { Building2, Home, MapPin, Check, Sparkles } from 'lucide-react';
import { ADDRESS_TYPES } from '../../../constants/addressTypes';
import { gfx } from '../../../styles/themeColors';
import { formatAddressLine } from '../../../utils/formatAddress';

const TYPE_ICON = {
  [ADDRESS_TYPES.APARTMENT]: Building2,
  [ADDRESS_TYPES.HOUSE]: Home,
};

export default function AddressCard({ address, t, onSetDefault, onEdit, onDelete, busy }) {
  const Ico = TYPE_ICON[address.type] || MapPin;
  const typeLabel =
    address.type === ADDRESS_TYPES.HOUSE ? t('addr_type_house') : t('addr_type_apartment');
  const line = formatAddressLine(address, t);

  return (
    <div
      className={`${gfx.card} ${gfx.cardHover} p-5 flex flex-col gap-4 ${
        address.isDefault ? 'ring-1 ring-brand/40 border-brand-soft' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-brand-tint text-brand-strong flex items-center justify-center shrink-0">
          <Ico className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-ink truncate">{typeLabel}</span>
            {address.isDefault && (
              <span className={`${gfx.chipBrand} px-2.5! py-0.5! text-xs!`}>
                <Check className="w-3 h-3" />
                {t('addr_default')}
              </span>
            )}
          </div>
          <div className="text-sm text-muted mt-0.5 truncate">{address.area}</div>
        </div>
      </div>

      {line && <div className="text-[15px] text-ink-soft leading-relaxed">{line}</div>}

      {address.additionalDirections && (
        <div className="flex items-start gap-2 text-sm text-muted bg-surface-2 rounded-xl px-3 py-2.5">
          <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-brand" />
          <span className="leading-snug">{address.additionalDirections}</span>
        </div>
      )}

      <div className="flex items-center gap-1 pt-1 mt-auto">
        {!address.isDefault && (
          <button
            type="button"
            onClick={() => onSetDefault(address)}
            disabled={busy}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-strong hover:text-brand transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            {t('addr_set_default')}
          </button>
        )}
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="text-sm font-medium text-muted hover:text-ink transition-colors px-2 py-1 cursor-pointer"
        >
          {t('addr_edit')}
        </button>
        <button
          type="button"
          onClick={() => onDelete(address)}
          className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1 cursor-pointer"
        >
          {t('addr_delete')}
        </button>
      </div>
    </div>
  );
}
