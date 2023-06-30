import React from 'react';
import { Route, Routes } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import SignMg11 from '../../../views/mg11/GuestSignMg11';
import Loading from '../../../components/loading';

const Mg11 = (): JSX.Element => {
  const { user, loginWithRedirect, isLoading, isAuthenticated } = useAuth0();
  if (!isAuthenticated && !isLoading) {
    void loginWithRedirect({
      appState: { returnTo: window.location.pathname },
      connection: 'email',
    });
  }
  if (!user) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path="sign/:id" element={<SignMg11 />} />
    </Routes>
  );
};

export default Mg11;
