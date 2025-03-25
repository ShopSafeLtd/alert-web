import type { Incident } from 'components/react-flow/nodes/incident-details-node';
import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident) => void;
}

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  onChange: (item: { key: string }) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useLinkIncident = ({ onClose, onSelect }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      const incident = data?.listIncidents?.incidents?.find(
        (item) => item.id === selected
      );
      onSelect({
        dayTime: incident?.dayTime,
        description: incident?.subject,
        id: incident?.id,
        location: incident?.createdBy.businesses[0]?.name,
        offenders: incident?.offenders
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
        reference: incident?.reference,
        type: incident?.crimeTypes
          .map((type, index) => `${index > 0 ? ' ' : ''}${type.name}`)
          .toString(),
      });
    }
    setSaving(false);
    onClose();
  };

  const onChange = (item: { key: string }) => {
    setSelected(item.key);
  };

  return {
    data,
    loading: data?.listIncidents ? false : loading,
    onChange,
    onPaginationChange,
    onSubmit,
    saving,
    search: variables.search,
    setSearch,
  };
};

export default useLinkIncident;
