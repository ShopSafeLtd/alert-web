import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/list-crime-groups.generated';

import { useCreateCrimeGroupMutation } from 'graphql/crime-groups/mutations/create-crime-group.generated';
import { ListCrimeGroupsDocument } from 'graphql/crime-groups/queries/list-crime-groups.generated';
import { SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';

import type { ListOffendersCardQuery } from './graphql/list-offender-card.generated';
import type { SearchOffendersRelayQuery } from './graphql/search-offenders-relay.generated';

import { useListOffendersCardQuery } from './graphql/list-offender-card.generated';
import { useSearchOffendersRelayQuery } from './graphql/search-offenders-relay.generated';

interface Return {
  addOffender: boolean;
  fetchMoreScroll: () => void;
  loading: boolean;
  offendersData: ListOffendersCardQuery | undefined;
  offendersSelected: boolean;
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  searchData: SearchOffendersRelayQuery | undefined;
  selectOffender: (id: string) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const useCreateCrimeGroup = (): Return => {
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);
  const [addOffender, setAddOffender] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const variables = {
    first: 18,
    order: {
      updatedAt: SortOrder.Desc,
    },
    scheme: {
      id: currentScheme,
    },
  };
  const { data: searchData, fetchMore } = useSearchOffendersRelayQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const { data: offendersData } = useListOffendersCardQuery({
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
  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listOffendersRelay: {
            ...fetchMoreResult.listOffendersRelay,
            edges: [
              ...(prev.listOffendersRelay?.edges || []),
              ...(fetchMoreResult.listOffendersRelay?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...variables,
        after: searchData?.listOffendersRelay?.pageInfo?.endCursor,
      },
    });
  };
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

  return {
    addOffender,
    fetchMoreScroll,
    loading: !searchData,
    offendersData,
    offendersSelected: selectedOffenders.length > 0,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    removeOffender,
    searchData,
    selectOffender,
    submitting,
    toggleAddOffender,
  };
};

export default useCreateCrimeGroup;
