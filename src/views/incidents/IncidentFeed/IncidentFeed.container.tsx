import React from 'react';
import View from './IncidentFeed.view';
import useIncidentFeed from './useIncidentFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    setSearch,
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
    businesses,
    goods,
    goodsLoading,
    businessesLoading,
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
      setSearch={setSearch}
      variables={variables}
      crimeTypes={crimeTypes}
      tagsLoading={tagsLoading}
      updateIncidentList={updateIncidentList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      goods={goods}
      setGallery={setGallery}
      setPeculiarities={setPeculiarities}
      businesses={businesses}
      goodsLoading={goodsLoading}
      businessesLoading={businessesLoading}
      setCompactView={setCompactView}
      setTableView={setTableView}
      tableView={tableView}
    />
  );
};

export default IncidentFeed;
