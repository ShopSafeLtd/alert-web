/**
 * Type overrides for @clerk/clerk-react v5 to work with React 17 types.
 * Clerk v5 expects React 18+, but we're staying on React 17 for now.
 * These overrides make the components compatible with React 17 type definitions.
 */
declare module '@clerk/clerk-react' {
  import type * as React from 'react';

  // Authentication boundary components
  export const SignedIn: React.FC<{ children?: React.ReactNode }>;
  export const SignedOut: React.FC<{ children?: React.ReactNode }>;
  export const ClerkLoaded: React.FC<{ children?: React.ReactNode }>;
  export const ClerkLoading: React.FC<{ children?: React.ReactNode }>;

  // Re-export other commonly used components
  export {
    ClerkProvider,
    CreateOrganization,
    OrganizationProfile,
    OrganizationSwitcher,
    SignIn,
    SignUp,
    UserButton,
    UserProfile,
    useAuth,
    useClerk,
    useSession,
    useSignIn,
    useSignUp,
    useUser,
  } from '@clerk/clerk-react';
}
