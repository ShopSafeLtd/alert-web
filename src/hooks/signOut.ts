import { useStoreActions } from '#/state';
import { useAuth as useAuthClerk } from '@clerk/clerk-react';

export const useSignOut = (): {
  signOut: () => void;
} => {
  const { signOut: signOutClerk } = useAuthClerk();
  const handleSignOut = useStoreActions((actions) => actions.auth.signOut);
  const signOut = (): void => {
    handleSignOut();
    const logo = window.localStorage.getItem('logo');
    const dLogo = window.localStorage.getItem('logo-dark');
    const theme = window.localStorage.getItem('theme');
    window.localStorage.clear();
    window.localStorage.setItem('logo', logo || '');
    window.localStorage.setItem('logo-dark', dLogo || '');
    window.localStorage.setItem('theme', theme || 'light');
    window.sessionStorage.clear();
    void signOutClerk();
  };
  return { signOut };
};
