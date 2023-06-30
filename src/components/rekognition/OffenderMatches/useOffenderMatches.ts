import type { Image } from 'components/images/LightBox/LightBox.types';
import type { ViewOffenderMatchesQuery } from 'graphql/generated';
import {
  SortOrder,
  ViewOffenderMatchesDocument,
  useDismissMatchMutation,
  useViewOffenderMatchesQuery,
} from 'graphql/generated';
import { useState } from 'react';

interface LightBoxState {
  index: number;
  images: Image[];
}

interface Props {
  offenderId: string;
}

interface Return {
  data: ViewOffenderMatchesQuery | undefined;
  loading: boolean;
  lightBox: LightBoxState | null;
  toggleLightBox: (data: LightBoxState | null) => void;
  onDismissMatch: (id: string) => void;
}

const useOffenderMatches = ({ offenderId }: Props): Return => {
  const [lightBox, toggleLightBox] = useState<LightBoxState | null>(null);

  const { data, loading } = useViewOffenderMatchesQuery({
    variables: {
      where: {
        id: offenderId,
      },
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const [dismissMatch] = useDismissMatchMutation();

  const onDismissMatch = async (id: string) => {
    await dismissMatch({
      variables: {
        where: {
          id,
        },
      },
      optimisticResponse: {
        dismissMatch: {
          id,
        },
      },
      update: (store, { data: res }) => {
        if (res?.dismissMatch === null || res?.dismissMatch === undefined)
          return;

        // get existing group list data from Apollo store
        const existingData = store.readQuery<ViewOffenderMatchesQuery>({
          query: ViewOffenderMatchesDocument,
          variables: {
            where: {
              id: offenderId,
            },
            orderBy: {
              createdAt: SortOrder.Desc,
            },
          },
        });

        if (!existingData?.offender) return;
        if (res.dismissMatch) {
          store.writeQuery<ViewOffenderMatchesQuery>({
            query: ViewOffenderMatchesDocument,
            data: {
              offender: {
                ...existingData.offender,
                searchedMatches: existingData.offender.searchedMatches.filter(
                  (match) => match.id !== res.dismissMatch?.id
                ),
              },
              __typename: 'Query',
            },
            variables: {
              where: {
                id: offenderId,
              },
              orderBy: {
                createdAt: SortOrder.Desc,
              },
            },
          });
        }
      },
    });
  };

  return {
    data,
    loading,
    lightBox,
    toggleLightBox,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDismissMatch,
  };
};

export default useOffenderMatches;
