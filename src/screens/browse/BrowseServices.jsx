import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BrowseFilters from '../../components/organisms/Browse/browseFilters/BrowseFilters';
import BrowsePageHeader from '../../components/organisms/Browse/BrowsePageHeader/BrowsePageHeader';
import BrowseResults from '../../components/organisms/Browse/browseResults/BrowseResults';
import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import { EMPTY_FILTERS } from './browseFiltersConstants';
import { useBrowseServices } from './useBrowseServices';

export default function BrowseServices() {
  const { categoryId: categorySlug } = useParams(); //reads the category slug from the URL
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const { professionals, loading } = useBrowseServices(categorySlug, filters);

  return (
    <div className="min-h-screen bg-page">
      <Header />
      <BrowsePageHeader categorySlug={categorySlug} />

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
        <BrowseFilters categorySlug={categorySlug} filters={filters} onChange={setFilters} />
        <BrowseResults professionals={professionals} loading={loading} />
      </div>

      <Footer />
    </div>
  );
}
