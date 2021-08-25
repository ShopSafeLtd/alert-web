import React, { useEffect } from "react";
import styled from "styled-components";
import { useStoreActions } from "../../state";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { MenuItem, Menu, MenuItemText } from "../global/layout";

const Svg = styled.svg`
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;

const AccountMenu = () => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  useEffect(() => {
    setTitle("Account Settings");
    // setNavbarAction('backLink');
    setBottomNav(false);
    setBackLinkTo("/");
    return () => {
      // setNavbarAction("default");
      setBottomNav(true);
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Menu>
      <MenuItem to={`${APP_PREFIX_PATH}/user-settings/edit-profile`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M21.7,13.35L20.7,14.35L18.65,12.3L19.65,11.3C19.86,11.09 20.21,11.09 20.42,11.3L21.7,12.58C21.91,12.79 21.91,13.14 21.7,13.35M12,18.94L18.06,12.88L20.11,14.93L14.06,21H12V18.94M12,14C7.58,14 4,15.79 4,18V20H10V18.11L14,14.11C13.34,14.03 12.67,14 12,14M12,4A4,4 0 0,0 8,8A4,4 0 0,0 12,12A4,4 0 0,0 16,8A4,4 0 0,0 12,4Z"
          />
        </Svg>
        <MenuItemText>Edit Profile</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/user-settings/reset-password`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z"
          />
        </Svg>
        <MenuItemText>Reset Password</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/user-settings/notifications`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"
          />
        </Svg>
        <MenuItemText>Notification Settings</MenuItemText>
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
