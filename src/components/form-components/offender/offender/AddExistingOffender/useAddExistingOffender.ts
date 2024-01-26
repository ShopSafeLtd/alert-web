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
  onClose: () => void;
  update: (value: OffenderData) => void;
  offenderIds: string[] | undefined;
  takeAllSchemes?: boolean;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListOffendersAllSchemesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  pagination: { page: number; pageSize: number };
  onPaginationChange: (page: number, pageSize: number) => void;
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
}

const useAddExistingOffender = ({
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
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );

  const { search, groups, peculiarities, hair, ethnicity, age, build, sex } =
    variables;
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
  const { data, loading } = useListOffendersAllSchemesQuery({
    variables: {
      order: {
        updatedAt:
          order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
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
    },
    fetchPolicy: 'cache-and-network',
  });
  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    if (groups.length === 0) {
      setOffendersState({
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
        order,
      });
    } else {
      setOffendersState({
        pagination: {
          ...pagination,
          sizeOptions,
        },
        variables,
        order,
      });
    }
  }, []);
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
  const setPeculiarities = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        peculiarities: value,
      },
      order,
    });
  };
  const setHair = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        hair: value,
      },
      order,
    });
  };
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
    // setPagination({
    //   ...pagination,
    //   page,
    // })
  };

  const setEthnicity = (values: Race[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        ethnicity: values,
      },
      order,
    });
  };

  const setBuild = (values: Build[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        build: values,
      },
      order,
    });
  };
  const setAge = (values: Age[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        age: values,
      },
      order,
    });
  };
  const setSex = (values: Gender[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
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

  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listOffendersAllSchemes?.offenders &&
      data.listOffendersAllSchemes.offenders.length > 0 &&
      selectedOffender
    ) {
      update({
        id: selectedOffender.id,
        reference: selectedOffender.reference,
        name: selectedOffender.name,
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
    data,
    loading: data?.listOffendersAllSchemes ? false : loading,
    search,
    setSearch,
    onPaginationChange,
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
    pagination,
    hair,
    peculiarities,
    setHair,
    setPeculiarities,
    clearFilters,
  };
};

export default useAddExistingOffender;
