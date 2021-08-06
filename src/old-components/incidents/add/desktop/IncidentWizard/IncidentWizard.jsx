import React, { useState } from 'react';
import styled from 'styled-components';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { BackButton } from '../../../../global/actions';
import AddDescription from '../AddDescription/AddDescription';
import AddLocation from '../AddLocation/AddLocation';
import AddOffenders from '../AddOffenders/AddOffenders';
import AddImages from '../AddImages/AddImages';
import Group from '../Groups/Groups';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';

const styles = {
  label: {
    fontSize: '14px'
  }
};

const Container = styled.div`
  height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fff;
`;
const Page = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 15px 20px;
`;
const StepperContainer = styled(Stepper)`
  padding: 10px 24px 24px;
`;
const Form = styled.div`
  flex: 1;
  padding: 0px 90px;
  height: 100%;
  overflow: auto;
  height: calc(100% - 150px);
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 15px 90px 0px;
`;
const Svg = styled.svg`
  width: 24px;
  height: 24px;
  margin: 0 10px;
`;

const IncidentWizard = ({
  // Global Props
  disableButtons,
  userId,
  classes,
  admin,
  handleSubmit,

  // Description Props
  description,
  handleDescChange,
  crimeTypesList,
  crimeTypes,
  crimeTypesError,
  setCrimeTypes,
  validateDescription,

  // Location Props
  location,
  newLocation,
  previousLocation,
  primaryLocation,
  previousLocations,
  handleLocationChange,
  setLocationOption,
  setPreviousLocation,
  validateLocation,

  // Offender Props
  offenders,
  addExistingOffenders,
  addNewOffender,
  editNewOffender,
  removeOffender,

  // Image Props
  images,
  uploadImage,
  uploadingImage,
  removeImage,
  assignImageToOffenders,
  removeOffendersFromImage,
  validateImages,

  // Groups Values
  groups,
  groupsList,
  groupsLoading,
  toggleGroups,
  validateGroups
}) => {
  // state
  const [step, setStep] = useState(0);
  const [assignWarning, setAssignWarning] = useState(false);
  const [skipImageValid, setSkipImageValid] = useState(false);
  const [previous, setPrevious] = useState(false);

  // functions
  const increaseStep = () => {
    if (step === 0) {
      validateDescription()
        .then(() => setStep(1))
        .catch(() => setStep(0));
    } else if (step === 1) {
      validateLocation()
        .then(() => setStep(2))
        .catch(error => {
          error === 'PREVIOUS' && setPrevious(true);
          setStep(1);
        });
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (skipImageValid) {
        admin ? setStep(4) : handleSubmit();
      } else {
        validateImages()
          .then(() => {
            admin ? setStep(4) : handleSubmit();
          })
          .catch(() => {
            setStep(3);
            setAssignWarning(true);
          });
      }
    } else if (step === 4) {
      validateGroups()
        .then(() => handleSubmit())
        .catch(() => setStep(4));
    }
  };
  const decreaseStep = () => {
    step > 0 && setStep(step - 1);
  };

  return (
    <Container>
      <Page>
        <StepperContainer activeStep={step} alternativeLabel>
          <Step>
            <StepLabel classes={{ label: classes.label }}>
              Description
            </StepLabel>
          </Step>
          <Step>
            <StepLabel classes={{ label: classes.label }}>Location</StepLabel>
          </Step>
          <Step>
            <StepLabel classes={{ label: classes.label }}>Offenders</StepLabel>
          </Step>
          <Step>
            <StepLabel classes={{ label: classes.label }}>Images</StepLabel>
          </Step>
          {admin && (
            <Step>
              <StepLabel classes={{ label: classes.label }}>Groups</StepLabel>
            </Step>
          )}
        </StepperContainer>
        <Form>
          {step === 0 && (
            <AddDescription
              description={description}
              handleChange={handleDescChange}
              crimeTypes={crimeTypes}
              crimeTypesError={crimeTypesError}
              crimeTypesList={crimeTypesList}
              setCrimeTypes={setCrimeTypes}
              step={step}
            />
          )}
          {step === 1 && (
            <AddLocation
              option={location}
              newLocation={newLocation}
              previousLocation={previousLocation}
              primaryLocation={primaryLocation}
              previousLocations={previousLocations}
              handleLocationChange={handleLocationChange}
              setLocationOption={setLocationOption}
              setPreviousLocation={setPreviousLocation}
              step={step}
              handleNext={increaseStep}
            />
          )}
          {step === 2 && (
            <AddOffenders
              offenders={offenders}
              addExistingOffenders={addExistingOffenders}
              addNewOffender={addNewOffender}
              editNewOffender={editNewOffender}
              removeOffender={removeOffender}
              step={step}
              userId={userId}
            />
          )}
          {step === 3 && (
            <AddImages
              images={images}
              uploadImage={uploadImage}
              uploading={uploadingImage}
              offenders={offenders}
              removeImage={removeImage}
              assignImageToOffenders={assignImageToOffenders}
              removeOffendersFromImage={removeOffendersFromImage}
              step={step}
            />
          )}
          {step === 4 &&
            admin && (
              <Group
                groups={groupsList}
                groupsLoading={groupsLoading}
                selectedGroups={groups}
                toggleSelectedGroups={toggleGroups}
              />
            )}
        </Form>
        <Actions>
          {step > 0 && (
            <BackButton onClick={decreaseStep} disabled={disableButtons}>
              Back
            </BackButton>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={increaseStep}
            disabled={disableButtons}
          >
            {admin
              ? step === 4
                ? 'Submit'
                : 'Next'
              : step === 3
                ? 'Submit'
                : 'Next'}
          </Button>
        </Actions>

        {/* No Assigned Offenders Dialog */}
        <Dialog
          open={assignWarning}
          onClose={() => setAssignWarning(false)}
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
                setSkipImageValid(true);
                increaseStep();
                setAssignWarning(false);
              }}
              color="primary"
            >
              Continue
            </Button>
            <Button
              onClick={() => setAssignWarning(false)}
              variant="contained"
              color="primary"
              autoFocus
            >
              Go Back
            </Button>
          </DialogActions>
        </Dialog>
        <ConfirmDialog
          open={previous}
          handleClose={() => setPrevious(false)}
          title="You need to select a location!"
          description="Please select a previous locations from the list, if you dont have any add a new one or use your location."
          actions={[
            <Button
              key={Math.random()}
              onClick={() => setPrevious(false)}
              color="primary"
            >
              Go Back
            </Button>
          ]}
        />
      </Page>
    </Container>
  );
};

export default withStyles(styles)(IncidentWizard);
