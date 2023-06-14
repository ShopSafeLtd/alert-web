import type { Image } from 'components/images/LightBox/LightBox.types';
import type { ViewOffenderMatchesQuery } from 'graphql/generated';
import { SortOrder, useViewOffenderMatchesQuery } from 'graphql/generated';
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

  return {
    data,
    loading,
    lightBox,
    toggleLightBox,
  };
};

export default useOffenderMatches;
