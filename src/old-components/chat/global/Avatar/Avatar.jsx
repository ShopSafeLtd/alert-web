import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  background: #e0e0e0;
  color: #757575;
  border-radius: 100%;
  min-width: 45px;
  min-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: uppercase;
`;
const Container = styled.div`
  margin-right: 20px;
  position: relative;
`;
const Badge = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  height: 14px;
  width: 14px;
  background: #ef5350;
  border-radius: 100%;
  border: 2px solid #fff;
`;

class Avatar extends PureComponent {
  render() {
    const { children, newMessages, ...rest } = this.props;
    return (
      <Container>
        {newMessages && <Badge />}
        <Text {...rest}>{children}</Text>
      </Container>
    );
  }
}

export default Avatar;
