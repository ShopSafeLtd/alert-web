import React from 'react';
import type { ArticleData } from 'types/DataType';
import View from './LinkArticle.view';
import useLinkArticle from './useLinkArticle';

interface Props {
  onClose: () => void;
  update: (value: ArticleData) => void;
  articleIds: string[] | undefined;
}

const LinkArticle = ({ onClose, update, articleIds }: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    setSearch,
    selectedArticle,
    setSelectedArticle,
    openLightbox,
    lightBoxOpen,
    filterVariables,
    setOrder,
    setGroupsFilter,
    setCreatedAtFilter,
    groups,
    groupsLoading,
    clearFilters,
    fetchMoreScroll,
    setPriorityFilter,
  } = useLinkArticle({ onClose, update, articleIds });

  return (
    <View
      onSubmit={onSubmit}
      data={data}
      loading={loading}
      setSearch={setSearch}
      selectedArticle={selectedArticle}
      setSelectedArticle={setSelectedArticle}
      openLightbox={openLightbox}
      lightBoxOpen={lightBoxOpen}
      filterVariables={filterVariables}
      setOrder={setOrder}
      setGroupsFilter={setGroupsFilter}
      setCreatedAtFilter={setCreatedAtFilter}
      groups={groups}
      groupsLoading={groupsLoading}
      clearFilters={clearFilters}
      fetchMoreScroll={fetchMoreScroll}
      setPriorityFilter={setPriorityFilter}
    />
  );
};

export default LinkArticle;
