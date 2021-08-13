import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
// import { useQuery, useMutation } from '@apollo/react-hooks';
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { Header, HeaderText, HeaderSubText } from "../global/forms";
import { PageHeader } from "../global/typography";
import { FullWidthButton, BackButton } from "../global/actions";
// import mutation from '../../graphql/account/mutations/UpdateNotifications';
import { Row, Section } from "../global/layout";
// import query from '../../graphql/account/queries/Notifications';
import { useStoreActions, useStoreState } from "../../state";
import { Notifications } from "graphql-src/users/queries";
import { UpdateNotifications } from "graphql-src/users/mutations";

const Page = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media (min-width: 1024px) {
    background-color: none;
    padding: 0px 10px 20px;
  }
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 20px;
  @media (min-width: 1024px) {
    padding: 0px;
  }
`;
const Indent = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;
const Loading = styled(CircularProgress)`
  margin: 14px 10px 14px 0;
`;

const NotificationSettings = ({ history }) => {
  const id = useStoreState((state) => state.user.id);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  // state
  const [notifications, setNotifications] = useState({
    incident: false,
    incidentEmail: false,
    incidentPush: false,
    offender: false,
    offenderEmail: false,
    offenderPush: false,
    messagePush: false,
  });

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Notification Settings");
    // setNavbarAction("backLink");
    setBackLinkTo(`/account-settings`);
    return () => {
      setBottomNav(true);
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
    };
  });

  // queries
  const { loading } = useQuery(Notifications, {
    onCompleted: ({ currentUser }) => {
      setNotifications({
        ...notifications,
        incident:
          currentUser.incidentEmail || currentUser.incidentPush ? true : false,
        incidentEmail: currentUser.incidentEmail,
        incidentPush: currentUser.incidentPush,
        offender:
          !!currentUser.offenderEmail || currentUser.offenderPush
            ? true
            : false,
        offenderEmail: currentUser.offenderEmail,
        offenderPush: currentUser.offenderPush,
        messagePush: currentUser.messagePush,
      });
    },
  });

  // mutation
  const [updateNotificationSettings] = useMutation(UpdateNotifications);

  // functions
  const handleChange = (name) => (event) => {
    if (event.target.checked && name === "incident") {
      setNotifications({
        ...notifications,
        incident: true,
        incidentEmail: true,
        incidentPush: true,
      });
    } else if (!event.target.checked && name === "incident") {
      setNotifications({
        ...notifications,
        incident: false,
        incidentEmail: false,
        incidentPush: false,
      });
    } else if (event.target.checked && name === "offender") {
      setNotifications({
        ...notifications,
        offender: true,
        offenderEmail: true,
        offenderPush: true,
      });
    } else if (!event.target.checked && name === "offender") {
      setNotifications({
        ...notifications,
        offender: false,
        offenderEmail: false,
        offenderPush: false,
      });
    } else {
      setNotifications({
        ...notifications,
        [name]: event.target.checked,
      });
    }
  };

  const handleSave = () => {
    updateNotificationSettings({
      variables: {
        where: { id },
        data: {
          incidentEmail: { set: notifications.incidentEmail },
          incidentPush: { set: notifications.incidentPush },
          offenderEmail: { set: notifications.offenderEmail },
          offenderPush: { set: notifications.offenderPush },
          messagePush: { set: notifications.messagePush },
        },
      },
    });
    history.push("/");
  };

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Page>
          {matches ? (
            <Section width="100%" elevation={1}>
              <PageHeader>Notification Options</PageHeader>
              <HeaderSubText>
                Choose which notifications you wish to receive and how you want
                to receive them.
              </HeaderSubText>
            </Section>
          ) : (
            <Header>
              <HeaderText>Notification Options</HeaderText>
              <HeaderSubText>
                Choose which notifications you wish to receive and how you want
                to receive them.
              </HeaderSubText>
            </Header>
          )}
          <Section noPadding width="100%" elevation={1} grow>
            <Form>
              <div>
                <Typography variant="subtitle2">Incidents</Typography>
                <Indent>
                  <FormControlLabel
                    control={
                      loading ? (
                        <Loading size={24} />
                      ) : (
                        <Switch
                          checked={notifications.incident}
                          onChange={handleChange("incident")}
                          value="incident"
                        />
                      )
                    }
                    label="Receive notifications for new incidents"
                  />
                  {notifications.incident && (
                    <Indent>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.incidentEmail}
                            onChange={handleChange("incidentEmail")}
                            value="incidentEmail"
                          />
                        }
                        label="Email Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.incidentPush}
                            onChange={handleChange("incidentPush")}
                            value="incidentPush"
                          />
                        }
                        label="Push Notifications (Mobile App)"
                      />
                    </Indent>
                  )}
                </Indent>
              </div>
              <div>
                <Typography variant="subtitle2">Offenders</Typography>
                <Indent>
                  <FormControlLabel
                    control={
                      loading ? (
                        <Loading size={24} />
                      ) : (
                        <Switch
                          checked={notifications.offender}
                          onChange={handleChange("offender")}
                          value="offender"
                        />
                      )
                    }
                    label="Receive notifications for new offenders"
                  />
                  {notifications.offender && (
                    <Indent>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.offenderEmail}
                            onChange={handleChange("offenderEmail")}
                            value="offenderEmail"
                          />
                        }
                        label="Email Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.offenderPush}
                            onChange={handleChange("offenderPush")}
                            value="offenderPush"
                          />
                        }
                        label="Push Notifications (Mobile App)"
                      />
                    </Indent>
                  )}
                </Indent>
              </div>
              <div>
                <Typography variant="subtitle2">Messages</Typography>
                <Indent>
                  <FormControlLabel
                    control={
                      loading ? (
                        <Loading size={24} />
                      ) : (
                        <Switch
                          checked={notifications.messagePush}
                          onChange={handleChange("messagePush")}
                          value="messagePush"
                        />
                      )
                    }
                    label="Receive notifications for new messages"
                  />
                </Indent>
              </div>
            </Form>
          </Section>
          {matches ? (
            <Section width="100%" elevation={1}>
              <Row row right>
                <BackButton
                  component={Link}
                  to={`${APP_PREFIX_PATH}/user-settings`}
                  disabled={loading}
                >
                  Cancel
                </BackButton>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save Settings
                </Button>
              </Row>
            </Section>
          ) : (
            <FullWidthButton
              text="Save"
              disabled={loading}
              onClick={handleSave}
            />
          )}
        </Page>
      )}
    </MediaQuery>
  );
};

export default NotificationSettings;
