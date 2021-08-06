import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { Section } from '../../../../global/layout';
import LockSvg from '@material-ui/icons/Lock';
import LockOpenSvg from '@material-ui/icons/LockOpen';
import Delete from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Send from '@material-ui/icons/Send';

const LockButtonIcon = styled(LockSvg)`
  width: 18px;
  margin-right: 5px;
`;
const LockOpenButtonIcon = styled(LockOpenSvg)`
  width: 18px;
  margin-right: 5px;
`;
const DeleteIcon = styled(Delete)`
  width: 18px;
  margin-right: 5px;
`;
const SendIcon = styled(Send)`
  width: 18px;
  margin-right: 5px;
`;
const UserName = styled(Typography)`
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`;
const Org = styled(Typography)`
  margin: 0;
`;
const Grow = styled.div`
  flex: 1;
`;
const VertCenter = styled.div`
  display: flex;
  align-items: center;
`;
const Blocked = styled.span`
  margin: 5px 0 0 10px;
  color: #ef5350;
  font-size: 22px;
`;
const Row = styled.div`
  display: flex;
`;

const Header = ({
  user,
  disableUser,
  enableUser,
  remove,
  isCurrent,
  sendInvite
}) => {
  return (
    <Section width="100%" elevation={1}>
      <Row>
        <div>
          <UserName variant="h5">
            {user.fullName}{' '}
            {user.disabled && <Blocked>(User Disabled)</Blocked>}
          </UserName>
          <Org variant="subtitle1">{user.organisation}</Org>
        </div>

        <Grow />
        <VertCenter>
          <Button disabled={isCurrent} color="primary" onClick={sendInvite}>
            <SendIcon />
            Send Invite
          </Button>
          {!user.disabled && (
            <Button disabled={isCurrent} color="primary" onClick={disableUser}>
              <LockButtonIcon />
              Disable User
            </Button>
          )}
          {user.disabled && (
            <Button disabled={isCurrent} color="primary" onClick={enableUser}>
              <LockOpenButtonIcon />
              Enable User
            </Button>
          )}
          <Button disabled={isCurrent} color="primary" onClick={remove}>
            <DeleteIcon />
            Delete User
          </Button>
        </VertCenter>
      </Row>
    </Section>
  );
};

export default Header;
