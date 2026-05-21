import { useProfessionalProfile } from './useProfessionalProfile';
import Header from '../../components/organisms/header/Header';
import Footer from '../../components/organisms/Footer';
import ProProfileHero from '../../components/organisms/proProfileHero/ProProfileHero';
export default function ProfessionalProfile() {
  const { t, i18n, pro, loading, activeTab, setActiveTab, initials, toneClass, ratingBreakdown } =
    useProfessionalProfile();
  //loading state
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
  //content loaded state
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <ProProfileHero pro={pro} initials={initials} toneClass={toneClass} t={t} />
      {/* Hero section will go here */}

      {/* Tabs will go here */}
      {/* Tab content will go here */}

      <Footer />
    </div>
  );
}
