import React from 'react';
import View from './IncidentFeed.view';
import useIncidentFeed from './useIncidentFeed';

const IncidentFeed = (): JSX.Element => {
  const {
    data,
    // loading,
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
    onGroupsChange,
    variables,
    crimeTypes,
    onCrimeTypesChange,
    tagsLoading,
    updateIncidentList,
    onNavigate,
    loading,
  } = useIncidentFeed();

  return (
    <View
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
      onGroupsChange={onGroupsChange}
      variables={variables}
      crimeTypes={crimeTypes}
      onCrimeTypesChange={onCrimeTypesChange}
      tagsLoading={tagsLoading}
      updateIncidentList={updateIncidentList}
      onNavigate={onNavigate}
    />
  );
};

export default IncidentFeed;
