import { useState } from 'react';

import {
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
  ListIncidentsQuery,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';

import { useStoreState, useStoreActions } from 'state';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
  incidentIds: string[] | undefined;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedIncident:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'][0]
    | null
    | undefined;
}

const useLinkIncident = ({ onClose, update, incidentIds }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const { openLightbox } = useLightbox();
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
  const onSubmit = (selectedIncidentId: string | undefined) => {
    setSaving(true);
    if (selectedIncidentId) {
      update(selectedIncidentId);
    }
    setSaving(false);
    onClose();
  };
  return {
    onSubmit,
    saving,
    data,
    loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    openLightbox,
    setCurrentId,
    selectedIncident: currentId
      ? data?.listIncidents?.incidents.find(
          (Incident) => Incident.id === currentId
        )
      : null,
  };
};

export default useLinkIncident;
