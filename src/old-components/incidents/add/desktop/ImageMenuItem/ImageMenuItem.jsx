import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';

const Container = styled.div`
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
  margin-left: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  @media (min-width: 1024px) {
    margin-left: 10px;
  }
`;

class ImageMenuItem extends PureComponent {
  render() {
    const { children, onClick, tooltip } = this.props;
    return (
      <Container>
        <Tooltip title={tooltip} aria-label={tooltip}>
          <Item viewBox="0 0 24 24" onClick={onClick}>
            {children}
          </Item>
        </Tooltip>
      </Container>
    );
  }
}

export default ImageMenuItem;
