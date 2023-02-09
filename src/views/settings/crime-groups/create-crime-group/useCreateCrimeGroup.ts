import { useState } from 'react';
import { useStoreState } from 'state';
import {
  ListCrimeGroupsDocument,
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
  ListOffendersQuery,
  SearchOffendersQuery,
  SortOrder,
  useCreateCrimeGroupMutation,
  useListOffendersQuery,
  useSearchOffendersQuery,
} from 'graphql/generated';
import { useNavigate } from 'react-router';

interface Return {
  searchData: SearchOffendersQuery | undefined;
  loading: boolean;
  selectOffender: (id: string) => void;
  offendersData: ListOffendersQuery | undefined;
  offendersSelected: boolean;
  addOffender: boolean;
  toggleAddOffender: () => void;
  onSubmit: () => void;
  submitting: boolean;
  removeOffender: (id: string) => void;
}

const useCreateCrimeGroup = (): Return => {
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [selectedOffenders, setSelectedOffenders] = useState<string[]>([]);
  const [addOffender, setAddOffender] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { data: searchData } = useSearchOffendersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: currentScheme,
      },
      take: 10,
      order: {
        updatedAt: SortOrder.Desc,
      },
    },
  });

  const { data: offendersData } = useListOffendersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: {
          in: selectedOffenders,
        },
      },
      scheme: {
        id: currentScheme,
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
              data: {
                listCrimeGroups: {
                  ...oldData.listCrimeGroups,
                  crimeGroups: [
                    ...oldData.listCrimeGroups.crimeGroups,
                    result.data.createCrimeGroup,
                  ],
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
        variables: {
          data: {
            schemes: {
              connect: [
                {
                  id: currentScheme,
                },
              ],
            },
            offenders: {
              connect: selectedOffenders.map((id) => ({
                id,
              })),
            },
          },
        },
        optimisticResponse: {
          createCrimeGroup: {
            id: Math.random().toString(),
            reference: 1000,
            totalIncidents: 0,
            totalOffenders: 0,
            totalRecoveredValue: 0,
            totalTheftSuccess: 0,
            totalValue: 0,
          },
        },
      });
      setSubmitting(false);
      navigate('/app/scheme-settings/crime-groups');
    }
  };

  const removeOffender = (id: string) => {
    setSelectedOffenders(
      selectedOffenders.filter((offender) => offender !== id)
    );
  };

  return {
    searchData,
    loading: !searchData,
    selectOffender,
    offendersData,
    offendersSelected: selectedOffenders.length > 0,
    toggleAddOffender,
    addOffender,
    onSubmit,
    removeOffender,
    submitting,
  };
};

export default useCreateCrimeGroup;
