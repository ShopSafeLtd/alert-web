import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { ToggleSkeleton } from '../../../global/skeletons';
import { FullWidthButton } from '../../../global/actions';
import AllUsers from '../../../../graphql/users/queries/AllUsersQuery';
import ChatUsers from '../../../../graphql/admin/queries/ChatUsers';
import EditMutation from '../../../../graphql/admin/mutations/UpdateChatGroup';
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
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Org = styled(Typography)`
  font-style: italic;
  margin-left: 3px;
  display: inline;
`;

const EditChatUsers = () => {
  const navigate = useNavigate()
  const params = useParams()
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);

  // state
  const [users, setUsers] = useState([]);
  const [addUsers, setAddUsers] = useState([]);
  const [removeUsers, setRemoveUsers] = useState([]);

  // effects
  useEffect(() => {
    setTitle('Edit Chat Members');
    setNavbarAction('backLink');
    setBackLinkTo(`/admin/chat-groups/view/${params.id}`);
    setBottomNav(false);
    return () => {
      setTitle('');
      setNavbarAction('default');
      setBackLinkTo('');
      setBottomNav(true);
    };
  });

  // queries
  const { data: chatData, loading: chatLoading } = useQuery(ChatUsers, {
    variables: {
      id: params.id
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data =>
      setUsers(data.chat.members.map(userChat => userChat.user.id))
  });

  const { data: userData, loading: userLoading } = useQuery(AllUsers, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      search: ''
    },
    fetchPolicy: 'cache-and-network'
  });

  // mutations
  const [updateChat] = useMutation(EditMutation);

  // functions
  const toggleSelectedUsers = user => {
    if (users.includes(user)) {
      setUsers(users.filter(id => id !== user));
      setAddUsers(addUsers.filter(id => id !== user));
      chatData.chat.members.map(({ user: { id } }) => id).includes(user) &&
        setRemoveUsers([...removeUsers, user]);
    } else {
      setUsers([...users, user]);
      !chatData.chat.members.map(({ user: { id } }) => id).includes(user) &&
        setAddUsers([...addUsers, user]);
      setRemoveUsers(removeUsers.filter(id => id !== user));
    }
  };

  const handleSave = () => {
    updateChat({
      variables: {
        id: params.id,
        addMembers: addUsers.map(id => ({ user: { connect: { id } } })),
        removeMembers: removeUsers.map(id => ({
          id: chatData.chat.members.find(userChat => userChat.user.id === id).id
        }))
      }
    });
    navigate(`/admin/chat-groups/view/${params.id}`);
  };

  return (
    <Page>
      {chatLoading || userLoading ? (
        <List>
          <ToggleSkeleton />
          <ToggleSkeleton />
          <ToggleSkeleton />
        </List>
      ) : (
        <List>
          {userData.users.map(({ id, fullName, organisation }) => (
            <ListItem key={id} onClick={() => toggleSelectedUsers(id)}>
              <Svg viewBox="0 0 24 24">
                <path
                  fill={users.includes(id) ? '#1E88E5' : '#E0E0E0'}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <ItemText>
                {fullName} - <Org variant="caption">{organisation}</Org>
              </ItemText>
            </ListItem>
          ))}
        </List>
      )}
      <FullWidthButton
        text="Save"
        onClick={() => handleSave(addUsers, removeUsers)}
        disabled={userLoading || chatLoading}
      />
    </Page>
  );
};

export default EditChatUsers;
