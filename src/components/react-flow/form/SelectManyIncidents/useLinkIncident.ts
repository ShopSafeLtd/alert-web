import { useState } from 'react';

import {
  ListIncidentsQuery,
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
} from 'graphql/generated';

import { useStoreActions, useStoreState } from 'state';
import { IncidentTable } from './LinkIncident.view';
import { Incident } from 'components/react-flow/nodes/list-incidents-node';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident[]) => void;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => void;
}

const useLinkIncident = ({ onClose, onSelect }: Props): Return => {
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
    onSelect(
      selectedRowsData.map((row) => ({
        dayTime: row?.date || '',
        description: row?.subject || '',
      }))
    );

    setSaving(false);
    onClose();
  };

  const onChange = (
    selectedRowKeys: React.Key[],
    selectedRows: IncidentTable[]
  ) => {
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
  };
};

export default useLinkIncident;
