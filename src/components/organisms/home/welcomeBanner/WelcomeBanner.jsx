import { useTranslation } from 'react-i18next';

export default function WelcomeBanner({ user }) {
  const { t } = useTranslation();

  return (
    <div className="bg-[#0E1A2B] text-white px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <p className="text-sm font-medium text-white/90">
          {t('welcome_back')}{' '}
          <span className="font-bold text-white">
            {user.firstName} {'!'}
          </span>
          {user.role === 'pro' && (
            <span className="ml-2 text-[10px] font-bold uppercase tracking-caps bg-brand/20 text-brand px-2 py-0.5 rounded-full">
              {t('welcome_pro_badge')}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
