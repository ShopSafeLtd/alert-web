import React from 'react';

import View from './IncidentFeed.view';
import useIncidentFeed from './useIncidentFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    clearFilters,
    data,
    fetchMoreScroll,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    openLightbox,
    setCompactView,
    setGallery,
    setPeculiarities,
    setSearch,
    setTableView,
    sortFilter,
    tableView,
    toggleSortFilter,
    updateIncidentList,
    variables,
  } = useIncidentFeed();

  return (
    <View
      clearFilters={clearFilters}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      onNavigate={onNavigate}
      openLightbox={openLightbox}
      setCompactView={setCompactView}
      setGallery={setGallery}
      setPeculiarities={setPeculiarities}
      setSearch={setSearch}
      setTableView={setTableView}
      sortFilter={sortFilter}
      tableView={tableView}
      toggleSortFilter={toggleSortFilter}
      updateIncidentList={updateIncidentList}
      variables={variables}
    />
  );
};

export default IncidentFeed;
