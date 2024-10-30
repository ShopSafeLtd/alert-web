import type {
  IncidentsFeedQuery,
  IncidentsFeedQueryVariables,
} from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { RecycleIncidentMutation } from 'graphql/incidents/mutations/__generated__/recycle-incident.generated';
import type { IncidentFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import {
  IncidentsFeedDocument,
  useIncidentsFeedQuery,
} from '#/views/incidents/IncidentFeed/graphql/queries/__generated__/incident-feed.generated';
import { QueryMode, Role, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IncidentSort, useStoreActions, useStoreState } from 'state';

interface Return {
  clearFilters: () => void;
  data: IncidentsFeedQuery | undefined;
  fetchMoreScroll: () => void;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  isUser: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loading: boolean;
  onNavigate: () => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  order: IncidentSort;
  setBusinessesFilter: (value: string[]) => void;
  setCompactView: () => void;
  setCreatedAtFilter: (
    value:
      | {
          endDate: Date;
          startDate: Date;
        }
      | undefined
  ) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  setGallery: (values: string[]) => void;
  setGoodsFilter: (value: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setIncidentDateFilter: (
    value:
      | {
          endDate: Date;
          startDate: Date;
        }
      | undefined
  ) => void;
  setOrder: (value: IncidentSort) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setTableView: () => void;
  sortFilter: boolean;
  tableView: boolean;
  toggleSortFilter: () => void;
  updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  variables: IncidentFilters;
}

const useIncidentFeed = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate('/app/incidents/add');

  // Global State
  const { id: schemeId } = useStoreState((state) => state.scheme);
  const {
    filterDefaultGroups: defaultGroups,
    id: userId,
    role,
  } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const {
    businesses,
    compactView,
    createdAt,
    createdBy,
    crimeTypes,
    gallery,
    goods,
    groups,
    incidentDate,
    peculiarities,
    priority,
    search,
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
    index: 0,
    open: false,
  });

  const queryVariables: IncidentsFeedQueryVariables = {
    approved: isUser
      ? true
      : gallery.includes('NOT APPROVED')
        ? false
        : undefined,
    first: compactView ? 48 : 12,
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    schemeId,
    where: {
      AND: search
        ? [
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
                  business: {
                    name: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },
                },
                {
                  createdBy: {
                    fullName: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
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
                {
                  crimeTypes: {
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
          ]
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
      business:
        businesses.length > 0
          ? {
              id: {
                in: businesses,
              },
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      createdBy:
        gallery.includes('MYDATA') || createdBy.length > 0
          ? {
              id: {
                in: gallery.includes('MYDATA') ? [userId] : createdBy,
              },
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
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
          }
        : undefined,
      description: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
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
      priority:
        priority.length > 0
          ? {
              in: priority,
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
    },
  };
  // Queries
  // Fetch incidents
  const { data, fetchMore, loading } = useIncidentsFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
    // skip: role === Role.User && restrictIncidentAccess,
  });

  // Fetch scheme groups if scheme admin
  const { groups: groupsData, groupsLoading } = useGroupsContext();

  // On mount
  useEffect(() => {
    if (groups.length === 0)
      setIncidentsState({
        order,
        pagination,
        variables: {
          ...variables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
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
      data: {
        __typename: 'Query',
        incidentsRelay: {
          ...existingData.incidentsRelay,
          edges: existingData.incidentsRelay?.edges.filter(
            (n) => n.node.id !== res?.recycleIncident?.id
          ),
        },
      },
      query: IncidentsFeedDocument,
      variables: queryVariables,
    });
  };

  // Functions
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
          }),
        0.3
      );
    }
  };

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      order: value,
      pagination,
      variables,
    });
  };

  const setGroupsFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
    });
  };
  const setBusinessesFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
    });
  };
  const setGoodsFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        goods: values,
      },
    });
  };

  const setCrimeTypesFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
    });
  };
  const setIncidentDateFilter = (values: DateType | undefined) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        incidentDate: values,
      },
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
    });
  };
  const setGallery = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        gallery: values,
      },
    });
  };

  const setCompactView = () => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        compactView: tableView ? compactView : !compactView,
        tableView: false,
      },
    });
  };
  const setTableView = () => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        tableView: !tableView,
      },
    });
  };
  const setPeculiarities = (value: string) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        peculiarities: value,
      },
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
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const fetchMoreScroll = () => {
    void fetchMore({
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
      variables: {
        ...queryVariables,
        after: data?.incidentsRelay?.pageInfo?.endCursor,
      },
    });
  };

  const clearFilters = () => {
    setIncidentsState({
      order: IncidentSort.createdAtDesc,
      pagination,
      variables: {
        ...variables,
        businesses: [],
        createdAt: undefined,
        crimeTypes: [],
        gallery: [],
        goods: [],
        groups: [],
        incidentDate: undefined,
        peculiarities: '',
        search: '',
      },
    });
  };

  return {
    clearFilters,
    // onCrimeTypesChange,

    data,
    fetchMoreScroll,

    groups: groupsData,
    groupsLoading,
    isUser,
    lightBoxOpen,
    lightboxElements,
    loading,
    onNavigate,
    openLightbox: triggerLightbox,
    order,
    setBusinessesFilter,
    setCompactView,
    setCreatedAtFilter,
    setCrimeTypesFilter,
    setGallery,
    setGoodsFilter,

    setGroupsFilter,
    setIncidentDateFilter,
    setOrder,
    setPeculiarities,
    setSearch,
    setTableView,
    sortFilter,
    tableView,

    toggleSortFilter,
    updateIncidentList,
    // onGroupsChange,
    variables,
  };
};

export default useIncidentFeed;
