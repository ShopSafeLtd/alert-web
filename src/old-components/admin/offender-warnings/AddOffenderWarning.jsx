import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import {
  Field,
  FieldHeader,
  Header,
  HeaderText,
  HeaderSubText,
} from "../../global/forms";
import { PageHeader } from "../../global/typography";
import { FullWidthButton, BackButton } from "../../global/actions";
import { Row, Section } from "../../global/layout";
import { Tags } from "graphql-src/tags/queries";
import { CreateTag } from "graphql-src/tags/mutations";
// import mutation from '../../../graphql/admin/mutations/AddOffenderWarning';
// import AllOffenderLabels from '../../../graphql/offenderLabels/queries/AllOffenderLabels';
import { useStoreActions, useStoreState } from "../../../state";

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

const AddOffenderWarning = ({ history }) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  const setBottomNav = useStoreActions((actions) => actions.theme.setBottomNav);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const user = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);

  // state
  const [warning, setWarning] = useState({
    name: "",
    nameError: "",
    description: "",
    descriptionError: "",
  });

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Add Offender Warning");
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`);
    return () => {
      setBottomNav(true);
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  // mutations
  const [addWarning] = useMutation(CreateTag, {
    update: (store, { data: { createTag } }) => {
      let data = store.readQuery({
        query: Tags,
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
            dataType: "OFFENDER",
          },
        },
      });
      store.writeQuery({
        query: Tags,
        data: {
          ...data,
          tags: [...data.tags, createTag],
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
            dataType: "OFFENDER",
          },
        },
      });
    },
  });

  // functions
  const handleChange = (value, field) => {
    setWarning({
      ...warning,
      [field]: value,
    });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!warning.name;
      const descriptionValid = !!warning.description;

      setWarning({
        nameError: nameValid ? "" : "This field is required",
        descriptionError: descriptionValid ? "" : "This field is required",
      });

      nameValid && descriptionValid ? resolve() : reject();
    });

  const submit = () => {
    validate()
      .then(async () => {
        await addWarning({
          variables: {
            data: {
              name: warning.name,
              description: warning.description,
              scheme: {
                connect: { id: schemeId },
              },
              dataType: "OFFENDER",
              createdBy: {
                connect: {
                  id: user,
                },
              },
            },
          },
        });
        history.push(`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`);
      })
      .catch(() => {});
  };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    <Page>
      {/* {matches ? ( */}
      <Section width="100%" elevation={1}>
        <PageHeader>Add Offender Warning</PageHeader>
        <HeaderSubText>
          Offender warnings are added to offenders to highlight important things
          about them, for example that the are like that they are prone to
          violence.
        </HeaderSubText>
      </Section>
      {/* ) : (
            <Header>
              <HeaderText>Add Offender Warning</HeaderText>
              <HeaderSubText>
                Offender warnings are added to offenders to highlight important
                things about them, for example that the are like that they are
                prone to violence.
              </HeaderSubText>
            </Header>
          )} */}
      <Section noPadding width="100%" elevation={1} grow>
        <Form>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              value={warning.name}
              error={!!warning.nameError}
              helperText={warning.nameError}
              onChange={(e) => handleChange(e.target.value, "name")}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              value={warning.description}
              error={!!warning.descriptionError}
              helperText={warning.descriptionError}
              onChange={(e) => handleChange(e.target.value, "description")}
              fullWidth
              multiline
              rows="5"
            />
          </Field>
        </Form>
      </Section>
      {/* {matches ? ( */}
      <Section width="100%" elevation={1}>
        <Row row right>
          <BackButton
            component={Link}
            to={`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`}
          >
            Cancel
          </BackButton>
          <Button variant="contained" color="primary" onClick={submit}>
            Submit
          </Button>
        </Row>
      </Section>
      {/* ) : (
            <FullWidthButton text="Submit" onClick={submit} />
          )} */}
    </Page>
    //   )}
    // </MediaQuery>
  );
};

export default AddOffenderWarning;
