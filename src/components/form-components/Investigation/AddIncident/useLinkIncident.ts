import { useState } from 'react';

import type { ListIncidentsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
  useUpdateInvestigationMutation,
} from 'graphql/generated';

import { useStoreActions, useStoreState } from 'state';
import { notification } from 'antd';
import { useParams } from 'react-router';

interface Props {
  onClose: () => void;
  incidentIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
}

const useLinkIncident = ({ onClose, incidentIds }: Props): Return => {
  const params = useParams();

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
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        id: {
          notIn: incidentIds,
        },
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
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number) => {
    setIncidentsState({
      pagination: {
        ...pagination,
        page,
      },
      variables,
      order,
    });
  };
  const setSearch = (value: string) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };
  const [updateInvestigation] = useUpdateInvestigationMutation({
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
      void updateInvestigation({
        variables: {
          where: {
            id: params.id || '',
          },
          data: {
            incidentIds: [selected],

            // schemes: schemeId,
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
    onSubmit,
    saving,
    data,
    loading: data?.listIncidents ? false : loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    onSelect,
  };
};

export default useLinkIncident;
