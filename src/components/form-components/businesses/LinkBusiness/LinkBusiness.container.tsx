import React from 'react';
import View from './LinkBusiness.view';
import useAddBusiness from './useLinkBusiness';

interface Props {
  onClose: () => void;
}

const AddBusiness = ({ onClose }: Props) => {
  const {
    onSubmit,
    saving,
    currentPage,
    currentPageSize,
    data,
    loading,
    onPaginationChange,
    onSearchBusiness,
    selectedValue,
    searchValue,
    onTableChange,
  } = useAddBusiness({ onClose });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      data={data}
      loading={loading}
      onPaginationChange={onPaginationChange}
      onSearchBusiness={onSearchBusiness}
      onTableChange={onTableChange}
      searchValue={searchValue}
      selectedValue={selectedValue}
    />
  );
};

export default AddBusiness;
