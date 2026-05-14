import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/organisms/Header';
import Footer from '../../components/organisms/Footer';
import BrowsePageHeader from '../../components/organisms/BrowsePageHeader';
import BrowseFilters from '../../components/organisms/BrowseFilters';
import BrowseResults from '../../components/organisms/BrowseResults';
import { useBrowseServices } from './useBrowseServices';
import { EMPTY_FILTERS } from './browseFilters';

export default function BrowseServices() {
  const { categoryId: categorySlug } = useParams();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const { professionals, loading, error } = useBrowseServices(categorySlug, filters);

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <BrowsePageHeader categorySlug={categorySlug} />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        <BrowseFilters
          categorySlug={categorySlug}
          filters={filters}
          onChange={setFilters}
        />
        <BrowseResults
          professionals={professionals}
          loading={loading}
          error={error}
        />
      </div>

      <Footer />
    </div>
  );
}
