import GenerateSignInRedirect from '#/utils/generate-sign-in-redirect';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import React from 'react';
import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import Loading from '../../../components/loading';
import SignMg11 from '../../../views/mg11/GuestSignMg11';

const Mg11 = (): JSX.Element => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      <SignedOut>
        <Navigate to={GenerateSignInRedirect(window.location.pathname)} />
      </SignedOut>
      <SignedIn>
        <Routes>
          <Route element={<SignMg11 />} path="sign/:id" />
        </Routes>
      </SignedIn>
    </>
  );
};

export default Mg11;
//
// import { useAuth0 } from '@auth0/auth0-react';
// import React from 'react';
// import { Route, Routes } from 'react-router';
//
// import Loading from '../../../components/loading';
// import SignMg11 from '../../../views/mg11/GuestSignMg11';
//
// const Mg11 = (): JSX.Element => {
//   const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();
//   if (!isAuthenticated && !isLoading) {
//     void loginWithRedirect({
//       appState: { returnTo: window.location.pathname },
//       connection: 'email',
//     });
//   }
//   if (!user) {
//     return <Loading />;
//   }
//
//   return (
//     <Routes>
//       <Route element={<SignMg11 />} path="sign/:id" />
//     </Routes>
//   );
// };
//
// export default Mg11;
