import { useSelector } from 'react-redux';
import Header from '../../components/organisms/header/Header';
import HeroSection from '../../components/organisms/HeroSection';
import CategorySection from '../../components/organisms/categorySection/CategorySection';
import HowItWorksSection from '../../components/organisms/HowItWorksSection';
import ProSection from '../../components/organisms/ProSection';
import WelcomeBanner from '../../components/organisms/WelcomeBanner';
import Footer from '../../components/organisms/Footer';
import { useHome } from './useHome';

export default function Home() {
  const { handleSearch } = useHome();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-cream dark:bg-dark-bg">
      <Header />
      <main>
        {user && <WelcomeBanner user={user} />}
        {!user && <HeroSection />}
        <CategorySection />
        <HowItWorksSection />
        {(!user || user.role === 'customer') && <ProSection />}
      </main>
      <Footer />
    </div>
  );
}