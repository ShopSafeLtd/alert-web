import type { MutationUpdaterFn } from '@apollo/client';

import { useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import type {
  ListInvestigationsAllSchemesQuery,
  ListInvestigationsAllSchemesQueryVariables,
} from 'graphql/investigations/queries/list-investigations-all-schemes.generated';
import {
  ListInvestigationsAllSchemesDocument,
  useListInvestigationsAllSchemesQuery,
} from 'graphql/investigations/queries/list-investigations-all-schemes.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';

interface Return {
  data: ListInvestigationsAllSchemesQuery | undefined;
  loading: boolean;
  addInvestigation: boolean;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  takeAllSchemes: boolean;
  setTakeAllSchemes: (value: boolean) => void;
}

const useListInvestigations = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const setTakeAllSchemes = useStoreActions(
    (actions) => actions.data.setInvestigationTakeAllSchemes
  );
  const groupsFilter = useStoreState(
    (state) => state.data.investigations.variables.groups
  );
  const statusFilter = useStoreState(
    (state) => state.data.investigations.variables.status
  );
  const search = useStoreState(
    (state) => state.data.investigations.variables.search
  );
  const takeAllSchemes = useStoreState(
    (state) => state.data.investigations.takeAllSchemes
  );
  const userSchemeIds = userSchemes.map((el) => el.scheme.id);
  const [addInvestigation, setAddInvestigation] = useState(false);

  // const [takeAllSchemes, setTakeAllSchemes] = useState(investigationAllSchemes);
  const variables: ListInvestigationsAllSchemesQueryVariables = {
    where: {
      schemes: {
        some: {
          id: {
            in: takeAllSchemes ? userSchemeIds : [schemeId],
          },
        },
      },
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,
      status:
        statusFilter.length > 0
          ? {
              in: statusFilter,
            }
          : undefined,
      OR: search
        ? [
            {
              name: {
                contains: search,
              },
            },
            {
              referenceStr: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
            {
              offenders: {
                some: {
                  OR: [
                    {
                      name: {
                        contains: search,
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
            },
          ]
        : undefined,
    },
  };
  const { data, loading } = useListInvestigationsAllSchemesQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const toggleAddInvestigation = () => {
    setAddInvestigation((prev) => !prev);
  };

  const updateInvestigationList: MutationUpdaterFn<
    CreateInvestigationMutation
  > = (store, { data: res }) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListInvestigationsAllSchemesQuery>({
      query: ListInvestigationsAllSchemesDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<ListInvestigationsAllSchemesQuery>({
      query: ListInvestigationsAllSchemesDocument,
      data: {
        listInvestigationsAllSchemes: {
          ...existingData.listInvestigationsAllSchemes,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          investigations:
            existingData?.listInvestigationsAllSchemes?.investigations &&
            existingData.listInvestigationsAllSchemes.investigations.length > 0
              ? [
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ...existingData?.listInvestigationsAllSchemes?.investigations,
                  res?.createInvestigation || [],
                ]
              : [res.createInvestigation],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  // const toggleTakeAllSchemes = () => {
  //   setInvestigationAllSchemes({ takeAllSchemes: !takeAllSchemes });
  // };

  return {
    data,
    loading,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
    takeAllSchemes,
    setTakeAllSchemes,
  };
};

export default useListInvestigations;
