import { Button } from '@heroui/react';
import { AlertTriangle } from 'lucide-react';
import { gfx } from '../../../styles/themeColors';
import { formatAddressLine } from '../../../utils/formatAddress';

export default function ConfirmDeleteModal({ address, t, onCancel, onConfirm, isDeleting }) {
  const line = formatAddressLine(address, t);

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={onCancel}
    >
      <div
        className="w-full max-w-sm bg-surface border border-line rounded-3xl shadow-card-lg p-6"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-extrabold text-ink tracking-tight mb-2">
          {t('addr_delete_title')}
        </h2>
        <p className="text-sm text-muted leading-relaxed">
          {t('addr_delete_body')}
          {line && (
            <span className="block mt-1 text-ink-soft font-medium">
              {address?.area} — {line}
            </span>
          )}
        </p>

        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            type="button"
            onClick={onCancel}
            className={`${gfx.btnSecondary} px-5 h-11 cursor-pointer`}
          >
            {t('addr_keep')}
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            className={`${gfx.btnDanger} px-5 h-11 cursor-pointer`}
          >
            {t('addr_delete')}
          </Button>
        </div>
      </div>
    </div>
  );
}
