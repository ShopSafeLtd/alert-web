import React from "react";
import { APP_NAME } from "configs/AppConfig";
import utils from "utils";
import { Grid } from "antd";
import { useStoreState } from "state";

const { useBreakpoint } = Grid;

interface GetLogoArgs {
  navCollapsed: boolean;
  logoType?: string;
}

const getLogo = (props: GetLogoArgs) => {
  const { navCollapsed, logoType } = props;
  if (logoType === "light") {
    if (navCollapsed) {
      return "/img/logo-sm.svg";
    }
    return "/img/logo-white.svg";
  }

  if (navCollapsed) {
    return "/img/logo.png";
  }
  return "/img/logo.png";
};

interface GetLogoDisplayArgs {
  isMobile: boolean;
  mobileLogo?: boolean;
}

const getLogoDisplay = ({ isMobile, mobileLogo }: GetLogoDisplayArgs) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

interface Props {
  mobileLogo?: boolean;
  logoType?: string;
}

export const Logo = (props: Props) => {
  const navCollapsed = useStoreState((state) => state.theme.navCollapsed);
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");

  return (
    <div
      className={getLogoDisplay({ isMobile, mobileLogo: props.mobileLogo })}
      style={{
        width: 110,
        marginLeft: 10,
      }}
    >
      <img
        src={getLogo({ logoType: props.logoType, navCollapsed })}
        alt={`${APP_NAME} logo`}
        style={{ width: 130 }}
      />
    </div>
  );
};

export default Logo;
