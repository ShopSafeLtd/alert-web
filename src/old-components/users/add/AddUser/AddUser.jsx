import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";
import { APP_PREFIX_PATH } from "configs/AppConfig";
// import validate from "validate.js";
import { withRouter, Route } from "react-router-dom";
// import { useMutation, useQuery } from '@apollo/react-hooks';
import { useQuery, useMutation } from "@apollo/client";

import { BackButton, FullWidthButton } from "../../../global/actions";
import { Groups as GroupsQuery } from "graphql-src/groups/queries";
import { SchemeChats as ChatsQuery } from "graphql-src/chat/queries";
// import CreateUser from '../../../../graphql/users/mutations/CreateUser';
// import AllChats from '../../../../graphql/chat/queries/AllChats';
// import AllGroups from '../../../../graphql/groups/AllGroupsQuery';

import Details from "../Details/Details";
import Groups from "../Groups/Groups";
import ChatGroups from "../ChatGroups/ChatGroups";
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
  @media (min-width: 1024px) {
    overflow: auto;
    padding: 0px 90px;
  }
`;

const AddUser = ({ history, classes, location }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [user, setUser] = useState({
    fullName: "",
    fullNameError: "",
    email: "",
    emailError: "",
    organisation: "",
    organisationError: "",
    role: "",
    roleError: "",
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
  const [groups, setGroups] = useState([]);
  const [chats, setChats] = useState([]);
  const [step, setStep] = useState(0);
  const steps = [
    {
      step: 0,
      label: "User Details",
      url: `${APP_PREFIX_PATH}/scheme-settings/users/add`,
    },
    {
      step: 1,
      label: "Groups",
      url: `${APP_PREFIX_PATH}/scheme-settings/users/add/groups`,
    },
    {
      step: 2,
      label: "Chat Groups",
      url: `${APP_PREFIX_PATH}/scheme-settings/users/add/chat-groups`,
    },
  ];

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Add User");
    location.pathname !== `${APP_PREFIX_PATH}/scheme-settings/users/add` &&
      history.push(`${APP_PREFIX_PATH}/scheme-settings/users/add`);
    return () => {
      setBottomNav(true);
      setTitle("");
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data: groupsData, loading: groupsLoading } = useQuery(GroupsQuery, {
    variables: {
      where: { scheme: { id: { equals: schemeId } } },
    },
    fetchPolicy: "cache-and-network",
  });

  const { data: chatsData, loading: chatsLoading } = useQuery(ChatsQuery, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // mutations
  // const [addUser] = useMutation(CreateUser, {
  //   onError: (error) => {
  //     if (
  //       error.message ===
  //       "GraphQL error: A unique constraint would be violated on User. Details: Field name = email"
  //     ) {
  //       history.push(steps[0].url);
  //       setStep(0);
  //       setUser({
  //         ...user,
  //         emailError: "A user already exists with this email address",
  //       });
  //     }
  //   },
  //   onCompleted: () => history.push("/admin/users/"),
  // });

  // functions
  const handleChange = (name) => (event) => {
    setUser({
      ...user,
      [name]: event.target.value,
    });
  };

  const toggleGroups = (group) => {
    groups.includes(group)
      ? setGroups(groups.filter((id) => id !== group))
      : setGroups([...groups, group]);
  };

  const toggleChats = (chat) => {
    chats.includes(chat)
      ? setChats(chats.filter((id) => id !== chat))
      : setChats([...chats, chat]);
  };

  const handleBack = () => {
    history.push(steps[step - 1].url);
    setStep(step - 1);
  };

  const validateUser = () =>
    new Promise((resolve, reject) => {
      const fullNameValid = !!user.fullName;
      const organisationValid = !!user.organisation;
      const roleValid = !!user.role;
      // make sure email matches anything@anything
      const emailValid = /^[^\s@]+@[^\s@]+$/.test(user.email);
      // validate({ email: user.email }, { email: { email: true } }) ===
      // undefined;

      setUser({
        ...user,
        fullNameError: fullNameValid ? "" : "This is a required field.",
        organisationError: organisationValid ? "" : "This is a required field.",
        roleError: roleValid ? "" : "This is a required field.",
        emailError: emailValid ? "" : "Please enter a valid email address.",
      });

      fullNameValid && organisationValid && roleValid && emailValid
        ? resolve()
        : reject();
    });

  const validateGroups = () =>
    new Promise((resolve, reject) => {
      groups.length > 0 ? resolve() : reject();
    });

  const handleSave = () => {
    validateUser()
      .then(() => {
        validateGroups()
          .then(() => {
            console.log("addUser:", user);
            // addUser({
            //   variables: {
            //     email: user.email,
            //     fullName: user.fullName,
            //     organisation: user.organisation,
            //     scheme: {
            //       create: {
            //         role: user.role,
            //         scheme: {
            //           connect: {
            //             id: window.localStorage.getItem("currentScheme"),
            //           },
            //         },
            //       },
            //     },
            //     groups: {
            //       connect: groups.map((id) => ({ id })),
            //     },
            //     chats: {
            //       create: chats.map((id) => ({
            //         chat: { connect: { id } },
            //       })),
            //     },
            //     addresses: {
            //       create: {
            //         primary: true,
            //         premises: user.premises,
            //         building: user.building,
            //         street: user.street,
            //         townCity: user.townCity,
            //         county: user.county,
            //         postcode: user.postcode,
            //       },
            //     },
            //   },
            // });
            history.push(`${APP_PREFIX_PATH}/scheme-settings/users`);
          })
          .catch(() => {
            history.push(`${APP_PREFIX_PATH}/scheme-settings/users/add/groups`);
            setStep(2);
          });
      })
      .catch(() => {
        history.push(`${APP_PREFIX_PATH}/scheme-settings/users/add`);
        setStep(1);
      });
  };

  const handleNext = async () => {
    if (step === 0) {
      validateUser()
        .then(() => {
          history.push(steps[step + 1].url);
          setStep(1);
        })
        .catch(() => {});
    } else if (step === 1) {
      validateGroups()
        .then(() => {
          history.push(steps[step + 1].url);
          setStep(2);
        })
        .catch(() => {});
    } else if (step === 2) {
      handleSave();
    }
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
                  path={`${APP_PREFIX_PATH}/scheme-settings/users/add`}
                  render={() => (
                    <Details
                      handleChange={handleChange}
                      user={user}
                      setBackLinkTo={setBackLinkTo}
                      // setNavbarAction={setNavbarAction}
                      setActiveStep={setStep}
                    />
                  )}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/scheme-settings/users/add/groups`}
                  render={() => (
                    <Groups
                      groups={groupsData.groups}
                      selectedGroups={groups}
                      loading={groupsLoading}
                      toggleSelectedGroups={toggleGroups}
                      setBackLinkTo={setBackLinkTo}
                      setActiveStep={setStep}
                      // setNavbarAction={setNavbarAction}
                    />
                  )}
                />
                <Route
                  path={`${APP_PREFIX_PATH}/scheme-settings/users/add/chat-groups`}
                  render={() => (
                    <ChatGroups
                      chatGroups={chatsData.chats}
                      selectedChatGroups={chats}
                      loading={chatsLoading}
                      toggleChatGroup={toggleChats}
                      setBackLinkTo={setBackLinkTo}
                      setActiveStep={setStep}
                      // setNavbarAction={setNavbarAction}
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
                    disabled={step === 1 && groups.length === 0}
                    onClick={handleNext}
                  >
                    {step === 2 ? "submit" : "next"}
                  </Button>
                </Actions>
              )}
              {!matches && (
                <FullWidthButton
                  text={step === 2 ? "submit" : "next"}
                  onClick={handleNext}
                  disabled={step === 1 && groups.length === 0}
                />
              )}
            </FormContainer>
          </Page>
        </Container>
      )}
    </MediaQuery>
  );
};

export default withRouter(withStyles(styles)(AddUser));
