import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import BansList from '../BansList/BansList';
import AddBan from '../AddBan/AddBan';
import EditBan from '../EditBan/EditBan';

const Page = styled.div`
  flex: 1;
  display: flex;
`;

class EditBans extends Component {
  render() {
    const {
      basePath,
      setBackLinkTo,
      offender,
      editOffender,
      offenderId,
      userId,
      loading,
      setActions
    } = this.props;

    return (
      <Page>
        <Route
          exact
          path="/offenders/edit/:id/bans"
          render={({ history }) => (
            <BansList
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              offender={offender}
              loading={loading}
            />
          )}
        />
        <Route
          path="/Offenders/edit/:id/bans/add"
          render={({ history }) => (
            <AddBan
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              offenderId={offenderId}
              userId={userId}
              editOffender={editOffender}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/bans/edit/:banId"
          render={({ history, match }) => (
            <EditBan
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              match={match}
              setActions={setActions}
              userId={userId}
              editOffender={editOffender}
            />
          )}
        />
      </Page>
    );
  }
}

export default EditBans;
