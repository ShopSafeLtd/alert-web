import type { LinkIncidentIncidentsQuery } from '#/components/form-components/linkOptions/LinkIncident/__generated__/link-incident-incidents.generated';
import type { IncidentFilters } from 'state/data-model';
import type { IncidentCardData } from 'types/DataType';

import { useLinkIncidentIncidentsQuery } from '#/components/form-components/linkOptions/LinkIncident/__generated__/link-incident-incidents.generated';
import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { currentSchemeDefaultGroups } from '#/providers/UserProvider/UserProvider';
import { useListBusinessesQuery } from 'graphql/businesses/queries/__generated__/list-businesses.generated';
import { useListGoodsTypesQuery } from 'graphql/goods-types/queries/__generated__/list-goods-types.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, QueryMode, SortOrder, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

export interface Incident {
  incident: LinkIncidentIncidentsQuery['incidentsRelay']['edges'][number]['node'];
}
interface Props {
  getIncident?: (value: Incident) => void;
  incidentIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update?: (value: IncidentCardData) => void;
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
  businesses: { label: string; location: string; value: string }[];
  businessesLoading: boolean;
  clearFilters: () => void;
  crimeTypes: { label: string; value: string }[];
  data?: LinkIncidentIncidentsQuery;
  goods: { label: string; value: string }[];
  goodsLoading: boolean;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
  saving: boolean;
  search: string;
  setBusinessesFilter: (value: string[]) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  setGoodsFilter: (value: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  tagsLoading: boolean;
  variables: IncidentFilters;
}

const useLinkIncident = ({
  getIncident,
  incidentIds,
  onClose,
  update,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const defaultGroups = useAtomValue(currentSchemeDefaultGroups);

  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const order = useStoreState((state) => state.data.incidents.order);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const { businesses, crimeTypes, goods, groups, peculiarities, search } =
    variables;

  const { data, loading } = useLinkIncidentIncidentsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        createdAt: SortOrder.Desc,
      },
      schemeId,
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      where: {
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
        business:
          businesses.length > 0
            ? {
                id: {
                  in: businesses,
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
        id:
          incidentIds && incidentIds?.length > 0
            ? {
                notIn: incidentIds,
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
      },
    },
  });
  // Fetch scheme groups if scheme admin
  const { groups: groupsData, groupsLoading } = useGroupsContext();

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        dataType: {
          equals: Model.Incident,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
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
          users: {
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
    const sizeOptions = getSizeOptions();
    if (groups.length === 0) {
      setIncidentsState({
        order,
        pagination: {
          ...pagination,
          sizeOptions,
        },
        variables: {
          ...variables,
          groups:
            defaultGroups
              ?.filter((group) => group.schemeId === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    } else {
      setIncidentsState({
        order,
        pagination: {
          ...pagination,
          sizeOptions,
        },
        variables,
      });
    }
  }, []);

  const onPaginationChange = (page: number, pageSize: number) => {
    setIncidentsState({
      order,
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
    });
  };

  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.incidentsRelay?.edges.find(
      ({ node: { id } }) => id === selected
    )?.node;
    if (selectedData) {
      if (update) {
        update({
          dayTime: selectedData.dayTime,
          description: selectedData.description,
          id: selectedData.id,
          reference: selectedData.reference,
          subject: selectedData.subject,
        });
      }
      if (getIncident) {
        getIncident({ incident: selectedData });
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
  const clearFilters = () => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        businesses: [],
        crimeTypes: [],
        goods: [],
        groups: [],
        peculiarities: '',
        search: '',
      },
    });
  };

  return {
    businesses:
      businessesData?.listBusinesses.businesses.map((item) => ({
        label: item.name,
        location: item.locations[0]?.full || '',
        value: item.id,
      })) || [],
    businessesLoading,
    clearFilters,
    crimeTypes:
      tagsData?.tags?.map((tag) => ({
        label: tag?.name || '',
        value: tag?.id || '',
      })) || [],
    data,
    goods:
      goodsData?.listGoodsTypes.goodsTypes.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [],
    goodsLoading,
    groups: groupsData,
    groupsLoading,
    loading: data?.incidentsRelay ? false : loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    pagination,
    saving,
    search,
    setBusinessesFilter,
    setCrimeTypesFilter,
    setGoodsFilter,
    setGroupsFilter,
    setPeculiarities,
    setSearch,
    tagsLoading,
    variables,
  };
};

export default useLinkIncident;
