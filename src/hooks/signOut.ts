import { useAuth as useAuthClerk } from '@clerk/clerk-react';
import { useStoreActions } from '#/state';

export const useSignOut = (): {
  signOut: () => void;
} => {
  const { signOut: signOutClerk } = useAuthClerk();
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
    void signOutClerk();
  };
  return { signOut };
};
