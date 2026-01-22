import React from 'react';

import type { PoliceVehicleCardFragment } from './__generated__/PoliceVehicleCard.fragment.generated';

import PoliceVehicleCard from './PoliceVehicleCard.view';

interface Props {
  compactView?: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  sharedVehicle: PoliceVehicleCardFragment;
}

const PoliceVehicleCardContainer = ({
  compactView,
  openLightbox,
  sharedVehicle,
}: Props): JSX.Element => (
  <PoliceVehicleCard
    compactView={compactView}
    openLightbox={openLightbox}
    sharedVehicle={sharedVehicle}
  />
);

export default PoliceVehicleCardContainer;
