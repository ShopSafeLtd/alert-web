import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import WarningList from '../WarningsList/WarningsList';
import AddWarning from '../AddWarning/AddWarning';

const Page = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
`;

class EditWarnings extends Component {
  render() {
    const {
      basePath,
      setBackLinkTo,
      offender,
      loading,
      editOffender,
      offenderLabels,
      offenderId
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/offenders/edit/:id/warnings"
          render={({ history }) => (
            <WarningList
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              offender={offender}
              loading={loading}
              editOffender={editOffender}
              history={history}
              offenderWarnings={offenderLabels}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/warnings/add"
          render={({ history }) => (
            <AddWarning
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              offenderId={offenderId}
              editOffender={editOffender}
              offender={offender}
            />
          )}
        />
      </Page>
    );
  }
}

export default EditWarnings;
