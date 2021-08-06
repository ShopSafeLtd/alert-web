import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';

import OffenderList from '../OffenderList/OffenderList';
import NewOffender from '../NewOffender/NewOffender';
import ExistingOffenders from '../ExistingOffenders/ExistingOffenders';
import ExistingOffender from '../ExistingOffender/ExistingOffender';
import ViewOffender from '../ViewOffender/ViewOffender';
import EditOffender from '../EditOffender/EditOffender';

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddOffenders = ({
  offenders,
  setBackLinkTo,
  setNavbarAction,
  addNewOffender,
  addExistingOffenders,
  removeOffender,
  editNewOffender,
  userId,
  uploadMobileImage
}) => {
  // state
  const [current, setCurrent] = useState('');

  return (
    <Page>
      <Route
        exact
        path="/incidents/add/offenders"
        render={({ history }) => (
          <OffenderList
            offenders={offenders}
            setCurrentOffender={setCurrent}
            history={history}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
          />
        )}
      />
      <Route
        path="/incidents/add/offenders/new"
        render={({ history }) => (
          <NewOffender
            addNewOffender={addNewOffender}
            history={history}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
          />
        )}
      />
      <Route
        exact
        path="/incidents/add/offenders/existing-offenders"
        render={({ history }) => (
          <ExistingOffenders
            existingIds={offenders
              .filter(({ existing }) => existing)
              .map(({ id }) => id)}
            history={history}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            userId={userId}
          />
        )}
      />
      <Route
        path="/incidents/add/offenders/existing-offenders/:id"
        render={({ match, history }) => (
          <ExistingOffender
            addExistingOffenders={addExistingOffenders}
            match={match}
            history={history}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
          />
        )}
      />
      <Route
        path="/incidents/add/offenders/view"
        render={({ history }) => (
          <ViewOffender
            history={history}
            offender={offenders.find(({ id }) => id === current)}
            removeOffender={removeOffender}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            addImage={uploadMobileImage}
          />
        )}
      />
      <Route
        path="/incidents/add/offenders/edit"
        render={({ history }) => (
          <EditOffender
            history={history}
            offender={offenders.find(({ id }) => id === current)}
            editNewOffender={editNewOffender}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
          />
        )}
      />
    </Page>
  );
};

export default withRouter(AddOffenders);
