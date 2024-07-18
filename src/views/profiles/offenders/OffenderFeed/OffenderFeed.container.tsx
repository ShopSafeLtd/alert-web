import React from 'react';

import View from './OffenderFeed.view';
import useOffenderFeed from './useOffenderFeed';

const OffenderFeed = (): JSX.Element => {
  const {
    customGalleriesData,
    data,
    fetchMoreScroll,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    // adminRights,
    onSelectCustomGalleries,
    openLightbox,
    setCompactView,
    setGallery,
    setSearch,
    // onSelectGallery,
    setTableView,
    sortFilter,
    tableView,
    toggleSortFilter,
    updateOffenderList,
    variables,
  } = useOffenderFeed();

  return (
    <View
      customGalleriesData={customGalleriesData}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      onNavigate={onNavigate}
      // adminRights={adminRights}
      onSelectCustomGalleries={onSelectCustomGalleries}
      openLightbox={openLightbox}
      setCompactView={setCompactView}
      setGallery={setGallery}
      setSearch={setSearch}
      setTableView={setTableView}
      // onSelectGallery={onSelectGallery}
      sortFilter={sortFilter}
      tableView={tableView}
      toggleSortFilter={toggleSortFilter}
      updateOffenderList={updateOffenderList}
      variables={variables}
    />
  );
};

export default OffenderFeed;
