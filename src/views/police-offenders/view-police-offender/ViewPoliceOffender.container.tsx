import React from 'react';

import ViewPoliceOffender from './ViewPoliceOffender.view';
import useViewPoliceOffender from './useViewPoliceOffender';

const ViewPoliceOffenderContainer = (): JSX.Element => {
  const {
    data,
    error,
    incidents,
    lightBoxOpen,
    lightboxElements,
    loading,
    offenderId,
    openLightbox,
    setLightBoxOpen,
  } = useViewPoliceOffender();

  return (
    <ViewPoliceOffender
      data={data}
      error={error}
      incidents={incidents}
      lightBoxOpen={lightBoxOpen}
      lightboxElements={lightboxElements}
      loading={loading}
      offenderId={offenderId}
      openLightbox={openLightbox}
      setLightBoxOpen={setLightBoxOpen}
    />
  );
};

export default ViewPoliceOffenderContainer;
