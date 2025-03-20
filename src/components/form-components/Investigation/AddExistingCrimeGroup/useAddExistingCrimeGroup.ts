import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { notification } from 'antd';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { useUpdateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/update-investigation.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  crimeGroupIds: string[] | undefined;
  onClose: () => void;
}

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useAddExistingCrimeGroup = ({
  crimeGroupIds,
  onClose,
}: Props): Return => {
  const params = useParams();
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        OR: [
          {
            id: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
        id: { notIn: crimeGroupIds },
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
          defaultMessage: 'The vehicle has been added to the crime group.',
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
    const selectedData = data?.listCrimeGroups.crimeGroups.find(
      (el) => el.id === selected
    );
    if (selectedData) {
      void updateInvestigation({
        variables: {
          data: {
            incidentIds: [selectedData.id],

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
    loading: data?.listCrimeGroups ? false : loading,
    onSelect,
    onSubmit,
    saving,
    search,
    setSearch,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingCrimeGroup;
