import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import MobileMenu from '../MobileMenu/MobileMenu';
import EditDescription from '../EditDescription/EditDescription';
import EditCrimeTypes from '../EditCrimeTypes/EditCrimeTypes';
import EditLocation from '../EditLocation/EditLocation';
import EditOffenders from '../EditOffenders/EditOffenders';
import EditImages from '../EditImages/EditImages';
import EditGroups from '../EditGroups/EditGroups';

const Page = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
`;

class EditMobile extends Component {
  componentDidMount() {
    this.props.setBottomNav(false);
    this.props.setTitle('Edit Incident');
    this.props.setNavbarAction('backLink');
  }

  render() {
    const {
      incidentId,
      setBackLinkTo,
      setNavbarActionDisabled,
      loading,
      userId,
      schemeAdmin,

      description,
      crimeTypes,
      crimeTypeError,
      location,
      offenders,
      images,
      groups,
      uploadingImage,

      handleDesChange,
      handleLocChange,
      setCrimeTypes,
      removeOffender,
      addOffender,
      removeImage,
      uploadImage,
      uploadMobileImage,
      assignOffendersToImage,
      setGroups,
      validateDescription,
      validateCrimeTypes,
      validateLocation,
      validateGroups,
      handleSave,
      updateIncident
    } = this.props;

    const basePath = `/incidents/edit/${incidentId}`;

    return (
      <Page>
        <Route
          exact
          path="/incidents/edit/:id"
          render={({ history }) => (
            <MobileMenu
              history={history}
              incidentId={incidentId}
              setBackLinkTo={setBackLinkTo}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/description"
          render={({ history }) => (
            <EditDescription
              history={history}
              incidentId={incidentId}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              description={description}
              handleChange={handleDesChange}
              validateDescription={validateDescription}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/crime-types"
          render={({ history }) => (
            <EditCrimeTypes
              history={history}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              crimeTypes={crimeTypes}
              setCrimeTypes={setCrimeTypes}
              validateCrimeTypes={validateCrimeTypes}
              error={crimeTypeError}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/location"
          render={({ history }) => (
            <EditLocation
              history={history}
              incidentId={incidentId}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              location={location}
              handleChange={handleLocChange}
              validateLocation={validateLocation}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/offenders"
          render={({ history }) => (
            <EditOffenders
              history={history}
              incidentId={incidentId}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              offenders={offenders}
              addOffender={addOffender}
              removeOffender={removeOffender}
              updateIncident={updateIncident}
              userId={userId}
              groups={groups}
              schemeAdmin={schemeAdmin}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/images"
          render={({ history }) => (
            <EditImages
              history={history}
              incidentId={incidentId}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              setNavbarActionDisabled={setNavbarActionDisabled}
              images={images}
              offenders={offenders}
              uploadImage={uploadImage}
              uploadingImage={uploadingImage}
              uploadMobileImage={uploadMobileImage}
              removeImage={removeImage}
              assignOffendersToImage={assignOffendersToImage}
              updateIncident={updateIncident}
            />
          )}
        />
        <Route
          path="/incidents/edit/:id/groups"
          render={({ history }) => (
            <EditGroups
              history={history}
              incidentId={incidentId}
              loading={loading}
              handleSave={handleSave}
              setBackLinkTo={setBackLinkTo}
              basePath={basePath}
              groups={groups}
              setGroups={setGroups}
              validateGroups={validateGroups}
              updateIncident={updateIncident}
              schemeAdmin={schemeAdmin}
              userId={userId}
            />
          )}
        />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setBottomNav(true);
    this.props.setTitle('');
    this.props.setNavbarAction('default');
  }
}

export default EditMobile;
