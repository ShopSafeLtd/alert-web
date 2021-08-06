import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import { SectionTitle } from '../../../../global/typography';
import { Section } from '../../../../global/layout';

const Row = styled.div`
  display: flex;
`;
const UserStat = styled.div`
  margin: 10px 30px 10px 0;
`;
const StatTitle = styled(Typography)`
  text-align: center;
  margin: 0;
`;
const Stat = styled(Typography)`
  text-align: center;
  color: #ef5350;
  width: 100%;
  margin: 5px 0 0;
`;

const UserActions = ({ auth0User }) => {
  return (
    <Section width="50%" elevation={1} grow>
      <SectionTitle>User Activity</SectionTitle>
      <Row>
        <UserStat>
          <StatTitle variant="body2">Total Logins</StatTitle>
          <Stat variant="h5">
            {!!auth0User.auth0User
              ? !!auth0User.auth0User.loginCount
                ? auth0User.auth0User.loginCount
                : '0'
              : '0'}
          </Stat>
        </UserStat>
        <UserStat>
          <StatTitle variant="body2">Last Login</StatTitle>
          <Stat variant="h5">
            {!!auth0User.auth0User
              ? !!auth0User.auth0User.lastLogin
                ? moment(auth0User.auth0User.lastLogin).format('DD/MM/YYYY')
                : '--'
              : '--'}
          </Stat>
        </UserStat>
      </Row>
    </Section>
  );
};

export default UserActions;
