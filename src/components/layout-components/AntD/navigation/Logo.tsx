/* eslint-disable */

import React from 'react';
import { APP_NAME } from 'configs/AppConfig';
import { useStoreState } from 'state';

interface GetLogoArgs {
  navCollapsed: boolean;
  logoType?: string;
  logo?: string | null;
}

const getLogo = (props: GetLogoArgs) => {
  const { navCollapsed, logoType, logo } = props;
  if (logo) {
    return logo;
  }
  if (logoType === 'light') {
    if (navCollapsed) {
      return '/img/logo-sm.svg';
    }
    return '/img/dark-logo.svg';
  }

  if (navCollapsed) {
    return '/img/logo.png';
  }
  return '/img/light-logo.svg';
};

interface GetLogoDisplayArgs {
  isMobile: boolean;
  mobileLogo?: boolean;
}

const getLogoDisplay = ({ isMobile, mobileLogo }: GetLogoDisplayArgs) => {
  if (isMobile && !mobileLogo) {
    return 'd-none';
  } else {
    return 'logo';
  }
};

interface Props {
  mobileLogo?: boolean;
  logoType?: string;
  width?: number;
}

export const Logo = (props: Props) => {
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const customLogoLight = window.localStorage.getItem('logo');
  const customLogoDark =
    window.localStorage.getItem('logo-dark') || customLogoLight;
  const customLogo =
    currentTheme === 'light' ? customLogoLight : customLogoDark;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '15px 0 20px',
      }}
    >
      <img
        src={getLogo({
          logoType: currentTheme,
          navCollapsed,
          logo: customLogo,
        })}
        alt={`${APP_NAME} logo`}
        style={{ width: props.width ?? 130 }}
      />
    </div>
  );
};

export default Logo;
