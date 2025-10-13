import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import React, { useMemo } from 'react';

import View from './ArticlesSection.view';
import useArticlesSection from './useArticlesSection';

const ArticlesSection = (): JSX.Element => {
  const {
    getWidth,
    layout,
    saving,
    variables: {
      createdAt: fullCreatedAtFilter,
      gallery: fullGallery,
      groups: fullGroupFilter,
      search: fullSearch,
    },
  } = useDashboardContext();
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

  const width = useMemo(() => getWidth('articlesSection'), [layout]);

  return (
    <View
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      loading={loading}
      saving={saving}
      search={search}
      setSearch={setSearch}
      sortFilter={sortFilter}
      toggleSortFilter={toggleSortFilter}
      width={width}
    />
  );
};

export default ArticlesSection;
