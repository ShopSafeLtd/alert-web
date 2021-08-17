import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/styles";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { useQuery, useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";

import { BackButton, FullWidthButton } from "../../../global/actions";
import { withRouter, Route } from "react-router-dom";
import { SchemeUsers } from "graphql-src/users/queries";
import { CreateGroup } from "graphql-src/groups/mutations";
import { Groups } from "graphql-src/groups/queries";

import Details from "../Details/Details";
import Users from "../Users/Users";
import { useStoreActions, useStoreState } from "../../../../state";

const styles = {
  label: {
    fontSize: "14px",
  },
};

const Container = styled.div`
  min-height: calc(100vh - 56px);
  width: 100%;
  display: flex;
  justify-content: center;
  @media (min-width: 1024px) {
    height: calc(100vh - 56px);
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
  width: 100%;
  @media (min-width: 1024px) {
    overflow: auto;
    padding: 0px 90px;
  }
`;

const AddGroup = ({ history, classes }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const schemeId = useStoreState((state) => state.scheme.id);

  // presets
  const steps = [
    {
      step: 0,
      label: "Group Details",
      url: `${APP_PREFIX_PATH}/scheme-settings/groups/add`,
    },
    {
      step: 1,
      label: "Users",
      url: `${APP_PREFIX_PATH}/scheme-settings/groups/add/users`,
    },
  ];

  // state
  const [step, setStep] = useState(0);
  const [group, setGroup] = useState({
    name: "",
    nameError: "",
    description: "",
  });
  const [users, setUsers] = useState([]);
  const [userError, setUserError] = useState("");

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Add Group");
    history.push(`${APP_PREFIX_PATH}/scheme-settings/groups/add`);
    return () => {
      setBottomNav(true);
      setTitle("");
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading } = useQuery(SchemeUsers, {
    variables: {
      scheme: schemeId,
      search: "",
      orderByName: "asc",
    },
    fetchPolicy: "cache-and-network",
  });

  // mutations
  const [createGroup] = useMutation(CreateGroup, {
    update: (store, { data: { createGroup } }) => {
      let data = store.readQuery({
        query: Groups,
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
          },
        },
      });
      store.writeQuery({
        query: Groups,
        data: {
          ...data,
          groups: [...data?.groups, createGroup],
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
          },
        },
      });
    },
  });

  // functions
  const handleChange = (name) => (event) => {
    setGroup({
      ...group,
      [name]: event.target.value,
    });
  };

  const toggleSelectedUsers = (user) => {
    !users.includes(user)
      ? setUsers([...users, user])
      : setUsers(users.filter((item) => item !== user));
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const nameValid = group.name !== "";

      !nameValid
        ? setGroup({ ...group, nameError: "This is a required field." })
        : setGroup({ ...group, nameError: "" });

      nameValid ? resolve() : reject();
    });

  const validateUsers = () =>
    new Promise((resolve, reject) => {
      const usersValid = users.length > 0;
      usersValid
        ? setUserError("")
        : setUserError("Please select at least one user.");
      usersValid ? resolve() : reject();
    });

  const handleNext = () => {
    if (step === 0) {
      validateDetails()
        .then(() => {
          history.push(steps[step + 1].url);
          setStep(1);
        })
        .catch(() => {});
    } else if (step === 1) {
      validateUsers()
        .then(() => {
          createGroup({
            variables: {
              data: {
                name: group.name,
                description: group.description,
                scheme: {
                  connect: { id: schemeId },
                },
                users: {
                  connect:
                    users.length > 0 ? users.map((id) => ({ id })) : undefined,
                },
              },
            },
            optimisticResponse: {
              createGroup: {
                id: 0,
                name: group.name,
                description: group.description,
                __typename: "Group",
              },
            },
          });
          history.push(`${APP_PREFIX_PATH}/scheme-settings/groups`);
        })
        .catch(() => {});
    }
  };

  const handleBack = () => {
    history.push(steps[step - 1].url);
    setStep(step - 1);
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Container>
          <Page>
            <FormContainer elevation={1}>
              {matches && (
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
                  path={`${APP_PREFIX_PATH}/scheme-settings/groups/add`}
                  render={() => (
                    <Details
                      handleChange={handleChange}
                      name={group.name}
                      nameError={group.nameError}
                      description={group.description}
                      setBackLinkTo={setBackLinkTo}
                      // setNavbarAction={setNavbarAction}
                      setActiveStep={setStep}
                      back={`${APP_PREFIX_PATH}/scheme-settings/groups`}
                    />
                  )}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/scheme-settings/groups/add/users`}
                  render={() => (
                    <Users
                      users={data?.users}
                      error={userError}
                      selectedUsers={users}
                      loading={loading}
                      toggleSelectedUsers={toggleSelectedUsers}
                      setBackLinkTo={setBackLinkTo}
                      setActiveStep={step}
                      // setNavbarAction={setNavbarAction}
                      back={`${APP_PREFIX_PATH}/scheme-settings/groups/add`}
                    />
                  )}
                />
              </Content>
              {matches && (
                <Actions>
                  {step !== 0 && (
                    <BackButton onClick={handleBack}>Back</BackButton>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {step !== 0 ? "submit" : "next"}
                  </Button>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton
                  text={step !== 0 ? "submit" : "next"}
                  onClick={handleNext}
                />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default withRouter(withStyles(styles)(AddGroup));
