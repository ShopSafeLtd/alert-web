import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';
import People from '@material-ui/icons/People';

import { FullWidthButton } from '../../../global/actions';
import AllGroups from '../../../../graphql/groups/AllGroupsQuery';
import UserQuery from '../../../../graphql/users/queries/User';
import { ErrorText, EmptyText } from '../../../global/typography';
import UserMutation from '../../../../graphql/users/mutations/UpdateUser';
import { useStoreActions } from '../../../../state';

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
const PeopleIcon = styled(People)`
  color: #ef5350;
  font-size: 50px;
`;

const EditUserGroups = ({ match, history }) => {
  const setTitle = useStoreActions(actions => actions.theme.setTitle);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );

  // state
  const [groups, setGroups] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);
  const [error, setError] = useState(false);

  // effects
  useEffect(() => {
    setTitle(`Edit User's Groups`);
    setBottomNav(false);
    setBackLinkTo(`/admin/users/view/${match.params.id}`);
    setNavbarAction('backLink');
    return () => {
      setTitle(``);
      setBottomNav(true);
      setBackLinkTo(``);
      setNavbarAction('default');
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data: groupsData, loading: groupsLoading } = useQuery(AllGroups, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      search: ''
    },
    fetchPolicy: 'cache-and-network'
  });
  const { data: userData, loading: userLoading } = useQuery(UserQuery, {
    variables: {
      id: match.params.id,
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: data => setGroups(data.user.groups.map(({ id }) => id))
  });

  // mutations
  const [updateUser] = useMutation(UserMutation);

  // functions
  const toggleSelectedGroups = group => {
    if (groups.includes(group)) {
      setGroups(groups.filter(id => id !== group));
      setAdd(add.filter(id => id !== group));
      userData.user.groups.map(({ id }) => id).includes(group) &&
        setRemove([...remove, group]);
    } else {
      setGroups([...groups, group]);
      !userData.user.groups.map(({ id }) => id).includes(group) &&
        setAdd([...add, group]);
      setRemove(remove.filter(id => id !== group));
    }
  };

  const handleSave = () => {
    if (groups.length > 0) {
      updateUser({
        variables: {
          id: match.params.id,
          addGroups: add.length > 0 ? add.map(id => ({ id })) : undefined,
          removeGroups:
            remove.length > 0 ? remove.map(id => ({ id })) : undefined
        }
      });
      history.push(`/admin/users/view/${match.params.id}`);
    } else {
      setError(true);
    }
  };

  return (
    <Page>
      {error && <ErrorText>Please select at least one group!</ErrorText>}
      {userLoading || groupsLoading ? (
        <Loading>
          <CircularProgress />
        </Loading>
      ) : groupsData.groups.length > 0 ? (
        <List>
          {groupsData.groups.map(({ id, name }) => (
            <ListItem key={id} onClick={() => toggleSelectedGroups(id)}>
              <Svg viewBox="0 0 24 24">
                <path
                  fill={groups.includes(id) ? '#1E88E5' : '#E0E0E0'}
                  d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                />
              </Svg>
              <ItemText>{name}</ItemText>
            </ListItem>
          ))}
        </List>
      ) : (
        <Empty>
          <PeopleIcon />
          <EmptyText>There are currently no groups in the scheme.</EmptyText>
        </Empty>
      )}
      <FullWidthButton
        text="Save"
        onClick={handleSave}
        disabled={groupsLoading || userLoading}
      />
    </Page>
  );
};

export default EditUserGroups;
