import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { APP_PREFIX_PATH } from "configs/AppConfig";

// import AllChatGroups from '../../../../graphql/admin/queries/AllChatGroups';
import { SchemeChats } from "graphql-src/chat/queries";
import { ChatGroupRowSkeleton } from "../../../global/skeletons";
import { FAB } from "../../../global/actions";
import { useStoreState } from "../../../../state";

const Page = styled.div`
  background: #fff;
  flex: 1;
  padding-bottom: 60px;
`;
const Row = styled(TableRow)`
  cursor: pointer;
`;

const ChatGroups = ({ history }) => {
  const schemeId = useStoreState((state) => state.scheme.id);

  // queries
  const { data, loading } = useQuery(SchemeChats, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // functions
  const toViewGroup = (id) => {
    history.push(`${APP_PREFIX_PATH}/scheme-settings/chat-groups/view/${id}`);
  };

  return (
    <Page>
      <Table id="group-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <ChatGroupRowSkeleton />
            <ChatGroupRowSkeleton />
            <ChatGroupRowSkeleton />
          </TableBody>
        ) : (
          <TableBody>
            {!!data &&
              data?.chats.map(({ id, name }) => {
                return (
                  <Row key={id}>
                    <TableCell onClick={() => toViewGroup(id)}>
                      {name}
                    </TableCell>
                  </Row>
                );
              })}
          </TableBody>
        )}
      </Table>
      <FAB
        to={`${APP_PREFIX_PATH}/scheme-settings/chat-groups/add`}
        icon="add"
      />
    </Page>
  );
};

export default ChatGroups;
