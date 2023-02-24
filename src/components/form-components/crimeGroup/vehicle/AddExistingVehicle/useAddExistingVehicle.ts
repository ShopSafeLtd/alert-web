import { useState } from 'react';

import {
  ListVehiclesQuery,
  QueryMode,
  SortOrder,
  useListVehiclesQuery,
  useUpdateCrimeGroupMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import { useParams } from 'react-router';

interface Props {
  onClose: () => void;
  // update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const useAddExistingVehicle = ({
  onClose,
  // update,
  vehicleIds,
}: Props): Return => {
  const params = useParams();
  const [saving, setSaving] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        id: { notIn: vehicleIds },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
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
  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The vehicle has been added to the crime group! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      updateCrimeGroup({
        variables: {
          where: {
            id: params.id || '',
          },
          data: {
            vehicles: {
              connect: [{ id: selected }],
            },
            // schemes: schemeId,
          },
        },
      });
    }

    setSaving(false);
    onClose();
  };

  // const openLightbox = (index: number) => {
  //   setLightBoxOpen({ open: !lightBoxOpen.open, index });
  // };

  return {
    onSubmit,
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
