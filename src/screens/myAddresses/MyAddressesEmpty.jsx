import { Button } from '@heroui/react';
import { Plus, MapPin } from 'lucide-react';
import { gfx } from '../../styles/themeColors';

export default function MyAddressesEmpty({ t, onAdd }) {
  return (
    <div className={`${gfx.card} px-6 py-14 text-center flex flex-col items-center`}>
      <div className="w-16 h-16 rounded-2xl bg-brand-tint text-brand-strong flex items-center justify-center mb-5">
        <MapPin className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-ink mb-1">{t('addr_empty_title')}</h3>
      <p className="text-muted text-[15px] mb-6 max-w-sm">{t('addr_empty_body')}</p>
      <Button onClick={onAdd} className={`${gfx.btnPrimary} px-5 h-11 cursor-pointer`}>
        <Plus className="w-4 h-4" />
        {t('addr_empty_cta')}
      </Button>
    </div>
  );
}
