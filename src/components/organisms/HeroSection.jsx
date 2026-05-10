import { useTranslation } from 'react-i18next';
import { Droplets, Wind, Lightbulb, MapPin, CheckCircle2, Star } from 'lucide-react';
import { gfx, TONE_CLASSES, AVATAR_TONE } from '../../styles/themeColors';

const FEED_ITEMS = [
  { id: 1, svcKey: 'hero_feed_item_1_service', areaKey: 'hero_feed_area_aljubaiha', minsAgo: 12, initials: 'AK', name: 'Ahmad K.',  price: 28, Icon: Droplets,  tone: 'sand' },
  { id: 2, svcKey: 'hero_feed_item_2_service', areaKey: 'hero_feed_area_abdoun',    minsAgo: 34, initials: 'RM', name: 'Rami M.',   price: 45, Icon: Wind,      tone: 'green' },
  { id: 3, svcKey: 'hero_feed_item_3_service', areaKey: 'hero_feed_area_sweifieh',  minsAgo: 58, initials: 'YH', name: 'Yousef H.', price: 22, Icon: Lightbulb, tone: 'blue' },
];

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-page py-16 lg:py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

        {/* Left */}
        <div>
          {/* Location pill */}
          <div className={`${gfx.pill} mb-7`}>
            <span className="w-1.5 h-1.5 rounded-full bg-ink" />
            <span className="font-medium">{t('hero_location_badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(2.5rem,4.4vw,3.6rem)] font-extrabold text-ink leading-[1.04] tracking-[-0.035em] mb-5 text-balance">
            {t('hero_headline_1')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10">{t('hero_headline_highlight')}</span>
              <span className="absolute left-0 right-0 bottom-1.5 h-2.5 bg-brand-soft rounded-sm z-0" />
            </span>
            {t('hero_headline_2') ? <> {t('hero_headline_2')}</> : null}
          </h1>

          {/* Subtext */}
          <p className="text-muted text-lg leading-[1.55] max-w-136 mb-8">
            {t('hero_subtext')}
          </p>
        </div>

        {/* Right — Live feed card */}
        <div className="relative self-center">
          <div className={`${gfx.cardLg} p-5`}>

            {/* Head */}
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="inline-flex items-center gap-2 text-[13px] font-bold text-ink tracking-[-0.01em]">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500/50 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-600" />
                </span>
                {t('hero_feed_live_in_amman')}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                {t('hero_feed_today')} · {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {/* Feed list */}
            <ul className="flex flex-col gap-1 pt-3">
              {FEED_ITEMS.map((item) => {
                const Ico = item.Icon;
                return (
                  <li key={item.id} className="flex items-center gap-3.5 px-1.5 py-2.5 rounded-xl hover:bg-page-2 transition-colors">
                    <div className={`w-11 h-11 rounded-xl grid place-items-center shrink-0 ${TONE_CLASSES[item.tone]}`}>
                      <Ico size={20} strokeWidth={1.75} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14.5px] font-bold text-ink tracking-[-0.01em] truncate">
                        {t(item.svcKey)}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted mt-0.5">
                        <span className={`inline-flex items-center justify-center w-4.5 h-4.5 rounded-full text-[9px] font-bold ${AVATAR_TONE[item.tone]}`}>
                          {item.initials}
                        </span>
                        <span className="font-semibold text-ink-soft">{item.name}</span>
                        <span className="text-faint">·</span>
                        <span className="inline-flex items-center gap-1"><MapPin size={11} /> {t(item.areaKey)}</span>
                        <span className="text-faint">·</span>
                        <span>{t('hero_feed_mins_ago', { count: item.minsAgo })}</span>
                      </div>
                    </div>
                    <span className={`${gfx.tag} shrink-0`}>
                      {t('hero_feed_price', { price: item.price })}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Foot */}
            <div className="flex items-center gap-3 pt-3 mt-1 border-t border-line text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-600" />
                {t('hero_feed_jobs_booked', { count: 38 })}
              </span>
              <span className="flex-1" />
              <span className="inline-flex items-center gap-1.5">
                <Star size={12} className="text-emerald-600 fill-emerald-600" />
                {t('hero_feed_avg_rating', { rating: '4.8' })}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}