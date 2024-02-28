import React from 'react';
import View from './IncidentFeed.view';
import useIncidentFeed from './useIncidentFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    order,
    setOrder,
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
    setGallery,
    setPeculiarities,
    setGroupsFilter,
    businesses,
    goods,
    setCrimeTypesFilter,
    setGoodsFilter,
    setBusinessesFilter,
    goodsLoading,
    businessesLoading,
    setIncidentDateFilter,
    setCreatedAtFilter,
    fetchMoreScroll,
    variables,
    setCompactView,
    setTableView,
    tableView,
  } = useIncidentFeed();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      order={order}
      setOrder={setOrder}
      setSearch={setSearch}
      groups={groups}
      groupsLoading={groupsLoading}
      variables={variables}
      crimeTypes={crimeTypes}
      tagsLoading={tagsLoading}
      updateIncidentList={updateIncidentList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      setCrimeTypesFilter={setCrimeTypesFilter}
      setGoodsFilter={setGoodsFilter}
      goods={goods}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setPeculiarities={setPeculiarities}
      businesses={businesses}
      setBusinessesFilter={setBusinessesFilter}
      goodsLoading={goodsLoading}
      businessesLoading={businessesLoading}
      setIncidentDateFilter={setIncidentDateFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      setCompactView={setCompactView}
      setTableView={setTableView}
      tableView={tableView}
    />
  );
};

export default IncidentFeed;
