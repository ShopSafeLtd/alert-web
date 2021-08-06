import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Details from '../../../../groups/add/Details/Details';
import Users from '../../../../groups/add/Users/Users';
import { FullWidthButton } from '../../../../global/actions';
import UsersQuery from '../../../../../graphql/users/queries/AllUsersQuery';
import AddGroupMutation from '../../../../../graphql/groups/mutations/AddGroup';
import AllGroups from '../../../../../graphql/groups/AllGroupsQuery';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 60px;
  flex: 1;
`;

const AddGroup = ({ setNavbarAction, setBackLinkTo }) => {
  // state
  const [details, setDetails] = useState({
    name: '',
    nameError: '',
    description: ''
  });
  const [users, setUsers] = useState([]);

  // queries
  const { data, loading } = useQuery(UsersQuery, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme')
    },
    fetchPolicy: 'cache-and-network'
  });

  // mutations
  const [addGroup] = useMutation(AddGroupMutation, {
    update: (store, { data: { createGroup } }) => {
      let data = store.readQuery({
        query: AllGroups,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          user: undefined
        }
      });
      data.groups = [...data.groups, createGroup];
      store.writeQuery({
        query: AllGroups,
        data,
        variables: {
          schemeId: window.localStorage.getItem('currentScheme'),
          user: undefined
        }
      });
    }
  });

  // functions
  const handleChange = name => event =>
    setDetails({
      ...details,
      [name]: event.target.value
    });
  const toggleUsers = user =>
    users.includes(user)
      ? setUsers(users.filter(id => user !== id))
      : setUsers([...users, user]);
  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!details.name;
      !nameValid
        ? setDetails({ ...details, nameError: 'This field is required' })
        : setDetails({ ...details, nameError: '' });
      nameValid ? resolve() : reject();
    });

  return (
    <Page>
      <Route
        exact
        path="/offenders/add/groups/add"
        render={({ history }) => (
          <div>
            <Details
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              handleChange={handleChange}
              name={details.name}
              nameError={details.nameError}
              description={details.description}
              back="/offenders/add/groups"
            />
            <FullWidthButton
              text="Next"
              onClick={() =>
                validateDetails().then(() =>
                  history.push('/offenders/add/groups/add/users')
                )
              }
            />
          </div>
        )}
      />
      <Route
        path="/offenders/add/groups/add/users"
        render={({ history }) => (
          <div>
            <Users
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              loading={loading}
              users={data.users || []}
              toggleSelectedUsers={toggleUsers}
              selectedUsers={users}
              back="/offenders/add/groups/add"
            />
            <FullWidthButton
              text="Add Group"
              disabled={loading || users.length === 0}
              onClick={async () => {
                await addGroup({
                  variables: {
                    name: details.name,
                    description: details.description,
                    usersIds: users.map(id => ({ id })),
                    schemeId: window.localStorage.getItem('currentScheme')
                  }
                });
                history.push('/offenders/add/groups');
              }}
            />
          </div>
        )}
      />
    </Page>
  );
};

export default AddGroup;
