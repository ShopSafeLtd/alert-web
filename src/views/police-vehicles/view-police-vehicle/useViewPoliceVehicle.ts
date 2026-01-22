import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { GetSharedVehicleQuery } from '../graphql/queries/__generated__/get-shared-vehicle.generated';

import { useGetSharedVehicleQuery } from '../graphql/queries/__generated__/get-shared-vehicle.generated';

interface Return {
  data: GetSharedVehicleQuery | undefined;
  error: Error | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setLightBoxOpen: (value: { index: number; open: boolean }) => void;
  vehicleId: string;
}

const useViewPoliceVehicle = (): Return => {
  const { id } = useParams<{ id: string }>();
  const vehicleId = id || '';

  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  const { data, error, loading } = useGetSharedVehicleQuery({
    fetchPolicy: 'cache-and-network',
    skip: !vehicleId,
    variables: {
      id: vehicleId,
    },
  });

  const openLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setLightBoxOpen({
      index,
      open: true,
    });
  };

  return {
    data,
    error: error as Error | undefined,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    setLightBoxOpen,
    vehicleId,
  };
};

export default useViewPoliceVehicle;
