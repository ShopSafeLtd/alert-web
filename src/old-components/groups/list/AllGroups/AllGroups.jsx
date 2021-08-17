import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withRouter } from "react-router-dom";
// import { useQuery } from '@apollo/react-hooks';
import { useQuery } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import { FAB } from "../../../global/actions";
import { GroupRowSkeleton } from "../../../global/skeletons";
import { Groups as GroupsQuery } from "graphql-src/groups/queries";
// import query from '../../../../graphql/groups/queries/GroupList';
import { useStoreActions, useStoreState } from "../../../../state";

const Groups = styled.div`
  background: #fff;
  flex: 1;
  padding-bottom: 60px;
`;
const Description = styled(TableCell)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Row = styled(TableRow)`
  cursor: pointer;
`;

const AllGroups = ({ history }) => {
  const setSearch = useStoreActions((actions) => actions.theme.setSearch);
  const setSearchText = useStoreActions(
    (actions) => actions.theme.setSearchText
  );
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );
  const search = useStoreState((state) => state.theme.search);

  const schemeId = useStoreState((state) => state.scheme.id);

  // effects
  // useEffect(() => {
  //   setBackLinkTo("/admin");
  //   // setNavbarAction("backLink");
  //   setSearch(true);
  //   setSearchText("Search for groups...");
  //   setTitle("Group Management");
  //   return () => {
  //     setBackLinkTo("");
  //     // setNavbarAction("default");
  //     setSearch(false);
  //     setSearchText("");
  //     setTitle("");
  //   };
  // });

  // queries
  const { data, loading } = useQuery(GroupsQuery, {
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
      },
    },
  });

  // functions
  const toViewGroup = (id) => {
    history.push(`${APP_PREFIX_PATH}/scheme-settings/groups/view/${id}`);
  };

  return (
    <Groups>
      <Table id="group-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <GroupRowSkeleton />
            <GroupRowSkeleton />
            <GroupRowSkeleton />
          </TableBody>
        ) : (
          <TableBody>
            {data.groups.map(({ id, name, description }) => {
              return (
                <Row key={id}>
                  <TableCell onClick={() => toViewGroup(id)}>{name}</TableCell>
                  <Description onClick={() => toViewGroup(id)}>
                    {description}
                  </Description>
                </Row>
              );
            })}
          </TableBody>
        )}
      </Table>
      <FAB to={`${APP_PREFIX_PATH}/scheme-settings/groups/add`} icon="add" />
    </Groups>
  );
};

export default withRouter(AllGroups);
