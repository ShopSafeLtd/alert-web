import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/styles';
// import validate from "validate.js";
import { APP_PREFIX_PATH } from 'configs/AppConfig';

import {
  BackButton,
  FullWidthButton,
  ProgressButton,
} from '../../../global/actions';
import Account from '../Account/Account';
import Terms from '../Terms/Terms';
import { UserDetails } from 'graphql-src/users/queries';
import {
  UpdateUserDetails,
  UpdateUserTerms,
} from 'graphql-src/users/mutations';
// import query from '../../../../graphql/users/queries/UserOnboard';
// import ResetPassword from '../../../../graphql/account/mutations/ResetPasswordMutation';
// import EditUser from '../../../../graphql/account/mutations/EditProfileMutation';
import { useStoreActions, useStoreState } from '../../../../state';

const styles = {
  label: {
    fontSize: '14px',
  },
};

const Container = styled.div`
  min-height: calc(100vh);
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    height: calc(100vh);
  }
`;
const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    padding: 15px 20px;
    max-width: 1200px;
  }
`;
const FormContainer = styled(Paper)`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  @media (min-width: 1024px) {
    padding: 20px 90px 40px;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  padding: 15px 20px;
  @media (min-width: 1024px) {
    overflow: auto;
    padding: 0px 90px;
  }
`;
// @ts-ignore ????
const SecondaryOnboarding = ({ classes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const userId = useStoreState((state) => state.user.id);
  const user = useStoreState((state) => state.user);

  // globals
  const steps = [
    {
      step: 0,
      label: 'Account Details',
      url: `${APP_PREFIX_PATH}/onboarding`,
      next: 'Next',
    },
    {
      step: 1,
      label: 'Terms & Conditions',
      url: `${APP_PREFIX_PATH}/onboarding/terms-conditions`,
      next: 'Agree',
    },
  ];

  // state
  const [step, setStep] = useState(0);

  const [details, setDetails] = useState({
    fullName: '',
    fullNameError: '',
    organisation: '',
    organisationError: '',
    premises: '',
    building: '',
    street: '',
    streetError: '',
    townCity: '',
    townCityError: '',
    county: '',
    postcode: '',
    postcodeError: '',
    addressId: '',
  });
  const [terms, setTerms] = useState({
    termsSigned: false,
    error: '',
  });

  const [locationKeys, setLocationKeys] = useState([]);

  // effects

  // useEffect(() => {
  //   return navigate.listen((location) => {
  //     if (navigate.action === 'PUSH') {
  //       setLocationKeys([location.key]);
  //     }

  //     if (navigate.action === 'POP') {
  //       if (locationKeys[1] === location.key) {
  //         setLocationKeys(([_, ...keys]) => keys);
  //         // Handle forward event
  //         if (step < 1) {
  //           setStep((prev) => prev + 1);
  //         }
  //       } else {
  //         setLocationKeys((keys) => [location.key, ...keys]);
  //         // Handle back event
  //         if (step > 0) {
  //           setStep((prev) => prev - 1);
  //         }
  //       }
  //     }
  //   });
  //   // eslint-disable-next-line
  // }, [locationKeys, step]);

  useEffect(() => {
    if (location.pathname.includes('terms-conditions') && step !== 1) {
      setStep(1);
    }
  }, [location, step]);

  // queries
  const { loading } = useQuery(UserDetails, {
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: userId,
      },
    },
    onCompleted: ({ user: { fullName, organisation, addresses } }) =>
      setDetails({
        ...details,
        fullName,
        organisation,
        premises: addresses[0].premises,
        building: addresses[0].building,
        street: addresses[0].street,
        townCity: addresses[0].townCity,
        county: addresses[0].county,
        postcode: addresses[0].postcode,
        addressId: addresses[0].id,
      }),
  });

  // mutations
  const [updateUser] = useMutation(UpdateUserDetails);
  const [updateUserTerms] = useMutation(UpdateUserTerms);
  // functions
  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!details.fullName;
      const organisationValid = !!details.organisation;
      const streetValid = !!details.street;
      const townValid = !!details.townCity;
      const postcodeValid = !!details.postcode;

      setDetails({
        ...details,
        fullNameError: fullNameValid ? '' : 'This field is required',
        organisationError: organisationValid ? '' : 'This field is required',
        streetError: streetValid ? '' : 'This field is required',
        townCityError: townValid ? '' : 'This field is required',
        postcodeError: postcodeValid ? '' : 'This field is required',
      });
      fullNameValid &&
      organisationValid &&
      streetValid &&
      townValid &&
      postcodeValid
        ? resolve(true)
        : resolve(false);
    });
  const validateSigned = () =>
    new Promise((resolve, reject) => {
      setTerms({
        ...terms,
        error: terms.termsSigned
          ? ''
          : 'Please agree to the terms and conditions',
      });
      terms.termsSigned ? resolve(true) : resolve(false);
    });

  const next = () => {
    navigate(steps[step + 1].url);
    setStep(step + 1);
  };

  const handleNext = async () => {
    if (step === 0) {
      if (!(await validateDetails())) return;
      updateUser({
        variables: {
          data: {
            fullName: { set: details.fullName },
            organisation: { set: details.organisation },
            addresses: {
              update: {
                where: {
                  id: details.addressId,
                },
                data: {
                  premises: { set: details.premises },
                  building: { set: details.building },
                  street: { set: details.street },
                  townCity: { set: details.townCity },
                  county: { set: details.county },
                  postcode: { set: details.postcode },
                },
              },
            },
          },
          where: {
            id: userId,
          },
        },
      });
      next();
    }
    if (step === 1) {
      if (!(await validateSigned())) return;
      updateUserTerms({
        variables: {
          where: {
            id: userId,
          },
          data: {
            termsSigned: { set: true },
            newUser: { set: false },
          },
        },
      });
      setUser({ ...user, onboarded: true });
      navigate('/');
    }
  };
  const handleBack = () => {
    navigate(steps[step - 1].url);
    setStep((prev) => prev - 1);
  };
  // @ts-ignore ????
  const handleDetailsChange = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };
  // @ts-ignore ????
  const handleTermsChange = (name, value) => {
    setTerms({
      ...terms,
      [name]: value,
    });
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {/*  @ts-ignore ???? */}
      {(matches) => (
        <Container>
          <Page>
            <FormContainer elevation={1}>
              {matches && step >= 0 && (
                <Stepper activeStep={step} alternativeLabel>
                  {steps.map(({ label, step }) => (
                    <Step key={step}>
                      <StepLabel classes={{ label: classes.label }}>
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
              <Content>
                {/* <Routes>
                  <Route
                    index
                    element={
                      <Account
                        handleChange={handleDetailsChange}
                        values={details}
                        loading={loading}
                      />
                    }
                  />
                  <Route
                    path={`${APP_PREFIX_PATH}/onboarding/terms-conditions`}
                    element={
                      <Terms
                        handleChange={handleTermsChange}
                        values={terms}
                        loading={loading}
                      />
                    }
                  />
                </Routes> */}
                <Routes>
                  <Route
                    index
                    element={
                      <Account
                        handleChange={handleDetailsChange}
                        values={details}
                        loading={loading}
                      />
                      // <Terms
                      //   handleChange={handleTermsChange}
                      //   values={terms}
                      //   loading={loading}
                      // />
                    }
                  />

                  <Route
                    path={`terms-conditions`}
                    element={
                      <Terms
                        handleChange={handleTermsChange}
                        values={terms}
                        loading={false}
                      />
                    }
                  />
                </Routes>
              </Content>
              {matches && step >= 0 && (
                <Actions>
                  {step > 0 && (
                    <BackButton onClick={handleBack} disabled={loading}>
                      Back
                    </BackButton>
                  )}
                  <ProgressButton
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {steps[step].next}
                  </ProgressButton>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton
                  text={steps[step].next}
                  onClick={handleNext}
                  disabled={loading}
                />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default withStyles(styles)(SecondaryOnboarding);
