import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';
import Typography from '@material-ui/core/Typography';

const ABSOLUTE = 'ABSOLUTE';
const STATIC = 'STATIC';

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#BDBDBD' : '#ef5350')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-style: none;
  text-decoration: none;
  cursor: pointer;
  z-index: 2;
  ${({ small }) =>
    small
      ? `
    height: 50px;
  `
      : `
    height: 60px;
  `} ${({ position }) => {
    if (position === ABSOLUTE) {
      return `
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
      `;
    } else if (position === STATIC) {
      return `
        position: static;
      `;
    } else {
      return `
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
      `;
    }
  }};
  @media (min-width: 1024px) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const LinkButton = styled(Link)`
  background-color: ${({ disabled }) => (disabled ? '#BDBDBD' : '#ef5350')};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-style: none;
  text-decoration: none;
  cursor: pointer;
  ${({ small }) =>
    small
      ? `
    height: 50px;
  `
      : `
    height: 60px;
  `} ${({ position }) => {
    if (position === ABSOLUTE) {
      return `
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
      `;
    } else if (position === STATIC) {
      return `
        position: static;
      `;
    } else {
      return `
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
      `;
    }
  }};
`;

const Text = styled(Typography)`
  color: #fff;
`;

const LeftIcon = styled(LeftArrow)`
  color: #fff !important;
`;

const RightIcon = styled(RightArrow)`
  color: #fff !important;
`;

class FullWidthButton extends React.Component {
  render() {
    const {
      text,
      link,
      to,
      onClick,
      small,
      position,
      disabled,
      left
    } = this.props;

    const leftIcon = <LeftIcon />;
    const rightIcon = <RightIcon />;

    return link ? (
      <LinkButton
        position={position}
        small={small}
        to={to}
        type="submit"
        disabled={disabled}
      >
        {left && leftIcon}
        <Text variant="button" component="span">
          {text}
        </Text>
        {left === undefined && rightIcon}
      </LinkButton>
    ) : onClick === undefined ? (
      <Button
        position={position}
        small={small}
        type="submit"
        disabled={disabled}
      >
        {left && leftIcon}
        <Text variant="button" component="span">
          {text}
        </Text>
        {left === undefined && rightIcon}
      </Button>
    ) : (
      <Button
        position={position}
        small={small}
        onClick={onClick}
        disabled={disabled}
      >
        {left && leftIcon}
        <Text variant="button" component="span">
          {text}
        </Text>
        {left === undefined && rightIcon}
      </Button>
    );
  }
}

export default FullWidthButton;
