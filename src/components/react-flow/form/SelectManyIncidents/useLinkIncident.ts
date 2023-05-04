import { useCallback, useState } from 'react';

import {
  ListIncidentsQuery,
  QueryMode,
  SortOrder,
  useListIncidentsFlowLazyQuery,
  useListIncidentsQuery,
} from 'graphql/generated';

import { useStoreActions, useStoreState } from 'state';
import { IncidentTable } from './LinkIncident.view';
import { Incident } from 'components/react-flow/nodes/list-incidents-node';

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
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.incidents.order);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
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
    onCompleted: (data) => {
      onSelect(
        data.incidents.map((row) => ({
          dayTime: row?.dayTime || '',
          description: row?.subject || '',
          id: row?.id || '',
        }))
      );
      +setSaving(false);
      onClose();
    },
  });

  const onSubmit = useCallback(() => {
    setSaving(true);
    getIncidentData({
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
