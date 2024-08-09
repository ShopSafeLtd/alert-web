import type { ListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';

import { useListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

interface Props {
  offenderIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update: (value: string[]) => void;
}

interface Return {
  age: Age[];
  build: Build[];
  clearFilters: () => void;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  ethnicity: Race[];
  fetchMoreScroll: () => void;
  hair: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onSelect: (id: string) => void;
  onSubmit: () => void;
  openLightbox: (index: number) => void;
  peculiarities: string;
  saving: boolean;
  search: string;
  selected: string[];
  selectedOffender:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setCurrentId: (value: string | undefined) => void;
  setEthnicity: (value: Race[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  setSearch: (value: string) => void;
  setSex: (value: Gender[]) => void;
  sex: Gender[];
}

const useSelectedOffenders = ({
  offenderIds,
  onClose,
  takeAllSchemes,
  update,
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

  const { age, build, ethnicity, groups, hair, peculiarities, search, sex } =
    filterVariables;
  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined
  >(undefined);

  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const variables = {
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    take: 64,
    where: {
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
      gender:
        sex.length > 0
          ? {
              in: sex,
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
      hair: hair
        ? {
            contains: hair,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      id:
        offenderIds && offenderIds?.length > 0
          ? {
              notIn: offenderIds,
            }
          : undefined,
      peculiarities: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      race:
        ethnicity.length > 0
          ? {
              in: ethnicity,
            }
          : undefined,
      schemeId: {
        in: takeAllSchemes ? userSchemeIds : [schemeId],
      },
    },
  };
  const { data, fetchMore, loading } = useListOffendersAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffendersAllSchemes: {
            ...fetchMoreResult.listOffendersAllSchemes,
            offenders: [
              ...(prev.listOffendersAllSchemes?.offenders || []),
              ...(fetchMoreResult.listOffendersAllSchemes?.offenders || []),
            ],
            total:
              fetchMoreResult.listOffendersAllSchemes?.total ||
              prev.listOffendersAllSchemes?.total ||
              0,
          },
        };
      },
      variables: {
        ...variables,
        skip: data?.listOffendersAllSchemes?.offenders?.length || 0,
      },
    });
  };
  // On mount
  useEffect(() => {
    if (groups.length === 0) {
      setOffendersState({
        order,
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
  const setSearch = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        search: value,
      },
    });
  };
  const setPeculiarities = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        peculiarities: value,
      },
    });
  };
  const setHair = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        hair: value,
      },
    });
  };

  const setEthnicity = (values: Race[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        ethnicity: values,
      },
    });
  };

  const setBuild = (values: Build[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        build: values,
      },
    });
  };
  const setAge = (values: Age[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        age: values,
      },
    });
  };
  const setSex = (values: Gender[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...filterVariables,
        sex: values,
      },
    });
  };
  const clearFilters = () => {
    setOffendersState({
      order: OffenderSort.updatedAtDesc,
      pagination,
      variables: {
        age: [],
        build: [],
        businesses: [],
        compactView: false,
        createdAt: undefined,
        createdBy: [],
        customGalleries: [],
        ethnicity: [],
        gallery: [],
        groups: [],
        hair: '',
        peculiarities: '',
        search: '',
        sex: [],
        tableView: false,
        warnings: [],
      },
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
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
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
    age,
    build,
    clearFilters,
    data: data?.listOffendersAllSchemes,
    ethnicity,
    fetchMoreScroll,
    hair,
    lightBoxOpen,
    loading: data?.listOffendersAllSchemes ? false : loading,
    onSelect,
    onSubmit,
    openLightbox,
    peculiarities,
    saving,
    search,
    selected,
    selectedOffender,
    setAge,
    setBuild,
    setCurrentId,
    setEthnicity,
    setHair,
    setPeculiarities,
    setSearch,
    setSex,
    sex,
  };
};

export default useSelectedOffenders;
