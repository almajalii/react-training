import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
