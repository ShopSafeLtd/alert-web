import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Description from '../Description/Description';
import Images from '../Images/Images';
import Labels from '../Labels/Labels';
import Exclusion from '../Exclusion/Exclusion';
import AddExclusion from '../AddExclusion/AddExclusion';
import EditExclusion from '../EditExclusion/EditExclusion';
import Groups from '../Groups/Groups';
import ProtectedSubRoute from '../../../../../components/auth/ProtectedSubRoute';
import AddWarning from '../AddWarning/AddWarning';

const Page = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  background: #fff;
  display: flex;
`;

class MobileForm extends PureComponent {
  componentDidMount() {
    this.props.setBottomNav(false);
    this.props.setTitle('Add Offender');

    if (this.props.pristine) {
      this.props.history.push('/offenders/add');
    }
  }

  render() {
    const {
      setNavbarAction,
      setBackLinkTo,
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      handleChange,
      uploadImage,
      uploadMobileImage,
      disabled,
      images,
      removeImage,
      offenderLabels,
      selectedLabels,
      toggleSelectedLabels,
      addLabel,
      exclusions,
      addExclusion,
      removeExclusion,
      editingExclusion,
      setEditingExclusion,
      editExclusion,
      selectedGroups,
      toggleSelectedGroups,
      handlePost,
      groups,
      groupsLoading,
      admin,
      labelsLoading,
      createdById
    } = this.props;
    return (
      <Page>
        <Route
          exact
          path="/offenders/add"
          render={({ history }) => (
            <Description
              history={history}
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              handleChange={handleChange}
              name={name}
              gender={gender}
              race={race}
              build={build}
              age={age}
              dateOfBirth={dateOfBirth}
              dateSource={dateSource}
              hair={hair}
              peculiarities={peculiarities}
            />
          )}
        />
        <Route
          path="/offenders/add/images"
          render={({ history }) => (
            <Images
              history={history}
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              uploadImage={uploadImage}
              disabled={disabled}
              images={images}
              removeImage={removeImage}
              uploadMobileImage={uploadMobileImage}
              admin={admin}
              warnings={offenderLabels}
              groups={groups}
              submit={handlePost}
            />
          )}
        />
        <Route
          exact
          path="/offenders/add/warning-labels"
          render={({ history }) => (
            <Labels
              history={history}
              setNavbarAction={setNavbarAction}
              setBackLinkTo={setBackLinkTo}
              offenderLabels={offenderLabels}
              selectedLabels={selectedLabels}
              toggleSelectedLabels={toggleSelectedLabels}
              addLabel={addLabel}
              admin={admin}
              handlePost={handlePost}
              labelsLoading={labelsLoading}
              groups={groups}
            />
          )}
        />
        <ProtectedSubRoute
          path="/offenders/add/warning-labels/add"
          component={AddWarning}
          setNavbarAction={setNavbarAction}
          setBackLinkTo={setBackLinkTo}
          allowedRoles={['SCHEME_ADMIN']}
          createdById={createdById}
        />
        <ProtectedSubRoute
          exact
          path="/offenders/add/ban"
          component={Exclusion}
          setNavbarAction={setNavbarAction}
          setBackLinkTo={setBackLinkTo}
          exclusions={exclusions}
          removeExclusion={removeExclusion}
          setEditingExclusion={setEditingExclusion}
          allowedRoles={['SCHEME_ADMIN']}
          groups={groups}
          submit={handlePost}
        />
        <ProtectedSubRoute
          path="/offenders/add/ban/add-ban"
          setNavbarAction={setNavbarAction}
          setBackLinkTo={setBackLinkTo}
          addExclusion={addExclusion}
          component={AddExclusion}
          allowedRoles={['SCHEME_ADMIN']}
        />
        <ProtectedSubRoute
          path="/offenders/add/ban/edit-ban"
          setBackLinkTo={setBackLinkTo}
          setNavbarAction={setNavbarAction}
          addExclusion={addExclusion}
          editingExclusion={editingExclusion}
          editExclusion={editExclusion}
          component={EditExclusion}
          allowedRoles={['SCHEME_ADMIN']}
        />
        <Route
          path="/offenders/add/groups"
          render={router => (
            <Groups
              {...router}
              setBackLinkTo={setBackLinkTo}
              setNavbarAction={setNavbarAction}
              handlePost={handlePost}
              selectedGroups={selectedGroups}
              toggleSelectedGroups={toggleSelectedGroups}
              disabled={disabled}
              loading={groupsLoading}
              groups={groups}
              admin={admin}
              warnings={offenderLabels}
            />
          )}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBottomNav(true);
    this.props.setTitle('');
  }
}

export default withRouter(MobileForm);
