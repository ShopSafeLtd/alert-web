/* eslint-disable formatjs/no-literal-string-in-jsx */
import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from 'components/shared-components/AntD/Loading';

const Mg11 = lazy(() => import(`./mg11/router`));
const Generated = lazy(() => import(`./generated/router`));

export const GuestViews = (): JSX.Element => (
  <Suspense fallback={<Loading cover="content" />}>
    <Routes>
      <Route key="generated" path="generated/*" element={<Generated />} />,
      <Route key="mg11" path="mg11/*" element={<Mg11 />} />,
      <Route
        key="thank-you"
        path="thank-you"
        element={
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexGrow: 1,
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            Thank you for signing the statement. You can now close this tab.
          </div>
        }
      />
      ,
    </Routes>
  </Suspense>
);

export default React.memo(GuestViews);
