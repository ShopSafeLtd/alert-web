import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { TermsCard } from '#/navigation/auth-views/components/Terms';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { Route, Routes } from 'react-router';
import EditProfile from 'views/user-settings/Edit-Profile';

const UserSettings = (): JSX.Element => (
  <Routes>
    <Route
      element={
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Read,
            model: PermissionModel.UserSettings,
          }}
        >
          <EditProfile />
        </PermissionCheckWrapper>
      }
      path="*"
    />
    <Route element={<TermsCard />} path="terms" />
  </Routes>
);

export default UserSettings;
