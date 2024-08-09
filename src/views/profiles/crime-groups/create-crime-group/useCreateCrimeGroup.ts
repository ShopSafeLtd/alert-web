import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import type { SearchOffendersQuery } from 'graphql/offenders/queries/__generated__/search-offenders.generated';

import { useCreateCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/create-crime-group.generated';
import { ListCrimeGroupsDocument } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { useListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import { useSearchOffendersQuery } from 'graphql/offenders/queries/__generated__/search-offenders.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';

interface Return {
  addOffender: boolean;
  loading: boolean;
  offendersData: ListOffendersQuery | undefined;
  offendersSelected: boolean;
  onPaginationChange: (page: number, size: number) => void;
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  searchData: SearchOffendersQuery | undefined;
  selectOffender: (id: string) => void;
  setSearch: (value: string) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const useCreateCrimeGroup = (): Return => {
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);
  const [addOffender, setAddOffender] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data: searchData } = useSearchOffendersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      scheme: {
        id: currentScheme,
      },
      skip: (page - 1) * 15,
      take: 15,
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
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
  });

  const { data: offendersData } = useListOffendersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: currentScheme,
      },
      where: {
        id: {
          in: selectedOffenders,
        },
      },
    },
  });

  const selectOffender = (id: string) => {
    setSelectedOffenders([...selectedOffenders, id]);
  };

  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };

  const [createCrimeGroup] = useCreateCrimeGroupMutation({
    onCompleted: () => {
      setSubmitting(false);
      navigate('/app/crime-groups');
    },
    update: (store, result) => {
      if (result.data?.createCrimeGroup) {
        const oldData = store.readQuery<
          ListCrimeGroupsQuery,
          ListCrimeGroupsQueryVariables
        >({
          query: ListCrimeGroupsDocument,
          variables: {
            where: {
              schemes: {
                some: {
                  id: {
                    equals: currentScheme,
                  },
                },
              },
            },
          },
        });

        if (oldData?.listCrimeGroups?.crimeGroups)
          store.writeQuery<ListCrimeGroupsQuery, ListCrimeGroupsQueryVariables>(
            {
              data: {
                listCrimeGroups: {
                  ...oldData.listCrimeGroups,
                  crimeGroups: [
                    ...oldData.listCrimeGroups.crimeGroups,
                    result.data.createCrimeGroup,
                  ],
                },
              },
              query: ListCrimeGroupsDocument,
              variables: {
                where: {
                  schemes: {
                    some: {
                      id: {
                        equals: currentScheme,
                      },
                    },
                  },
                },
              },
            }
          );
      }
    },
  });

  const onSubmit = async () => {
    if (selectedOffenders.length > 0) {
      setSubmitting(true);
      await createCrimeGroup({
        optimisticResponse: {
          createCrimeGroup: {
            alias: '',
            id: Math.random().toString(),
            reference: 1000,
            totalIncidents: 0,
            totalOffenders: 0,
            totalRecoveredValue: 0,
            totalTheftSuccess: 0,
            totalValue: 0,
            updatedAt: new Date(),
          },
        },
        variables: {
          data: {
            offenders: {
              connect: selectedOffenders.map((id) => ({
                id,
              })),
            },
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
          },
        },
      });
    }
  };

  const removeOffender = (id: string) => {
    setSelectedOffenders(
      selectedOffenders.filter((offender) => offender !== id)
    );
  };

  const onPaginationChange = (page: number) => {
    setPage(page);
  };

  return {
    addOffender,
    loading: !searchData,
    offendersData,
    offendersSelected: selectedOffenders.length > 0,
    onPaginationChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    removeOffender,
    searchData,
    selectOffender,
    setSearch,
    submitting,
    toggleAddOffender,
  };
};

export default useCreateCrimeGroup;
