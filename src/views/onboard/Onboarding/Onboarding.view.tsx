import type { CurrentSchemeTermsQuery } from 'graphql/scheme/queries/__generated__/current-terms.generated';

import SchemeTerms from '#/components/onboarding/Onboarding/SchemeTerms';
import Terms from '#/components/onboarding/Onboarding/Terms/Terms.view';
import React from 'react';

interface Props {
  current: number;
  loading: boolean;
  name: string;
  onBack: () => void;
  onSubmit: () => void;
  saving: boolean;
  schemeTerms: CurrentSchemeTermsQuery | undefined;
  updateSchemeTermsSigned: (value: unknown) => void;
  updateTermsSigned: () => void;
}

const Onboarding = ({
  current,
  loading,
  name,
  onSubmit,
  saving,
  schemeTerms,
  updateSchemeTermsSigned,
  updateTermsSigned,
}: Props): JSX.Element => (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
    {current === 0 && (
      <Terms
        loading={loading}
        onSubmit={onSubmit}
        saving={saving}
        update={updateTermsSigned}
      />
    )}
    {current === 1 && (
      <SchemeTerms
        content={schemeTerms?.scheme?.currentTerms?.content || ''}
        name={name}
        onSubmit={onSubmit}
        saving={saving}
        update={updateSchemeTermsSigned}
        updateBox={updateTermsSigned}
      />
    )}
  </div>
);

export default Onboarding;
