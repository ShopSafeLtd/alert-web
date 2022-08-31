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
    setCurrent,
  } = useOnboarding();

  return (
    <View
      saving={saving}
      current={current}
      setCurrent={setCurrent}
      onBack={onBack}
      onSubmit={onSubmit}
      updateTermsSigned={updateTermsSigned}
      updateAccountDetail={updateAccountDetail}
    />
  );
};

export default Onboarding;
