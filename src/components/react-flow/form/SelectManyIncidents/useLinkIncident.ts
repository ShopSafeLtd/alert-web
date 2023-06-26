import { useCallback, useState } from 'react';

import type { ListIncidentsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListIncidentsFlowLazyQuery,
  useListIncidentsQuery,
} from 'graphql/generated';

import { useStoreActions, useStoreState } from 'state';
import type { Incident } from 'components/react-flow/nodes/list-incidents-node';
import type { IncidentTable } from './LinkIncident.view';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident[]) => void;
  ids?: string[];
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedRowKeys: React.Key[];

  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => void;
}

const useLinkIncident = ({ onClose, onSelect, ids }: Props): Return => {
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
    fetchPolicy: 'cache-and-network',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    onCompleted: (data) => {
      if (ids && data && data.listIncidents && data.listIncidents.incidents) {
        setSelectedRowKeys(ids);
      }
    },
  });

  // const setInitialSelected = useCallback(() => {
  //   if (ids && data && data.listIncidents && data.listIncidents.incidents) {
  //     setSelectedRowKeys(ids);
  //   }
  // }, [data, ids]);

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
    onSubmit,
    saving,
    data,
    loading: data?.listIncidents ? false : loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    onChange,
    selectedRowKeys,
  };
};

export default useLinkIncident;
