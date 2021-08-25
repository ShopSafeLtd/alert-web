import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useQuery, useMutation } from "@apollo/client";

import { PopOver, PopOverContainer } from "../../../../../global/layout";
import { BackButton } from "../../../../../global/actions";
import { Field, FieldHeader } from "../../../../../global/forms";
import { ViewChat } from "graphql-src/chat/queries";
import { UpdateChat } from "graphql-src/chat/mutations";
// import ChatGroupMutation from '../../../../../../graphql/admin/mutations/UpdateChatGroup';
// import ChatQuery from '../../../../../../graphql/admin/queries/ChatGroup';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

const EditDetailsPopOver = ({ chat, open, close }) => {
  // state
  const [details, setDetails] = useState({
    name: "",
    nameError: "",
    description: "",
  });

  // queries
  const { data, loading } = useQuery(ViewChat, {
    variables: {
      where: {
        id: chat,
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) =>
      setDetails({
        name: data.chat.name,
        description: data.chat.description,
      }),
  });

  // mutations
  const [updateChat] = useMutation(UpdateChat);

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
        : setDetails({ ...details, nameError: "This is a required field" });
      nameValid ? resolve() : reject();
    });

  const handleSave = () => {
    validate()
      .then(() => {
        updateChat({
          variables: {
            where: {
              id: chat,
            },
            data: {
              name: { set: details.name },
              description: { set: details.description },
            },
          },
          optimisticResponse: {
            updateChat: {
              ...data.chat,
              name: details.name,
              description: details.description,
            },
          },
        });
        close();
      })
      .catch(() => {});
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
            <FieldHeader required>Chat Group Name</FieldHeader>
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
