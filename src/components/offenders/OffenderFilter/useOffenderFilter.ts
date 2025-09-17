import type { Age, Build, Gender, PoliceForce, Race } from 'graphql/types';
import { Model, SortOrder } from 'graphql/types';
import type { OffenderFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import publicOffenderDob from '#/utils/public-offender-dob';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { useAtomValue } from 'jotai/index';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

interface Return {
  clearFilters: () => void;
  order: OffenderSort;
  publicOffenderDOB: boolean;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setBusinesses: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setCrimeTypesFilter: (value: string[]) => void;
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
  setPoliceAreas: (value: PoliceForce[]) => void;
}

const useOffenderFilter = (): Return => {
  // Global State
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const publicOffenderDOB = publicOffenderDob();

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

  const setCrimeTypesFilter = (values: string[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
    });
  };

  const setPoliceAreas = (values: PoliceForce[]) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        policeAreas: values,
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
        policeAreas: [],
      },
    });
  };

  return {
    clearFilters,
    order,
    publicOffenderDOB,
    setAge,
    setBuild,
    setBusinesses,
    setCreatedAtFilter,
    setCrimeTypesFilter,
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
    setPoliceAreas,
  };
};

export default useOffenderFilter;
