import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { BackButton } from '../../../../global/actions';
import { withRouter } from 'react-router-dom';

import Description from '../Description/Description';
import Images from '../Images/Images';
import Labels from '../Labels/Labels';
import Exclusions from '../Exclusions/Exclusions';
import Groups from '../Groups/Groups';

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
`;
const Page = styled.div`
  flex: 1;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
`;
const FormContainer = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 20px 90px 40px;
`;
const Content = styled.div`
  flex: 1;
  padding: 0px 90px;
  height: 100%;
  overflow: auto;
`;

class OffenderWizard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    };
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handlePost = async () => {
    if (this.props.admin) {
      if (this.props.selectedGroups.length > 0) {
        await this.props.handlePost();
        this.props.history.push('/offenders');
      }
    } else {
      await this.props.handlePost();
      this.props.history.push('/offenders');
    }
  };

  render() {
    const { activeStep } = this.state;
    const {
      classes,
      handleChange,
      name,
      gender,
      race,
      build,
      age,
      dateOfBirth,
      dateSource,
      hair,
      peculiarities,
      images,
      disabled,
      uploadImage,
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
      groups,
      toggleSelectedGroups,
      groupsLoading,
      selectedGroups,
      admin,
      createdById
    } = this.props;

    return (
      <Container>
        <Page>
          <FormContainer elevation={1}>
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel classes={{ label: classes.label }}>
                  Description
                </StepLabel>
              </Step>
              <Step>
                <StepLabel classes={{ label: classes.label }}>Images</StepLabel>
              </Step>
              <Step>
                <StepLabel classes={{ label: classes.label }}>
                  Warning Labels
                </StepLabel>
              </Step>
              {admin && (
                <Step>
                  <StepLabel classes={{ label: classes.label }}>Bans</StepLabel>
                </Step>
              )}
              {admin && (
                <Step>
                  <StepLabel classes={{ label: classes.label }}>
                    Groups
                  </StepLabel>
                </Step>
              )}
            </Stepper>
            <Content>
              {activeStep === 0 && (
                <Description
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
              {activeStep === 1 && (
                <Images
                  images={images}
                  uploading={disabled}
                  uploadImage={uploadImage}
                  removeImage={removeImage}
                />
              )}
              {activeStep === 2 && (
                <Labels
                  offenderLabels={offenderLabels}
                  selectedLabels={selectedLabels}
                  toggleSelectedLabels={toggleSelectedLabels}
                  addLabel={addLabel}
                  createdById={createdById}
                />
              )}
              {activeStep === 3 &&
                admin && (
                  <Exclusions
                    exclusions={exclusions}
                    addExclusion={addExclusion}
                    removeExclusion={removeExclusion}
                    editingExclusion={editingExclusion}
                    setEditingExclusion={setEditingExclusion}
                    editExclusion={editExclusion}
                  />
                )}
              {activeStep === 4 &&
                admin && (
                  <Groups
                    groups={groups}
                    toggleSelectedGroups={toggleSelectedGroups}
                    groupsLoading={groupsLoading}
                    selectedGroups={selectedGroups}
                  />
                )}
            </Content>
            <Actions>
              {activeStep > 0 && (
                <BackButton onClick={this.handleBack} disabled={disabled}>
                  Back
                </BackButton>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={
                  admin
                    ? activeStep !== 4
                      ? this.handleNext
                      : this.handlePost
                    : activeStep !== 2
                      ? this.handleNext
                      : this.handlePost
                }
                disabled={
                  disabled ||
                  (this.props.selectedGroups.length === 0 && activeStep === 4)
                }
              >
                {admin
                  ? activeStep === 4
                    ? 'Submit'
                    : 'Next'
                  : activeStep === 2
                    ? 'Submit'
                    : 'Next'}
              </Button>
            </Actions>
          </FormContainer>
        </Page>
      </Container>
    );
  }
}

export default withRouter(withStyles(styles)(OffenderWizard));
