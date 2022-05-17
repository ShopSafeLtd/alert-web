import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
// import { useMutation } from '@apollo/react-hooks';
import { useMutation } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import EditDetailsPopOver from "../EditDetailsPopOver/EditDetailsPopOver";
import EditGroupsPopOver from "../EditGroupsPopOver/EditGroupsPopOver";
import EditChatsPopOver from "../EditChatsPopOver/EditChatsPopOver";
import ConfirmDialog from "../../../../global/ConfirmDialog/ConfirmDialog";
import {
  UpdateUserDisabled,
  SendInvite,
  DeleteUserFromScheme,
} from "graphql-src/users/mutations";
import { SchemeUsers } from "graphql-src/users/queries";
// import ToggleUser from '../../../../../graphql/users/mutations/ToggleUser';
// import DeleteUser from '../../../../../graphql/users/mutations/DeleteUser';
// import SendInvite from '../../../../../graphql/users/mutations/SendInvite';
// import AllUsers from '../../../../../graphql/users/queries/AllUsersQuery';
import { useStoreState } from "state";

// section imports
import Details from "../Details/Details";
import Groups from "../Groups/Groups";
import ChatGroups from "../ChatsGroups/ChatGroups";
import Header from "../Header/Header";
import UserActions from "../UserActions/UserActions";
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

const ViewUserDesktop = ({
  user,
  userLoading,
  auth0User,
  userId,
  isCurrent,
}) => {
  const navigate = useNavigate()
  // state
  const [enable, setEnable] = useState(false);
  const [disable, setDisable] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editGroups, setEditGroups] = useState(false);
  const [editChats, setEditChats] = useState(false);
  const [remove, setRemove] = useState(false);
  const [invite, setInvite] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);

  // mutations
  const [updateUser] = useMutation(UpdateUserDisabled);
  const [sendInvite] = useMutation(SendInvite);
  const [deleteUser] = useMutation(DeleteUserFromScheme, {
    update: (store, { data }) => {
      const res = store.readQuery({
        query: SchemeUsers,
        variables: {
          scheme: schemeId,
          search: "",
          orderByName: "asc",
        },
      });
      if (!res || !data) return;
      store.writeQuery({
        query: SchemeUsers,
        data: {
          ...data,
          users: res.users.filter(
            (el) => el.id !== data?.deleteUserFromScheme?.id
          ),
        },
        variables: {
          scheme: schemeId,
          search: "",
          orderByName: "asc",
        },
      });
    },
  });

  // functions
  const handleToggle = () => {
    updateUser({
      variables: {
        where: {
          id: user.id,
        },
        data: {
          disabled: { set: disable ? true : false },
        },
      },
      optimisticResponse: {
        updateUser: {
          id: user.id,
          disabled: user.disabled,
          __typename: "User",
        },
      },
    });
    setEnable(false);
    setDisable(false);
  };
  const handleDelete = () => {
    deleteUser({
      variables: {
        id: user.id,
        scheme: schemeId,
      },
      optimisticResponse: {
        deleteUserFromScheme: {
          id: user.id,
          __typename: "User",
        },
      },
    });
    setRemove(false);
    navigate(`${APP_PREFIX_PATH}/scheme-settings/users`);
  };
  const handleInvite = () => {
    sendInvite({
      variables: {
        id: user.id,
      },
      optimisticResponse: {
        sendInvite: {
          id: user.id,
          newUser: true,
          __typename: "User",
        },
      },
    });
    setInvite(false);
  };

  return (
    <Page>
      <Header
        user={user}
        disableUser={() => setDisable(true)}
        enableUser={() => setEnable(true)}
        remove={() => setRemove(true)}
        isCurrent={isCurrent}
        sendInvite={() => setInvite(true)}
      />
      <SectionRow>
        <Details
          user={user}
          userLoading={userLoading}
          openEdit={() => setEditDetails(true)}
        />
        <Groups
          user={user}
          userLoading={userLoading}
          openEdit={() => setEditGroups(true)}
        />
      </SectionRow>
      <SectionRow>
        <ChatGroups
          user={user}
          userLoading={userLoading}
          openEdit={() => setEditChats(true)}
        />
        <UserActions auth0User={auth0User} />
      </SectionRow>
      <EditDetailsPopOver
        open={editDetails}
        user={userId}
        close={() => setEditDetails(false)}
      />
      <EditGroupsPopOver
        open={editGroups}
        user={userId}
        close={() => setEditGroups(false)}
      />
      <EditChatsPopOver
        open={editChats}
        user={userId}
        close={() => setEditChats(false)}
      />

      <ConfirmDialog
        open={disable || enable}
        handleClose={() => (disable ? setDisable(false) : setEnable(true))}
        title="Are you sure?"
        description={
          disable
            ? `Disabling this user will prevent them from logging into alert but will not delete them or any content they have added.`
            : `Enabling this user will allow them to log back into the system.`
        }
        actions={[
          <Button
            key={Math.random()}
            onClick={() => (disable ? setDisable(false) : setEnable(false))}
          >
            Cancel
          </Button>,
          <Button key={Math.random()} onClick={handleToggle} color="primary">
            {disable ? "Disable" : "Enable"}
          </Button>,
        ]}
      />
      <ConfirmDialog
        open={remove}
        handleClose={() => setRemove(false)}
        title="Are you sure?"
        description="Deleting this user will remove them from the scheme and any groups, it will not remove any content that they have submitted. This action can not be undone."
        actions={[
          <Button key={Math.random()} onClick={() => setRemove(false)}>
            Cancel
          </Button>,
          <Button key={Math.random()} onClick={handleDelete} color="primary">
            Delete User
          </Button>,
        ]}
      />
      <ConfirmDialog
        open={invite}
        handleClose={() => setInvite(false)}
        title="Are you sure?"
        description="Resending the invite will reset the users password and send them an new invite containing the new password."
        actions={[
          <Button key={Math.random()} onClick={() => setInvite(false)}>
            Cancel
          </Button>,
          <Button key={Math.random()} onClick={handleInvite} color="primary">
            Invite User
          </Button>,
        ]}
      />
    </Page>
  );
};

export default ViewUserDesktop;
