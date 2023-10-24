import React from 'react';
import View from './CustomGalleries.view';
import useCustomGalleries from './useCustomGalleries';

const CustomGalleries = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,

    editCustomGallery,
    setEditCustomGallery,
    addCustomGallery,
    toggleAddCustomGallery,
    onAddCustomGallery,
    saving,
    deleteConfirm,
    onEditCustomGallery,
  } = useCustomGalleries();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      editCustomGallery={editCustomGallery}
      setEditCustomGallery={setEditCustomGallery}
      addCustomGallery={addCustomGallery}
      toggleAddCustomGallery={toggleAddCustomGallery}
      onAddCustomGallery={onAddCustomGallery}
      saving={saving}
      deleteConfirm={deleteConfirm}
      onEditCustomGallery={onEditCustomGallery}
    />
  );
};

export default CustomGalleries;
