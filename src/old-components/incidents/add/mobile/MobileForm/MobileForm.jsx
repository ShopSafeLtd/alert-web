import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddLocation from '../AddLocation/AddLocation';
import AddOffenders from '../AddOffenders/AddOffenders';
import AddImages from '../AddImages/AddImages';
import AddDescription from '../AddDescription/AddDescription';
import AddCrimeType from '../AddCrimeTypes/AddCrimeTypes';
import Groups from '../Groups/Groups';

const Page = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  background: #fff;
  display: flex;
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
  margin: 0 10px;
`;

const MobileForm = ({
  // global props
  location,
  history,
  setBottomNav,
  setTitle,
  userId,
  setBackLinkTo,
  setNavbarAction,
  handleSubmit,
  admin,
  schemeAdmin,

  // description props
  handleDescChange,
  description,
  validateDescription,

  // crime type props
  crimeTypesList,
  crimeTypes,
  crimeTypeError,
  toggleCrimeTypes,
  validateCrimeTypes,
  crimeTypesLoading,

  // location props
  handleLocationChange,
  locationOption,
  setLocationOption,
  previousLocations,
  setPreviousLocation,
  newLocation,
  validateLocation,
  loadingAddresses,
  setLocationPristine,
  locationPristine,
  primaryLocation,
  previousLocation,

  // offender props
  offenders,
  addNewOffender,
  editNewOffender,
  addExistingOffenders,
  disabled,
  removeOffender,

  // images props
  images,
  uploadImage,
  removeImage,
  assignImageToOffenders,
  uploadMobileImage,
  validateImages,

  // groups props
  groupsLoading,
  groups,
  toggleGroups,
  validateGroups,
  groupsList
}) => {
  // state
  const [assign, setAssign] = useState(false);
  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle('Add Incident');
    location.pathname !== '/incidents/add' && history.push('/incidents/add');
    return () => {
      setBottomNav(true);
      setTitle('');
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <Route
        exact
        path="/incidents/add"
        render={({ history }) => (
          <AddDescription
            handleChange={handleDescChange}
            description={description}
            history={history}
            validateDescription={validateDescription}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            schemeAdmin={schemeAdmin}
            crimeTypes={crimeTypesList.length > 0}
          />
        )}
      />
      <Route
        path="/incidents/add/crime-types"
        render={({ history }) => (
          <AddCrimeType
            selected={crimeTypes}
            error={crimeTypeError}
            crimeTypesList={crimeTypesList}
            validateCrimeTypes={validateCrimeTypes}
            toggleSelected={toggleCrimeTypes}
            history={history}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            loading={crimeTypesLoading}
          />
        )}
      />
      <Route
        path="/incidents/add/location"
        render={({ history }) => (
          <AddLocation
            handleChange={handleLocationChange}
            option={locationOption}
            setLocationOption={setLocationOption}
            history={history}
            previousLocation={previousLocation}
            previousLocations={previousLocations}
            primaryLocation={primaryLocation}
            setPreviousLocation={setPreviousLocation}
            newLocation={newLocation}
            user={userId}
            validateLocation={validateLocation}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            loadingAddresses={loadingAddresses}
            locationPristine={locationPristine}
            setLocationPristine={setLocationPristine}
            schemeAdmin={schemeAdmin}
            crimeTypes={crimeTypesList.length > 0}
          />
        )}
      />
      <Route
        path="/incidents/add/offenders"
        render={({ history }) => (
          <AddOffenders
            offenders={offenders}
            userId={userId}
            addExistingOffenders={addExistingOffenders}
            removeOffender={removeOffender}
            editNewOffender={editNewOffender}
            history={history}
            addNewOffender={addNewOffender}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            uploadMobileImage={uploadMobileImage}
          />
        )}
      />
      <Route
        path="/incidents/add/images"
        render={({ history }) => (
          <AddImages
            images={images}
            uploadImage={uploadImage}
            uploading={disabled}
            offenders={offenders}
            removeImage={removeImage}
            assignImageToOffenders={assignImageToOffenders}
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            submit={handleSubmit}
            uploadMobileImage={uploadMobileImage}
            validateImages={validateImages}
            setAssign={setAssign}
            groups={groupsList.length > 1}
          />
        )}
      />
      <Route
        path="/incidents/add/groups"
        render={() => (
          <Groups
            setBackLinkTo={setBackLinkTo}
            setNavbarAction={setNavbarAction}
            handleSubmit={handleSubmit}
            groups={groups}
            groupsList={groupsList}
            toggleGroups={toggleGroups}
            disabled={disabled}
            loading={groupsLoading}
            component={Groups}
            schemeAdmin={schemeAdmin}
          />
        )}
      />

      <Dialog
        open={assign}
        onClose={() => setAssign(false)}
        aria-labelledby="assign-dialog-title"
        aria-describedby="assign-dialog-description"
      >
        <DialogTitle id="assign-dialog-title">
          No offenders assigned to images
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="assign-dialog-description">
            You can assign offenders to the images that you have uploaded by
            clicking the
            <Svg viewBox="0 0 24 24">
              <path
                fill="#9E9E9E"
                d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z"
              />
            </Svg>{' '}
            icon on the images.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              admin ? history.push('/incidents/add/groups') : handleSubmit();
              setAssign(false);
            }}
            color="primary"
          >
            {admin ? "Don't Assign" : 'Save Incident Now'}
          </Button>
          <Button
            onClick={() => {
              setAssign(false);
            }}
            color="primary"
            autoFocus
          >
            Go Back
          </Button>
        </DialogActions>
      </Dialog>
    </Page>
  );
};

export default withRouter(MobileForm);
