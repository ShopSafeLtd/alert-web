import type {
  ListIncidentsQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import {
  ListIncidentsDocument,
  Model,
  QueryMode,
  Role,
  SortOrder,
  useListBusinessesQuery,
  useListGoodsTypesQuery,
  useListIncidentsQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { IncidentSort, useStoreActions, useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface Return {
  data: ListIncidentsQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  openLightbox: (elements: { src: string }[], index: number) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
    crimeTypes: string[];
  };
  crimeTypes: { value: string; label: string }[];
  onCrimeTypesChange: (crimeTypes: string[]) => void;
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setPeculiarities: (value: string) => void;
  peculiarities: string;
  clearFilters: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  crimeTypesFilter: string[];
  setCrimeTypesFilter: (value: string[]) => void;
  goodsFilter: string[];
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  businessesFilter: string[];
  setBusinessesFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
}

const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['24', '48', '96'];
  }
  if (window.innerWidth > 1799) {
    return ['24', '48', '96'];
  }
  return ['24'];
};

const useIncidentFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups, id: userId } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );
  // filter initial state
  const [sortFilter, setSortFilter] = useState(false);
  const [businessesFilter, setBusinessesFilter] = useState<string[]>([]);
  const [crimeTypesFilter, setCrimeTypesFilter] = useState<string[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [goodsFilter, setGoodsFilter] = useState<string[]>([]);
  const [peculiarities, setPeculiarities] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  const queryVariables = {
    scheme: {
      id: schemeId,
    },
    order: {
      createdAt:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
      crimeTypes:
        crimeTypesFilter.length > 0
          ? {
              some: {
                id: {
                  in: crimeTypesFilter,
                },
              },
            }
          : undefined,
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
      approved: gallery.includes('APPROVED')
        ? {
            equals: true,
          }
        : undefined,
      subscribedUsers: gallery.includes('SUBSCRIBED')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
      policeInvolved: gallery.includes('POLICEINVOLVED')
        ? {
            equals: true,
          }
        : undefined,
      policeReported: gallery.includes('POLICEREPORTED')
        ? {
            equals: true,
          }
        : undefined,
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
      peculiarities: peculiarities
        ? {
            mode: QueryMode.Insensitive,
            contains: peculiarities,
          }
        : undefined,
      business:
        businessesFilter.length > 0
          ? {
              id: {
                in: businessesFilter,
              },
            }
          : undefined,
      incidentItems:
        goodsFilter.length > 0
          ? {
              some: {
                goodsType: {
                  id: {
                    in: goodsFilter,
                  },
                },
              },
            }
          : undefined,
    },
    take: pagination.pageSize,
    skip: pagination.pageSize * (pagination.page - 1),
  };
  // Queries
  // Fetch incidents
  const { data, loading } = useListIncidentsQuery({
    variables: queryVariables,
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
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        dataType: {
          equals: Model.Incident,
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
                          in: variables.groups.map((id) => id),
                        },
                      },
                    },
                  },
                },
        },
      },
    });

  const { data: goodsData, loading: goodsLoading } = useListGoodsTypesQuery({});

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    setIncidentsState({
      pagination: {
        ...pagination,
        sizeOptions,
        pageSize: Number(sizeOptions[0]),
      },
      variables: {
        ...variables,
        groups:
          role === Role.SchemeAdmin || role === Role.ShopsafeAdmin
            ? groupsData?.groups.map((group) => group.id) || []
            : groups.map((group) => group.id),
      },
      order,
    });
    // eslint-disable-next-line
  }, []);
  // update Incident list after deleting an item
  const updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      variables: queryVariables,
    });

    if (existingData === null) return;
    if (existingData?.listIncidents?.incidents === undefined) return;

    store.writeQuery<ListIncidentsQuery>({
      query: ListIncidentsDocument,
      data: {
        listIncidents: {
          ...existingData.listIncidents,
          incidents: existingData.listIncidents?.incidents.filter(
            (incident) => incident.id !== res?.recycleIncident?.id
          ),
        },
        __typename: 'Query',
      },
      variables: queryVariables,
    });
  };

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };

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

  const onGroupsChange = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const onCrimeTypesChange = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
      order,
    });
  };

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      pagination,
      variables,
      order: value,
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
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setGroupsFilter([]);
    setCrimeTypesFilter([]);
    setGoodsFilter([]);
    setPeculiarities('');
    setBusinessesFilter([]);
    setOrder(IncidentSort.createdAtDesc);
  };
  return {
    data,
    loading,
    onPaginationChange,
    pagination,
    order,
    setOrder,
    search: variables.search,
    setSearch,
    groups:
      role === Role.SchemeAdmin
        ? groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onCrimeTypesChange,
    crimeTypes:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    updateIncidentList,
    onNavigate,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    gallery,
    peculiarities,
    setGallery,
    setPeculiarities,
    groupsFilter,
    setGroupsFilter,
    businesses:
      businessesData?.listBusinesses.businesses.map((item) => ({
        value: item.id,
        label: item.name,
        location: item.locations[0]?.full || '',
      })) || [],
    businessesFilter,
    goods:
      goodsData?.listGoodsTypes.goodsTypes.map((item) => ({
        value: item.id,
        label: item.name,
      })) || [],
    goodsFilter,
    setGoodsFilter,
    setBusinessesFilter,
    crimeTypesFilter,
    setCrimeTypesFilter,
    goodsLoading,
    businessesLoading,
  };
};

export default useIncidentFeed;
