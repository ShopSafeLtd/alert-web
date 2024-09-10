// import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import { useStoreActions } from '#/state';
import { useAuth0 } from '@auth0/auth0-react';

export const useSignOut = (): {
  signOut: () => void;
} => {
  // const { signOut: signOutClerk } = useAuthClerk();
  // TODO clerk change
  const { logout: signOutClerk } = useAuth0();
  const handleSignOut = useStoreActions((actions) => actions.auth.signOut);
  const clearUser = useStoreActions((actions) => actions.user.clearUser);
  const signOut = (): void => {
    clearUser();
    handleSignOut();
    const logo = window.localStorage.getItem('logo');
    const dLogo = window.localStorage.getItem('logo-dark');
    window.localStorage.clear();
    window.localStorage.setItem('logo', logo || '');
    window.localStorage.setItem('logo-dark', dLogo || '');
    window.sessionStorage.clear();
    void signOutClerk({ returnTo: 'https://app.shopsafealert.co.uk' });
  };
  return { signOut };
};
