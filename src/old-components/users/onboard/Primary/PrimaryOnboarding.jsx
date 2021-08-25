import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { Route } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/styles";
// import validate from "validate.js";

import {
  BackButton,
  FullWidthButton,
  ProgressButton,
} from "../../../global/actions";
import Welcome from "../Welcome/Welcome";
import Password from "../Password/Password";

import { CreateUserInAuth0 } from "graphql-src/users/mutations";

import { useAuth } from "hooks";

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

const PrimaryOnboarding = ({ history, classes, user }) => {
  const { login } = useAuth();

  // globals
  const steps = [
    {
      step: 0,
      label: "Welcome",
      url: `/onboarding/${user.id}`,
      next: "Get Started",
    },
    {
      step: 1,
      label: "Set Password",
      url: `/onboarding/password`,
      next: "Set Password",
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

  const [locationKeys, setLocationKeys] = useState([]);

  // effects
  useEffect(() => {
    if (history.location.pathname.includes("password") && step !== 1) {
      setStep(1);
    }
  }, [history, step]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          // Handle forward event
          if (step < 1) {
            setStep((prev) => prev + 1);
          }
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);
          // Handle back event
          if (step > 0) {
            setStep((prev) => prev - 1);
          }
        }
      }
    });
    // eslint-disable-next-line
  }, [locationKeys, step]);

  // mutations
  const [createUserInAuth0] = useMutation(CreateUserInAuth0, {
    variables: {
      id: user.id || "",
      password: password.password || "0000",
    },
  });

  // functions
  const validatePassword = () =>
    new Promise((resolve, reject) => {
      const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      const passwordLong = password.password.length >= 8;

      const passwordComplex = regExp.test(password.password);
      const passwordsMatch = password.password === password.confirm;
      setPassword({
        ...password,
        passwordError: passwordLong
          ? passwordComplex
            ? passwordsMatch
              ? ""
              : "Passwords do not match."
            : "Password must contain at least one number and an upper and lower case letter."
          : "Password must be at least 8 characters long.",
        confirmError: passwordsMatch ? "" : "Passwords do not match.",
      });
      passwordLong && passwordComplex && passwordsMatch
        ? resolve(true)
        : resolve(false);
    });

  const next = () => {
    history.push(steps[step + 1].url);
    setStep(step + 1);
  };

  const handleNext = async () => {
    if (step === 0) {
      next();
    }
    if (step === 1) {
      if (!(await validatePassword())) return;

      await createUserInAuth0();
      login({
        email: user.email,
        password: password.password,
      });
      history.push("/");
    }
  };
  const handleBack = () => {
    history.push(steps[step - 1].url);
    setStep(step - 1);
  };
  const handlePasswordChange = (name) => (event) => {
    setPassword({
      ...password,
      [name]: event.target.value,
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
                  path={`/onboarding/${user.id}`}
                  render={() => <Welcome handleNext={handleNext} />}
                  mobile={matches}
                />
                <Route
                  path={`/onboarding/password`}
                  render={() => (
                    <Password
                      mobile={matches}
                      handleChange={handlePasswordChange}
                      values={password}
                    />
                  )}
                />
              </Content>
              {matches && step > 0 && (
                <Actions>
                  {step >= 1 && (
                    <BackButton onClick={handleBack}>Back</BackButton>
                  )}
                  <ProgressButton
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {steps[step].next}
                  </ProgressButton>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton text={steps[step].next} onClick={handleNext} />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default withStyles(styles)(PrimaryOnboarding);
