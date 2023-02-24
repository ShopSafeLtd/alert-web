import { useEffect, useState } from 'react';

import {
  Age,
  Build,
  Gender,
  ListOffendersQuery,
  QueryMode,
  Race,
  SortOrder,
  useListOffendersQuery,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';

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
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
}

const useAddExistingOffender = ({
  onClose,
  update,
  offenderIds,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

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
        id: {
          notIn: offenderIds,
        },
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
  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listOffenders?.offenders &&
      data.listOffenders.offenders.length > 0
    ) {
      if (selectedOffender) {
        update({
          id: selectedOffender.id,
          updatedAt: selectedOffender.updatedAt,
          name: selectedOffender.name || 'Unidentified Offender',
          age: selectedOffender.age || null,
          gender: selectedOffender.gender || null,
          race: selectedOffender.race || null,
          build: selectedOffender.build || null,
          dateOfBirth: selectedOffender.dateOfBirth || null,
          hair: selectedOffender.hair,
          peculiarities: selectedOffender.peculiarities,
          tags: selectedOffender.tags,
          lastActive: selectedOffender.lastActive || null,
          images:
            selectedOffender.images.map(({ id, optimised }) => ({
              id,
              optimised,
            })) || null,
        });
      }
    }
    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
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
  return {
    onSubmit,
    saving,
    data,
    loading: data?.listOffenders ? false : loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    selectedOffender,
  };
};

export default useAddExistingOffender;
