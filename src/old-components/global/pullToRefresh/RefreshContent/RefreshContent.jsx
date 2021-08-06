import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

class RefreshContent extends PureComponent {
  render() {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
}

export default RefreshContent;
