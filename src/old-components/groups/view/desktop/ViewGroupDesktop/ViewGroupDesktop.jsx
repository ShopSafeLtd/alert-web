import React, { useState } from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { Section } from "../../../../global/layout";
import EditDetailsPopOver from "../EditDetailsPopOver/EditDetailsPopOver";
import EditUsersPopOver from "../EditUsersPopOver/EditUsersPopOver";
import Details from "../Details/Details";
import Users from "../Users/Users";
import Delete from "@material-ui/icons/Delete";
import ConfirmDialog from "../../../../global/ConfirmDialog/ConfirmDialog";
import { DeleteGroup } from "graphql-src/groups/mutations";
import { Groups } from "graphql-src/groups/queries";
import { useStoreState } from "state";
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

const ViewGroupDesktop = ({ group, groupId, loading }) => {
  const navigate = useNavigate()
  // state
  const [editDetails, setEditDetails] = useState(false);
  const [editUsers, setEditUsers] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);

  const [deleteGroup] = useMutation(DeleteGroup, {
    update: (store, { data: { deleteGroup } }) => {
      const data = store.readQuery({
        query: Groups,
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
          },
        },
      });
      store.writeQuery({
        query: Groups,
        data: {
          ...data,
          groups: data.groups.filter(({ id }) => id !== deleteGroup.id),
        },
        variables: {
          where: {
            scheme: { id: { equals: schemeId } },
          },
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
    deleteGroup({
      variables: {
        id: groupId,
      },
      optimisticResponse: { deleteGroup: { id: groupId } },
    });
    setConfirmDelete(false);
    navigate(`${APP_PREFIX_PATH}/scheme-settings/groups`);
  };

  return (
    <Page>
      <Section width="100%" elevation={1}>
        <Row>
          <GroupName variant="h5">
            {group !== {} || group !== undefined ? group[0]?.name : null}
          </GroupName>
          <Button
            disabled={false}
            color="primary"
            onClick={handleOpenConfirmDelete}
          >
            <DeleteIcon />
            Delete Group
          </Button>
        </Row>
      </Section>
      <SectionRow>
        <Details
          group={group[0]}
          loading={loading}
          openEdit={() => setEditDetails(true)}
        />
        <Users
          group={group[0]}
          loading={loading}
          openEdit={() => setEditUsers(true)}
        />
      </SectionRow>

      <EditDetailsPopOver
        open={editDetails}
        close={() => setEditDetails(false)}
        group={groupId}
      />
      <EditUsersPopOver
        open={editUsers}
        close={() => setEditUsers(false)}
        group={groupId}
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

export default ViewGroupDesktop;
