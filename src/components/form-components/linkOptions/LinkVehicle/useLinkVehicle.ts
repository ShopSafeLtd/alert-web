import { useEffect, useState } from 'react';
import type { ListVehiclesQuery } from 'graphql/generated';
import { QueryMode, SortOrder, useListVehiclesQuery } from 'graphql/generated';
import { useStoreState } from 'state';
import type { VehicleData } from 'types/DataType';

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedVehicle:
    | Exclude<
        ListVehiclesQuery['listVehicles'],
        undefined | null
      >['vehicles'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const useLinkVehicle = ({
  onClose,
  update,
  vehicleIds,
  takeAllSchemes,
}: Props): Return => {
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 24,
  });
  const [search, setSearch] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<
    | Exclude<
        ListVehiclesQuery['listVehicles'],
        undefined | null
      >['vehicles'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        id: { notIn: vehicleIds },
        schemes: {
          some: {
            id: {
              in: takeAllSchemes ? userSchemeIds : [schemeId],
            },
          },
        },
        OR: [
          {
            registration: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            reference: {
              equals: Number(search),
            },
          },
        ],
      },
    },
  });

  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listVehicles?.vehicles &&
      data.listVehicles.vehicles.length > 0 &&
      selectedVehicle
    ) {
      update({
        id: selectedVehicle.id,
        make: selectedVehicle.make,
        colour: selectedVehicle.colour,
        model: selectedVehicle.model,
        registration: selectedVehicle.registration,
        reference: selectedVehicle.reference,
        totalOffenders: selectedVehicle.totalOffenders,
        images:
          selectedVehicle.images.map(({ id, optimised }) => ({
            id,
            optimised,
          })) || null,
      });
    }

    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  useEffect(() => {
    if (currentId) {
      setSelectedVehicle(
        data?.listVehicles?.vehicles.find((vehicle) => vehicle.id === currentId)
      );
    } else {
      setSelectedVehicle(null);
    }
  }, [currentId]);
  return {
    onSubmit,
    saving,
    data,
    loading: data?.listVehicles ? false : loading,
    search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    pagination,
    selectedVehicle,
  };
};

export default useLinkVehicle;
