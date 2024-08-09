import type { Incident } from 'components/react-flow/nodes/list-incidents-node';
import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';

import { useListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import { useListIncidentsFlowLazyQuery } from 'graphql/incidents/queries/__generated__/list-incidents-flow.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useCallback, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

import type { IncidentTable } from './LinkIncident.view';

interface Props {
  ids?: string[];
  onClose: () => void;
  onSelect: (incidents: Incident[]) => void;
}

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  selectedRowKeys: React.Key[];

  setSearch: (value: string) => void;
}

const useLinkIncident = ({ ids, onClose, onSelect }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.incidents.order);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRowsData, setSelectedRowsData] = useState<IncidentTable[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, loading } = useListIncidentsQuery({
    fetchPolicy: 'cache-and-network',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onCompleted: (data) => {
      if (ids && data?.listIncidents?.incidents) {
        setSelectedRowKeys(ids);
      }
    },
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
                  businesses: {
                    some: {
                      name: {
                        contains: variables.search,
                        mode: QueryMode.Insensitive,
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  // const setInitialSelected = useCallback(() => {
  //   if (ids && data && data.listIncidents && data.listIncidents.incidents) {
  //     setSelectedRowKeys(ids);
  //   }
  // }, [data, ids]);

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

  const [getIncidentData] = useListIncidentsFlowLazyQuery({
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onCompleted: (data) => {
      onSelect(
        data.incidents.map((row) => ({
          dayTime: row?.dayTime || '',
          description: row?.subject || '',
          id: row?.id || '',
        }))
      );
      setSaving(false);
      onClose();
    },
    onError: () => {
      setSaving(false);
    },
  });

  const onSubmit = useCallback(() => {
    setSaving(true);
    void getIncidentData({
      variables: {
        where: {
          id: {
            in: selectedRowKeys as string[],
          },
        },
      },
    });
  }, [selectedRowKeys]);

  const onChange = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRowsData(selectedRows);
  };
  return {
    data,
    loading: data?.listIncidents ? false : loading,
    onChange,
    onPaginationChange,
    onSubmit,
    saving,
    search: variables.search,
    selectedRowKeys,
    setSearch,
  };
};

export default useLinkIncident;
