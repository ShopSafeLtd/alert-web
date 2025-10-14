import React from 'react';

import View from './offender-profile.view';
import useOffenderProfile from './use-offender-profile';

const OffenderProfile = () => {
  const {
    offenderProfileData,
    offenderProfileLoading,
    reportId,
    selectedOffender,
  } = useOffenderProfile();

  return (
    <View
      offenderProfileData={offenderProfileData}
      offenderProfileLoading={offenderProfileLoading}
      reportId={reportId}
      selectedOffender={selectedOffender}
    />
  );
};

export default OffenderProfile;
