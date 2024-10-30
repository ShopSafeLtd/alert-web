import React from 'react';

import View from './LinkBusiness.view';
import useAddBusiness from './useLinkBusiness';

interface Props {
  onClose: () => void;
  saving: boolean;
  update: (value: string) => void;
}

const AddBusiness = ({ onClose, saving: origSaving, update }: Props) => {
  const {
    data,
    loading,
    onSearchBusiness,
    onSelect,
    onSubmit,
    pagination,
    resetPage,
    saving,
    searchValue,
    setPagination,
  } = useAddBusiness({ onClose, update });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
      onSelect={onSelect}
      onSubmit={onSubmit}
      pagination={pagination}
      resetPage={resetPage}
      saving={saving || origSaving}
      searchValue={searchValue}
      setPagination={setPagination}
    />
  );
};

export default AddBusiness;
