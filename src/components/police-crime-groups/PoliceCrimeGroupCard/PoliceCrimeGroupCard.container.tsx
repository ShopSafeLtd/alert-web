import React from 'react';

import type { PoliceCrimeGroupCardFragment } from './__generated__/PoliceCrimeGroupCard.fragment.generated';

import PoliceCrimeGroupCard from './PoliceCrimeGroupCard.view';

interface Props {
  compactView?: boolean;
  sharedCrimeGroup: PoliceCrimeGroupCardFragment;
}

const PoliceCrimeGroupCardContainer = ({
  compactView,
  sharedCrimeGroup,
}: Props): JSX.Element => (
  <PoliceCrimeGroupCard
    compactView={compactView}
    sharedCrimeGroup={sharedCrimeGroup}
  />
);

export default PoliceCrimeGroupCardContainer;
