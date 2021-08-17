import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { SectionTitle } from "../../../../global/typography";
import GroupImage from "../../../../../images/AddGroup";
import EditSvg from "@material-ui/icons/Edit";
import { Section } from "../../../../global/layout";

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const User = styled(Typography)`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`;
const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;
const Org = styled(Typography)`
  font-style: italic;
  margin-left: 3px;
  display: inline;
`;
const Row = styled.div`
  display: flex;
`;

const Users = ({ group, loading, openEdit }) => {
  return (
    <Section width="50%" elevation={1}>
      <Row>
        <SectionTitle>Users</SectionTitle>
        <Button variant="text" color="primary" size="small" onClick={openEdit}>
          <EditIcon />
          Edit Users
        </Button>
      </Row>
      {loading ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : group?.users?.length > 0 ? (
        <div>
          {group?.users?.map(({ id, fullName, organisation }) => (
            <User key={id}>
              {fullName} -{" "}
              <Org component="span" variant="caption">
                {organisation}
              </Org>
            </User>
          ))}
        </div>
      ) : (
        <Center>
          <GroupImage width="40px" height="40px" />
        </Center>
      )}
    </Section>
  );
};

export default Users;
