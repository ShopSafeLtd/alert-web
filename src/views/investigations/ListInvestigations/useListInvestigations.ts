import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type {
  InvestigationRelayQuery,
  InvestigationRelayQueryVariables,
} from 'graphql/investigations/queries/__generated__/list-investigations-all-schemes.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  InvestigationRelayDocument,
  useInvestigationRelayQuery,
} from 'graphql/investigations/queries/__generated__/list-investigations-all-schemes.generated';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreActions, useStoreState } from 'state';

interface Return {
  addInvestigation: boolean;
  data: InvestigationRelayQuery | undefined;
  loading: boolean;
  onPaginationChange: (pageValue: number, sizeValue: number) => void;
  setTakeAllSchemes: (value: boolean) => void;
  takeAllSchemes: boolean;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
}

const useListInvestigations = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  // const [takeAllSchemes, setTakeAllSchemes] = useState(investigationAllSchemes);
  const variables: InvestigationRelayQueryVariables = {
    orderBy: {
      createdAt: SortOrder.Desc,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      groupIds: groupsFilter,
      schemeIds: [schemeId],
      search,
      status: statusFilter,
    },
  };
  const { data, loading } = useInvestigationRelayQuery({
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

    const existingData = store.readQuery<
      InvestigationRelayQuery,
      InvestigationRelayQueryVariables
    >({
      query: InvestigationRelayDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<InvestigationRelayQuery, InvestigationRelayQueryVariables>(
      {
        data: {
          __typename: 'Query',
          investigationRelay: {
            ...existingData.investigationRelay,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            edges:
              existingData?.investigationRelay.edges &&
              existingData.investigationRelay.edges.length > 0
                ? [
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    ...existingData.investigationRelay?.edges,
                    res?.createInvestigation || [],
                  ]
                : [res.createInvestigation],
          },
        },
        query: InvestigationRelayDocument,
        variables,
      }
    );
  };
  const onPaginationChange = (pageValue: number, sizeValue: number) => {
    setPage(pageValue);
    setPageSize(sizeValue);
  };

  return {
    addInvestigation,
    data,
    loading,
    onPaginationChange,
    setTakeAllSchemes,
    takeAllSchemes,
    toggleAddInvestigation,
    updateInvestigationList,
  };
};

export default useListInvestigations;
