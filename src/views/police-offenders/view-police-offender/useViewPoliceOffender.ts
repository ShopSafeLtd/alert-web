import { useState } from 'react';
import { useParams } from 'react-router-dom';

import type { GetSharedOffenderQuery } from '../graphql/queries/__generated__/get-shared-offender.generated';

import { useGetSharedOffenderQuery } from '../graphql/queries/__generated__/get-shared-offender.generated';
import usePoliceOffenderIncidents, {
  type IncidentRow,
} from './usePoliceOffenderIncidents';

interface Return {
  data: GetSharedOffenderQuery | undefined;
  error: Error | undefined;
  incidents: IncidentRow[];
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: { src: string }[];
  loading: boolean;
  offenderId: string;
  openLightbox: (elements: { src: string }[], index: number) => void;
  setLightBoxOpen: (value: { index: number; open: boolean }) => void;
}

const useViewPoliceOffender = (): Return => {
  const { id } = useParams<{ id: string }>();
  const offenderId = id || '';

  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  const { data, error, loading } = useGetSharedOffenderQuery({
    fetchPolicy: 'cache-and-network',
    skip: !offenderId,
    variables: {
      id: offenderId,
    },
  });

  const openLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    setLightBoxOpen({
      index,
      open: true,
    });
  };

  // Get aggregated incidents from all linked offenders
  const { incidents } = usePoliceOffenderIncidents({
    sharedOffender: data?.sharedOffender,
  });

  return {
    data,
    error: error as Error | undefined,
    incidents,
    lightBoxOpen,
    lightboxElements,
    loading,
    offenderId,
    openLightbox,
    setLightBoxOpen,
  };
};

export default useViewPoliceOffender;
