import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { Section } from '../../../../global/layout';
import EditDetailsPopOver from '../EditDetailsPopOver/EditDetailsPopOver';
import EditUsersPopOver from '../EditUsersPopOver/EditUsersPopOver';
import Details from '../Details/Details';
import Users from '../Users/Users';

const Page = styled.div`
  width: 100%;
  padding: 0px 10px 20px;
  display: flex;
  flex-direction: column;
`;
const SectionRow = styled.div`
  display: flex;
`;
const Row = styled.div`
  display: flex;
`;
const GroupName = styled(Typography)`
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`;

const ViewGroupDesktop = ({ group, groupId, loading }) => {
  // state
  const [editDetails, setEditDetails] = useState(false);
  const [editUsers, setEditUsers] = useState(false);

  return (
    <Page>
      <Section width="100%" elevation={1}>
        <Row>
          <GroupName variant="h5">
            {group !== undefined && group.name}
          </GroupName>
        </Row>
      </Section>
      <SectionRow>
        <Details
          group={group}
          loading={loading}
          openEdit={() => setEditDetails(true)}
        />
        <Users
          group={group}
          loading={loading}
          openEdit={() => setEditUsers(true)}
        />
      </SectionRow>

      <EditDetailsPopOver
        open={editDetails}
        close={() => setEditDetails(false)}
        group={groupId}
      />
      <EditUsersPopOver
        open={editUsers}
        close={() => setEditUsers(false)}
        group={groupId}
      />
    </Page>
  );
};

export default ViewGroupDesktop;
