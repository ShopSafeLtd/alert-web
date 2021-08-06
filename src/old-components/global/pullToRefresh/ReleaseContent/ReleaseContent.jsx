import React, { PureComponent } from 'react';
import styled from 'styled-components';
import UpArrow from '@material-ui/icons/ArrowUpward';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;
const Text = styled(Typography)`
  font-size: 14px;
`;
const ArrowIcon = styled(UpArrow)`
  color: #ef5350;
  font-size: 32px;
`;

class ReleaseContent extends PureComponent {
  render() {
    return (
      <Container>
        <ArrowIcon />
        <Text>Release to refresh</Text>
      </Container>
    );
  }
}

export default ReleaseContent;
