import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";
import { Route } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { BackButton, FullWidthButton } from "../../../global/actions";
import { SchemeUsers } from "graphql-src/users/queries";
import { CreateChat } from "graphql-src/chat/mutations";
// import AllChatGroups from '../../../../graphql/admin/queries/AllChatGroups';
// import UsersQuery from '../../../../graphql/users/queries/AllUsersQuery';
// import mutation from '../../../../graphql/admin/mutations/AddChatGroup';
import Details from "./Details/Details";
import Users from "./Users/Users";
import { useStoreActions, useStoreState } from "../../../../state";

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

const AddChatGroup = ({ location, history }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setTitle);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const setSearch = useStoreActions((actions) => actions.theme.setSearch);
  const setSearchText = useStoreActions(
    (actions) => actions.theme.setSearchText
  );
  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [details, setDetails] = useState({
    name: "",
    nameError: "",
    description: "",
  });
  const [members, setMembers] = useState([]);
  const [step, setStep] = useState(0);

  const steps = [
    {
      step: 0,
      label: "Chat Name",
      url: `${APP_PREFIX_PATH}/scheme-settings/chat-groups/add`,
    },
    {
      step: 0,
      label: "Users",
      url: `${APP_PREFIX_PATH}/scheme-settings/chat-groups/add/users`,
    },
  ];

  // effects
  // useEffect(() => {
  //   setTitle("Add Chat Group");
  //   setBottomNav(false);
  //   location.pathname !==
  //     `${APP_PREFIX_PATH}/scheme-settings/chat-groups/add` &&
  //     history.push(`${APP_PREFIX_PATH}/scheme-settings/chat-groups/add`);
  //   return () => {
  //     setTitle("");
  //     setBottomNav(true);
  //   };
  //   // eslint-disable-next-line
  // }, []);

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
  const [createChat] = useMutation(CreateChat, {
    // update: (store, { data: { createChat } }) => {
    //   let data = store.readQuery({
    //     query: AllChatGroups,
    //     variables: {
    //       search: "",
    //       schemeId: window.localStorage.getItem("currentScheme"),
    //     },
    //   });
    //   data.chats = [...data.chats, createChat];
    //   store.writeQuery({
    //     query: AllChatGroups,
    //     data,
    //     variables: {
    //       search: "",
    //       schemeId: window.localStorage.getItem("currentScheme"),
    //     },
    //   });
    // },
  });

  // functions
  const handleChange = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };

  const toggleSelectedMembers = (member) => {
    members.includes(member)
      ? setMembers(members.filter((id) => member !== id))
      : setMembers([...members, member]);
  };

  const handleBack = () => {
    history.push(steps[step - 1].url);
    setStep(step - 1);
  };

  const validateDetails = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!details.name;
      !nameValid
        ? setDetails({ ...details, nameError: "This field is required" })
        : setDetails({ ...details, nameError: "" });
      nameValid ? resolve() : reject();
    });

  const handleNext = () => {
    if (step === 0) {
      validateDetails()
        .then(() => {
          history.push(steps[step + 1].url);
        })
        .catch(() => {});
    } else if (step === 1) {
      console.log(members);

      const connect = members.map((id) => {
        return {
          user: {
            connect: {
              id,
            },
          },
        };
      });

      createChat({
        variables: {
          data: {
            name: details.name,
            description: details.description,
            scheme: {
              connect: { id: schemeId },
            },
            members: {
              create: connect.length > 0 ? connect : undefined,
            },
          },
        },
        optimisticResponse: {
          createChat: {
            id: 0,
            name: details.name,
            description: details.description,
            __typename: "Chat",
          },
        },
      });
      history.push(`${APP_PREFIX_PATH}/scheme-settings/chat-groups`);
    }
  };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    <Container>
      <Page>
        <FormContainer elevation={1}>
          {/* {matches && ( */}
          <Stepper activeStep={step} alternativeLabel>
            {steps.map(({ label, step }) => (
              <Step key={step}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* )} */}
          <Content>
            <Route
              exact
              path={`${APP_PREFIX_PATH}/scheme-settings/chat-groups/add`}
              render={() => (
                <Details
                  handleChange={handleChange}
                  name={details.name}
                  nameError={details.nameError}
                  description={details.description}
                  setBackLinkTo={setBackLinkTo}
                  // setNavbarAction={setNavbarAction}
                  setActiveStep={setStep}
                />
              )}
            />
            <Route
              path={`${APP_PREFIX_PATH}/scheme-settings/chat-groups/add/users`}
              render={() => (
                <Users
                  users={data?.users}
                  selectedUsers={members}
                  loading={loading}
                  toggleSelectedUsers={toggleSelectedMembers}
                  setBackLinkTo={setBackLinkTo}
                  setActiveStep={setStep}
                  // setNavbarAction={setNavbarAction}
                  setSearchText={setSearchText}
                  setSearch={setSearch}
                />
              )}
            />
          </Content>
          {/* {matches && ( */}
          <Actions>
            {step !== 0 && <BackButton onClick={handleBack}>Back</BackButton>}
            <Button variant="contained" color="primary" onClick={handleNext}>
              {step !== 0 ? "submit" : "next"}
            </Button>
          </Actions>
          {/* )} */}
          {/* {!matches && (
            <FullWidthButton
              text={step !== 0 ? "submit" : "next"}
              onClick={handleNext}
              disabled={loading}
            />
          )} */}
        </FormContainer>
      </Page>
    </Container>
    //   )}
    // </MediaQuery>
  );
};

export default AddChatGroup;
