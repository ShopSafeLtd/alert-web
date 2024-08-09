import type { ListVehiclesCardQuery } from '#/components/form-components/linkOptions/LinkVehicle/graphql/queries/__generated__/list-vehicles-card.generated';
import type { VehicleFilters } from 'state/data-model';
import type { DateType, VehicleData } from 'types/DataType';

import { useListVehiclesCardQuery } from '#/components/form-components/linkOptions/LinkVehicle/graphql/queries/__generated__/list-vehicles-card.generated';
import { useGroupsContext } from '#/context/groups-context';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Props {
  onClose: () => void;
  takeAllSchemes?: boolean;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
}

interface Return {
  clearFilters: () => void;
  data:
    | Exclude<ListVehiclesCardQuery['listVehicles'], null | undefined>
    | null
    | undefined;
  fetchMoreScroll: () => void;
  filterVariables: VehicleFilters;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  selectedVehicle: VehicleData | undefined;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  setSelectedVehicle: (value: VehicleData | undefined) => void;
}

const useLinkVehicle = ({
  onClose,
  takeAllSchemes,
  update,
  vehicleIds,
}: Props): Return => {
  const { filterDefaultGroups: defaultGroups } = useStoreState(
    (state) => state.user
  );
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const pagination = useStoreState((state) => state.data.vehicles.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.vehicles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setVehicles);

  const [selectedVehicle, setSelectedVehicle] = useState<
    VehicleData | undefined
  >(undefined);

  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const variables = {
    order: {
      updatedAt: order,
    },
    take: 18,
    where: {
      OR: [
        {
          make: {
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
          registration: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          model: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
      createdAt: createdAtFilter
        ? {
            gte: createdAtFilter.startDate,
            lte: createdAtFilter.endDate,
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
      id: { notIn: vehicleIds },
      schemes: {
        some: {
          id: {
            in: takeAllSchemes ? userSchemeIds : [schemeId],
          },
        },
      },
    },
  };

  // On mount
  useEffect(() => {
    if (groupsFilter.length === 0) {
      setFilterState({
        pagination,
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    }
  }, []);
  const { data, fetchMore, loading } = useListVehiclesCardQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listVehicles: {
            ...fetchMoreResult.listVehicles,
            total:
              fetchMoreResult.listVehicles?.total ||
              prev.listVehicles?.total ||
              0,
            vehicles: [
              ...(prev.listVehicles?.vehicles || []),
              ...(fetchMoreResult.listVehicles?.vehicles || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.listVehicles.vehicles?.length || 0,
      },
    });
  };
  const { groups, groupsLoading } = useGroupsContext();

  // function
  const onSubmit = () => {
    if (selectedVehicle) {
      update(selectedVehicle);
    }
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  // filter function
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        order: values,
      },
    });
  };

  const setSearch = (value: string) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const setGroupsFilter = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        groups: values,
      },
    });
  };
  const clearFilters = () => {
    setFilterState({
      pagination,
      variables: {
        createdAt: undefined,
        customGalleries: [],
        gallery: [],
        groups: [],
        order: SortOrder.Desc,
        search: '',
      },
    });
  };
  return {
    clearFilters,
    data: data?.listVehicles,
    fetchMoreScroll,
    filterVariables,
    groups,
    groupsLoading,
    lightBoxOpen,
    loading: data?.listVehicles ? false : loading,
    onSubmit,
    openLightbox,
    selectedVehicle,
    setCreatedAtFilter,
    setGroupsFilter,
    setOrder,
    setSearch,
    setSelectedVehicle,
  };
};

export default useLinkVehicle;
