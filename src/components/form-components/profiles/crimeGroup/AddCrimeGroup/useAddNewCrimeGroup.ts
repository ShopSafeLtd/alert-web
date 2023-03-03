import { useEffect, useState } from 'react';

import {
  ListOffendersQuery,
  QueryMode,
  SortOrder,
  useListOffendersQuery,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';
import { CrimeGroupData } from 'types/DataType';

interface Props {
  onClose: () => void;
  update: (value: CrimeGroupData) => void;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  updateSelectedOffenders: (value: string) => void;
  selectedOffenderIds: string[];
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const useAddCrimeGroup = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string>('');
  const [selectedOffenderIds, setSelectedOffenderIds] = useState<string[]>([]);
  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const { data, loading } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        // id: {
        //   notIn: selectedOffenderIds,
        // },
        OR: [
          {
            name: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number) => {
    setOffendersState({
      pagination: {
        ...pagination,
        page,
      },
      variables,
      order,
    });
  };
  const setSearch = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };
  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };
  const updateSelectedOffenders = (value: string) => {
    if (selectedOffenderIds.includes(value)) {
      setSelectedOffenderIds(selectedOffenderIds.filter((id) => id !== value));
    } else {
      setSelectedOffenderIds([...selectedOffenderIds, value]);
    }
    // setSelectedOffender(undefined);
  };
  useEffect(() => {
    if (currentId) {
      setSelectedOffender(
        data?.listOffenders?.offenders.find(
          (offender) => offender.id === currentId
        )
      );
    }
  }, [currentId]);
  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listOffenders?.offenders &&
      data.listOffenders.offenders.length > 0
    ) {
      const selectedOffenders = data.listOffenders.offenders.filter(({ id }) =>
        selectedOffenderIds.includes(id)
      );
      // const updateData = selectedOffenders.map((el) => ({
      //   id: el.id,
      //                   totalOffenders: el.totalOffenders,
      //                   totalIncidents: el.totalIncidents,
      //                   totalValue: el.totalValue,
      //                   totalRecoveredValue: el.totalRecoveredValue,
      //                   totalTheftSuccess: el.totalTheftSuccess,})
      if (selectedOffenders) {
        update({
          id: Math.floor(Math.random() * 1000).toString(),
          totalOffenders: selectedOffenderIds.length,
        });
      }
    }
    setSaving(false);
    onClose();
  };

  return {
    onSubmit,
    saving,
    data,
    loading: data?.listOffenders ? false : loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    selectedOffender,
    updateSelectedOffenders,
    openLightbox,
    lightBoxOpen,
    selectedOffenderIds,
  };
};

export default useAddCrimeGroup;
