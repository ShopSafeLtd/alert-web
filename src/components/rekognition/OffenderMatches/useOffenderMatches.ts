import type { Image } from 'components/images/LightBox/LightBox.types';
import type { ViewOffenderMatchesQuery } from 'graphql/offenders/queries/__generated__/offender-macthes.generated';

import {
  ViewOffenderMatchesDocument,
  useViewOffenderMatchesQuery,
} from 'graphql/offenders/queries/__generated__/offender-macthes.generated';
import { useDismissMatchMutation } from 'graphql/rekognition/mutations/__generated__/dismiss-match.generated';
import { SortOrder } from 'graphql/types';
import { useState } from 'react';

interface LightBoxState {
  images: Image[];
  index: number;
}

interface Props {
  offenderId: string;
}

interface Return {
  data: ViewOffenderMatchesQuery | undefined;
  lightBox: LightBoxState | null;
  loading: boolean;
  onDismissMatch: (id: string) => void;
  toggleLightBox: (data: LightBoxState | null) => void;
}

const useOffenderMatches = ({ offenderId }: Props): Return => {
  const [lightBox, toggleLightBox] = useState<LightBoxState | null>(null);

  const { data, loading } = useViewOffenderMatchesQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
      where: {
        id: offenderId,
      },
    },
  });

  const [dismissMatch] = useDismissMatchMutation();

  const onDismissMatch = async (id: string) => {
    await dismissMatch({
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
            orderBy: {
              createdAt: SortOrder.Desc,
            },
            where: {
              id: offenderId,
            },
          },
        });

        if (!existingData?.offender) return;
        if (res.dismissMatch) {
          store.writeQuery<ViewOffenderMatchesQuery>({
            data: {
              __typename: 'Query',
              offender: {
                ...existingData.offender,
                searchedMatches: existingData.offender.searchedMatches.filter(
                  (match) => match.id !== res.dismissMatch?.id
                ),
              },
            },
            query: ViewOffenderMatchesDocument,
            variables: {
              orderBy: {
                createdAt: SortOrder.Desc,
              },
              where: {
                id: offenderId,
              },
            },
          });
        }
      },
      variables: {
        where: {
          id,
        },
      },
    });
  };

  return {
    data,
    lightBox,
    loading,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onDismissMatch,
    toggleLightBox,
  };
};

export default useOffenderMatches;
