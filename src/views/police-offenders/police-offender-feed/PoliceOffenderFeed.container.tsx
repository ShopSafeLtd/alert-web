import React from 'react';

import PoliceOffenderFeed from './PoliceOffenderFeed.view';
import usePoliceOffenderFeed from './usePoliceOffenderFeed';

const PoliceOffenderFeedContainer = (): JSX.Element => {
  const {
    customDateRange,
    data,
    dateFilter,
    fetchMoreScroll,
    geographicalFilter,
    hasImageFilter,
    hasNameFilter,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    priorityFilter,
    search,
    setCustomDateRange,
    setDateFilter,
    setGeographicalFilter,
    setHasImageFilter,
    setHasNameFilter,
    setPriorityFilter,
    setSearch,
    setSortBy,
    sortBy,
  } = usePoliceOffenderFeed();

  return (
    <PoliceOffenderFeed
      customDateRange={customDateRange}
      data={data}
      dateFilter={dateFilter}
      fetchMoreScroll={fetchMoreScroll}
      geographicalFilter={geographicalFilter}
      hasImageFilter={hasImageFilter}
      hasNameFilter={hasNameFilter}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      openLightbox={openLightbox}
      priorityFilter={priorityFilter}
      search={search}
      setCustomDateRange={setCustomDateRange}
      setDateFilter={setDateFilter}
      setGeographicalFilter={setGeographicalFilter}
      setHasImageFilter={setHasImageFilter}
      setHasNameFilter={setHasNameFilter}
      setPriorityFilter={setPriorityFilter}
      setSearch={setSearch}
      setSortBy={setSortBy}
      sortBy={sortBy}
    />
  );
};

export default PoliceOffenderFeedContainer;
