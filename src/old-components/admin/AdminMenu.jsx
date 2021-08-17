import React, { useEffect } from "react";
import styled from "styled-components";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { useStoreActions } from "../../state";
import { Menu, MenuItem, MenuItemText } from "../global/layout";

const Svg = styled.svg`
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;

const AdminMenu = () => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  // const setNavbarAction = useStoreActions(
  //   actions => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);

  useEffect(() => {
    setTitle("Scheme Settings");
    // setNavbarAction('backLink');
    setBackLinkTo(`/`);
    setBottomNav(false);
    return () => {
      setTitle("");
      // setNavbarAction('');
      setBackLinkTo(``);
      setBottomNav(true);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Menu>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/users`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
          />
        </Svg>
        <MenuItemText>User Management</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/groups`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
          />
        </Svg>
        <MenuItemText>Group Management</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/chat-groups`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9H18V11H6M14,14H6V12H14M18,8H6V6H18"
          />
        </Svg>
        <MenuItemText>Chat Groups</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/scheme-details`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M18,17H10.5L12.5,15H18M6,17V14.5L13.88,6.65C14.07,6.45 14.39,6.45 14.59,6.65L16.35,8.41C16.55,8.61 16.55,8.92 16.35,9.12L8.47,17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
          />
        </Svg>
        <MenuItemText>Scheme Details</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/auto-approve`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z"
          />
        </Svg>
        <MenuItemText>Auto Approve Options</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M17.63,5.84C17.27,5.33 16.67,5 16,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H16C16.67,19 17.27,18.66 17.63,18.15L22,12L17.63,5.84Z"
          />
        </Svg>
        <MenuItemText>Offender Warnings</MenuItemText>
      </MenuItem>
      <MenuItem to={`${APP_PREFIX_PATH}/scheme-settings/crime-types`}>
        <Svg viewBox="0 0 24 24">
          <path
            fill="#EF5350"
            d="M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z"
          />
        </Svg>
        <MenuItemText>Crime Types</MenuItemText>
      </MenuItem>
    </Menu>
  );
};

export default AdminMenu;
