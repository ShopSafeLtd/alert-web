import type { SearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type { Age, Build, Gender, Race } from 'graphql/types';
import type { OffenderFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { useSearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, Role, SortOrder } from 'graphql/types';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

interface Return {
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
  clearFilters: () => void;
  order: OffenderSort;
  publicOffenderDOB: boolean;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setBusinesses: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setEthnicity: (value: Race[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setHair: (value: string) => void;
  setOrder: (value: OffenderSort) => void;
  setPeculiarities: (value: string) => void;
  setSex: (value: Gender[]) => void;
  setWarnings: (value: string[]) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  variables: OffenderFilters;
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
        dataType: {
          equals: Model.Offender,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
      },
    },
  });

  const { data: businessData, loading: businessesLoading } =
    useSearchBusinessesQuery({
      variables: {
        orderBy: {
          name: SortOrder.Asc,
        },
        take: 100,
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });

  const setGroupsFilter = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
    });
  };

  const setWarnings = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        warnings: values,
      },
    });
  };
  const setBusinesses = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
    });
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

  const setCreatedAtFilter = (values: DateType | undefined) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
    });
  };
  const setOrder = (value: OffenderSort) => {
    setOffendersState({
      order: value,
      pagination,
      variables,
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

  const clearFilters = () => {
    setOffendersState({
      order: OffenderSort.updatedAtDesc,
      pagination,
      variables: {
        ...variables,
        age: [],
        build: [],
        businesses: [],
        createdAt: undefined,
        customGalleries: [],
        ethnicity: [],
        gallery: [],
        groups: [],
        hair: '',
        peculiarities: '',
        search: '',
        sex: [],
        warnings: [],
      },
    });
  };

  return {
    businessData,
    businessesLoading,
    clearFilters,
    order,
    publicOffenderDOB,
    setAge,
    setBuild,
    setBusinesses,
    setCreatedAtFilter,
    setEthnicity,
    setGroupsFilter,
    setHair,
    setOrder,
    setPeculiarities,
    setSex,
    setWarnings,
    tags:
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [],
    tagsLoading,
    variables,
  };
};

export default useOffenderFilter;
