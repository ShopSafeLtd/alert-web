import React from 'react';
import styled from 'styled-components';
import EditSvg from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { SectionTitle } from '../../../../global/typography';
import GroupImage from '../../../../../images/AddGroup';
import { Section } from '../../../../global/layout';

const Row = styled.div`
  display: flex;
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
const EditIcon = styled(EditSvg)`
  width: 18px;
  margin-right: 5px;
`;

const ChatGroups = ({ user, userLoading, openEdit }) => {
  return (
    <Section width="50%" elevation={1}>
      <Row>
        <SectionTitle>Chat Groups</SectionTitle>
        <Button variant="text" color="primary" size="small" onClick={openEdit}>
          <EditIcon />
          Edit Chat Groups
        </Button>
      </Row>
      {userLoading ? (
        <Center>
          <CircularProgress />
        </Center>
      ) : !!user.chats && user.chats.length > 0 ? (
        <div>
          {user.chats.map(({ chat }) => chat).map(({ id, name }) => (
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

export default ChatGroups;
