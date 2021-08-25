import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MediaQuery from "react-responsive";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { Field, Header, HeaderText, HeaderSubText } from "../global/forms";
import { PageHeader } from "../global/typography";
import { FullWidthButton, BackButton } from "../global/actions";
import { AutoApprove as AutoApproveQuery } from "graphql-src/schemes/queries";
import { UpdateAutoApprove } from "graphql-src/schemes/mutations";
// import UpdateAutoApprove from '../../graphql/admin/mutations/UpdateAutoApprove';
import { Row, Section } from "../global/layout";
// import query from '../../graphql/admin/queries/AutoApprove';
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
const Indent = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

const AutoApprove = ({ history }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [autoApprove, setAutoApprove] = useState({
    autoApprove: false,
    autoApproveIncidents: false,
    autoApproveOffenders: false,
  });

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Auto Approve Options");
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings`);
    return () => {
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
      setBottomNav(true);
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { loading } = useQuery(AutoApproveQuery, {
    variables: {
      where: {
        id: schemeId,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      setAutoApprove({
        autoApprove:
          data.scheme.autoApproveIncidents || data.scheme.autoApproveOffenders
            ? true
            : false,
        autoApproveIncidents: data.scheme.autoApproveIncidents,
        autoApproveOffenders: data.scheme.autoApproveOffenders,
      }),
  });

  // mutations
  const [updateAutoApprove] = useMutation(UpdateAutoApprove);

  // functions
  const handleChange = (name) => (event) => {
    if (event.target.checked && name === "autoApprove") {
      setAutoApprove({
        autoApprove: true,
        autoApproveOffenders: true,
        autoApproveIncidents: true,
      });
    } else if (!event.target.checked && name === "autoApprove") {
      setAutoApprove({
        autoApprove: false,
        autoApproveOffenders: false,
        autoApproveIncidents: false,
      });
    } else {
      setAutoApprove({ ...autoApprove, [name]: event.target.checked });
    }
  };

  const handleSave = () => {
    console.log(autoApprove);
    updateAutoApprove({
      variables: {
        where: {
          id: schemeId,
        },
        data: {
          autoApproveIncidents: { set: autoApprove.autoApproveIncidents },
          autoApproveOffenders: { set: autoApprove.autoApproveOffenders },
        },
      },
      optimisticResponse: {
        updateScheme: {
          id: schemeId,
          autoApproveIncidents: autoApprove.autoApproveIncidents,
          autoApproveOffenders: autoApprove.autoApproveOffenders,
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
              <PageHeader>Auto Approve Options</PageHeader>
              <HeaderSubText>
                Enabling auto approve will automatically approve any new
                incidents and offenders without manual approval.
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
              <Field>
                <Indent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={autoApprove.autoApprove}
                        onChange={handleChange("autoApprove")}
                        value="autoApprove"
                        disabled={loading}
                      />
                    }
                    label="Auto Approve"
                  />
                  {autoApprove.autoApprove && (
                    <Indent>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoApprove.autoApproveIncidents}
                            onChange={handleChange("autoApproveIncidents")}
                            value="autoApproveIncidents"
                            disabled={loading}
                          />
                        }
                        label="Auto Approve Incidents"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoApprove.autoApproveOffenders}
                            onChange={handleChange("autoApproveOffenders")}
                            value="autoApproveOffenders"
                            disabled={loading}
                          />
                        }
                        label="Auto Approve Offenders"
                      />
                    </Indent>
                  )}
                </Indent>
              </Field>
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
                  Save Warning
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

export default AutoApprove;
