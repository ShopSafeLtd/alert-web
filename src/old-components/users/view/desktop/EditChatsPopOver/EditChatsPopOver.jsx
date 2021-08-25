import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { useQuery, useMutation } from 'react-apollo';
import { useQuery, useMutation } from "@apollo/client";

import { useStoreState } from "state";
import { PopOver, PopOverContainer } from "../../../../global/layout";
import { BackButton } from "../../../../global/actions";
import { EmptyText } from "../../../../global/typography";
import GroupImage from "../../../../../images/AddGroup";
import { UserChats } from "graphql-src/users/queries";
import { SchemeChats } from "graphql-src/chat/queries";
import { UpdateUserChats } from "graphql-src/users/mutations";
// import UserQuery from '../../../../../graphql/users/queries/User';
// import AllChats from '../../../../../graphql/chat/queries/AllChats';
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

const EditChatsPopOver = ({ open, user, close }) => {
  // state
  const [userData, setUserData] = useState([]);
  const [chats, setChats] = useState([]);
  const [add, setAdd] = useState([]);
  const [remove, setRemove] = useState([]);

  const schemeId = useStoreState((state) => state.scheme.id);

  // queries
  const {
    data: userChatsData,
    loading: userLoading,
    refetch,
  } = useQuery(UserChats, {
    notifyOnNetworkStatusChange: true,
    variables: {
      where: {
        id: user,
      },
      scheme: schemeId,
    },
    onCompleted: (res) => {
      setUserData(res.user.chats.map(({ chat: { id } }) => id));
      setChats(res.user.chats.map(({ chat: { id } }) => id));
    },
  });

  const { data: chatsData, loading: chatsLoading } = useQuery(SchemeChats, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
      },
    },
  });

  // mutations
  const [updateUser, { loading: updateLoading }] = useMutation(
    UpdateUserChats,
    {
      onCompleted: () => {
        refetch();
        setAdd([]);
        setRemove([]);
      },
    }
  );

  // functions
  const toggleSelectedChats = (chat) => {
    if (!add.includes(chat) && !chats.includes(chat)) {
      setChats((prev) => [...prev, chat]);
      setAdd((prev) => [...prev, chat]);
      setRemove((prev) => prev.filter((el) => el !== chat));
    } else if (!remove.includes(chat)) {
      setChats((prev) => prev.filter((el) => el !== chat));
      setRemove((prev) => [...prev, chat]);
      setAdd((prev) => prev.filter((el) => el !== chat));
    }
  };

  const handleSave = () => {
    const connect = add
      .filter((el) => !userData.includes(el))
      .map((id) => ({ id }));
    const disconnect = remove
      .filter((el) => userData.includes(el))
      .map((id) => {
        const userChatId = userChatsData.user.chats.find(
          (e) => e.chat.id === id
        )?.id;
        return {
          id: userChatId,
        };
      });

    updateUser({
      variables: {
        where: {
          id: user,
        },
        data: {
          chats: {
            create:
              connect.length > 0
                ? connect.map((el) => ({
                    chat: {
                      connect: el,
                    },
                  }))
                : undefined,
            delete: disconnect.length > 0 ? disconnect : undefined,
          },
        },
      },
    });
    close();
  };

  const loading = chatsLoading || userLoading || updateLoading;

  return (
    <PopOver
      noPadding
      open={open}
      handleClose={close}
      width={500}
      title="Edit User's Chat Groups"
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
          Save Chat Groups
        </Button>,
      ]}
    >
      <Grow>
        <PopOverContainer>
          {!loading && chatsData?.chats?.length > 0 ? (
            <List>
              {chatsData?.chats?.map(({ id, name }) => (
                <ListItem key={id} onClick={() => toggleSelectedChats(id)}>
                  <Svg viewBox="0 0 24 24">
                    <path
                      fill={chats?.includes(id) ? "#1E88E5" : "#E0E0E0"}
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
              <EmptyText>No Chat Groups in Scheme</EmptyText>
            </Center>
          )}
        </PopOverContainer>
      </Grow>
    </PopOver>
  );
};

export default EditChatsPopOver;
