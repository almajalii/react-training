import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getAddresses, createAddress, updateAddress, deleteAddress } from '../../network/api';

const ADDRESSES_KEY = ['addresses'];

export function useMyAddresses() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  // Which modal is open: { mode: 'create' } | { mode: 'edit', address } | null
  const [editing, setEditing] = useState(null);
  // Address pending delete confirmation, or null
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

  const invalidate = useCallback(
    () => queryClient.invalidateQueries({ queryKey: ADDRESSES_KEY }),
    [queryClient]
  );

  // Create / update share one mutation: presence of an id decides the call.
  const { mutateAsync: saveAddress, isPending: isSaving } = useMutation({
    mutationFn: ({ id, ...payload }) =>
      id ? updateAddress(id, { id, ...payload }) : createAddress(payload),
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

  // Set-default is modelled as an update carrying the isDefault flag, since the
  // backend stores arbitrary address fields and exposes no dedicated endpoint.
  const { mutateAsync: setDefaultMutation, isPending: isSettingDefault } = useMutation({
    mutationFn: (address) => updateAddress(address.id, { ...address, isDefault: true }),
    onSuccess: () => {
      toast.success(t('addr_toast_default_set'));
      invalidate();
    },
    onError: () => toast.error(t('addr_toast_save_error')),
  });

  const openCreate = useCallback(() => setEditing({ mode: 'create' }), []);
  const openEdit = useCallback((address) => setEditing({ mode: 'edit', address }), []);
  const closeEditor = useCallback(() => setEditing(null), []);

  const askDelete = useCallback((address) => setConfirmDelete(address), []);
  const cancelDelete = useCallback(() => setConfirmDelete(null), []);
  const confirmRemove = useCallback(
    () => confirmDelete && removeAddress(confirmDelete.id),
    [confirmDelete, removeAddress]
  );

  const setDefault = useCallback((address) => setDefaultMutation(address), [setDefaultMutation]);

  const isEmpty = useMemo(
    () => !isLoading && !isError && addresses.length === 0,
    [isLoading, isError, addresses.length]
  );

  return {
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
  };
}
