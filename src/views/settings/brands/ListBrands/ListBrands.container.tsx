import React from 'react';
import View from './ListBrands.view';
import useBrandList from './useListBrands';

const BrandList = (): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,

    addBrand,
    toggleAddBrand,
    updateNewBrandList,
    saving,
    onDelete,
    brandId,
    setBrandId,
  } = useBrandList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addBrand={addBrand}
      toggleAddBrand={toggleAddBrand}
      updateNewBrandList={updateNewBrandList}
      saving={saving}
      onDelete={onDelete}
      brandId={brandId}
      setBrandId={setBrandId}
    />
  );
};

export default BrandList;
