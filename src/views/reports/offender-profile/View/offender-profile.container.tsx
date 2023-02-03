import React from 'react';
import View from './offender-profile.view';
import useOffenderProfile from './use-offender-profile';

const OffenderProfile = () => {
  const { offenderProfileData, offenderProfileLoading, selectedOffender } =
    useOffenderProfile();

  return (
    <View
      offenderProfileData={offenderProfileData}
      offenderProfileLoading={offenderProfileLoading}
      selectedOffender={selectedOffender}
    />
  );
};

export default OffenderProfile;
