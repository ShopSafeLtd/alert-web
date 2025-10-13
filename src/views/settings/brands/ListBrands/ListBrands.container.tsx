import React from 'react';

import View from './ListBrands.view';
import useBrandList from './useListBrands';

const BrandList = (): JSX.Element => {
  const {
    addBrand,
    brandId,
    data,
    loading,
    onDelete,
    saving,
    search,
    setBrandId,
    setSearch,
    toggleAddBrand,
    updateNewBrandList,
  } = useBrandList();
  return (
    <View
      addBrand={addBrand}
      brandId={brandId}
      data={data}
      loading={loading}
      onDelete={onDelete}
      saving={saving}
      search={search}
      setBrandId={setBrandId}
      setSearch={setSearch}
      toggleAddBrand={toggleAddBrand}
      updateNewBrandList={updateNewBrandList}
    />
  );
};

export default BrandList;
