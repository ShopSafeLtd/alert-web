import { OffenderSort, useStoreActions, useStoreState } from 'state';
import { useEffect, useState } from 'react';
import type { ListOffendersAllSchemesQuery } from 'graphql/generated';
import {
  SortOrder,
  QueryMode,
  useListOffendersAllSchemesQuery,
} from 'graphql/generated';

interface Return {
  loading: boolean;
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        undefined | null
      >
    | null
    | undefined;

  offenderId: string;
  setOffenderId: (id: string) => void;
  search: string;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const useDataAudit = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const defaultGroups = useStoreState(
    (state) => state.user.filterDefaultGroups
  );
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const filterVariables = useStoreState(
    (state) => state.data.offenders.variables
  );
  const order = useStoreState((state) => state.data.offenders.order);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [offenderId, setOffenderId] = useState<string>('');
  const [sortFilter, setSortFilter] = useState(false);

  const {
    search,
    groups,
    businesses,
    createdAt,
    peculiarities,
    hair,
    warnings,
    ethnicity,
    age,
    build,
    sex,
  } = filterVariables;
  const variables = {
    scheme: {
      in: [schemeId],
    },

    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    where: {
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      tags:
        warnings.length > 0
          ? {
              some: {
                id: {
                  in: warnings,
                },
              },
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
      incidents:
        businesses.length > 0
          ? {
              some: {
                business: {
                  id: {
                    in: businesses,
                  },
                },
              },
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
  // On mount
  useEffect(() => {
    if (groups.length === 0)
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
  }, []);
  const { data, loading } = useListOffendersAllSchemesQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });

  // function
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

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  return {
    data: data?.listOffendersAllSchemes,
    loading,
    offenderId,
    setOffenderId,
    search,
    setSearch,
    toggleSortFilter,
    sortFilter,
  };
};

export default useDataAudit;
