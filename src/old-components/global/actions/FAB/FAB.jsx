import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

const StyledButton = styled(Fab)`
  position: fixed !important;
  bottom: ${({ bottom }) => (bottom ? '15px' : '70px')};
  right: 10px;
  z-index: 15;
  @media (min-width: 1024px) {
    bottom: 25px;
    right: 20px;
  }
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

class FAB extends React.PureComponent {
  render() {
    const {
      to,
      button,
      onClick,
      extended,
      text,
      bottom,
      children,
      disabled
    } = this.props;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches =>
          button ? (
            <StyledButton
              variant={matches && extended ? 'extended' : 'round'}
              color="primary"
              onClick={onClick}
              bottom={bottom}
              disabled={disabled}
            >
              {children !== undefined ? (
                children
              ) : (
                <Svg viewBox="0 0 24 24">
                  <path
                    fill="#FFFFFF"
                    d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
                </Svg>
              )}
              {matches && text}
            </StyledButton>
          ) : (
            <StyledButton
              variant={matches && extended ? 'extended' : 'round'}
              color="primary"
              component={Link}
              to={to}
              bottom={bottom}
              disabled={disabled}
            >
              {children !== undefined ? (
                children
              ) : (
                <Svg viewBox="0 0 24 24">
                  <path
                    fill="#FFFFFF"
                    d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                  />
                </Svg>
              )}
              {matches && text}
            </StyledButton>
          )
        }
      </MediaQuery>
    );
  }
}

export default FAB;
