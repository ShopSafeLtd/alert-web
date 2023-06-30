import { useEffect, useState } from 'react';

import type {
  Age,
  Build,
  Gender,
  ListOffendersQuery,
  Race,
} from 'graphql/generated';
import { SortOrder, useListOffendersQuery } from 'graphql/generated';
import { useStoreState } from 'state';

export interface Offender {
  images:
    | {
        id: string;
        optimisedPersisted: string;
      }[]
    | null
    | undefined;
  id: string;

  name?: string | null | undefined;
  totalIncidents?: number;
  reference?: number | null | undefined;
  updatedAt?: Date | null | undefined;
  age?: Age | null | undefined;
  dateOfBirth?: Date | null | undefined;
  build?: Build | null | undefined;
  gender?: Gender | null | undefined;
  race?: Race | null | undefined;
}

interface Props {
  onClose: () => void;
  onSelect: (offender: Offender) => void;
  investigationId: string;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const useSelectExistingOffender = ({
  onClose,
  investigationId,
  onSelect,
}: Props): Return => {
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        investigations: {
          some: {
            id: {
              equals: investigationId,
            },
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const onSubmit = () => {
    if (
      data?.listOffenders?.offenders &&
      data.listOffenders.offenders.length > 0 &&
      selectedOffender
    ) {
      onSelect(selectedOffender as Offender);
    }
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  useEffect(() => {
    if (currentId) {
      setSelectedOffender(
        data?.listOffenders?.offenders.find(
          (offender) => offender.id === currentId
        )
      );
    }
  }, [currentId]);
  return {
    onSubmit,
    data,
    loading: data?.listOffenders ? false : loading,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    selectedOffender,
  };
};

export default useSelectExistingOffender;
