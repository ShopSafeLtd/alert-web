import React from 'react';

import PoliceIncidentFeed from './PoliceIncidentFeed.view';
import usePoliceIncidentFeed from './usePoliceIncidentFeed';

const PoliceIncidentFeedContainer = (): JSX.Element => {
  const {
    compactView,
    data,
    fetchMoreScroll,
    geographicalFilter,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    search,
    setCompactView,
    setGeographicalFilter,
    setLightBoxOpen,
    setSearch,
    setTableView,
    tableView: _tableView,
  } = usePoliceIncidentFeed();

  return (
    <PoliceIncidentFeed
      compactView={compactView}
      data={data}
      fetchMoreScroll={fetchMoreScroll}
      geographicalFilter={geographicalFilter}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      openLightbox={openLightbox}
      search={search}
      setCompactView={setCompactView}
      setGeographicalFilter={setGeographicalFilter}
      setLightBoxOpen={setLightBoxOpen}
      setSearch={setSearch}
      setTableView={setTableView}
    />
  );
};

export default PoliceIncidentFeedContainer;
