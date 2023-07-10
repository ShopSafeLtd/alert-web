import type { MutationUpdaterFn } from '@apollo/client';
import type {
  CreateInvestigationMutation,
  ListInvestigationsQuery,
} from 'graphql/generated';
import {
  ListInvestigationsDocument,
  useListInvestigationsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface Return {
  data: ListInvestigationsQuery | undefined;
  loading: boolean;
  addInvestigation: boolean;
  toggleAddInvestigation: () => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
}

const useListInvestigations = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addInvestigation, setAddInvestigation] = useState(false);

  const { data, loading } = useListInvestigationsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
    },
  });

  const toggleAddInvestigation = () => {
    setAddInvestigation((prev) => !prev);
  };

  const updateInvestigationList: MutationUpdaterFn<
    CreateInvestigationMutation
  > = (store, { data: res }) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<ListInvestigationsQuery>({
      query: ListInvestigationsDocument,
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });

    if (existingData === null) return;

    store.writeQuery<ListInvestigationsQuery>({
      query: ListInvestigationsDocument,
      data: {
        listInvestigations: {
          ...existingData.listInvestigations,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          investigations:
            existingData?.listInvestigations?.investigations &&
            existingData.listInvestigations.investigations.length > 0
              ? [
                  // eslint-disable-next-line no-unsafe-optional-chaining
                  ...existingData?.listInvestigations?.investigations,
                  res?.createInvestigation || [],
                ]
              : [res.createInvestigation],
        },
        __typename: 'Query',
      },
      variables: {
        scheme: {
          id: schemeId,
        },
      },
    });
  };
  return {
    data,
    loading,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
  };
};

export default useListInvestigations;
