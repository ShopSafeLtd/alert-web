import React, { useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import Delete from "@material-ui/icons/Delete";

import { APP_PREFIX_PATH } from "configs/AppConfig";
import { Section } from "../../../../../global/layout";
import EditDetailsPopOver from "../EditDetailsPopOver/EditDetailsPopOver";
import EditUsersPopOver from "../EditUsersPopOver/EditUsersPopOver";
import Details from "../Details/Details";
import Users from "../Users/Users";
import { useStoreState } from "state";
import ConfirmDialog from "../../../../../global/ConfirmDialog/ConfirmDialog";
import { SchemeChats } from "graphql-src/chat/queries";
import { DeleteChat } from "graphql-src/chat/mutations";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  width: 100%;
  padding: 0px 10px 20px;
  display: flex;
  flex-direction: column;
`;
const SectionRow = styled.div`
  display: flex;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const GroupName = styled(Typography)`
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`;
const DeleteIcon = styled(Delete)`
  width: 18px;
  margin-right: 5px;
`;

const Desktop = ({ chat, chatId, loading }) => {
  const navigate = useNavigate()
  // state
  const [editDetails, setEditDetails] = useState(false);
  const [editUsers, setEditUsers] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);

  const [deleteChat] = useMutation(DeleteChat, {
    update: (store, { data: { deleteChat } }) => {
      const data = store.readQuery({
        query: SchemeChats,
        where: {
          scheme: { id: { equals: schemeId } },
        },
      });
      store.writeQuery({
        query: SchemeChats,
        data: {
          ...data,
          chats: data?.chats?.filter(({ id }) => id !== deleteChat.id),
        },
        where: {
          scheme: { id: { equals: schemeId } },
        },
      });
    },
  });

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
  };
  const handleOpenConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleDelete = () => {
    deleteChat({
      variables: { id: chatId },
      optimisticResponse: { deleteChat: { id: chatId } },
    });
    setConfirmDelete(false);
    navigate(`${APP_PREFIX_PATH}/scheme-settings/chat-groups`);
  };

  return (
    <Page>
      <Section width="100%" elevation={1}>
        <Row>
          <GroupName variant="h5">{chat !== undefined && chat.name}</GroupName>
          <Button
            disabled={false}
            color="primary"
            onClick={handleOpenConfirmDelete}
          >
            <DeleteIcon />
            Delete Chat Group
          </Button>
        </Row>
      </Section>
      <SectionRow>
        <Details
          chat={chat}
          loading={loading}
          openEdit={() => setEditDetails(true)}
        />
        <Users
          chat={chat}
          loading={loading}
          openEdit={() => setEditUsers(true)}
        />
      </SectionRow>

      <EditDetailsPopOver
        open={editDetails}
        close={() => setEditDetails(false)}
        chat={chatId}
      />
      <EditUsersPopOver
        open={editUsers}
        close={() => setEditUsers(false)}
        chat={chatId}
      />
      <ConfirmDialog
        open={confirmDelete}
        handleClose={handleCloseConfirmDelete}
        title="Are you sure?"
        description="Are you sure you want to delete this group? This action cannot be undone."
        actions={[
          <Button key={Math.random()} onClick={handleCloseConfirmDelete}>
            Cancel
          </Button>,
          <Button key={Math.random()} onClick={handleDelete} color="primary">
            Delete Group
          </Button>,
        ]}
      />
    </Page>
  );
};

export default Desktop;
