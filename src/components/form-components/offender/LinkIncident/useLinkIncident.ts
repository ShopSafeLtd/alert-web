import { useState } from 'react';

import {
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
  ListIncidentsQuery,
} from 'graphql/generated';

import { useStoreState, useStoreActions } from 'state';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
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

const useLinkIncident = ({ onClose, update, incidentIds }: Props): Return => {
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
        createdAt: SortOrder.Asc,
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
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      update(selected);
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
