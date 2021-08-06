import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Location from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import {
  ItemHeader,
  ItemText,
  SubHeader,
  EmptyText
} from '../../../../global/typography';
import { roles } from '../../../../../enums';

const Page = styled.div`
  height: calc(100vh - 160px);
  overflow: scroll;
  display: flex;
  padding: 10px 20px;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Item = styled.div`
  flex: 1;
  margin: 10px 0;
`;
const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;
const LocationIcon = styled(Location)`
  font-size: 50px;
  color: #ef5350;
`;
const Container = styled.div`
  width: 100%;
`;

class UserDetails extends PureComponent {
  render() {
    const { user, userLoading } = this.props;
    return (
      <Page>
        {userLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : (
          <Container>
            <Item>
              <ItemHeader>Full Name</ItemHeader>
              <ItemText>{user.fullName}</ItemText>
            </Item>
            <Item>
              <ItemHeader>Organisation</ItemHeader>
              <ItemText>
                {!!user.organisation ? user.organisation : 'Unknown'}
              </ItemText>
            </Item>
            <Item>
              <ItemHeader>Email Address</ItemHeader>
              <ItemText>{user.email}</ItemText>
            </Item>
            <Item>
              <ItemHeader>Role</ItemHeader>
              <ItemText>
                {
                  roles.find(({ value }) => user.schemes[0].role === value)
                    .label
                }
              </ItemText>
            </Item>
            <SubHeader>Address</SubHeader>
            {user.addresses.length === 0 ? (
              <Empty>
                <LocationIcon />
                <EmptyText>User has no address.</EmptyText>
                <Button
                  color="primary"
                  component={Link}
                  to={`/admin/users/edit/${user.id}`}
                >
                  Add Address
                </Button>
              </Empty>
            ) : (
              <Container>
                <Item>
                  <ItemHeader>Company Name</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].premises
                      ? user.addresses[0].premises
                      : 'Unknown'}
                  </ItemText>
                </Item>
                <Item>
                  <ItemHeader>Premises</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].building
                      ? user.addresses[0].building
                      : 'Unknown'}
                  </ItemText>
                </Item>
                <Item>
                  <ItemHeader>Street</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].street
                      ? user.addresses[0].street
                      : 'Unknown'}
                  </ItemText>
                </Item>
                <Item>
                  <ItemHeader>Town/City</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].townCity
                      ? user.addresses[0].townCity
                      : 'Unknown'}
                  </ItemText>
                </Item>
                <Item>
                  <ItemHeader>County</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].county
                      ? user.addresses[0].county
                      : 'Unknown'}
                  </ItemText>
                </Item>
                <Item>
                  <ItemHeader>Postcode</ItemHeader>
                  <ItemText>
                    {!!user.addresses[0].postcode
                      ? user.addresses[0].postcode
                      : 'Unknown'}
                  </ItemText>
                </Item>
              </Container>
            )}
          </Container>
        )}
      </Page>
    );
  }
}

export default UserDetails;
