import type { DateType } from 'types/DataType';

import React from 'react';

import View from './ArticlesSection.view';
import useArticlesSection from './useArticlesSection';

interface Props {
  adminRights: boolean;
  fullCreatedAtFilter: DateType | undefined;
  fullGallery: string[];
  fullGroupFilter: string[];
  fullSearch: string;
  saving: boolean;
}
const ArticlesSection = ({
  adminRights,
  fullCreatedAtFilter,
  fullGallery,
  fullGroupFilter,
  fullSearch,
  saving,
}: Props): JSX.Element => {
  const {
    data,
    fetchMoreScroll,
    loading,
    search,
    setSearch,
    sortFilter,
    toggleSortFilter,
  } = useArticlesSection({
    fullCreatedAtFilter,
    fullGallery,
    fullGroupFilter,
    fullSearch,
  });

  return (
    <View
      adminRights={adminRights}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      saving={saving}
      search={search}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
    />
  );
};

export default ArticlesSection;
