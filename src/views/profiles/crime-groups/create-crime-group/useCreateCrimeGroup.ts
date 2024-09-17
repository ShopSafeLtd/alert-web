import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';
import type {
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';

import { useCreateCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/create-crime-group.generated';
import { ListCrimeGroupsDocument } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';

interface Return {
  addOffender: boolean;
  offendersData: OffenderSearchDetailsFragment[];
  onSubmit: () => void;
  removeOffender: (id: string) => void;
  selectOffender: (offender: OffenderSearchDetailsFragment) => void;
  submitting: boolean;
  toggleAddOffender: () => void;
}

const useCreateCrimeGroup = (): Return => {
  const navigate = useNavigate();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [selectedOffenders, setSelectedOffenders] = useState<
    OffenderSearchDetailsFragment[]
  >([]);
  const [addOffender, setAddOffender] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const selectOffender = (selected: OffenderSearchDetailsFragment) => {
    setSelectedOffenders([...selectedOffenders, selected]);
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
              connect: selectedOffenders.map(({ id }) => ({
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
      selectedOffenders.filter(({ id: offenderId }) => offenderId !== id)
    );
  };

  return {
    addOffender,
    offendersData: selectedOffenders,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    removeOffender,
    selectOffender,
    submitting,
    toggleAddOffender,
  };
};

export default useCreateCrimeGroup;
