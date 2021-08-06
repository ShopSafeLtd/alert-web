import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { ItemHeader, ItemText, SubHeader } from '../../../../global/typography';
import { Item } from '../../../../global/layout';

const LocationContent = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 50px;
  }
`;

class UserLocation extends PureComponent {
  render() {
    const { address } = this.props;
    return (
      <LocationContent>
        <SubHeader>My Location:</SubHeader>
        <Item>
          <ItemHeader>Premises</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.premises !== null
                ? address.premises
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Building</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.building !== null
                ? address.building
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Street</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.street !== null
                ? address.street
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Town / City</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.townCity !== null
                ? address.townCity
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>County</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.county !== null
                ? address.county
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
        <Item>
          <ItemHeader>Postcode</ItemHeader>
          <ItemText>
            {address !== undefined
              ? address.postcode !== null
                ? address.postcode
                : '---'
              : 'loading...'}
          </ItemText>
        </Item>
      </LocationContent>
    );
  }
}

export default UserLocation;
