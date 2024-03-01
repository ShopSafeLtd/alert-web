import type {
  IncidentsFeedQuery,
  RecycleIncidentMutation,
} from 'graphql/generated';
import {
  IncidentsFeedDocument,
  Model,
  QueryMode,
  Role,
  SortOrder,
  TagType,
  useIncidentsFeedQuery,
  useListBusinessesQuery,
  useListGoodsTypesQuery,
  useSchemeGroupsQuery,
  useTagsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { IncidentSort, useStoreActions, useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import type { DateType } from 'types/DataType';
import type { IncidentFilters } from 'state/data-model';

interface Return {
  data: IncidentsFeedQuery | undefined;
  loading: boolean;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  openLightbox: (elements: { src: string }[], index: number) => void;

  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  setBusinessesFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
  setIncidentDateFilter: (
    value:
      | {
          startDate: Date;
          endDate: Date;
        }
      | undefined
  ) => void;
  setCreatedAtFilter: (
    value:
      | {
          startDate: Date;
          endDate: Date;
        }
      | undefined
  ) => void;
  fetchMoreScroll: () => void;
  variables: IncidentFilters;
  setCompactView: () => void;
  isUser: boolean;
  setTableView: () => void;
  tableView: boolean;
}

const useIncidentFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);

  // Global State
  const { id: schemeId } = useStoreState((state) => state.scheme);
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const {
    search,
    crimeTypes,
    groups,
    businesses,
    goods,
    createdAt,
    incidentDate,
    gallery,
    peculiarities,
    compactView,
    priority,
    tableView,
  } = variables;

  // filter initial state
  const [sortFilter, setSortFilter] = useState(false);
  const isUser = role === Role.User;

  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  const queryVariables = {
    schemeId,
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    approved: isUser
      ? true
      : gallery.includes('NOT APPROVED')
      ? false
      : undefined,
    where: {
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
          }
        : undefined,
      priority:
        priority.length > 0
          ? {
              in: priority,
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
      approved: isUser
        ? {
            equals: true,
          }
        : gallery.includes('NOT APPROVED')
        ? {
            equals: false,
          }
        : undefined,
      subscribedUsers: gallery.includes('FOLLOWING')
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
      AND: [
        {
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
            {
              offenders: {
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
        {
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
        },
      ],
    },
    first: compactView ? 48 : 12,
  };
  // Queries
  // Fetch incidents
  const { data, loading, fetchMore } = useIncidentsFeedQuery({
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
    // skip: role === Role.User && restrictIncidentAccess,
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

  const { data: goodsData, loading: goodsLoading } = useListGoodsTypesQuery({
    variables: {
      where: {
        schemes: {
          id: { equals: schemeId },
        },
      },
    },
  });

  // On mount
  useEffect(() => {
    if (groups.length === 0)
      setIncidentsState({
        pagination,
        variables: {
          ...variables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
        order,
      });
  }, []);
  // update Incident list after deleting an item
  const updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<IncidentsFeedQuery>({
      query: IncidentsFeedDocument,
      variables: queryVariables,
    });

    if (existingData === null) return;
    if (existingData?.incidentsRelay?.edges === undefined) return;

    store.writeQuery<IncidentsFeedQuery>({
      query: IncidentsFeedDocument,
      data: {
        incidentsRelay: {
          ...existingData.incidentsRelay,
          edges: existingData.incidentsRelay?.edges.filter(
            (n) => n.node.id !== res?.recycleIncident?.id
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

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      pagination,
      variables,
      order: value,
    });
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
  const setIncidentDateFilter = (values: DateType | undefined) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        incidentDate: values,
      },
      order,
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
      order,
    });
  };
  const setGallery = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        gallery: values,
      },
      order,
    });
  };

  const setCompactView = () => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        tableView: false,
        compactView: tableView ? compactView : !compactView,
      },
      order,
    });
  };
  const setTableView = () => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        tableView: !tableView,
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
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...queryVariables,
        after: data?.incidentsRelay?.pageInfo?.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          incidentsRelay: {
            ...fetchMoreResult.incidentsRelay,
            edges: [
              ...(prev.incidentsRelay?.edges || []),
              ...(fetchMoreResult.incidentsRelay?.edges || []),
            ],
          },
        };
      },
    });
  };

  const clearFilters = () => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        gallery: [],
        search: '',
        crimeTypes: [],
        groups: [],
        businesses: [],
        createdAt: undefined,
        incidentDate: undefined,
        goods: [],
        peculiarities: '',
      },
      order: IncidentSort.createdAtDesc,
    });
  };

  return {
    data,
    loading,
    order,
    setOrder,
    setSearch,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    // onGroupsChange,
    variables,
    // onCrimeTypesChange,
    crimeTypes:
      tagsData?.tags?.map((tag) => ({
        value: tag?.id || '',
        label: tag?.name || '',
      })) || [],
    tagsLoading,
    updateIncidentList,
    onNavigate,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setGallery,
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
    setCreatedAtFilter,
    setIncidentDateFilter,
    fetchMoreScroll,
    setCompactView,
    isUser,
    setTableView,
    tableView,
  };
};

export default useIncidentFeed;
