import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { Route, useNavigate } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/styles";
// import validate from "validate.js";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import {
  BackButton,
  FullWidthButton,
  ProgressButton,
} from "../../../global/actions";
import Welcome from "../Welcome/Welcome";
import Password from "../Password/Password";
import Account from "../Account/Account";
import Terms from "../Terms/Terms";
// import query from '../../../../graphql/users/queries/UserOnboard';
// import ResetPassword from '../../../../graphql/account/mutations/ResetPasswordMutation';
// import EditUser from '../../../../graphql/account/mutations/EditProfileMutation';
import { useStoreActions, useStoreState } from "../../../../state";

const styles = {
  label: {
    fontSize: "14px",
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

const UserOnboarding = ({ classes }) => {
  const navigate = useNavigate()
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const currentStep = useStoreState((state) => state.user.onboardSteps);

  // globals
  const steps = [
    {
      step: 0,
      label: "Welcome",
      url: `${APP_PREFIX_PATH}/onboarding`,
      next: "Get Started",
    },
    {
      step: 1,
      label: "Set Password",
      url: `${APP_PREFIX_PATH}/onboarding/password`,
      next: "Set Password",
    },
    {
      step: 2,
      label: "Account Details",
      url: `${APP_PREFIX_PATH}/onboarding/account-details`,
      next: "Save Details",
    },
    {
      step: 3,
      label: "Terms & Conditions",
      url: `${APP_PREFIX_PATH}/onboarding/terms-conditions`,
      next: "Agree",
    },
  ];

  // state
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState({
    password: "",
    passwordError: "",
    confirm: "",
    confirmError: "",
  });
  const [details, setDetails] = useState({
    fullName: "",
    fullNameError: "",
    organisation: "",
    organisationError: "",
    premises: "",
    building: "",
    street: "",
    streetError: "",
    townCity: "",
    townCityError: "",
    county: "",
    postcode: "",
    postcodeError: "",
  });
  const [terms, setTerms] = useState({
    termsSigned: false,
    error: "",
  });

  // effects
  useEffect(() => {
    if (currentStep === "WELCOME") {
      navigate(`${APP_PREFIX_PATH}/onboarding`);
      setStep(0);
    }
    if (currentStep === "PASSWORD") {
      navigate(`${APP_PREFIX_PATH}/onboarding/password`);
      setStep(1);
    }
    if (currentStep === "DETAILS") {
      navigate(`${APP_PREFIX_PATH}/onboarding/account-details`);
      setStep(2);
    }
    if (currentStep === "TERMS") {
      navigate(`${APP_PREFIX_PATH}/onboarding/terms-conditions`);
      setStep(3);
    }
    // eslint-disable-next-line
  }, []);

  // queries
  // const { data, loading } = useQuery(query, {
  //   fetchPolicy: "cache-and-network",
  //   onCompleted: ({ currentUser: { fullName, organisation, addresses } }) =>
  //     setDetails({
  //       ...details,
  //       fullName,
  //       organisation,
  //       premises: addresses[0].premises,
  //       building: addresses[0].building,
  //       street: addresses[0].street,
  //       townCity: addresses[0].townCity,
  //       county: addresses[0].county,
  //       postcode: addresses[0].postcode,
  //     }),
  // });
  const data = {};
  const loading = false;

  // mutations
  // const [updatePassword] = useMutation(ResetPassword);
  // const [updateUser] = useMutation(EditUser);
  // functions
  const validatePassword = () =>
    new Promise((resolve, reject) => {
      const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      const passwordLong = true;
      // validate(
      //   { password: password.password },
      //   { password: { length: { minimum: 8 } } }
      // ) === undefined;
      const passwordComplex = regExp.test(password.password);
      const passwordsMatch = password.password === password.confirm;
      setPassword({
        ...password,
        passwordError: passwordLong
          ? passwordComplex
            ? passwordsMatch
              ? ""
              : "Passwords do not match."
            : "Password must contain at least one number and upper case letter."
          : "Password must be at least 8 characters long.",
        confirmError: passwordsMatch ? "" : "Passwords do not match.",
      });
      passwordLong && passwordComplex && passwordsMatch ? resolve() : reject();
    });
  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!details.fullName;
      const organisationValid = !!details.organisation;
      const streetValid = !!details.street;
      const townValid = !!details.townCity;
      const postcodeValid = !!details.postcode;

      setDetails({
        ...details,
        fullNameError: fullNameValid ? "" : "This field is required",
        organisationError: organisationValid ? "" : "This field is required",
        streetError: streetValid ? "" : "This field is required",
        townCityError: townValid ? "" : "This field is required",
        postcodeError: postcodeValid ? "" : "This field is required",
      });
      fullNameValid &&
      organisationValid &&
      streetValid &&
      townValid &&
      postcodeValid
        ? resolve()
        : reject();
    });
  const validateSigned = () =>
    new Promise((resolve, reject) => {
      setTerms({
        ...terms,
        error: terms.termsSigned
          ? ""
          : "Please agree to the terms and conditions",
      });
      terms.termsSigned ? resolve() : reject();
    });

  const next = () => {
    navigate(steps[step + 1].url);
    setStep(step + 1);
  };

  const handleNext = () => {
    if (step === 0) {
      // updateUser({
      //   variables: {
      //     id: data.currentUser.id,
      //     onboardStep: "PASSWORD",
      //   },
      // });
      next();
    }
    step === 1 &&
      validatePassword()
        .then(() => {
          // updateUser({
          //   variables: {
          //     id: data.currentUser.id,
          //     onboardStep: "DETAILS",
          //   },
          // });
          // updatePassword({
          //   variables: {
          //     password: password.password,
          //   },
          // });
          next();
        })
        .catch(() => {});
    step === 2 &&
      validateDetails()
        .then(() => {
          // updateUser({
          //   variables: {
          //     id: data.currentUser.id,
          //     onboardStep: "TERMS",
          //     fullName: { set: details.fullName },
          //     organisation: { set: details.organisation },
          //     address: {
          //       where: { id: data.currentUser.addresses[0].id },
          //       data: {
          //         premises: { set: details.premises },
          //         building: { set: details.building },
          //         street: { set: details.street },
          //         townCity: { set: details.townCity },
          //         county: { set: details.county },
          //         postcode: { set: details.postcode },
          //       },
          //     },
          //   },
          // });
          next();
        })
        .catch(() => {});
    step === 3 &&
      validateSigned()
        .then(() => {
          // updateUser({
          //   variables: {
          //     id: data.currentUser.id,
          //     termsSigned: { set: true },
          //     timeSigned: { set: new Date() },
          //     newUser: { set: false },
          //     platform: !!window.navigator.oscpu
          //       ? { set: window.navigator.oscpu }
          //       : undefined,
          //   },
          // });
          setUser({ onboarded: true });
          navigate("/");
        })
        .catch(() => {});
  };
  const handleBack = () => {
    navigate(steps[step - 1].url);
    setStep(step - 1);
  };
  const handlePasswordChange = (name) => (event) => {
    setPassword({
      ...password,
      [name]: event.target.value,
    });
  };
  const handleDetailsChange = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };
  const handleTermsChange = (name, value) => {
    setTerms({
      ...terms,
      [name]: value,
    });
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Container>
          <Page>
            <FormContainer elevation={1}>
              {matches && step > 0 && (
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
                <Route
                  exact
                  path={`${APP_PREFIX_PATH}/onboarding`}
                  render={() => <Welcome handleNext={handleNext} />}
                  mobile={matches}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/onboarding/password`}
                  render={() => (
                    <Password
                      mobile={matches}
                      handleChange={handlePasswordChange}
                      values={password}
                      loading={loading}
                    />
                  )}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/onboarding/account-details`}
                  render={() => (
                    <Account
                      handleChange={handleDetailsChange}
                      values={details}
                      loading={loading}
                    />
                  )}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/onboarding/terms-conditions`}
                  render={() => (
                    <Terms
                      handleChange={handleTermsChange}
                      values={terms}
                      loading={loading}
                    />
                  )}
                />
              </Content>
              {matches && step > 0 && (
                <Actions>
                  {step > 1 && (
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

export default withStyles(styles)(UserOnboarding);
