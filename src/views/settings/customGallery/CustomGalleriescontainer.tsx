import React from 'react';

import View from './CustomGalleries.view';
import useCustomGalleries from './useCustomGalleries';

const CustomGalleries = (): JSX.Element => {
  const {
    addCustomGallery,
    data,
    deleteConfirm,
    editCustomGallery,

    loading,
    onAddCustomGallery,
    onEditCustomGallery,
    saving,
    search,
    setEditCustomGallery,
    setSearch,
    toggleAddCustomGallery,
  } = useCustomGalleries();
  return (
    <View
      addCustomGallery={addCustomGallery}
      data={data}
      deleteConfirm={deleteConfirm}
      editCustomGallery={editCustomGallery}
      loading={loading}
      onAddCustomGallery={onAddCustomGallery}
      onEditCustomGallery={onEditCustomGallery}
      saving={saving}
      search={search}
      setEditCustomGallery={setEditCustomGallery}
      setSearch={setSearch}
      toggleAddCustomGallery={toggleAddCustomGallery}
    />
  );
};

export default CustomGalleries;
