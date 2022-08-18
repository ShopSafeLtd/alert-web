import React from 'react';
import { Routes, Route } from 'react-router';
import EditProfile from 'views/user-settings/editProfile';

import Terms from 'views/onboard/Onboarded/Terms';
// import Terms from 'components/onboarding/Terms';

// import Terms from '../../../old-components/users/onboard/Terms/Terms';

const UserSettings = (): JSX.Element => (
  <Routes>
    <Route path="*" element={<EditProfile />} />
    <Route path="terms" element={<Terms />} />
    {/* <Route
      path="terms"
      element={() => (
        <div style={{ padding: '24px', backgroundColor: 'white' }}>
          <Terms
          // values={{ termsSigned: true, error: false }}
          // hideForm
          />
        </div>
      )}
    /> */}
  </Routes>
);

export default UserSettings;
