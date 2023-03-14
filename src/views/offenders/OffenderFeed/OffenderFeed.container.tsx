import React from 'react';
import View from './OffenderFeed.view';
import useIncidentFeed from './useOffenderFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    data,
    loading,
    lightboxElements,
    openLightbox,
    onPaginationChange,
    pagination,
    order,
    setOrder,
    search,
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
    age,
    build,
    clearFilters,
    ethnicity,
    gallery,
    groupsFilter,
    hair,
    peculiarities,
    setAge,
    setBuild,
    setEthnicity,
    setGallery,
    setGroupsFilter,
    setHair,
    setPeculiarities,
    setSex,
    setWarnings,
    sex,
    warnings,
    businessData,
    businesses,
    setBusinesses,
  } = useIncidentFeed();
  return (
    <View
      lightBoxOpen={lightBoxOpen}
      data={data}
      loading={loading}
      lightboxElements={lightboxElements}
      openLightbox={openLightbox}
      onPaginationChange={onPaginationChange}
      pagination={pagination}
      order={order}
      setOrder={setOrder}
      search={search}
      setSearch={setSearch}
      groups={groups}
      groupsLoading={groupsLoading}
      tags={tags}
      tagsLoading={tagsLoading}
      updateOffenderList={updateOffenderList}
      onNavigate={onNavigate}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      age={age}
      build={build}
      clearFilters={clearFilters}
      ethnicity={ethnicity}
      gallery={gallery}
      groupsFilter={groupsFilter}
      hair={hair}
      peculiarities={peculiarities}
      setAge={setAge}
      setBuild={setBuild}
      setEthnicity={setEthnicity}
      setGallery={setGallery}
      setGroupsFilter={setGroupsFilter}
      setHair={setHair}
      setPeculiarities={setPeculiarities}
      setSex={setSex}
      setWarnings={setWarnings}
      sex={sex}
      warnings={warnings}
      businessData={businessData}
      businesses={businesses}
      setBusinesses={setBusinesses}
    />
  );
};

export default IncidentFeed;
