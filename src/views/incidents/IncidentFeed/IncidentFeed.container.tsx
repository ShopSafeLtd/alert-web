import React from 'react';
import View from './IncidentFeed.view';
import useIncidentFeed from './useIncidentFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    // onPaginationChange,
    // pagination,
    order,
    setOrder,
    search,
    setSearch,
    groups,
    groupsLoading,
    crimeTypes,
    tagsLoading,
    updateIncidentList,
    lightBoxOpen,
    onNavigate,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    gallery,
    peculiarities,
    setGallery,
    setPeculiarities,
    groupsFilter,
    setGroupsFilter,
    businesses,
    businessesFilter,
    goods,
    goodsFilter,
    setCrimeTypesFilter,
    setGoodsFilter,
    setBusinessesFilter,
    crimeTypesFilter,
    goodsLoading,
    businessesLoading,
    setIncidentDateFilter,
    setCreatedAtFilter,
    fetchMoreScroll,
  } = useIncidentFeed();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      // onPaginationChange={onPaginationChange}
      // pagination={pagination}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      groups={groups}
      groupsLoading={groupsLoading}
      // onGroupsChange={onGroupsChange}
      // variables={variables}
      crimeTypes={crimeTypes}
      // onCrimeTypesChange={onCrimeTypesChange}
      tagsLoading={tagsLoading}
      updateIncidentList={updateIncidentList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      gallery={gallery}
      groupsFilter={groupsFilter}
      setCrimeTypesFilter={setCrimeTypesFilter}
      crimeTypesFilter={crimeTypesFilter}
      peculiarities={peculiarities}
      setGoodsFilter={setGoodsFilter}
      goodsFilter={goodsFilter}
      goods={goods}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setPeculiarities={setPeculiarities}
      businessesFilter={businessesFilter}
      businesses={businesses}
      setBusinessesFilter={setBusinessesFilter}
      goodsLoading={goodsLoading}
      businessesLoading={businessesLoading}
      setIncidentDateFilter={setIncidentDateFilter}
      setCreatedAtFilter={setCreatedAtFilter}
    />
  );
};

export default IncidentFeed;
