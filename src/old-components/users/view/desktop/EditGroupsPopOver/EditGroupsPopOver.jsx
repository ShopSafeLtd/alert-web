import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
// import { useQuery, useMutation } from '@apollo/react-hooks';
import { useQuery, useMutation } from "@apollo/client";

import { useStoreState } from "state";
import { PopOver, PopOverContainer } from "../../../../global/layout";
import { BackButton } from "../../../../global/actions";
import { EmptyText, ErrorText } from "../../../../global/typography";
import GroupImage from "../../../../../images/AddGroup";
import Typography from "@material-ui/core/Typography";
import { ViewUser } from "graphql-src/users/queries/view-user";
import { Groups } from "graphql-src/groups/queries";
import { EditUserGroups } from "graphql-src/users/mutations";
// import UserQuery from '../../../../../graphql/users/queries/User';
// import AllGroups from '../../../../../graphql/groups/AllGroupsQuery';
// import UserMutation from '../../../../../graphql/users/mutations/UpdateUser';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const List = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 10px;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;

const EditGroupsPopOver = ({ user: userId, close, open }) => {
  // state
  const [userGroups, setUserGroups] = useState(undefined);
  const [groups, setGroups] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);
  const [error, setError] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);

  const { data: groupsData, loading: groupsLoading } = useQuery(Groups, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
      },
    },
  });

  const { loading: userLoading } = useQuery(ViewUser, {
    variables: {
      id: userId,
    },
    onCompleted: (res) => {
      if (!res) return;
      const output = { ...res.user };
      output.groups = output.groups.filter((el) => el.scheme.id === schemeId);
      output.chats = output.chats.filter(
        (el) => el.chat.scheme.id === schemeId
      );
      output.schemes = output.schemes.filter((el) => el.schemeId === schemeId);
      setGroups(output.groups.map(({ id }) => id));
      setUserGroups(output.groups);
    },
  });

  // mutations
  const [updateUser] = useMutation(EditUserGroups, {});

  // functions
  const toggleSelectedGroups = (group) => {
    if (!add.includes(group) && !groups.includes(group)) {
      setGroups((prev) => [...prev, group]);
      setAdd((prev) => [...prev, group]);
      setRemove((prev) => prev.filter((el) => el !== group));
    } else if (!remove.includes(group)) {
      setGroups((prev) => prev.filter((el) => el !== group));
      setRemove((prev) => [...prev, group]);
      setAdd((prev) => prev.filter((el) => el !== group));
    }
  };

  const handleSave = () => {
    if (groups?.length > 0) {
      const connect = add
        .filter((el) => !userGroups.find((e) => e.id === el))
        .map((id) => ({ id }));
      const disconnect = remove
        .filter((el) => userGroups.find((e) => e.id === el))
        .map((id) => ({ id }));

      updateUser({
        variables: {
          id: userId,
          groups: {
            connect: connect.length > 0 ? connect : undefined,
            disconnect: disconnect.length > 0 ? disconnect : undefined,
          },
        },
      });

      setUserGroups((prev) => {
        return [
          ...prev.filter((el) => !disconnect.find((e) => e.id === el.id)),
          ...groupsData.groups.filter((el) => {
            return (
              connect.find((e) => e.id === el.id) &&
              !disconnect.find((e) => e.id === el.id)
            );
          }),
        ];
      });
      close();
    } else {
      setError(true);
    }
  };

  const loading = userLoading || groupsLoading;

  return (
    <PopOver
      noPadding
      open={open}
      width={500}
      handleClose={close}
      title="Edit User's Groups"
      actions={[
        <BackButton key={0} disabled={loading} color="primary" onClick={close}>
          Close
        </BackButton>,
        <Button
          key={1}
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          Save Groups
        </Button>,
      ]}
    >
      {error && <ErrorText>Please select at least one group.</ErrorText>}
      <Grow>
        <PopOverContainer>
          {!loading && groupsData?.groups.length > 0 ? (
            <List>
              {groupsData?.groups.map(({ id, name }) => (
                <ListItem key={id} onClick={() => toggleSelectedGroups(id)}>
                  <Svg viewBox="0 0 24 24">
                    <path
                      fill={groups.includes(id) ? "#1E88E5" : "#E0E0E0"}
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                    />
                  </Svg>
                  <ItemText>{name}</ItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <Center>
              <GroupImage width="80px" height="80px" />
              <EmptyText>No Groups in Scheme</EmptyText>
            </Center>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditGroupsPopOver;
