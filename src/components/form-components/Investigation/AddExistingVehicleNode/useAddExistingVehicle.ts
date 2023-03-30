import { useState } from 'react';

import type { ListVehiclesQuery } from 'graphql/generated';
import { QueryMode, SortOrder, useListVehiclesQuery } from 'graphql/generated';
import type { Vehicle } from '../../../react-flow/nodes/vehicle-node';

interface Props {
  onClose: () => void;
  onSubmit: (value: Vehicle) => void;
  investigationId: string;
}

interface Return {
  onSubmitButton: () => void;
  saving: boolean;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const useAddExistingVehicle = ({
  onClose,
  onSubmit,
  investigationId,
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
        investigations: {
          some: {
            id: {
              equals: investigationId,
            },
          },
        },
        // schemes: {
        //   some: {
        //     id: {
        //       equals: schemeId,
        //     },
        //   },
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
    onSubmitButton,
    saving,
    data,
    loading: data?.listVehicles ? false : loading,
    search,
    setSearch,
    onSelect,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingVehicle;
