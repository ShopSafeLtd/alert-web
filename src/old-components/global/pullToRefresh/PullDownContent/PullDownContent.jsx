import React, { PureComponent } from 'react';
import styled from 'styled-components';
import DownArrow from '@material-ui/icons/ArrowDownward';
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
const ArrowIcon = styled(DownArrow)`
  color: #ef5350;
  font-size: 32px;
`;

class PullDownContent extends PureComponent {
  render() {
    return (
      <Container>
        <ArrowIcon />
        <Text>Pull down to refresh</Text>
      </Container>
    );
  }
}

export default PullDownContent;
