import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type {
  CreateVehicleDataInput,
  CreateVehicleMutation,
  ListCustomGalleriesQuery,
  ListVehiclesQuery,
} from 'graphql/generated';
import {
  Role,
  useListCustomGalleriesQuery,
  useSchemeGroupsQuery,
  useCreateVehicleMutation,
  ListVehiclesDocument,
  QueryMode,
  SortOrder,
  useListVehiclesQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import type { DateType, VehicleData } from 'types/DataType';
import errorNotification from 'types/error_notification';

interface Return {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addVehicle: boolean;
  toggleAddVehicle: () => void;
  onSubmit: (value: VehicleData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  onSelectCustomGalleries: (values: string) => void;
  customGalleries: string[];
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
}

const useListVehicles = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups, id: userId } = useStoreState((state) => state.user);
  const [addVehicle, setAddVehicle] = useState(false);
  const [search, setSearch] = useState('');
  const [sortFilter, setSortFilter] = useState(false);
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);
  const [gallery, setGallery] = useState<string[]>([]);
  const [customGalleries, setCustomGalleries] = useState<string[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();

  const variables = {
    order: {
      updatedAt: order,
    },
    where: {
      schemes: {
        some: {
          id: {
            equals: schemeId,
          },
        },
      },
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
      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
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

      OR: [
        {
          make: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          reference: {
            equals: Number(search),
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
  const { data: vehiclesData, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
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

  // custom galleries
  const { data: customGalleriesData } = useListCustomGalleriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
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
  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };

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
      query: ListVehiclesDocument,
      data: {
        listVehicles: {
          ...existingData.listVehicles,
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
        __typename: 'Query',
      },
      variables,
    });
    // const existingCustomGallery = store.readQuery<ListCustomGalleriesQuery>({
    //   query: ListCustomGalleriesDocument,
    //   variables,
    // });
    // if (existingCustomGallery === null) return;
    // store.writeQuery<ListCustomGalleriesQuery>({
    //   query: ListVehiclesDocument,
    //   data: {
    //     listCustomGalleries: {
    //       ...existingCustomGallery.listCustomGalleries,
    //       customGalleries:
    //         existingCustomGallery?.listCustomGalleries.total > 0
    //           ? [
    //               ...(existingCustomGallery?.listCustomGalleries
    //                 ?.customGalleries || []),
    //               ...(Array.isArray(res.createVehicle.customGalleries)
    //                 ? res.createVehicle.customGalleries
    //                 : [res.createVehicle.customGalleries]),
    //             ]
    //           : [res.createVehicle],
    //     },
    //     __typename: 'Query',
    //   },
    //   variables: {
    //     where: {
    //       schemes: {
    //         some: {
    //           id: {
    //             equals: schemeId,
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
  };

  const [createVehicle] = useCreateVehicleMutation({
    onCompleted: () => {
      // setSaving(false);
      toggleAddVehicle();
      notification.success({
        message: 'Successfully Added!',
        description: 'The vehicle has been added! ',
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
    // setSaving(true);
    const getCustomGalleries =
      (): CreateVehicleDataInput['customGalleries'] => {
        if (data.customGalleries) {
          const connectedCustomGalleries = data.customGalleries.filter(
            (id) =>
              !data.newCustomGalleriesData?.map((el) => el.id).includes(id)
          );
          return {
            connect:
              connectedCustomGalleries && connectedCustomGalleries.length > 0
                ? connectedCustomGalleries.map((id) => ({ id }))
                : undefined,
            create:
              data.newCustomGalleriesData &&
              data.newCustomGalleriesData.length > 0
                ? data.newCustomGalleriesData.map((value) => ({
                    name: value.name,
                    description: value.description || '',
                    schemes: { connect: [{ id: schemeId }] },
                    groups: {
                      connect:
                        groupData?.groups && groupData.groups.length === 1
                          ? groupData?.groups.map(({ id }) => ({ id }))
                          : data.groups?.map((id) => ({ id })),
                    },
                  }))
                : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
    createVehicle({
      variables: {
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
          groups:
            data?.groups && data.groups.length > 0
              ? data?.groups?.map((id) => ({ id }))
              : [],
          customGalleries: getCustomGalleries(),
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          incidents:
            data.incidents && data.incidents.length > 0
              ? data.incidents.map((id) => ({ id }))
              : [],
          offenders:
            data.offenders && data.offenders.length > 0
              ? data.offenders.map((id) => ({ id }))
              : [],
          schemes: schemeId,
          image: {
            upload:
              data.images && data.images.length > 0
                ? data.images.map((item) => ({
                    url: {
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    },
                    position: item.position,
                    primary: item.primary,
                    policeImage: item.policeImage,
                  }))
                : undefined,
          },
        },
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
  const clearFilters = () => {
    setGroupsFilter([]);
    setOrder(SortOrder.Desc);
    setCreatedAtFilter(undefined);
  };
  return {
    data: vehiclesData,
    loading,
    search,
    setSearch,
    addVehicle,
    toggleAddVehicle,
    // updateVehicleList,
    onSubmit,
    groups:
      role === Role.SchemeAdmin
        ? groupData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    groupsFilter,
    setGroupsFilter,
    setCreatedAtFilter,
    clearFilters,
    sortFilter,
    toggleSortFilter,
    customGalleriesData,
    customGalleries,
    onSelectCustomGalleries,
    gallery,
    setGallery,
    order,
    setOrder,
  };
};

export default useListVehicles;
