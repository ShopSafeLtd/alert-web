import React, { useEffect } from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MediaQuery from 'react-responsive';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { FAB } from '../../../global/actions';
import { UserRowSkeleton } from '../../../global/skeletons';
import query from '../../../../graphql/users/queries/AllUsersQuery';
import { useStoreActions, useStoreState } from '../../../../state';

const Users = styled.div`
  background: #fff;
  flex: 1;
  margin-bottom: 60px;
`;
const Row = styled(TableRow)`
  cursor: pointer;
`;

const AllUsers = ({ history }) => {
  const search = useStoreState(state => state.theme.search);
  const setBottomNav = useStoreActions(actions => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(actions => actions.theme.setBackLinkTo);
  const setNavbarAction = useStoreActions(
    actions => actions.theme.setNavbarAction
  );
  const setSearch = useStoreActions(actions => actions.theme.setSearch);
  const setSearchText = useStoreActions(actions => actions.theme.setSearchText);
  const setTitle = useStoreActions(actions => actions.theme.setSearchText);

  // effects
  useEffect(() => {
    setSearch(true);
    setSearchText('Search for users...');
    setTitle('User Management');
    setBottomNav(true);
    setBackLinkTo('/admin');
    setNavbarAction('backLink');
    return () => {
      setSearch(false);
      setSearchText('');
      setTitle('');
      setBackLinkTo('');
      setNavbarAction('default');
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading } = useQuery(query, {
    variables: {
      schemeId: window.localStorage.getItem('currentScheme'),
      search
    },
    fetchPolicy: 'cache-and-network'
  });

  // functions
  const toViewUser = id => {
    history.push(`/admin/users/view/${id}`);
  };

  return (
    <MediaQuery minDeviceWidth={600}>
      {matches => (
        <Users>
          <Table id="user-table">
            <TableHead>
              <TableRow>
                <TableCell grow={!matches}>User Name</TableCell>
                <MediaQuery minDeviceWidth={492}>
                  <TableCell>Email</TableCell>
                </MediaQuery>
                <MediaQuery minDeviceWidth={642}>
                  <TableCell>Organisation</TableCell>
                </MediaQuery>
                <MediaQuery minDeviceWidth={820}>
                  <TableCell>Groups</TableCell>
                </MediaQuery>
                <MediaQuery minDeviceWidth={1225}>
                  <TableCell>Status</TableCell>
                </MediaQuery>
              </TableRow>
            </TableHead>
            {!!loading && loading ? (
              <TableBody>
                <UserRowSkeleton />
                <UserRowSkeleton />
                <UserRowSkeleton />
                <UserRowSkeleton />
                <UserRowSkeleton />
                <UserRowSkeleton />
              </TableBody>
            ) : (
              <TableBody>
                {data.users.map(
                  ({
                    id,
                    fullName,
                    email,
                    organisation,
                    groups,
                    newUser,
                    disabled
                  }) => {
                    return (
                      <Row key={id}>
                        <TableCell onClick={() => toViewUser(id)}>
                          {disabled ? `${fullName} (Disabled)` : fullName}
                        </TableCell>
                        <MediaQuery minDeviceWidth={492}>
                          <TableCell onClick={() => toViewUser(id)}>
                            {email}
                          </TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={642}>
                          <TableCell>{organisation}</TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={820}>
                          <TableCell>
                            {groups.length > 1
                              ? groups.map(({ id, name }) => {
                                  return <span key={id}>{name}, </span>;
                                })
                              : groups.map(({ id, name }) => {
                                  return <span key={id}>{name}</span>;
                                })}
                          </TableCell>
                        </MediaQuery>
                        <MediaQuery minDeviceWidth={1225}>
                          <TableCell>
                            {newUser ? 'Invited' : 'Active'}
                          </TableCell>
                        </MediaQuery>
                      </Row>
                    );
                  }
                )}
              </TableBody>
            )}
          </Table>
          <FAB to="/admin/users/add" icon="add" />
        </Users>
      )}
    </MediaQuery>
  );
};

export default withRouter(AllUsers);
