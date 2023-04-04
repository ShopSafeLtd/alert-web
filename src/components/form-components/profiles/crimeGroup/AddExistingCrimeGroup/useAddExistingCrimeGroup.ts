import { useState } from 'react';

import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { CrimeGroupData } from 'types/DataType';

interface Props {
  onClose: () => void;
  update: (value: CrimeGroupData) => void;
  crimeGroupIds: string[] | undefined;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
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

const useAddExistingCrimeGroup = ({
  onClose,
  update,
  crimeGroupIds,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [selected, setSelected] = useState<string | undefined>();
  const [search, setSearch] = useState<string>('');

  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      where: {
        id: { notIn: crimeGroupIds },
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
        OR: [
          {
            id: {
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
    const selectedData = data?.listCrimeGroups.crimeGroups.find(
      (el) => el.id === selected
    );
    if (selectedData) {
      update({
        id: selectedData.id,
        reference: selectedData.reference || 0,
        totalOffenders: selectedData.totalOffenders || 0,
        totalIncidents: selectedData.totalIncidents || 0,
        totalValue: selectedData.totalValue || 0,
        totalRecoveredValue: selectedData.totalRecoveredValue || 0,
        totalTheftSuccess: selectedData.totalTheftSuccess || 0,
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
    loading: data?.listCrimeGroups ? false : loading,
    search,
    setSearch,
    onSelect,
    // openLightbox,
    // lightBoxOpen,
  };
};

export default useAddExistingCrimeGroup;
