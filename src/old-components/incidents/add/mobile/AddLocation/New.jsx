import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import NewLocation from '../../../global/NewLocation/NewLocation';

const HeaderRow = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;
const Header = styled(Typography)`
  margin: 0;
  flex: 1;
`;
const Container = styled.div`
  width: 100%;
`;

const New = ({ setLocationPristine, newLocation, handleChange }) => {
  return (
    <Container>
      <HeaderRow>
        <Header>Add location</Header>
        <Button color="primary" onClick={() => setLocationPristine(true)}>
          Back To Menu
        </Button>
      </HeaderRow>
      <NewLocation newLocation={newLocation} handleChange={handleChange} />
    </Container>
  );
};

export default New;
