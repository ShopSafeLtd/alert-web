import React from 'react';
import type { DateType } from 'types/DataType';

import View from './ArticlesSection.view';
import useArticlesSection from './useArticlesSection';

interface Props {
  fullSearch: string;
  fullCreatedAtFilter: DateType | undefined;
  fullGroupFilter: string[];
  fullGallery: string[];
  saving: boolean;
  adminRights: boolean;
}
const ArticlesSection = ({
  fullSearch,
  fullCreatedAtFilter,
  saving,
  adminRights,
  fullGroupFilter,
  fullGallery,
}: Props): JSX.Element => {
  const {
    data,
    loading,
    search,
    setSearch,
    sortFilter,
    toggleSortFilter,
    fetchMoreScroll,
  } = useArticlesSection({
    fullSearch,
    fullGroupFilter,
    fullCreatedAtFilter,
    fullGallery,
  });

  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      search={search}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      fetchMoreScroll={fetchMoreScroll}
      adminRights={adminRights}
    />
  );
};

export default ArticlesSection;
