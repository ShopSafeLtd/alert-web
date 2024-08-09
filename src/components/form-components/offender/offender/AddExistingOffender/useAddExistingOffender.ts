import type { ListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import type { Age, Build, Gender, ImagePosition, Race } from 'graphql/types';

import { useListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

export interface OffenderData {
  age?: Age | null;
  approved?: boolean | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  id: string;
  imageUid?: string[] | undefined;
  images?: {
    fileName?: null | string;
    id: string;
    new?: boolean;
    optimised?: null | string;
    position: ImagePosition;
    rotation: number;
    type?: null | string;
    url?: null | string;
  }[];
  lastActive:
    | { dayTime?: null | string | undefined; id: string }
    | null
    | undefined;
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  reference?: null | number;
  tags: {
    id: string;
    name: string;
  }[];
  updatedAt?: Date;
}
const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['12', '24', '48', '96'];
  }
  if (window.innerWidth > 1799) {
    return ['12', '24', '48', '96'];
  }
  return ['12'];
};
interface Props {
  offenderIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update: (value: OffenderData) => void;
}

interface Return {
  age: Age[];
  build: Build[];
  clearFilters: () => void;
  data: ListOffendersAllSchemesQuery | undefined;
  ethnicity: Race[];
  hair: string;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: (value: string | undefined) => void;
  openLightbox: (index: number) => void;
  pagination: { page: number; pageSize: number };
  peculiarities: string;
  saving: boolean;
  search: string;
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

const useAddExistingOffender = ({
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
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { age, build, ethnicity, groups, hair, peculiarities, search, sex } =
    variables;
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
  const { data, loading } = useListOffendersAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
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
    },
  });
  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groups.length === 0) {
      setOffendersState({
        order,
        pagination: {
          ...pagination,
          sizeOptions,
        },
        variables: {
          ...variables,
          groups:
            defaultGroups
              ?.filter(({ scheme }) => scheme.id === schemeId)
              ?.map(({ id }) => id) || [],
        },
      });
    } else {
      setOffendersState({
        order,
        pagination: {
          ...pagination,
          sizeOptions,
        },
        variables,
      });
    }
  }, []);
  const setSearch = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        search: value,
      },
    });
  };
  const setPeculiarities = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        peculiarities: value,
      },
    });
  };
  const setHair = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        hair: value,
      },
    });
  };
  const onPaginationChange = (page: number, pageSize: number) => {
    setOffendersState({
      order,
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
    });
    // setPagination({
    //   ...pagination,
    //   page,
    // })
  };

  const setEthnicity = (values: Race[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        ethnicity: values,
      },
    });
  };

  const setBuild = (values: Build[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        build: values,
      },
    });
  };
  const setAge = (values: Age[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        age: values,
      },
    });
  };
  const setSex = (values: Gender[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
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

  const onSubmit = () => {
    setSaving(true);

    if (
      data?.listOffendersAllSchemes?.offenders &&
      data.listOffendersAllSchemes.offenders.length > 0 &&
      selectedOffender
    ) {
      update({
        age: selectedOffender.age || null,
        build: selectedOffender.build || null,
        dateOfBirth: selectedOffender.dateOfBirth || null,
        gender: selectedOffender.gender || null,
        hair: selectedOffender.hair,
        id: selectedOffender.id,
        images:
          selectedOffender.images.map(
            ({ id, optimised, position, rotation }) => ({
              id,
              optimised,
              position,
              // ???
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              rotation,
            })
          ) || null,
        lastActive: selectedOffender.lastActive || null,
        name: selectedOffender.name,
        peculiarities: selectedOffender.peculiarities,
        race: selectedOffender.race || null,
        reference: selectedOffender.reference,
        tags: selectedOffender.tags,
      });
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
    data,
    ethnicity,
    hair,
    lightBoxOpen,
    loading: data?.listOffendersAllSchemes ? false : loading,
    onPaginationChange,
    onSubmit,
    openLightbox,
    pagination,
    peculiarities,
    saving,
    search,
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

export default useAddExistingOffender;
