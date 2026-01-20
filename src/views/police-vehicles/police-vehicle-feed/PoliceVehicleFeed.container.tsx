import React from 'react';

import PoliceVehicleFeed from './PoliceVehicleFeed.view';
import usePoliceVehicleFeed from './usePoliceVehicleFeed';

const PoliceVehicleFeedContainer = (): JSX.Element => {
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
    setSearch,
    setTableView,
    tableView: _tableView,
  } = usePoliceVehicleFeed();

  return (
    <PoliceVehicleFeed
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
      setSearch={setSearch}
      setTableView={setTableView}
    />
  );
};

export default PoliceVehicleFeedContainer;
