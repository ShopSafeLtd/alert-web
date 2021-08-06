import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const Container = styled(Tooltip)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

const Item = styled(Svg)`
  margin-right: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  @media (min-width: 1024px) {
    margin-right: 10px;
  }
`;

class ImageMenuItem extends PureComponent {
  render() {
    const { children, onClick, tooltipLabel } = this.props;
    return (
      <Container title={tooltipLabel} aria-label={tooltipLabel}>
        <Item viewBox="0 0 24 24" onClick={onClick}>
          {children}
        </Item>
      </Container>
    );
  }
}

export default ImageMenuItem;
