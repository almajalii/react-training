import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { gfx } from '../../styles/themeColors';

export default function Footer() {
  const { t } = useTranslation();

  const columns = [
    {
      headingKey: 'footer_customers',
      links: [
        { labelKey: 'footer_browse_services', to: '/browse' },
        { labelKey: 'footer_how_it_works', to: '/how-it-works' },
        { labelKey: 'footer_pricing', to: '/pricing' },
        { labelKey: 'footer_help_center', to: '/help' },
      ],
    },
    {
      headingKey: 'footer_professionals',
      links: [
        { labelKey: 'footer_become_a_pro', to: '/become-a-pro' },
        { labelKey: 'footer_verification', to: '/verification' },
        { labelKey: 'footer_resources', to: '/resources' },
      ],
    },
    {
      headingKey: 'footer_company',
      links: [
        { labelKey: 'footer_about', to: '/about' },
        { labelKey: 'footer_careers', to: '/careers' },
        { labelKey: 'footer_contact', to: '/contact' },
      ],
    },
  ];

  const legalLinks = [
    { labelKey: 'footer_privacy', to: '/privacy' },
    { labelKey: 'footer_terms', to: '/terms' },
    { labelKey: 'footer_cookies', to: '/cookies' },
  ];

  return (
    <footer className="bg-page border-t border-line px-6 pt-14 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src={logo} alt="GoFix" className="h-8 object-contain" />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-48">{t('footer_tagline')}</p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.headingKey}>
              <p className={`${gfx.caps} mb-4`}>{t(col.headingKey)}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.labelKey}>
                    <Link
                      to={l.to}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {t(l.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">{t('footer_copyright')}</p>
          <div className="flex items-center gap-1">
            {legalLinks.map((item, i) => (
              <span key={item.labelKey} className="flex items-center gap-1">
                {i > 0 && <span className="text-faint text-xs">·</span>}
                <Link
                  to={item.to}
                  className="text-xs text-muted hover:text-ink transition-colors px-1"
                >
                  {t(item.labelKey)}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
