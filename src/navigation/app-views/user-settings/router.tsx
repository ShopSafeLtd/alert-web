import React from 'react';
import { Routes, Route } from 'react-router';
import AccountMenu from '../../../old-components/account/AccountMenu';
import EditProfile from '../../../old-components/account/EditProfile';
import ResetPassword from '../../../old-components/account/ResetPassword';
import NotificationSettings from '../../../old-components/account/NotificationSettings';
import Terms from '../../../old-components/users/onboard/Terms/Terms';

const UserSettings = (): JSX.Element => (
  <Routes>
    <Route path="*" element={AccountMenu} />
    <Route path="edit-profile" element={EditProfile} />
    <Route path="reset-password" element={ResetPassword} />
    <Route path="notifications" element={NotificationSettings} />
    <Route
      path="terms"
      element={() => (
        <div style={{ padding: '24px', backgroundColor: 'white' }}>
          <Terms values={{ termsSigned: true, error: false }} hideForm />
        </div>
      )}
    />
  </Routes>
);

export default UserSettings;
