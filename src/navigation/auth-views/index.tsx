import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';

import Terms from './components/Terms';

export const AppViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="page" />}>
    <Routes>
      <Route path="user-terms" element={<Terms />} />
    </Routes>
  </Suspense>
);

export default AppViews;
