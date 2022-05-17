import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { FullWidthButton } from '../../../global/actions';
import GroupQuery from '../../../../graphql/groups/queries/Group';
import AllUsers from '../../../../graphql/users/queries/AllUsersQuery';
import UpdateGroup from '../../../../graphql/groups/mutations/UpdateGroup';
import { useStoreActions } from '../../../../state';
import { useNavigate, useParams } from 'react-router-dom';

const Page = styled.div`
  width: 100%;
  height: calc(100vh - 116px);
  overflow: scroll;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
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

const EditGroupUsers = () => {
  const navigate = useNavigate()
  const params = useParams()
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );

  // state
  const [users, setUsers] = useState([]);
  const [addUsers, setAddUsers] = useState([]);
  const [removeUsers, setRemoveUsers] = useState([]);

  // effects
  useEffect(() => {
    setTitle(`Edit Group's Users`);
    setBottomNav(false);
    setBackLinkTo(`/admin/groups/view/${params.id}`);
    setNavbarAction('backLink');
    return () => {
      setTitle(``);
      setBottomNav(true);
      setBackLinkTo(``);
      setNavbarAction('default');
    };
  });

  // queries
  const { data: groupData, loading: groupLoading } = useQuery(GroupQuery, {
    variables: {
      id: params.id
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setUsers(data.group.users.map(({ id }) => id))
  });

  const { data: usersData, loading: usersLoading } = useQuery(AllUsers, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      search: ''
    },
    fetchPolicy: 'cache-and-network'
  });

  // mutations
  const [updateGroup] = useMutation(UpdateGroup);

  // functions
  const toggleSelectedUsers = user => {
    if (users.includes(user)) {
      setUsers(users.filter(id => id !== user));
      setAddUsers(addUsers.filter(id => id !== user));
      groupData.group.users.map(({ id }) => id).includes(user) &&
        setRemoveUsers([...removeUsers, user]);
    } else {
      setUsers([...users, user]);
      !groupData.group.users.map(({ id }) => id).includes(user) &&
        setAddUsers([...addUsers, user]);
      setRemoveUsers(removeUsers.filter(id => id !== user));
    }
  };

  const handleSave = () => {
    updateGroup({
      variables: {
        id: params.id,
        addUsers:
          addUsers.length > 0 ? addUsers.map(id => ({ id })) : undefined,
        removeUsers:
          removeUsers.length > 0 ? removeUsers.map(id => ({ id })) : undefined
      }
    });
    navigate(`/admin/groups/view/${params.id}`);
  };

  return (
    <Page>
      {groupLoading || usersLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : (
        <List>
          {usersData.users.map(({ id, fullName, organisation }) => (
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
        onClick={handleSave}
        disabled={groupLoading || usersLoading}
      />
    </Page>
  );
};

export default EditGroupUsers;
