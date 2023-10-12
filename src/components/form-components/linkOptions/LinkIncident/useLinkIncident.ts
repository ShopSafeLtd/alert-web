import { useState } from 'react';
import type {
  ListIncidentsAllSchemesQuery,
  ListIncidentsQuery,
} from 'graphql/generated';
import {
  useListIncidentsAllSchemesQuery,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { IncidentCardData } from 'types/DataType';

export interface Incident {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    null | undefined
  >['incidents'][0];
}
interface Props {
  onClose: () => void;
  update?: (value: IncidentCardData) => void;
  incidentIds: string[] | undefined;
  getIncident?: (value: Incident) => void;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListIncidentsAllSchemesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
}

const useLinkIncident = ({
  onClose,
  update,
  incidentIds,
  getIncident,
  takeAllSchemes,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 24,
  });
  const [search, setSearch] = useState('');

  const { data, loading } = useListIncidentsAllSchemesQuery({
    variables: {
      order: {
        createdAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        schemeId: {
          in: takeAllSchemes ? userSchemeIds : [schemeId],
        },
        id:
          incidentIds && incidentIds?.length > 0
            ? {
                notIn: incidentIds,
              }
            : undefined,

        OR: [
          {
            subject: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            referenceStr: {
              contains: search,
            },
          },
          {
            createdBy: {
              OR: [
                {
                  fullName: {
                    contains: search,
                    mode: QueryMode.Insensitive,
                  },
                },
                {
                  businesses: {
                    some: {
                      name: {
                        contains: search,
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
    setPagination({
      ...pagination,
      page,
    });
  };

  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.listIncidentsAllSchemes?.incidents.find(
      ({ id }) => id === selected
    );
    if (selectedData) {
      if (update) {
        update({
          id: selectedData.id,
          description: selectedData.description,
          images: selectedData.images.map((image) => ({
            ...image,
            primary: !!image.primary,
            policeImage: !!image.policeImage,
          })),
          dayTime: selectedData.dayTime,
          reference: selectedData.reference,
          subject: selectedData.subject,
        });
      }
      if (getIncident) {
        const incident = data?.listIncidentsAllSchemes?.incidents?.find(
          (item) => item.id === selected
        );
        if (incident) {
          getIncident({ incident });
        }
      }
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
    loading: data?.listIncidentsAllSchemes ? false : loading,
    search,
    setSearch,
    onPaginationChange,
    onSelect,
  };
};

export default useLinkIncident;
