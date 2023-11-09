import { useEffect, useState } from 'react';
import type {
  ListIncidentsAllSchemesQuery,
  ListIncidentsQuery,
} from 'graphql/generated';
import {
  TagType,
  Role,
  Model,
  useListBusinessesQuery,
  useListGoodsTypesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
  useListIncidentsAllSchemesQuery,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';
import type { IncidentCardData } from 'types/DataType';
import type { IncidentFilters } from 'state/data-model';

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
const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['12', '24', '48', '96'];
  }
  if (window.innerWidth > 1799) {
    return ['12', '24', '48', '96'];
  }
  return ['12'];
};
interface Return {
  onSubmit: () => void;
  saving: boolean;
  data:
    | Exclude<
        ListIncidentsAllSchemesQuery['listIncidentsAllSchemes'],
        undefined | null
      >
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  variables: IncidentFilters;
  clearFilters: () => void;
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  setBusinessesFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  setGroupsFilter: (value: string[]) => void;
  setPeculiarities: (value: string) => void;
  setCrimeTypesFilter: (value: string[]) => void;
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

  const {
    role,
    id: userId,
    schemes: userSchemes,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);

  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const { search, crimeTypes, groups, businesses, goods, peculiarities } =
    variables;

  const { data, loading } = useListIncidentsAllSchemesQuery({
    variables: {
      order: {
        createdAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        schemeId: {
          in: takeAllSchemes
            ? userSchemes.map((el) => el.scheme.id)
            : [schemeId],
        },
        id:
          incidentIds && incidentIds?.length > 0
            ? {
                notIn: incidentIds,
              }
            : undefined,
        crimeTypes:
          crimeTypes.length > 0
            ? {
                some: {
                  id: {
                    in: crimeTypes,
                  },
                },
              }
            : undefined,
        groups:
          groups.length > 0
            ? {
                some: {
                  id: {
                    in: groups,
                  },
                },
              }
            : undefined,
        business:
          businesses.length > 0
            ? {
                id: {
                  in: businesses,
                },
              }
            : undefined,
        incidentItems:
          goods.length > 0
            ? {
                some: {
                  goodsType: {
                    id: {
                      in: goods,
                    },
                  },
                },
              }
            : undefined,
        description: peculiarities
          ? {
              mode: QueryMode.Insensitive,
              contains: peculiarities,
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
  // Fetch scheme groups if scheme admin
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Incident,
        },
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
    },
  });

  const { data: businessesData, loading: businessesLoading } =
    useListBusinessesQuery({
      variables: {
        orderBy: { name: SortOrder.Asc },
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
          users:
            role === Role.SchemeAdmin
              ? undefined
              : {
                  some: {
                    groups: {
                      some: {
                        id: {
                          in: groups.map((id) => id),
                        },
                      },
                    },
                  },
                },
        },
      },
    });

  const { data: goodsData, loading: goodsLoading } = useListGoodsTypesQuery();

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    setIncidentsState({
      pagination: {
        ...pagination,
        sizeOptions,
      },
      variables: {
        ...variables,
        groups: defaultGroups.map(({ id }) => id),
      },
      order,
    });
  }, []);

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
          // images: selectedData.images.map((image) => ({
          //   ...image,
          //   primary: !!image.primary,
          //   policeImage: !!image.policeImage,
          // })),
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
  const setGroupsFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };
  const setBusinessesFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
      order,
    });
  };
  const setGoodsFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        goods: values,
      },
      order,
    });
  };
  const setPeculiarities = (value: string) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        peculiarities: value,
      },
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
  const setCrimeTypesFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
      order,
    });
  };
  const clearFilters = () => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        search: '',
        crimeTypes: [],
        groups: [],
        businesses: [],
        goods: [],
        peculiarities: '',
      },
      order,
    });
  };

  return {
    onSubmit,
    saving,
    data: data?.listIncidentsAllSchemes,
    loading: data?.listIncidentsAllSchemes ? false : loading,
    search,
    setSearch,
    pagination,
    onPaginationChange,
    onSelect,
    clearFilters,
    setPeculiarities,
    setGroupsFilter,
    businesses:
      businessesData?.listBusinesses.businesses.map((item) => ({
        value: item.id,
        label: item.name,
        location: item.locations[0]?.full || '',
      })) || [],
    goods:
      goodsData?.listGoodsTypes.goodsTypes.map((item) => ({
        value: item.id,
        label: item.name,
      })) || [],
    setGoodsFilter,
    setBusinessesFilter,
    setCrimeTypesFilter,
    goodsLoading,
    businessesLoading,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    variables,
    crimeTypes:
      tagsData?.tags?.map((tag) => ({
        value: tag?.id || '',
        label: tag?.name || '',
      })) || [],
    tagsLoading,
  };
};

export default useLinkIncident;
