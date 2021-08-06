import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Item } from '../../../../global/layout';
import { ItemHeader, ItemText } from '../../../../global/typography';

const HeaderRow = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;
const Header = styled(Typography)`
  margin: 0;
  flex: 1;
`;
const Content = styled.div`
  padding: 0px 20px;
`;
const Container = styled.div`
  width: 100%;
`;

const Account = ({
  setLocationPristine,
  primaryLocation,
  loadingAddresses
}) => {
  return (
    <Container>
      <HeaderRow>
        <Header>My location</Header>
        <Button color="primary" onClick={() => setLocationPristine(true)}>
          Back To Menu
        </Button>
      </HeaderRow>
      <Content>
        <Item>
          <ItemHeader>Premises</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.premises
                ? primaryLocation.premises
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Building</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.building
                ? primaryLocation.building
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Street</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.street
                ? primaryLocation.street
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Town / City</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.townCity
                ? primaryLocation.townCity
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>County</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.county
                ? primaryLocation.county
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Postcode</ItemHeader>
          <ItemText>
            {!loadingAddresses
              ? !!primaryLocation.postcode
                ? primaryLocation.postcode
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
      </Content>
    </Container>
  );
};

export default Account;
