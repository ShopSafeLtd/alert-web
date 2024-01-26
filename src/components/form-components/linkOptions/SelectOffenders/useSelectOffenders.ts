import { useEffect, useState } from 'react';

import type {
  Age,
  Build,
  Gender,
  ImagePosition,
  ListOffendersAllSchemesQuery,
  Race,
} from 'graphql/generated';
import {
  useListOffendersAllSchemesQuery,
  QueryMode,
  SortOrder,
} from 'graphql/generated';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

export interface OffenderData {
  id: string;
  reference?: number | null;
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
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
    position: ImagePosition;
    rotation: number;
  }[];
  imageUid?: string[] | undefined;
  tags: {
    id: string;
    name: string;
  }[];
  lastActive:
    | { id: string; dayTime?: string | null | undefined }
    | null
    | undefined;
}

interface Props {
  onClose: () => void;
  update: (value: string[]) => void;
  offenderIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
  onSelect: (id: string) => void;
  selected: string[];
  fetchMoreScroll: () => void;
}

const useSelectedOffenders = ({
  onClose,
  update,
  offenderIds,
  takeAllSchemes,
}: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const defaultGroups = useStoreState(
    (state) => state.user.filterDefaultGroups
  );
  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string[]>([]);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.offenders.variables
  );
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { search, groups, peculiarities, hair, ethnicity, age, build, sex } =
    filterVariables;
  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined
  >(undefined);

  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const variables = {
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    take: 64,
    where: {
      schemeId: {
        in: takeAllSchemes ? userSchemeIds : [schemeId],
      },
      id:
        offenderIds && offenderIds?.length > 0
          ? {
              notIn: offenderIds,
            }
          : undefined,
      groups:
        groups.length > 0
          ? {
              some: {
                id: {
                  in: groups,
                },
              },
            }
          : undefined,
      gender:
        sex.length > 0
          ? {
              in: sex,
            }
          : undefined,
      age:
        age.length > 0
          ? {
              in: age,
            }
          : undefined,
      build:
        build.length > 0
          ? {
              in: build,
            }
          : undefined,
      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      hair: hair
        ? {
            contains: hair,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      peculiarities: peculiarities
        ? {
            mode: QueryMode.Insensitive,
            contains: peculiarities,
          }
        : undefined,
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          alias: {
            hasSome: [search],
          },
        },
        {
          referenceStr: {
            contains: search,
          },
        },
      ],
    },
  };
  const { data, loading, fetchMore } = useListOffendersAllSchemesQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...variables,
        skip: data?.listOffendersAllSchemes?.offenders?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffendersAllSchemes: {
            ...fetchMoreResult.listOffendersAllSchemes,
            total:
              fetchMoreResult.listOffendersAllSchemes?.total ||
              prev.listOffendersAllSchemes?.total ||
              0,
            offenders: [
              ...(prev.listOffendersAllSchemes?.offenders || []),
              ...(fetchMoreResult.listOffendersAllSchemes?.offenders || []),
            ],
          },
        };
      },
    });
  };
  // On mount
  useEffect(() => {
    if (groups.length === 0) {
      setOffendersState({
        pagination,
        variables: {
          ...filterVariables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
        order,
      });
    }
  }, []);
  const setSearch = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
      order,
    });
  };
  const setPeculiarities = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        peculiarities: value,
      },
      order,
    });
  };
  const setHair = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        hair: value,
      },
      order,
    });
  };

  const setEthnicity = (values: Race[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        ethnicity: values,
      },
      order,
    });
  };

  const setBuild = (values: Build[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        build: values,
      },
      order,
    });
  };
  const setAge = (values: Age[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        age: values,
      },
      order,
    });
  };
  const setSex = (values: Gender[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...filterVariables,
        sex: values,
      },
      order,
    });
  };
  const clearFilters = () => {
    setOffendersState({
      pagination,
      variables: {
        search: '',
        warnings: [],
        groups: [],
        businesses: [],
        createdAt: undefined,
        gallery: [],
        customGalleries: [],
        peculiarities: '',
        hair: '',
        ethnicity: [],
        build: [],
        age: [],
        sex: [],
        compactView: false,
      },
      order: OffenderSort.updatedAtDesc,
    });
  };
  const onSelect = (value: string) => {
    if (value) {
      setSelectedOffender(undefined);
      setCurrentId(undefined);
      if (selected.includes(value)) {
        setSelected(selected.filter((index) => index !== value));
      } else {
        setSelected([...selected, value]);
      }
    }
  };
  const onSubmit = () => {
    setSaving(true);
    if (selected) {
      update(selected);
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
        data?.listOffendersAllSchemes?.offenders.find(
          (offender) => offender.id === currentId
        )
      );
    } else {
      setSelectedOffender(null);
    }
  }, [currentId]);
  return {
    onSubmit,
    saving,
    data: data?.listOffendersAllSchemes,
    loading: data?.listOffendersAllSchemes ? false : loading,
    search,
    setSearch,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    selectedOffender,
    age,
    build,
    ethnicity,
    setAge,
    setBuild,
    setEthnicity,
    setSex,
    sex,
    hair,
    peculiarities,
    setHair,
    setPeculiarities,
    clearFilters,
    onSelect,
    selected,
    fetchMoreScroll,
  };
};

export default useSelectedOffenders;
