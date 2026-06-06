import Header from '../../components/organisms/header/Header';

export default function ProfessionalProfileSkeleton() {
  return (
    <div className="min-h-screen bg-page">
      <Header />
      <div className="max-w-5xl mx-auto px-6 py-16 animate-pulse">
        <div className="h-8 bg-chip rounded w-1/3 mb-4" />
        <div className="h-4 bg-chip rounded w-1/2" />
      </div>
    </div>
  );
}
