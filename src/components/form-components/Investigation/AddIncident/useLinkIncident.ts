import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';

import { notification } from 'antd';
import { useListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import { useUpdateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/update-investigation.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  incidentIds: string[] | undefined;
  onClose: () => void;
}

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useLinkIncident = ({ incidentIds, onClose }: Props): Return => {
  const params = useParams();
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.incidents.order);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const { data, loading } = useListIncidentsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        createdAt: SortOrder.Desc,
      },
      scheme: {
        id: schemeId,
      },
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      where: {
        OR: [
          {
            subject: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            createdBy: {
              OR: [
                {
                  fullName: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  organisation: {
                    contains: variables.search,
                    mode: QueryMode.Insensitive,
                  },
                },
              ],
            },
          },
        ],
        id: {
          notIn: incidentIds,
        },
      },
    },
  });

  const onPaginationChange = (page: number) => {
    setIncidentsState({
      order,
      pagination: {
        ...pagination,
        page,
      },
      variables,
    });
  };
  const setSearch = (value: string) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        search: value,
      },
    });
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
            incidentIds: [selected],

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

  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };

  return {
    data,
    loading: data?.listIncidents ? false : loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    saving,
    search: variables.search,
    setSearch,
  };
};

export default useLinkIncident;
