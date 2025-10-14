import type { ArticleData } from 'types/DataType';

import React from 'react';

import View from './LinkArticle.view';
import useLinkArticle from './useLinkArticle';

interface Props {
  articleIds: string[] | undefined;
  onClose: () => void;
  update: (value: ArticleData) => void;
}

const LinkArticle = ({ articleIds, onClose, update }: Props): JSX.Element => {
  const {
    clearFilters,
    data,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    lightBoxOpen,
    loading,
    onSubmit,
    openLightbox,
    selectedArticle,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setPriorityFilter,
    setSearch,
    setSelectedArticle,
  } = useLinkArticle({ articleIds, onClose, update });

  return (
    <View
      clearFilters={clearFilters}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      filterVariables={filterVariables}
      groups={groups}
      groupsLoading={groupsLoading}
      lightBoxOpen={lightBoxOpen}
      loading={loading}
      onSubmit={onSubmit}
      openLightbox={openLightbox}
      selectedArticle={selectedArticle}
      setCreatedAtFilter={setCreatedAtFilter}
      setGroupsFilter={setGroupsFilter}
      setOrder={setOrder}
      setPriorityFilter={setPriorityFilter}
      setSearch={setSearch}
      setSelectedArticle={setSelectedArticle}
    />
  );
};

export default LinkArticle;
