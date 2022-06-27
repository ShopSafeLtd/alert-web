import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import EditSvg from "@material-ui/icons/Edit";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { Section } from "../../../../global/layout";
import { SectionTitle } from "../../../../global/typography";
import GroupImage from "../../../../../images/AddGroup";

const Row = styled.div`
  display: flex;
`;
const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;
const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Group = styled(Typography)`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`;

const Groups = ({ user, userLoading, openEdit }) => {
  return (
    <Section width="50%" elevation={1}>
      <Row>
        <SectionTitle>Groups</SectionTitle>
        <Button variant="text" color="primary" size="small" onClick={openEdit}>
          <EditIcon />
          Edit Groups
        </Button>
      </Row>
      {!!userLoading && userLoading ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : !!user.groups && user.groups.length > 0 ? (
        <div>
          {user.groups.map(({ id, name }) => (
            <Group key={id}>{name}</Group>
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

export default Groups;
