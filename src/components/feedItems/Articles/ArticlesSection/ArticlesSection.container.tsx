import React from 'react';
import type { DateType } from 'types/DataType';

import View from './ArticlesSection.view';
import useArticlesSection from './useArticlesSection';

interface Props {
  fullSearch: string;
  searchMydata: boolean;
  fullCreatedAtFilter: DateType | undefined;
  fullGroupFilter: string[];
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  adminRights: boolean;
}
const ArticlesSection = ({
  fullSearch,
  searchMydata,
  fullCreatedAtFilter,
  saving,
  groups,
  groupsLoading,
  adminRights,
  fullGroupFilter,
}: Props): JSX.Element => {
  const {
    data,
    loading,
    setSearch,
    search,
    onPaginationChange,
    currentPage,
    currentPageSize,
    priorityFilter,
    setPriorityFilter,
    groupsFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    order,
    setOrder,
    setCreatedAtFilter,
  } = useArticlesSection({
    fullSearch,
    fullGroupFilter,
    searchMydata,
    fullCreatedAtFilter,
  });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      search={search}
      setSearch={setSearch}
      onPaginationChange={onPaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      order={order}
      setOrder={setOrder}
      groups={groups}
      groupsLoading={groupsLoading}
      setCreatedAtFilter={setCreatedAtFilter}
      priorityFilter={priorityFilter}
      setPriorityFilter={setPriorityFilter}
      groupsFilter={groupsFilter}
      setGroupsFilter={setGroupsFilter}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      clearFilters={clearFilters}
      adminRights={adminRights}
    />
  );
};

export default ArticlesSection;
