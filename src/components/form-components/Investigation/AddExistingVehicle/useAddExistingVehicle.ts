import { useState } from 'react';

import type { ListVehiclesQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListVehiclesQuery,
  useUpdateInvestigationMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

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
  const [updateInvestigation] = useUpdateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added to the crime group! ',
          id: 'u0NtLP',
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
          where: {
            id: params.id || '',
          },
          data: {
            vehicleIds: [selected],

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
