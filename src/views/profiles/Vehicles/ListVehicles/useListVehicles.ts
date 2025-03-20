import type { MutationUpdaterFn } from '@apollo/client';
import type { ListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import type { CreateVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-vehicle.generated';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type { VehicleFilters } from 'state/data-model';
import type { DateType, VehicleData } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { notification } from 'antd';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useCreateVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-vehicle.generated';
import {
  ListVehiclesDocument,
  useListVehiclesQuery,
} from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Return {
  addInvestigation: string;
  clearFilters: () => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  data: ListVehiclesQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onNavigate: () => void;
  onSelectCustomGalleries: (values: string) => void;
  onSubmit: (value: VehicleData) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleAddInvestigation: (value: string) => void;
  toggleSortFilter: () => void;
  variables: VehicleFilters;
}
const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['10', '20', '30'];
  }
  if (window.innerWidth > 1799) {
    return ['10', '20', '30'];
  }
  return ['10'];
};
const useListVehicles = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const onNavigate = () => navigate('/app/vehicles/add');
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const { filterDefaultGroups: defaultGroups, id: userId } = useStoreState(
    (state) => state.user
  );
  const pagination = useStoreState((state) => state.data.vehicles.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.vehicles.variables
  );
  const setFilterState = useStoreActions((actions) => actions.data.setVehicles);
  const [sortFilter, setSortFilter] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState('');
  const {
    createdAt: createdAtFilter,
    customGalleries,
    gallery,
    groups: groupsFilter,
    order,
    search,
  } = filterVariables;

  const variables = {
    order: {
      updatedAt: order,
    },
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
      createdBy: gallery.includes('MYDATA')
        ? {
            id: {
              equals: userId,
            },
          }
        : undefined,
      customGalleries:
        customGalleries && customGalleries.length > 0
          ? {
              some: {
                id: {
                  in: customGalleries,
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
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },

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

  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groupsFilter.length === 0) {
      setFilterState({
        pagination: {
          ...pagination,
          pageSize: Number(sizeOptions[0]),
          sizeOptions,
        },
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    } else {
      setFilterState({
        pagination: {
          ...pagination,
          pageSize: Number(sizeOptions[0]),
          sizeOptions,
        },
        variables: filterVariables,
      });
    }
  }, []);
  const { data: vehiclesData, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const { groups, groupsLoading } = useGroupsContext();

  // custom galleries
  const { data: customGalleriesData } = useListCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        name: SortOrder.Asc,
      },
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const updateVehicleList: MutationUpdaterFn<CreateVehicleMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListVehiclesQuery>({
      query: ListVehiclesDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<ListVehiclesQuery>({
      data: {
        __typename: 'Query',
        listVehicles: {
          ...existingData.listVehicles,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          vehicles:
            existingData?.listVehicles?.vehicles &&
            existingData.listVehicles.vehicles.length > 0
              ? [
                  ...(existingData?.listVehicles?.vehicles || []),
                  ...(Array.isArray(res.createVehicle)
                    ? res.createVehicle
                    : [res.createVehicle]),
                ]
              : [res.createVehicle],
        },
      },
      query: ListVehiclesDocument,
      variables,
    });
  };

  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      // setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been added!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      // setSaving(false);
      errorNotification();
    },
    update: updateVehicleList,
  });

  const onSubmit = (data: VehicleData) => {
    void createVehicle({
      variables: {
        data: {
          colour: data.colour || '',
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          customGalleries: {
            connect:
              data.customGalleries && data.customGalleries.length > 0
                ? data.customGalleries.map((id) => ({ id }))
                : undefined,
            create:
              data.newCustomGalleriesData &&
              data.newCustomGalleriesData.length > 0
                ? data.newCustomGalleriesData.map((value) => ({
                    description: value.description || '',
                    groups: {
                      connect:
                        groups && groups.length === 1
                          ? groups.map(({ value: id }) => ({ id }))
                          : data?.groups?.map((id) => ({ id })) || [],
                    },
                    name: value.name,
                    schemes: { connect: [{ id: schemeId }] },
                  }))
                : undefined,
          },
          groups:
            data?.groups && data.groups.length > 0
              ? data?.groups?.map((id) => ({ id }))
              : [],
          image: {
            upload:
              data.images && data.images.length > 0
                ? data.images.map((item) => ({
                    policeImage: item.policeImage,
                    position: item.position,
                    primary: item.primary,
                    rotation: item.rotation || 0,
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                  }))
                : undefined,
          },
          incidents:
            data.incidents && data.incidents.length > 0
              ? data.incidents.map((id) => ({ id }))
              : [],
          make: data.make || '',
          model: data.model || '',
          offenders:
            data.offenders && data.offenders.length > 0
              ? data.offenders.map((id) => ({ id }))
              : [],
          registration: data.registration || '',

          schemes: schemeId,
        },
      },
    });
  };
  const setGallery = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        gallery: values,
      },
    });
  };
  const setCustomGalleries = (values: string[]) => {
    setFilterState({
      pagination,
      variables: {
        ...filterVariables,
        customGalleries: values,
      },
    });
  };
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

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const onSelectCustomGalleries = (id: string) => {
    if (id) {
      if (customGalleries.includes(id)) {
        setCustomGalleries(customGalleries.filter((index) => index !== id));
      } else {
        setCustomGalleries([...customGalleries, id]);
      }
    }
  };
  // const onSelectGalleries = (id: string) => {
  //   if (id) {
  //     if (gallery.includes(id)) {
  //       setGallery(gallery.filter((index) => index !== id));
  //     } else {
  //       setCustomGalleries([...gallery, id]);
  //     }
  //   }
  // };
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
    addInvestigation,
    clearFilters,
    customGalleriesData,

    data: vehiclesData,
    groups,
    groupsLoading,
    loading,
    onNavigate,
    onSelectCustomGalleries,
    // updateVehicleList,
    onSubmit,
    setCreatedAtFilter,
    setGallery,
    setGroupsFilter,
    setOrder,
    setSearch,
    sortFilter,
    toggleAddInvestigation: setAddInvestigation,
    toggleSortFilter,
    variables: filterVariables,
  };
};

export default useListVehicles;
