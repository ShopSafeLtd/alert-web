import type {
  Age,
  Build,
  Gender,
  Race,
  SearchBusinessesQuery,
} from 'graphql/generated';
import {
  Model,
  Role,
  SortOrder,
  useSearchBusinessesQuery,
  useTagsQuery,
} from 'graphql/generated';
import { OffenderSort, useStoreActions, useStoreState } from 'state';
import type { DateType } from 'types/DataType';
import type { OffenderFilters } from 'state/data-model';

interface Return {
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  setEthnicity: (value: Race[]) => void;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setWarnings: (value: string[]) => void;
  setBusinesses: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  variables: OffenderFilters;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
  publicOffenderDOB: boolean;
}

const useOffenderFilter = (): Return => {
  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;

  // Fetch scheme tags
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      orderBy: { name: SortOrder.Asc },
      where: {
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });

  const { data: businessData, loading: businessesLoading } =
    useSearchBusinessesQuery({
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
        orderBy: {
          name: SortOrder.Asc,
        },
      },
    });

  const setGroupsFilter = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const setWarnings = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        warnings: values,
      },
      order,
    });
  };
  const setBusinesses = (values: string[]) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
      order,
    });
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

  const setCreatedAtFilter = (values: DateType | undefined) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
      order,
    });
  };
  const setOrder = (value: OffenderSort) => {
    setOffendersState({
      pagination,
      variables,
      order: value,
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

  const clearFilters = () => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
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
      },
      order: OffenderSort.updatedAtDesc,
    });
  };

  return {
    order,
    setOrder,
    variables,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    clearFilters,
    setAge,
    setBuild,
    setEthnicity,
    setHair,
    setPeculiarities,
    setSex,
    setGroupsFilter,
    setCreatedAtFilter,
    setWarnings,
    businessData,
    setBusinesses,
    businessesLoading,
    publicOffenderDOB,
  };
};

export default useOffenderFilter;
