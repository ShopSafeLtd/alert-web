import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import { faExclamationCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Field,
  Header,
  HeaderText,
  HeaderSubText,
  FieldHeader,
  Select,
} from "../global/forms";
import { PageHeader } from "../global/typography";
import { FullWidthButton, BackButton } from "../global/actions";
import { DataRetentionSettings } from "graphql-src/schemes/queries";
import { UpdateDataRetentionSettings } from "graphql-src/schemes/mutations";
import { Row, Section } from "../global/layout";
import { useStoreActions, useStoreState } from "../../state";

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

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

const DropdownOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 200px;
`;

const BulletPoints = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 5%;
`;

const BulletItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0 12px 0;
`;

const Icon = ({ icon }) => (
  <FontAwesomeIcon
    icon={icon}
    style={{ fontSize: 22, marginRight: 10, color: "#EF5350" }}
  />
);

const DataRetention = ({ history }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [incidentRetention, setIncidentRetention] = useState(-1);
  const [offenderRetention, setOffenderRetention] = useState(-1);

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Data Retention Settings");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings`);
    return () => {
      setTitle("");
      setBackLinkTo("");
      setBottomNav(true);
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { loading } = useQuery(DataRetentionSettings, {
    variables: {
      id: schemeId,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: ({ scheme }) => {
      setIncidentRetention(scheme.incidentRetention);
      setOffenderRetention(scheme.offenderRetention);
    },
  });

  // mutations
  const [updateDataRetentionSettings] = useMutation(
    UpdateDataRetentionSettings
  );

  // functions
  const handleSave = () => {
    updateDataRetentionSettings({
      variables: {
        id: schemeId,
        incidentRetention: incidentRetention
          ? { set: incidentRetention }
          : { set: -1 },
        offenderRetention: incidentRetention
          ? { set: offenderRetention }
          : { set: -1 },
      },
      optimisticResponse: {
        updateScheme: {
          id: schemeId,
          incidentRetention,
          offenderRetention,
        },
      },
    });
    history.push(`${APP_PREFIX_PATH}/scheme-settings`);
  };

  const handleIncidentChange = (event) => {
    setIncidentRetention(event.target.value);
  };
  const handleOffendersChange = (event) => {
    setOffenderRetention(event.target.value);
  };

  const menuItems = [
    { value: -1, label: "Disabled" },
    { value: 91, label: "3 months" },
    { value: 183, label: "6 months" },
    { value: 365, label: "12 months" },
    { value: 547, label: "18 months" },
    { value: 730, label: "2 years" },
    { value: 1096, label: "3 years" },
    { value: 1826, label: "5 years" },
  ];

  return (
    <MediaQuery minDeviceWidth={1024}>
      {(matches) => (
        <Page>
          {matches ? (
            <Section width="100%" elevation={1}>
              <PageHeader>Data Retention</PageHeader>
              <HeaderSubText>
                Select a period of time to retain data before it is
                automatically deleted. You can also disable this feature and
                manually audit your data.
              </HeaderSubText>
            </Section>
          ) : (
            <Header>
              <HeaderText>Auto Approve Options</HeaderText>
              <HeaderSubText>
                Enabling auto approve will automatically approve any new
                incidents and offenders without manual approval.
              </HeaderSubText>
            </Header>
          )}
          <Section noPadding width="100%" elevation={1} grow>
            <Form>
              <OptionsContainer>
                <DropdownOptions>
                  <Field row left>
                    <FieldHeader required>Delete incidents after:</FieldHeader>
                    <Select
                      value={incidentRetention}
                      onChange={handleIncidentChange}
                      error={""}
                      helperText={""}
                      menuItems={menuItems}
                    />
                  </Field>
                  <Field row left>
                    <FieldHeader required>Delete offenders after:</FieldHeader>
                    <Select
                      value={offenderRetention}
                      onChange={handleOffendersChange}
                      error={""}
                      helperText={""}
                      menuItems={menuItems}
                    />
                  </Field>
                </DropdownOptions>
                <BulletPoints>
                  <BulletItem>
                    <Icon icon={faExclamationCircle} />
                    <div>
                      The selected period of time begins on the date that an
                      offender or incident was last updated.
                    </div>
                  </BulletItem>
                  <BulletItem>
                    <Icon icon={faExclamationCircle} />
                    <div>
                      Once this period has elapsed, the item will be transfered
                      to the recycle bin.
                    </div>
                  </BulletItem>

                  <BulletItem>
                    <Icon icon={faExclamationCircle} />
                    <div>
                      It will remain in the recycle bin for 30 days before being
                      permanently deleted.
                    </div>
                  </BulletItem>
                </BulletPoints>
              </OptionsContainer>
              <div>
                In accordance with your data protection obligations, data must
                only be retained for as long as it is relevant. It is your
                responsibility to determine that period of time.
              </div>
              <div>
                <strong>
                  If you elect to disable auto-deletion, you must manually
                  remove data which is no longer relevant.
                </strong>
              </div>
            </Form>
          </Section>
          {matches ? (
            <Section width="100%" elevation={1}>
              <Row row right>
                <BackButton
                  component={Link}
                  to={`${APP_PREFIX_PATH}/scheme-settings`}
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

export default DataRetention;
