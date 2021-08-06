import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Chat from '@material-ui/icons/Chat';

import { ListSkeleton } from '../../../../global/skeletons';
import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  overflow: scroll;
  display: flex;
  width: 100%;
`;
const Group = styled(Typography)`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
`;
const List = styled.div`
  width: 100%;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChatIcon = styled(Chat)`
  color: #ef5350;
  font-size: 50px;
`;

class UserChats extends PureComponent {
  render() {
    const { user, loading } = this.props;
    return (
      <Page>
        {loading ? (
          <List>
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
          </List>
        ) : user.chats.length > 0 ? (
          <List>
            {user.chats.map(({ chat }) => chat).map(({ id, name }) => (
              <Group key={id}>{name}</Group>
            ))}
          </List>
        ) : (
          <Empty>
            <ChatIcon />
            <EmptyText>This user is in no chat groups.</EmptyText>
          </Empty>
        )}
      </Page>
    );
  }
}

export default UserChats;
