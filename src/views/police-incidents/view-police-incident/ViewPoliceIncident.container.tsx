import React from 'react';

import ViewPoliceIncident from './ViewPoliceIncident.view';
import useViewPoliceIncident from './useViewPoliceIncident';

const ViewPoliceIncidentContainer = (): JSX.Element => {
  const {
    data,
    error,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    setLightBoxOpen,
  } = useViewPoliceIncident();

  return (
    <ViewPoliceIncident
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

export default ViewPoliceIncidentContainer;
