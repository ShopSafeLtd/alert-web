import React, { useMemo } from 'react';

import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import View from './ArticlesSection.view';
import useArticlesSection from './useArticlesSection';

const ArticlesSection = (): JSX.Element => {
  const {
    variables: {
      search: fullSearch,
      groups: fullGroupFilter,
      createdAt: fullCreatedAtFilter,
      gallery: fullGallery,
    },
    saving,
    getWidth,
    layout,
  } = useDashboardContext();
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

  const width = useMemo(() => getWidth('articlesSection'), [layout]);

  return (
    <View
      width={width}
      data={data}
      loading={loading}
      saving={saving}
      search={search}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      fetchMoreScroll={fetchMoreScroll}
    />
  );
};

export default ArticlesSection;
