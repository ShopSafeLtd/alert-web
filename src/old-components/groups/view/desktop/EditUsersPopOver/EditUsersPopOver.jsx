import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useQuery, useMutation } from "@apollo/client";

import { PopOver, PopOverContainer } from "../../../../global/layout";
import { EmptyText } from "../../../../global/typography";
import { BackButton } from "../../../../global/actions";
import GroupImage from "../../../../../images/AddGroup";
import { SchemeUsers } from "graphql-src/users/queries";
import { Groups } from "graphql-src/groups/queries";
import { UpdateGroup } from "graphql-src/groups/mutations";
// import AllUsersQuery from '../../../../../graphql/users/queries/AllUsersQuery';
// import GroupQuery from '../../../../../graphql/groups/queries/Group';
// import GroupMutation from '../../../../../graphql/groups/mutations/UpdateGroup';
import { useStoreState } from "state";

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
const Org = styled(Typography)`
  font-style: italic;
  margin-left: 3px;
  display: inline;
`;

const EditUsersPopOver = ({ open, close, group }) => {
  // state
  const [groupUsers, setGroupUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);

  const schemeId = useStoreState((state) => state.scheme.id);

  // queries
  const { data: usersData, loading: usersLoading } = useQuery(SchemeUsers, {
    variables: {
      scheme: schemeId,
      search: "",
      orderByName: "asc",
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: groupData,
    loading: groupLoading,
    refetch,
  } = useQuery(Groups, {
    notifyOnNetworkStatusChange: true,
    variables: {
      where: {
        id: { equals: group },
      },
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setUsers(data.groups[0]?.users.map(({ id }) => id));
      setGroupUsers(data.groups[0]?.users.map(({ id }) => id));
    },
  });

  // mutations
  const [updateGroup] = useMutation(UpdateGroup, {
    onCompleted: () => refetch(),
  });

  // functions
  const toggleSelectedUsers = (user) => {
    if (users.includes(user)) {
      setUsers(users.filter((id) => id !== user));
      setAdd(add.filter((id) => id !== user));
      groupData.groups[0]?.users.map(({ id }) => id).includes(user) &&
        setRemove([...remove, user]);
    } else {
      setUsers([...users, user]);
      !groupData.groups[0]?.users.map(({ id }) => id).includes(user) &&
        setAdd([...add, user]);
      setRemove(remove.filter((id) => id !== user));
    }
  };

  const handleSave = () => {
    const connect = add
      .filter((el) => !groupUsers.includes(el))
      .map((id) => ({ id }));
    const disconnect = remove
      .filter((el) => groupUsers.includes(el))
      .map((id) => ({ id }));

    updateGroup({
      variables: {
        where: { id: group },
        data: {
          users: {
            connect: connect.length > 0 ? connect : undefined,
            disconnect: disconnect.length > 0 ? disconnect : undefined,
          },
        },
      },
    });
    close();
  };

  const loading = usersLoading || groupLoading;

  return (
    <PopOver
      noPadding
      open={open}
      width={500}
      handleClose={close}
      title={"Edit Group's Users"}
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
          Save Group
        </Button>,
      ]}
    >
      <Grow>
        <PopOverContainer>
          {!loading && usersData?.users?.length > 0 ? (
            <List>
              {usersData?.users?.map(({ id, fullName, organisation }) => (
                <ListItem key={id} onClick={() => toggleSelectedUsers(id)}>
                  <Svg viewBox="0 0 24 24">
                    <path
                      fill={users?.includes(id) ? "#1E88E5" : "#E0E0E0"}
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                    />
                  </Svg>
                  <ItemText>
                    {fullName} - <Org variant="caption">{organisation}</Org>
                  </ItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <Center>
              <GroupImage width="80px" height="80px" />
              <EmptyText>No Users in Scheme</EmptyText>
            </Center>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditUsersPopOver;
