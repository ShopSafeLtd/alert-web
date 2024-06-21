import { useEffect, useState } from 'react';

import { QueryMode, SortOrder } from 'graphql/types';
import { useStoreActions, useStoreState } from 'state';
import type { DateType, VehicleData } from 'types/DataType';
import type { VehicleFilters } from 'state/data-model';
import { useGroupsContext } from '#/context/groups-context';
import type { ListVehiclesCardQuery } from '#/components/form-components/linkOptions/LinkVehicle/graphql/queries/list-vehicles-card.generated';
import { useListVehiclesCardQuery } from '#/components/form-components/linkOptions/LinkVehicle/graphql/queries/list-vehicles-card.generated';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: () => void;
  data:
    | Exclude<ListVehiclesCardQuery['listVehicles'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  selectedVehicle: VehicleData | undefined;
  setSelectedVehicle: (value: VehicleData | undefined) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  filterVariables: VehicleFilters;
  setOrder: (value: SortOrder) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  fetchMoreScroll: () => void;
}

const useLinkVehicle = ({
  onClose,
  update,
  vehicleIds,
  takeAllSchemes,
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
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
  } = filterVariables;
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const variables = {
    take: 18,
    order: {
      updatedAt: order,
    },
    where: {
      id: { notIn: vehicleIds },
      schemes: {
        some: {
          id: {
            in: takeAllSchemes ? userSchemeIds : [schemeId],
          },
        },
      },
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
  const { data, loading, fetchMore } = useListVehiclesCardQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listVehicles.vehicles?.length || 0,
      },
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
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
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
        order: SortOrder.Desc,
        search: '',
        createdAt: undefined,
        gallery: [],
        customGalleries: [],
        groups: [],
      },
    });
  };
  return {
    onSubmit,
    data: data?.listVehicles,
    loading: data?.listVehicles ? false : loading,
    groups,
    groupsLoading,
    setSearch,
    openLightbox,
    lightBoxOpen,
    selectedVehicle,
    setSelectedVehicle,
    filterVariables,
    setOrder,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    fetchMoreScroll,
  };
};

export default useLinkVehicle;
