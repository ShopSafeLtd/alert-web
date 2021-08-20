import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import MediaQuery from "react-responsive";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import IconButton from "@material-ui/core/IconButton";
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
import { Tag, Tags } from "graphql-src/tags/queries";
import { UpdateTag, DeleteTag } from "graphql-src/tags/mutations";
// import Update from '../../../graphql/offenderLabels/mutations/UpdateOffenderLabel';
// import DeleteMutation from '../../../graphql/admin/mutations/DeleteOffenderWarning';
import { Row, Section } from "../../global/layout";
// import query from '../../../graphql/admin/queries/OffenderWarning';
import ConfirmDialog from "../../global/ConfirmDialog/ConfirmDialog";
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
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

const EditOffenderWarnings = ({ setActions, match, history }) => {
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
  const [warning, setWarning] = useState({
    name: "",
    nameError: "",
    description: "",
    descriptionError: "",
  });
  const [deleteDialog, setDelete] = useState(false);

  // effects
  useEffect(() => {
    setBottomNav(false);
    setTitle("Edit Offender Warning");
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`);
    // setActions([
    //   <IconButton onClick={() => setDelete(true)} key="0">
    //     <Svg viewBox="0 0 24 24">
    //       <path
    //         fill="#EF5350"
    //         d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
    //       />
    //     </Svg>
    //   </IconButton>,
    // ]);
    return () => {
      setBottomNav(true);
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
      // setActions([]);
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { loading } = useQuery(Tag, {
    variables: {
      where: {
        id: match.params.id,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log(data);
      setWarning({
        ...warning,
        name: !!data && data.tag.name,
        description: !!data && data.tag.description,
      });
    },
  });

  // mutations
  const [updateWarning] = useMutation(UpdateTag);
  const [deleteOffenderWarning] = useMutation(DeleteTag, {
    update: (store, { data: { deleteTag } }) => {
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
          tags: data.tags.filter(({ id }) => id !== deleteTag.id),
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
        ...warning,
        nameError: !nameValid ? "This field is required" : "",
        descriptionError: !descriptionValid ? "This field is required" : "",
      });

      nameValid && descriptionValid ? resolve() : reject();
    });

  const handleSave = () => {
    validate()
      .then(async () => {
        await updateWarning({
          variables: {
            where: {
              id: match.params.id,
            },
            data: {
              name: { set: warning.name },
              description: { set: warning.description },
            },
          },
          optimisticResponse: {
            updateTag: {
              id: match.params.id,
              name: warning.name,
              description: warning.description,
              __typename: "OffenderWarning",
            },
          },
        });
        history.push(`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`);
      })
      .catch(() => {});
  };

  const handleDelete = async () => {
    await deleteOffenderWarning({
      variables: {
        where: {
          id: match.params.id,
        },
      },
      optimisticResponse: {
        deleteTag: {
          id: match.params.id,
          __typename: "OffenderWarning",
        },
      },
    });
    history.push(`${APP_PREFIX_PATH}/scheme-settings/offender-warnings`);
  };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    <Page>
      {/* {matches ? ( */}
      <Section width="100%" elevation={1}>
        <PageHeader>Edit Offender Warning</PageHeader>
        <HeaderSubText>
          Update the necessary fields for the offender warning.
        </HeaderSubText>
      </Section>
      {/* // ) : (
          //   <Header>
          //     <HeaderText>Edit Offender Warning</HeaderText>
          //     <HeaderSubText>
          //       Update the necessary fields for the offender warning.
          //     </HeaderSubText>
          //   </Header>
          // )} */}
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
              disabled={loading}
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
              disabled={loading}
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
      {/* ) : (
            <FullWidthButton
              text="Save Warning"
              onClick={handleSave}
              disabled={loading}
            />
          )} */}
      <ConfirmDialog
        open={deleteDialog}
        handleClose={() => setDelete(false)}
        title="Are you sure?"
        description="Deleting this offender warning will remove it permanently will also remove it from any offenders it's assigned to."
        actions={[
          <Button key={Math.random()} onClick={() => setDelete(false)}>
            Cancel
          </Button>,
          <Button key={Math.random()} onClick={handleDelete} color="primary">
            Delete
          </Button>,
        ]}
      />
    </Page>
    //   )}
    // </MediaQuery>
  );
};

export default EditOffenderWarnings;
