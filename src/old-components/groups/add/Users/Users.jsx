import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { HeaderText, HeaderSubText } from '../../../global/forms';
import { ErrorText } from '../../../global/typography';
import { ToggleSkeleton } from '../../../global/skeletons';

const List = styled.div`
  flex: 1;
  width: 100%;
  margin-top: 20px;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 10px;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Page = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 0px 60px;
  overflow: auto;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Header = styled.div`
  @media (min-width: 1024px) {
    padding: 0px 0px 10px;
  }
`;

class Users extends PureComponent {
  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo(this.props.back);
    !!this.props.setActiveStep && this.props.setActiveStep(1);
  }

  render() {
    const {
      users,
      error,
      selectedUsers,
      loading,
      toggleSelectedUsers
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Users</HeaderText>
          <HeaderSubText>
            Select the users that you want to be a member of this group, once a
            user is a member of a group they will be able to see all content
            assigned to the group.
          </HeaderSubText>
        </Header>
        {!!error && <ErrorText>{error}</ErrorText>}
        {loading ? (
          <List>
            <ToggleSkeleton />
            <ToggleSkeleton />
            <ToggleSkeleton />
          </List>
        ) : (
          <List>
            {users !== undefined &&
              users.map(({ fullName, id }) => (
                <ListItem key={id} onClick={() => toggleSelectedUsers(id)}>
                  <Svg viewBox="0 0 24 24">
                    <path
                      fill={selectedUsers.includes(id) ? '#1E88E5' : '#E0E0E0'}
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                    />
                  </Svg>
                  <ItemText>{fullName}</ItemText>
                </ListItem>
              ))}
          </List>
        )}
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('');
    this.props.setBackLinkTo('');
  }
}

export default Users;
