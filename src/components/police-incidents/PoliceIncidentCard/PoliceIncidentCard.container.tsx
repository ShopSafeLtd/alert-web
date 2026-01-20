import React from 'react';

import type { PoliceIncidentCardFragment } from './__generated__/PoliceIncidentCard.fragment.generated';

import PoliceIncidentCard from './PoliceIncidentCard.view';

interface Props {
  compactView: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  sharedIncident: PoliceIncidentCardFragment;
}

const PoliceIncidentCardContainer = ({
  compactView,
  openLightbox,
  sharedIncident,
}: Props): JSX.Element => (
  <PoliceIncidentCard
    compactView={compactView}
    openLightbox={openLightbox}
    sharedIncident={sharedIncident}
  />
);

export default PoliceIncidentCardContainer;
