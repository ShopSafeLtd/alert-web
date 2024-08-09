import type { ListOffendersSelectQuery } from 'graphql/offenders/queries/__generated__/list-offenders-select.generated';
import type { Age, Build, Gender, Race } from 'graphql/types';

import { useListOffendersSelectQuery } from 'graphql/offenders/queries/__generated__/list-offenders-select.generated';
import { SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';

export interface Offender {
  age?: Age | null | undefined;
  build?: Build | null | undefined;

  dateOfBirth?: Date | null | undefined;
  gender?: Gender | null | undefined;
  id: string;
  images:
    | {
        id: string;
        optimisedPersisted: string;
      }[]
    | null
    | undefined;
  name?: null | string | undefined;
  race?: Race | null | undefined;
  reference?: null | number | undefined;
  totalIncidents?: number;
  updatedAt?: Date | null | undefined;
}

interface Props {
  investigationId: string;
  onClose: () => void;
  onSelect: (offender: Offender) => void;
}

interface Return {
  data: ListOffendersSelectQuery | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSubmit: (value: string | undefined) => void;
  openLightbox: (index: number) => void;
  selectedOffender:
    | Exclude<
        ListOffendersSelectQuery['listOffenders'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined;
  setCurrentId: (value: string | undefined) => void;
}

const useSelectExistingOffender = ({
  investigationId,
  onClose,
  onSelect,
}: Props): Return => {
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersSelectQuery['listOffenders'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const { data, loading } = useListOffendersSelectQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      scheme: {
        id: schemeId,
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
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
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
    data,
    lightBoxOpen,
    loading: data?.listOffenders ? false : loading,
    onSubmit,
    openLightbox,
    selectedOffender,
    setCurrentId,
  };
};

export default useSelectExistingOffender;
