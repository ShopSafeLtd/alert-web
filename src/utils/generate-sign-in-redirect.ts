import { useLocation } from 'react-router-dom';

const GenerateSignInRedirect = (redirect?: null | string) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  return currentRoute && currentRoute.includes('sign-in')
    ? '/sign-in'
    : `/sign-in?rd=${redirect || currentRoute}`;
};
export default GenerateSignInRedirect;
