import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from 'react-apollo';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import { BackButton } from '../../../../global/actions';
import { EmptyText } from '../../../../global/typography';
import GroupImage from '../../../../../images/AddGroup';
import UserQuery from '../../../../../graphql/users/queries/User';
import AllChats from '../../../../../graphql/chat/queries/AllChats';
import UserMutation from '../../../../../graphql/users/mutations/UpdateUser';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const List = styled.div`
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

const EditChatsPopOver = ({ open, user, close }) => {
  // state
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);

  // queries
  const { data: userData, loading: userLoading } = useQuery(UserQuery, {
    variables: {
      id: user,
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
  const [updateUser] = useMutation(UserMutation, {
    update: (store, { data: { updateUser } }) => {
      let data = store.readQuery({
        query: UserQuery,
        variables: {
          id: user,
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
      data.user = {
        ...data.user,
        chats: updateUser.chats
      };
      store.writeQuery({
        query: UserQuery,
        data,
        variables: {
          id: user,
          schemeId: window.localStorage.getItem('currentScheme')
        }
      });
    }
  });

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
        id: user,
        addChats: add.map(id => ({ chat: { connect: { id } } })),
        removeChats: remove.map(id => ({
          id: userData.user.chats.find(userChat => userChat.chat.id === id).id
        }))
      },
      optimisticResponse: {
        updateUser: {
          ...userData.user,
          chats: chats.map(chat =>
            chatsData.chats.find(({ id }) => chat === id)
          )
        }
      }
    });
    close();
  };

  const loading = chatsLoading || userLoading;

  return (
    <PopOver
      noPadding
      open={open}
      handleClose={close}
      width={500}
      title="Edit User's Chat Groups"
      actions={[
        <BackButton key={0} disabled={loading} color="primary" onClick={close}>
          Close
        </BackButton>,
        <Button
          key={1}
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save Chat Groups
        </Button>
      ]}
    >
      <Grow>
        <PopOverContainer>
          {!loading && chatsData.chats.length > 0 ? (
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
            <Center>
              <GroupImage width="80px" height="80px" />
              <EmptyText>No Chat Groups in Scheme</EmptyText>
            </Center>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditChatsPopOver;
