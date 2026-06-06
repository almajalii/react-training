import { MapPin, Check, Sparkles } from 'lucide-react';
import { ADDRESS_TYPES, ADDRESS_TYPE_OPTIONS } from '../../../../constants/addressTypes';
import { gfx } from '../../../../styles/themeColors';
import { formatAddressLine } from '../../../../utils/formatAddress';

export default function AddressCard({ address, t, onEdit, onDelete }) {
  if (!address) return null;

  //address type icon
  const Ico = ADDRESS_TYPE_OPTIONS.find((o) => o.id === address?.type)?.Icon ?? MapPin;
  const typeLabel = address?.type === ADDRESS_TYPES.HOUSE ? t('addr_type_house') : t('addr_type_apartment');

  //translated type label
  const typeLabel = address.type === ADDRESS_TYPES.HOUSE ? t('addr_type_house') : t('addr_type_apartment');
  //formatted address line
  const line = formatAddressLine(address, t);

  return (
    <div className={`${gfx.card} ${gfx.cardHover} p-5 flex flex-col gap-4`}>
      {/* Top row — icon + type label + area */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-brand-tint text-brand-strong flex items-center justify-center shrink-0">
          <Ico className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-ink truncate">{typeLabel}</span>
          </div>
          <div className="text-sm text-muted mt-0.5 truncate">{address.area}</div>
        </div>
      </div>
      {/* Formatted address line */}
      {line && <div className="text-[15px] text-ink-soft leading-relaxed">{line}</div>}

      <div className="flex items-center gap-1 pt-1 mt-auto">
        <div className="flex-1" />
        {/* edit button */}
        <button
          type="button"
          onClick={() => onEdit(address)}
          className="text-sm font-medium text-muted hover:text-ink transition-colors px-2 py-1 cursor-pointer"
        >
          {t('addr_edit')}
        </button>
        {/* delete button */}
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
