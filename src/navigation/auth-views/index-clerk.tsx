import Loading from 'components/shared-components/AntD/Loading';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Terms from './components/Terms';

export const AppViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="page" />}>
    <Routes>
      <Route element={<Terms />} path="user-terms" />
    </Routes>
  </Suspense>
);

export default AppViews;
