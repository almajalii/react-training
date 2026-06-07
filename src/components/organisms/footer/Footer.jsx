import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { gfx } from '../../../styles/themeColors';
import { FOOTER_COLUMNS, FOOTER_LEGAL_LINKS } from '../../../constants/footerLinks';

export default function Footer() {
  const { t } = useTranslation();

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
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.headingKey}>
              <p className={`${gfx.caps} mb-4`}>{t(col.headingKey)}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.labelKey}>
                    <Link to={l.to} className="text-sm text-ink-soft hover:text-ink transition-colors">
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
            {FOOTER_LEGAL_LINKS.map((item, i) => (
              <span key={item.labelKey} className="flex items-center gap-1">
                {i > 0 && <span className="text-faint text-xs">·</span>}
                <Link to={item.to} className="text-xs text-muted hover:text-ink transition-colors px-1">
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
