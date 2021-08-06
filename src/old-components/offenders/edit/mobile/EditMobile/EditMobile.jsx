import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import MobileMenu from '../MobileMenu/MobileMenu';
import EditDescription from '../EditDescription/EditDescription';
import EditWarnings from '../EditWarnings/EditWarnings';
import EditImages from '../EditImages/EditImages';
import EditGroups from '../EditGroups/EditGroups';
import EditBans from '../EditBans/EditBans';

const Page = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
`;

class EditMobile extends Component {
  componentDidMount() {
    this.props.setBottomNav(false);
    this.props.setNavbarAction('backLink');
    this.props.setTitle('Edit Offender');
  }

  render() {
    const {
      offenderId,
      setBackLinkTo,
      offender,
      loading,
      editOffender,
      offenderLabels,
      labelsLoading,
      setNavbarActionDisabled,
      setStatusBar,
      userId,
      toggleNotificationBar,
      setActions,
      admin,
      createImage
    } = this.props;

    const basePath = `/offenders/edit/${offenderId}`;
    return (
      <Page>
        <Route
          exact
          path="/offenders/edit/:id"
          render={() => (
            <MobileMenu basePath={basePath} setBackLinkTo={setBackLinkTo} />
          )}
        />
        <Route
          path="/offenders/edit/:id/description"
          render={({ history }) => (
            <EditDescription
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              offender={offender}
              loading={loading}
              editOffender={editOffender}
              offenderId={offenderId}
              history={history}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/warnings"
          render={({ history }) => (
            <EditWarnings
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              offender={offender}
              loading={loading || labelsLoading}
              editOffender={editOffender}
              history={history}
              offenderLabels={offenderLabels}
              offenderId={offenderId}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/images"
          render={({ history }) => (
            <EditImages
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              images={offender.images || []}
              loading={loading}
              history={history}
              setNavbarActionDisabled={setNavbarActionDisabled}
              setStatusBar={setStatusBar}
              offenderId={offenderId}
              toggleNotificationBar={toggleNotificationBar}
              offender={offender}
              editOffender={editOffender}
              createImage={createImage}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/groups"
          render={({ history }) => (
            <EditGroups
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              offender={offender}
              editOffender={editOffender}
              loadingOffender={loading}
              admin={admin}
              userId={userId}
            />
          )}
        />
        <Route
          path="/offenders/edit/:id/bans"
          render={({ history }) => (
            <EditBans
              basePath={basePath}
              setBackLinkTo={setBackLinkTo}
              history={history}
              offender={offender}
              loading={loading}
              offenderId={offenderId}
              userId={userId}
              setActions={setActions}
              editOffender={editOffender}
            />
          )}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBottomNav(true);
    this.props.setNavbarAction('default');
    this.props.setTitle('');
  }
}

export default EditMobile;
