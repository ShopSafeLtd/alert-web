import React from 'react';
import View from './OffenderFeed.view';
import useOffenderFeed from './useOffenderFeed';

const OffenderFeed = (): JSX.Element => {
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
    tags,
    tagsLoading,
    updateOffenderList,
    onNavigate,
    lightBoxOpen,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setAge,
    setBuild,
    setEthnicity,
    setGallery,
    setGroupsFilter,
    setHair,
    setPeculiarities,
    setSex,
    setWarnings,
    businessData,
    setBusinesses,
    businessesLoading,
    setCreatedAtFilter,
    customGalleriesData,
    onSelectGallery,
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
      order={order}
      setOrder={setOrder}
      setSearch={setSearch}
      groups={groups}
      groupsLoading={groupsLoading}
      tags={tags}
      tagsLoading={tagsLoading}
      updateOffenderList={updateOffenderList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      setAge={setAge}
      setBuild={setBuild}
      setEthnicity={setEthnicity}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      setSex={setSex}
      setWarnings={setWarnings}
      businessData={businessData}
      setBusinesses={setBusinesses}
      businessesLoading={businessesLoading}
      setCreatedAtFilter={setCreatedAtFilter}
      customGalleriesData={customGalleriesData}
      onSelectGallery={onSelectGallery}
      adminRights={adminRights}
      onSelectCustomGalleries={onSelectCustomGalleries}
      variables={variables}
      setCompactView={setCompactView}
    />
  );
};

export default OffenderFeed;
