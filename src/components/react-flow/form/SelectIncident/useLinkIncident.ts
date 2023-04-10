import { useState } from 'react';

import {
  ListIncidentsQuery,
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
} from 'graphql/generated';

import { useStoreActions, useStoreState } from 'state';
import { IncidentTable } from './LinkIncident.view';
import { Incident } from 'components/react-flow/nodes/incident-details-node';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident) => void;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onChange: (item: { key: string }) => void;
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
    if (selected) {
      const incident = data?.listIncidents?.incidents?.find(
        (item) => item.id === selected
      );
      onSelect({
        description: incident?.subject,
        reference: incident?.reference,
        type: incident?.crimeTypes
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
        dayTime: incident?.dayTime,
        location: incident?.createdBy.businesses[0]?.name,
        offenders: incident?.offenders
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
        id: incident?.id,
      });
    }
    setSaving(false);
    onClose();
  };

  const onChange = (item: { key: string }) => {
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
    onChange,
  };
};

export default useLinkIncident;
