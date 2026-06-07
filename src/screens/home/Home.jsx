import { useSelector } from 'react-redux';
import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import CategorySection from '../../components/organisms/home/categorySection/CategorySection';
import HeroSection from '../../components/organisms/home/heroSection/HeroSection';
import HowItWorksSection from '../../components/organisms/home/howItWorksSection/HowItWorksSection';
import ProSection from '../../components/organisms/home/proSection/ProSection';
import WelcomeBanner from '../../components/organisms/home/welcomeBanner/WelcomeBanner';

export default function Home() {
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
