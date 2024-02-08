import React from 'react';
import View from './OffenderFeed.view';
import useOffenderFeed from './useOffenderFeed';

const OffenderFeed = (): JSX.Element => {
  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    setSearch,
    updateOffenderList,
    onNavigate,
    lightBoxOpen,
    sortFilter,
    toggleSortFilter,
    setGallery,
    customGalleriesData,
    // onSelectGallery,
    adminRights,
    onSelectCustomGalleries,
    variables,
    fetchMoreScroll,
    setCompactView,
  } = useOffenderFeed();

  return (
    <View
      fetchMoreScroll={fetchMoreScroll}
      lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      setSearch={setSearch}
      updateOffenderList={updateOffenderList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      setGallery={setGallery}
      customGalleriesData={customGalleriesData}
      // onSelectGallery={onSelectGallery}
      adminRights={adminRights}
      onSelectCustomGalleries={onSelectCustomGalleries}
      variables={variables}
      setCompactView={setCompactView}
    />
  );
};

export default OffenderFeed;
