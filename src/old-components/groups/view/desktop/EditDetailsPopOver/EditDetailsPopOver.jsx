import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useQuery, useMutation } from "@apollo/client";

import { PopOver, PopOverContainer } from "../../../../global/layout";
import { BackButton } from "../../../../global/actions";
import { Field, FieldHeader } from "../../../../global/forms";
import { Groups } from "graphql-src/groups/queries";
import { UpdateGroup } from "graphql-src/groups/mutations";
// import GroupQuery from '../../../../../graphql/groups/queries/Group';
// import GroupMutation from '../../../../../graphql/groups/mutations/UpdateGroup';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const EditDetailsPopOver = ({ open, close, group }) => {
  // state
  const [details, setDetails] = useState({
    name: "",
    nameError: "",
    description: "",
  });

  // queries
  const { data, loading } = useQuery(Groups, {
    variables: {
      where: {
        id: {
          equals: group,
        },
      },
    },
    onCompleted: (data) =>
      setDetails({
        name: data.groups[0].name,
        description: data.groups[0].description,
      }),
  });

  // mutation
  const [updateGroup] = useMutation(UpdateGroup);

  // functions
  const handleChange = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };

  const validate = () =>
    new Promise((resolve, reject) => {
      const nameValid = !!details.name;
      nameValid
        ? setDetails({ ...details, nameError: "" })
        : setDetails({ ...details, nameError: "This is a required field." });
      nameValid ? resolve() : reject();
    });

  const handleSave = () => {
    validate()
      .then(() => {
        updateGroup({
          variables: {
            where: {
              id: group,
            },
            data: {
              name: { set: details.name },
              description: { set: details.description },
            },
          },
          optimisticResponse: {
            updateGroup: {
              ...data.group,
              name: details.name,
              description: details.description,
            },
          },
        });
      })
      .catch(() => {});
    close();
  };

  return (
    <PopOver
      noPadding
      open={open}
      width={800}
      handleClose={close}
      title={"Edit User Details"}
      actions={[
        <BackButton disabled={loading} color="primary" onClick={close}>
          Close
        </BackButton>,
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save
        </Button>,
      ]}
    >
      <Grow>
        <PopOverContainer>
          <Field>
            <FieldHeader required>Group Name</FieldHeader>
            <TextField
              value={details.name}
              onChange={handleChange("name")}
              error={!!details.nameError}
              helperText={details.nameError}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              value={details.description}
              onChange={handleChange("description")}
              fullWidth
              multiline
              rows="6"
            />
          </Field>
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditDetailsPopOver;
