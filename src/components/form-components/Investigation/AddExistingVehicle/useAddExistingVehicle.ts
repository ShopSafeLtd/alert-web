import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';

import { notification } from 'antd';
import { useUpdateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/update-investigation.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  onClose: () => void;
  // update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
}

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useAddExistingVehicle = ({
  onClose,
  // update,
  vehicleIds,
}: Props): Return => {
  const params = useParams();
  const intl = useIntl();
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
        id: { notIn: vehicleIds },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });
  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };
  const [updateInvestigation] = useUpdateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added to the crime group! ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),

        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      void updateInvestigation({
        variables: {
          data: {
            vehicleIds: [selected],

            // schemes: schemeId,
          },
          where: {
            id: params.id || '',
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
    data,
    loading: data?.listVehicles ? false : loading,
    onSelect,
    onSubmit,
    saving,
    search,
    setSearch,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingVehicle;
