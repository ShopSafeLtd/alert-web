import React from 'react';

import View from './Onboarding.view';
import useOnboarding from './useOnboarding';

const Onboarding = (): JSX.Element => {
  const {
    current,
    loading,
    name,
    onBack,
    onSubmit,
    saving,
    schemeTerms,
    updateSchemeTermsSigned,
    updateTermsSigned,
  } = useOnboarding();
  return (
    <View
      current={current}
      loading={loading}
      name={name}
      onBack={onBack}
      onSubmit={onSubmit}
      saving={saving}
      schemeTerms={schemeTerms}
      updateSchemeTermsSigned={updateSchemeTermsSigned}
      updateTermsSigned={updateTermsSigned}
    />
  );
};

export default Onboarding;
