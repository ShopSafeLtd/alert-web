import { useState } from 'react';

import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
  useUpdateInvestigationMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  crimeGroupIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onSelect: (item: { key: string }) => void;
}

const useAddExistingCrimeGroup = ({
  onClose,
  crimeGroupIds,
}: Props): Return => {
  const params = useParams();
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        id: { notIn: crimeGroupIds },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        OR: [
          {
            id: {
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
          defaultMessage: 'The vehicle has been added to the crime group.',
          id: 'FZF+UQ',
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
    const selectedData = data?.listCrimeGroups.crimeGroups.find(
      (el) => el.id === selected
    );
    if (selectedData) {
      void updateInvestigation({
        variables: {
          where: {
            id: params.id || '',
          },
          data: {
            incidentIds: [selectedData.id],

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
    loading: data?.listCrimeGroups ? false : loading,
    search,
    setSearch,
    onSelect,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingCrimeGroup;
