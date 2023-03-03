import React from 'react';
import { APP_NAME } from 'configs/AppConfig';
import { Grid } from 'antd';
import { useStoreState } from 'state';

interface GetLogoArgs {
  navCollapsed: boolean;
  logoType?: string;
}

const getLogo = (props: GetLogoArgs) => {
  const { navCollapsed, logoType } = props;
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
}

export const Logo = (props: Props) => {
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '15px 0 20px',
      }}
    >
      <img
        src={getLogo({ logoType: currentTheme, navCollapsed })}
        alt={`${APP_NAME} logo`}
        style={{ width: 130 }}
      />
    </div>
  );
};

export default Logo;
