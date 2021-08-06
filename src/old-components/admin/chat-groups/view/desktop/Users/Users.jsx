import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import EditSvg from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';

import { SectionTitle } from '../../../../../global/typography';
import { Section } from '../../../../../global/layout';
import GroupImage from '../../../../../../images/AddGroup';

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
const User = styled(Typography)`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
`;
const Org = styled(Typography)`
  font-style: italic;
  margin-left: 3px;
  display: inline;
`;

const Users = ({ chat, loading, openEdit }) => {
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
      ) : chat.members.length > 0 ? (
        <div>
          {chat.members
            .map(({ user }) => user)
            .map(({ id, fullName, organisation }) => (
              <User key={id}>
                {fullName} -{' '}
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
