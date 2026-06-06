import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../../network/api';

const ADDRESSES_KEY = ['addresses'];

export function useMyAddresses() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ADDRESSES_KEY,
    queryFn: getAddresses,
    enabled: !!user,
  });

  const invalidate = useCallback(() => queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY }), [queryClient]);

  const { mutateAsync: saveAddress, isPending: isSaving } = useMutation({
    mutationFn: ({ id, ...payload }) => (id ? updateAddress(id, { id, ...payload }) : createAddress(payload)),
    onSuccess: (_res, vars) => {
      toast.success(vars.id ? t('addr_toast_updated') : t('addr_toast_added'));
      invalidate();
      setEditing(null);
    },
    onError: () => toast.error(t('addr_toast_save_error')),
  });

  const { mutateAsync: removeAddress, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteAddress(id),
    onSuccess: () => {
      toast.success(t('addr_toast_deleted'));
      invalidate();
      setConfirmDelete(null);
    },
    onError: () => toast.error(t('addr_toast_delete_error')),
  });

  const openCreate = useCallback(() => setEditing({ mode: 'create' }), []);
  const openEdit = useCallback((address) => setEditing({ mode: 'edit', address }), []);
  const closeEditor = useCallback(() => setEditing(null), []);
  const askDelete = useCallback((address) => setConfirmDelete(address), []);
  const cancelDelete = useCallback(() => setConfirmDelete(null), []);

  const confirmRemove = useCallback(
    () => confirmDelete?.id && removeAddress(confirmDelete.id),
    [confirmDelete, removeAddress],
  );

  const isEmpty = useMemo(
    () => !isLoading && !isError && addresses.length === 0,
    [isLoading, isError, addresses.length],
  );

  return {
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
  };
}
