import type { ListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListOffendersAllSchemesQuery } from 'graphql/offenders/queries/__generated__/list-offenders-all-schemes.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { OffenderSort, useStoreActions, useStoreState } from 'state';

interface Return {
  data:
    | Exclude<
        ListOffendersAllSchemesQuery['listOffendersAllSchemes'],
        null | undefined
      >
    | null
    | undefined;
  loading: boolean;

  offenderId: string;
  search: string;
  setOffenderId: (id: string) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
}

const useDataAudit = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
    age,
    build,
    businesses,
    createdAt,
    ethnicity,
    groups,
    hair,
    peculiarities,
    search,
    sex,
    warnings,
  } = filterVariables;
  const variables = {
    order: {
      updatedAt:
        order === OffenderSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },

    scheme: {
      in: [schemeId],
    },
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
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
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
    },
  };
  // On mount
  useEffect(() => {
    if (groups.length === 0)
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
  }, []);
  const { data, loading } = useListOffendersAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  // function
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

  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  return {
    data: data?.listOffendersAllSchemes,
    loading,
    offenderId,
    search,
    setOffenderId,
    setSearch,
    sortFilter,
    toggleSortFilter,
  };
};

export default useDataAudit;
