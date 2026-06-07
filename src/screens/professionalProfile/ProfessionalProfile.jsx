import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import ProProfileHero from '../../components/organisms/professional/proProfileHero/ProProfileHero';
import ProAboutTab from '../../components/organisms/professional/proTabs/proAboutTab/ProAboutTab';
import ProProfileTabs from '../../components/organisms/professional/proTabs/proProfileTabs/ProProfileTabs';
import ProReviewsTab from '../../components/organisms/professional/proTabs/proReviewsTab/ProReviewsTab';
import ProServicesTab from '../../components/organisms/professional/proTabs/proServicesTab/ProServicesTab';
import { useProfessionalProfile } from './useProfessionalProfile';
import ProfessionalProfileSkeleton from './ProfessionalProfileSkeleton';

export default function ProfessionalProfile() {
  const { t, i18n, pro, loading, activeTab, setActiveTab, initials, toneClass, ratingBreakdown } =
    useProfessionalProfile();
  //loading state
  if (loading) return <ProfessionalProfileSkeleton />;
  //error state
  if (!pro) return <div className="min-h-screen bg-page flex items-center justify-center">Professional not found</div>;
  //success state
  return (
    <div className="min-h-screen bg-page">
      <Header />
      {/* Hero section with profile info */}
      <ProProfileHero pro={pro} initials={initials} toneClass={toneClass} t={t} />
      {/* Tabs for About, Services, Reviews */}
      <ProProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Content area for the active tab */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        {activeTab === 'about' && <ProAboutTab pro={pro} />}
        {activeTab === 'services' && <ProServicesTab services={pro.services} />}
        {activeTab === 'reviews' && <ProReviewsTab pro={pro} ratingBreakdown={ratingBreakdown} />}
      </div>
      <Footer />
    </div>
  );
}
