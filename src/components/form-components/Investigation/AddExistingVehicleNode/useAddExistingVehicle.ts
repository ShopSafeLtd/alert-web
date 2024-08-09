import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';

import { QueryMode, SortOrder } from 'graphql/types';
import { useListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import { useState } from 'react';

import type { Vehicle } from '../../../react-flow/nodes/vehicle-node';

interface Props {
  investigationId: string;
  onClose: () => void;
  onSubmit: (value: Vehicle) => void;
}

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmitButton: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useAddExistingVehicle = ({
  investigationId,
  onClose,
  onSubmit,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        // },
        OR: [
          {
            make: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            model: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
        // schemes: {
        //   some: {
        //     id: {
        //       equals: schemeId,
        //     },
        //   },
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
  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };

  const onSubmitButton = () => {
    setSaving(true);
    if (selected) {
      onSubmit(
        data?.listVehicles?.vehicles.find(
          (item) => item.id === selected
        ) as Vehicle
      );
    }

    setSaving(false);
    onClose();
  };

  // const openLightbox = (index: number) => {
  //   setLightBoxOpen({ open: !lightBoxOpen.open, index });
  // };

  return {
    data,
    loading: data?.listVehicles ? false : loading,
    onSelect,
    onSubmitButton,
    saving,
    search,
    setSearch,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingVehicle;
