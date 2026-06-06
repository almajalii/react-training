import { Button } from '@heroui/react';
import { Plus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/organisms/footer/Footer';
import Header from '../../components/organisms/header/Header';
import AddressCard from '../../components/organisms/myAddresses/addressCard/AddressCard';
import AddressFormModal from '../../components/organisms/myAddresses/addressModals/addressFormModal/AddressFormModal';
import AddressConfirmDeleteModal from '../../components/organisms/myAddresses/addressModals/addressConfirmDeleteModal/AddressConfirmDeleteModal';
import { gfx } from '../../styles/themeColors';
import { useMyAddresses } from './useMyAddresses';
import MyAddressesSkeleton from './MyAddressesSkeleton';
import MyAddressesEmpty from './MyAddressesEmpty';

export default function MyAddresses() {
  const {
    t,
    addresses,
    isLoading,
    isError,
    isEmpty,
    isSaving,
    isDeleting,
    editing,
    confirmDelete,
    openCreate,
    openEdit,
    closeEditor,
    saveAddress,
    askDelete,
    cancelDelete,
    confirmRemove,
  } = useMyAddresses();

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <Header />
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        {/* Page heading */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-ink tracking-tight mb-1">{t('menu_my_addresses')}</h1>
            <p className="text-muted text-[15px]">{t('addr_subtitle')}</p>
          </div>

          {!isEmpty && !isLoading && (
            <Button onPress={openCreate} className={`${gfx.btnPrimary} px-5 h-11 shrink-0 cursor-pointer`}>
              <Plus className="w-4 h-4" />
              {t('addr_add')}
            </Button>
          )}
        </div>

        {/* Loading state*/}
        {isLoading && <MyAddressesSkeleton />}

        {/* Error state */}
        {isError && !isLoading && (
          <div className={`${gfx.card} p-8 text-center`}>
            <p className="text-muted">{t('addr_error')}</p>
          </div>
        )}

        {/* Empty state */}
        {isEmpty && <MyAddressesEmpty t={t} onAdd={openCreate} />}

        {/* Grid */}
        {!isLoading && !isError && !isEmpty && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {addresses.map((address) => (
              <AddressCard key={address.id} address={address} t={t} onEdit={openEdit} onDelete={askDelete} />
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
        <AddressConfirmDeleteModal
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
