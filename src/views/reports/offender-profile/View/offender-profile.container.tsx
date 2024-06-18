import React from 'react';
import View from './offender-profile.view';
import useOffenderProfile from './use-offender-profile';

const OffenderProfile = () => {
  const {
    offenderProfileData,
    offenderProfileLoading,
    selectedOffender,
    reportId,
  } = useOffenderProfile();

  return (
    <View
      offenderProfileData={offenderProfileData}
      offenderProfileLoading={offenderProfileLoading}
      selectedOffender={selectedOffender}
      reportId={reportId}
    />
  );
};

export default OffenderProfile;
