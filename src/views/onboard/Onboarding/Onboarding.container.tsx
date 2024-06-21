import React from 'react';
import View from './Onboarding.view';
import useOnboarding from './useOnboarding';

const Onboarding = (): JSX.Element => {
  const {
    onSubmit,
    saving,
    current,
    onBack,
    updateAccountDetail,
    updateTermsSigned,
    loading,
    schemeTerms,
    updateSchemeTermsSigned,
    name,
    accountDetail,
  } = useOnboarding();
  return (
    <View
      accountDetail={accountDetail}
      loading={loading}
      schemeTerms={schemeTerms}
      saving={saving}
      current={current}
      onBack={onBack}
      onSubmit={onSubmit}
      updateTermsSigned={updateTermsSigned}
      updateSchemeTermsSigned={updateSchemeTermsSigned}
      updateAccountDetail={updateAccountDetail}
      name={name}
    />
  );
};

export default Onboarding;
