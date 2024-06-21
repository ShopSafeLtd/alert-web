import React from 'react';
import { Route, Routes } from 'react-router';
import SignMg11 from '../../../views/mg11/GuestSignMg11';
import Loading from '../../../components/loading';
import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import GenerateSignInRedirect from '#/utils/generate-sign-in-redirect';

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
          <Route path="sign/:id" element={<SignMg11 />} />
        </Routes>
      </SignedIn>
    </>
  );
};

export default Mg11;
