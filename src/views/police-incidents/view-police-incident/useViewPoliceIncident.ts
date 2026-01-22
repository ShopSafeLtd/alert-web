import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { GetSharedIncidentQuery } from '../graphql/queries/__generated__/get-shared-incident.generated';

import { useGetSharedIncidentQuery } from '../graphql/queries/__generated__/get-shared-incident.generated';

interface Return {
  data: GetSharedIncidentQuery | undefined;
  error: Error | undefined;
  incidentId: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setLightBoxOpen: (value: { index: number; open: boolean }) => void;
}

const useViewPoliceIncident = (): Return => {
  const { id } = useParams<{ id: string }>();
  const incidentId = id || '';

  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  const { data, error, loading } = useGetSharedIncidentQuery({
    fetchPolicy: 'cache-and-network',
    skip: !incidentId,
    variables: {
      id: incidentId,
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
    incidentId,
    lightBoxOpen,
    lightboxElements,
    loading,
    openLightbox,
    setLightBoxOpen,
  };
};

export default useViewPoliceIncident;
