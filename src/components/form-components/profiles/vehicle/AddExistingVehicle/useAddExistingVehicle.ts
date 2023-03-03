import { useState } from 'react';

import {
  Age,
  Build,
  Gender,
  ListVehiclesQuery,
  QueryMode,
  Race,
  SortOrder,
  useListVehiclesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { VehicleData } from 'types/DataType';

export interface OffenderData {
  id: string;
  updatedAt?: Date;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  tags: {
    id: string;
    name: string;
  }[];
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
  lastActive:
    | { id: string; dayTime?: string | null | undefined }
    | null
    | undefined;
}

interface Props {
  onClose: () => void;
  update: (value: VehicleData) => void;
  vehicleIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  // onPaginationChange: (page: number, pageSize: number) => void;
  // openLightbox: (index: number) => void;
  // lightBoxOpen: {
  //   open: boolean;
  //   index: number;
  // };
  onSelect: (item: { key: string }) => void;
}

const useAddExistingVehicle = ({
  onClose,
  update,
  vehicleIds,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListVehiclesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        id: { notIn: vehicleIds },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        OR: [
          {
            make: {
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
    },
  });
  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };
  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.listVehicles.vehicles.find(
      (el) => el.id === selected
    );
    if (selectedData) {
      update({
        id: selectedData.id,
        make: selectedData.make || '',
        model: selectedData.model || '',
        colour: selectedData.colour || '',
        registration: selectedData.registration || '',
        crimeGroup:
          selectedData.crimeGroup && selectedData.crimeGroup.length
            ? selectedData.crimeGroup?.map(({ id }) => id)
            : [],
        incidents:
          selectedData.incidents && selectedData.incidents.length
            ? selectedData.incidents.map(({ id }) => id)
            : [],
        offenders:
          selectedData.offenders && selectedData.offenders
            ? selectedData.offenders.map(({ id }) => id)
            : [],
      });
    }
    setSaving(false);
    onClose();
  };

  // const openLightbox = (index: number) => {
  //   setLightBoxOpen({ open: !lightBoxOpen.open, index });
  // };

  return {
    onSubmit,
    saving,
    data,
    loading: data?.listVehicles ? false : loading,
    search,
    setSearch,
    onSelect,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingVehicle;
