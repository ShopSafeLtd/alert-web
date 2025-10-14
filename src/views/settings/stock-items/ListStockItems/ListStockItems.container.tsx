import React from 'react';

import View from './ListStockItems.view';
import useListStockItems from './useListStockItems';

const ListStockItems = () => {
  const {
    brandFilter,
    businessFilter,
    clearAllFilters,
    data,
    divisionFilter,
    hasMore,
    loadMore,
    loading,
    onSearchChange,
    searchValue,
    setBrandFilter,
    setBusinessFilter,
    setDivisionFilter,
  } = useListStockItems();

  return (
    <View
      brandFilter={brandFilter}
      businessFilter={businessFilter}
      clearAllFilters={clearAllFilters}
      data={data}
      divisionFilter={divisionFilter}
      hasMore={hasMore}
      loadMore={loadMore}
      loading={loading}
      onSearchChange={onSearchChange}
      searchValue={searchValue}
      setBrandFilter={setBrandFilter}
      setBusinessFilter={setBusinessFilter}
      setDivisionFilter={setDivisionFilter}
    />
  );
};

export default ListStockItems;
