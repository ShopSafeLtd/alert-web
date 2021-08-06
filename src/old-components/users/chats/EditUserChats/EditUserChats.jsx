import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from 'react-apollo';
import Chat from '@material-ui/icons/Chat';

import { FullWidthButton } from '../../../global/actions';
import { ToggleSkeleton } from '../../../global/skeletons';
import UserQuery from '../../../../graphql/users/queries/User';
import AllChats from '../../../../graphql/chat/queries/AllChats';
import UserMutation from '../../../../graphql/users/mutations/UpdateUser';
import { EmptyText } from '../../../global/typography';
import { useStoreActions } from '../../../../state';

const Page = styled.div`
  width: 100%;
  height: calc(100vh - 116px);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const List = styled.div`
  width: 100%;
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
  font-size: 14px;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
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

const EditUserChats = ({ match, history }) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);

  // state
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);

  // effects
  useEffect(() => {
    setTitle('Edit Chats');
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/users/view/${match.params.id}`);
    setBottomNav(false);
    return () => {
      setTitle('');
      setNavbarAction('default');
      setBackLinkTo('');
      setBottomNav(true);
    };
  });

  // queries
  const { data: userData, loading: userLoading } = useQuery(UserQuery, {
    variables: {
      id: match.params.id,
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setChats(data.user.chats.map(({ chat: { id } }) => id))
  });

  const { data: chatsData, loading: chatsLoading } = useQuery(AllChats, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network'
  });

  // mutations
  const [updateUser] = useMutation(UserMutation);

  // functions
  const toggleSelectedChats = chat => {
    if (chats.includes(chat)) {
      setChats(chats.filter(id => id !== chat));
      setAdd(add.filter(id => id !== chat));
      userData.user.chats.map(({ chat: { id } }) => id).includes(chat) &&
        setRemove([...remove, chat]);
    } else {
      setChats([...chats, chat]);
      !userData.user.chats.map(({ chat: { id } }) => id).includes(chat) &&
        setAdd([...add, chat]);
      setRemove(remove.filter(id => id !== chat));
    }
  };

  const handleSave = () => {
    updateUser({
      variables: {
        id: match.params.id,
        addChats: add.map(id => ({ chat: { connect: { id } } })),
        removeChats: remove.map(id => ({
          id: userData.user.chats.find(userChat => userChat.chat.id === id).id
        }))
      }
    });
    history.push(`/admin/users/view/${match.params.id}`);
  };

  return (
    <Page>
      {chatsLoading | userLoading ? (
        <List>
          <ToggleSkeleton />
          <ToggleSkeleton />
          <ToggleSkeleton />
        </List>
      ) : chatsData.chats.length > 0 ? (
        <List>
          {chatsData.chats.map(({ id, name }) => (
            <ListItem key={id} onClick={() => toggleSelectedChats(id)}>
              <Svg viewBox="0 0 24 24">
                <path
                  fill={chats.includes(id) ? '#1E88E5' : '#E0E0E0'}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <ItemText>{name}</ItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <Empty>
          <ChatIcon />
          <EmptyText>There are currently no chat in the scheme.</EmptyText>
        </Empty>
      )}
      <FullWidthButton
        text="Save"
        disabled={chatsLoading || userLoading}
        onClick={handleSave}
      />
    </Page>
  );
};

export default EditUserChats;
