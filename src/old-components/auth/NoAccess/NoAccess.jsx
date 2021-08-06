import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-bottom: 48px;
`;
const Text = styled.h1`
  font-size: 1.5rem;
  width: 80%;
  text-align: center;
  margin-top: 1rem;
  font-weight: 500;
`;
const Image = styled.img`
  width: 8rem;
`;

class NoAccess extends React.Component {
  render() {
    const goBack = () => {
      this.props.history.goBack();
    };

    return (
      <Container>
        <Image src="/no-access.svg" alt="No Access" />
        <Text>You don't have access to that!</Text>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go Back
        </Button>
      </Container>
    );
  }
}

export default withRouter(NoAccess);
