import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';

import Terms from './components/Terms';
import Login from './authentication/login';

const ForgotPassword = React.lazy(
  () => import(`./authentication/forgot-password`)
);
const Verify = React.lazy(() => import(`./authentication/verify`));

export const AppViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="page" />}>
    <Routes>
      <Route index element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="verify/:id" element={<Verify />} />
      <Route path="user-terms" element={<Terms />} />
    </Routes>
  </Suspense>
);

export default AppViews;
