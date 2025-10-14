/* eslint-disable formatjs/no-literal-string-in-jsx */
import Loading from 'components/shared-components/AntD/Loading';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Mg11 = lazy(() => import('./mg11/router'));
const Generated = lazy(() => import('./generated/router'));

export const GuestViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="content" />}>
    <Routes>
      <Route element={<Generated />} key="generated" path="generated/*" />,
      <Route element={<Mg11 />} key="mg11" path="mg11/*" />,
      <Route
        element={
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            Thank you for signing the statement. You can now close this tab.
          </div>
        }
        key="thank-you"
        path="thank-you"
      />
      ,
    </Routes>
  </Suspense>
);

export default React.memo(GuestViews);
