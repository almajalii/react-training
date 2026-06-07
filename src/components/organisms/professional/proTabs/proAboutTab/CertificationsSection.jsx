import { ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function CertificationSection({ certifications }) {
  const { t } = useTranslation();
  const certs = useMemo(
    () => certifications?.filter((c) => c.documentType === 'certification') ?? [],
    [certifications],
  );
  //empty state
  if (!certs.length) return null;
  //success state
  return (
    <div>
      <h2 className="text-[22px] font-bold text-ink tracking-tight mb-4">{t('pro_certifications')}</h2>

      <div className="flex flex-col gap-3">
        {certs.map(({ id, name, issuedBy, issuedYear, uploadedAt }) => {
          const year = issuedYear ?? new Date(uploadedAt).getFullYear();

          return (
            <div key={id} className="flex items-start gap-4 p-4 bg-surface border border-line rounded-2xl">
              <ShieldCheck size={20} className="text-ok shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink text-[15px] capitalize">{name}</p>
                {issuedBy && <p className="text-[13px] text-muted mt-0.5">{issuedBy}</p>}
              </div>
              <p className="text-[13px] text-muted shrink-0">
                {t('pro_issued')} {year}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
