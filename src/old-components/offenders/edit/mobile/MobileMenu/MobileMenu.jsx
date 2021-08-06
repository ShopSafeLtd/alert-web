import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { Menu, MenuItem, MenuItemText } from '../../../../global/layout';

const Svg = styled.svg`
  width: 28px;
  height: 28px;
  margin-right: 15px;
`;

class MobileMenu extends PureComponent {
  componentDidMount() {
    this.props.setBackLinkTo('/offenders');
  }

  render() {
    const { basePath } = this.props;
    return (
      <Menu>
        <MenuItem to={`${basePath}/description`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M2,6V8H14V6H2M2,10V12H14V10H2M20.04,10.13C19.9,10.13 19.76,10.19 19.65,10.3L18.65,11.3L20.7,13.35L21.7,12.35C21.92,12.14 21.92,11.79 21.7,11.58L20.42,10.3C20.31,10.19 20.18,10.13 20.04,10.13M18.07,11.88L12,17.94V20H14.06L20.12,13.93L18.07,11.88M2,14V16H10V14H2Z"
            />
          </Svg>
          <MenuItemText>Edit Description</MenuItemText>
        </MenuItem>
        <MenuItem to={`${basePath}/warnings`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M6,6.9L3.87,4.78L5.28,3.37L7.4,5.5L6,6.9M13,1V4H11V1H13M20.13,4.78L18,6.9L16.6,5.5L18.72,3.37L20.13,4.78M4.5,10.5V12.5H1.5V10.5H4.5M19.5,10.5H22.5V12.5H19.5V10.5M6,20H18A2,2 0 0,1 20,22H4A2,2 0 0,1 6,20M12,5A6,6 0 0,1 18,11V19H6V11A6,6 0 0,1 12,5Z"
            />
          </Svg>
          <MenuItemText>Edit Offender Warnings</MenuItemText>
        </MenuItem>
        <MenuItem to={`${basePath}/images`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M22,16V4A2,2 0 0,0 20,2H8A2,2 0 0,0 6,4V16A2,2 0 0,0 8,18H20A2,2 0 0,0 22,16M11,12L13.03,14.71L16,11L20,16H8M2,6V20A2,2 0 0,0 4,22H18V20H4V6"
            />
          </Svg>
          <MenuItemText>Edit Images</MenuItemText>
        </MenuItem>
        <MenuItem to={`${basePath}/bans`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z"
            />
          </Svg>
          <MenuItemText>Edit Bans</MenuItemText>
        </MenuItem>
        <MenuItem to={`${basePath}/Groups`}>
          <Svg viewBox="0 0 24 24">
            <path
              fill="#EF5350"
              d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z"
            />
          </Svg>
          <MenuItemText>Edit Groups</MenuItemText>
        </MenuItem>
      </Menu>
    );
  }
}

export default MobileMenu;
