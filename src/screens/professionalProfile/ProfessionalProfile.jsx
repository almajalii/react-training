import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import ProProfileHero from '../../components/organisms/professional/proProfileHero/ProProfileHero';
import ProAboutTab from '../../components/organisms/professional/proTabs/proAboutTab/ProAboutTab';
import ProProfileTabs from '../../components/organisms/professional/proTabs/proProfileTabs/ProProfileTabs';
import ProReviewsTab from '../../components/organisms/professional/proTabs/proReviewsTab/ProReviewsTab';
import ProServicesTab from '../../components/organisms/professional/proTabs/proServicesTab/ProServicesTab';
import { useProfessionalProfile } from './useProfessionalProfile';
export default function ProfessionalProfile() {
  const { t, i18n, pro, loading, activeTab, setActiveTab, initials, toneClass, ratingBreakdown } =
    useProfessionalProfile();

  if (loading)
    return (
      <div className="min-h-screen bg-page">
        <Header />
        <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
          <div className="h-8 bg-chip rounded w-1/3 mb-4" />
          <div className="h-4 bg-chip rounded w-1/2" />
        </div>
      </div>
    );

  if (!pro) return null;

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <ProProfileHero pro={pro} initials={initials} toneClass={toneClass} t={t} />
      <ProProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="max-w-5xl mx-auto px-6 py-10">
        {activeTab === 'about' && <ProAboutTab pro={pro} />}
        {activeTab === 'services' && <ProServicesTab services={pro.services} />}
        {activeTab === 'reviews' && <ProReviewsTab pro={pro} ratingBreakdown={ratingBreakdown} />}
      </div>
      <Footer />
    </div>
  );
}
