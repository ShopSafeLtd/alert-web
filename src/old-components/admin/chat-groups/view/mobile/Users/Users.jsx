import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';

import { UserListSkeleton } from '../../../../../global/skeletons';
import { EmptyText } from '../../../../../global/typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  display: flex;
  overflow: auto;
`;
const ChatGroup = styled(Typography)`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
`;
const List = styled.div`
  width: 100%;
`;
const Org = styled(Typography)`
  font-style: italic;
  display: inline;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PeopleIcon = styled(People)`
  font-size: 50px;
  color: #ef5350;
`;

class Users extends PureComponent {
  render() {
    const { loading, chat } = this.props;
    return (
      <Page>
        {loading ? (
          <List>
            <UserListSkeleton />
            <UserListSkeleton />
            <UserListSkeleton />
          </List>
        ) : chat.members.length === 0 ? (
          <Empty>
            <PeopleIcon />
            <EmptyText>There are no members in this chat group.</EmptyText>
          </Empty>
        ) : (
          <List>
            {chat.members
              .map(({ user }) => user)
              .map(({ id, fullName, organisation }) => (
                <ChatGroup key={id}>
                  {fullName} - <Org variant="caption">{organisation}</Org>
                </ChatGroup>
              ))}
          </List>
        )}
      </Page>
    );
  }
}

export default Users;
