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
    onGroupsChange,
    variables,
    tags,
    onTagsChange,
    tagsLoading,
    updateOffenderList,
    onNavigate,
    lightBoxOpen,
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
      onGroupsChange={onGroupsChange}
      variables={variables}
      tags={tags}
      onTagsChange={onTagsChange}
      tagsLoading={tagsLoading}
      updateOffenderList={updateOffenderList}
      onNavigate={onNavigate}
    />
  );
};

export default IncidentFeed;
