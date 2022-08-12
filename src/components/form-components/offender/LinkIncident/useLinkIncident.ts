import { useState } from 'react';

import {
  QueryMode,
  SortOrder,
  useListIncidentsQuery,
  ListIncidentsQuery,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';

import { useStoreState, IncidentSort, useStoreActions } from 'state';

interface FormData {
  selectedIncidentIds: string[];
}

interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  incidentData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents'][0]
    | undefined;
}

const useLinkIncident = ({ onClose, update }: Props): Return => {
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

  const { data: ListIncidentsData, loading } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt:
          order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
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

  const onPaginationChange = (page: number, pageSize: number) => {
    setIncidentsState({
      pagination: {
        ...pagination,
        page,
        pageSize,
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
  const onSubmit = (data: FormData) => {
    setSaving(true);
    update(data.selectedIncidentIds);
    setSaving(false);
    onClose();
  };
  return {
    onSubmit,
    saving,
    data: ListIncidentsData,
    loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    openLightbox,
    setCurrentId,
    incidentData: currentId
      ? ListIncidentsData?.listIncidents?.incidents.find(
          (Incident) => Incident.id === currentId
        )
      : ListIncidentsData?.listIncidents?.incidents[0],
  };
};

export default useLinkIncident;
