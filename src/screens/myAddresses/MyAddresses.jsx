import { Link } from 'react-router-dom';
import { Plus, MapPin } from 'lucide-react';
import { Button } from '@heroui/react';
import Header from '../../components/organisms/header/Header';
import Footer from '../../components/organisms/footer/Footer';
import AddressCard from '../../components/organisms/myAddresses/AddressCard';
import AddressFormModal from '../../components/organisms/myAddresses/AddressFormModal';
import ConfirmDeleteModal from '../../components/organisms/myAddresses/ConfirmDeleteModal';
import { gfx } from '../../styles/themeColors';
import { useMyAddresses } from './useMyAddresses';

export default function MyAddresses() {
  const {
    t,
    addresses,
    isLoading,
    isError,
    isEmpty,
    isSaving,
    isDeleting,
    isSettingDefault,
    editing,
    confirmDelete,
    openCreate,
    openEdit,
    closeEditor,
    saveAddress,
    askDelete,
    cancelDelete,
    confirmRemove,
    setDefault,
  } = useMyAddresses();

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6">
          <Link to="/" className="hover:text-ink transition-colors">
            {t('nav_home')}
          </Link>
          <span className="text-faint">/</span>
          <span className="text-ink font-medium">{t('menu_my_addresses')}</span>
        </nav>

        {/* Page heading */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-ink tracking-tight mb-1">
              {t('menu_my_addresses')}
            </h1>
            <p className="text-muted text-[15px]">{t('addr_subtitle')}</p>
          </div>
          {!isEmpty && !isLoading && (
            <Button
              onPress={openCreate}
              className={`${gfx.btnPrimary} px-5 h-11 shrink-0 cursor-pointer`}
            >
              <Plus className="w-4 h-4" />
              {t('addr_add')}
            </Button>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${gfx.card} p-5 animate-pulse`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-2" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-surface-2 rounded w-1/2" />
                    <div className="h-3 bg-surface-2 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-3 bg-surface-2 rounded w-3/4 mb-2" />
                <div className="h-3 bg-surface-2 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && !isLoading && (
          <div className={`${gfx.card} p-8 text-center`}>
            <p className="text-muted">{t('addr_error')}</p>
          </div>
        )}

        {/* Empty */}
        {isEmpty && (
          <div className={`${gfx.card} px-6 py-14 text-center flex flex-col items-center`}>
            <div className="w-16 h-16 rounded-2xl bg-brand-tint text-brand-strong flex items-center justify-center mb-5">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-ink mb-1">{t('addr_empty_title')}</h3>
            <p className="text-muted text-[15px] mb-6 max-w-sm">{t('addr_empty_body')}</p>
            <Button onClick={openCreate} className={`${gfx.btnPrimary} px-5 h-11 cursor-pointer`}>
              <Plus className="w-4 h-4" />
              {t('addr_empty_cta')}
            </Button>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !isError && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                t={t}
                busy={isSettingDefault}
                onSetDefault={setDefault}
                onEdit={openEdit}
                onDelete={askDelete}
              />
            ))}

            {/* Add-new card */}
            <button
              type="button"
              onClick={openCreate}
              className={`${gfx.cardFlat} ${gfx.cardHover} p-5 flex flex-col items-center justify-center text-center gap-2 border-dashed min-h-45 cursor-pointer`}
            >
              <div className="w-11 h-11 rounded-xl bg-surface-2 text-brand flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div className="font-semibold text-ink">{t('addr_add_card_title')}</div>
              <div className="text-sm text-muted max-w-60">{t('addr_add_card_desc')}</div>
            </button>
          </div>
        )}
      </main>

      <Footer />

      {editing && (
        <AddressFormModal
          mode={editing.mode}
          address={editing.address}
          t={t}
          isSaving={isSaving}
          onClose={closeEditor}
          onSave={saveAddress}
        />
      )}

      {confirmDelete && (
        <ConfirmDeleteModal
          address={confirmDelete}
          t={t}
          isDeleting={isDeleting}
          onCancel={cancelDelete}
          onConfirm={confirmRemove}
        />
      )}
    </div>
  );
}
