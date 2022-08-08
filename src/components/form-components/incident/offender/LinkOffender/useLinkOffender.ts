import { useState } from 'react';

import {
  QueryMode,
  SortOrder,
  useListOffendersQuery,
  ListOffendersQuery,
} from 'graphql/generated';

import { useLightbox } from 'simple-react-lightbox';

import { useStoreState, OffenderSort, useStoreActions } from 'state';

interface FormData {
  selectedOffenderIds: string[];
}

interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  openLightbox: (index: number) => void;
  setCurrentId: (value: string | undefined) => void;
  offenderData:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | undefined;
}

const useViewOffender = ({ onClose, update }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const { openLightbox } = useLightbox();
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { data: ListOffendersData, loading } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
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

  const onPaginationChange = (page: number, pageSize: number) => {
    setOffendersState({
      pagination: {
        ...pagination,
        page,
        pageSize,
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
  const onSubmit = (data: FormData) => {
    setSaving(true);
    update(data.selectedOffenderIds);
    setSaving(false);
    onClose();
  };
  return {
    onSubmit,
    saving,
    data: ListOffendersData,
    loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    openLightbox,
    setCurrentId,
    offenderData: currentId
      ? ListOffendersData?.listOffenders?.offenders.find(
          (offender) => offender.id === currentId
        )
      : ListOffendersData?.listOffenders?.offenders[0],
  };
};

export default useViewOffender;
