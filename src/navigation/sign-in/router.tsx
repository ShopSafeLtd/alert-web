import React from 'react';
import { Route, Routes } from 'react-router';
import SignInView from '#/views/sign-in/signIn.View';

const SignInPage = () => (
  <Routes>
    <Route index element={<SignInView />} />
  </Routes>
);
export default SignInPage;
