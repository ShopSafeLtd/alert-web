import React from 'react';

import ViewPoliceVehicle from './ViewPoliceVehicle.view';
import useViewPoliceVehicle from './useViewPoliceVehicle';

const ViewPoliceVehicleContainer = (): JSX.Element => {
  const {
    data,
    error,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    setLightBoxOpen,
  } = useViewPoliceVehicle();

  return (
    <ViewPoliceVehicle
      data={data}
      error={error}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      openLightbox={openLightbox}
      setLightBoxOpen={setLightBoxOpen}
    />
  );
};

export default ViewPoliceVehicleContainer;
