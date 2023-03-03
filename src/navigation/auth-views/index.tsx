import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';

import Terms from './components/Terms';
import Login from './authentication/login';

export const AppViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="page" />}>
    <Routes>
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="user-terms" element={<Terms />} />
    </Routes>
  </Suspense>
);

export default AppViews;
