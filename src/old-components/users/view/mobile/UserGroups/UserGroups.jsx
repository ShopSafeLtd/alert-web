import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';

import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  overflow: scroll;
  display: flex;
  width: 100%;
`;
const Loading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Group = styled(Typography)`
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
`;
const List = styled.div`
  width: 100%;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PeopleIcon = styled(People)`
  color: #ef5350;
  font-size: 50px;
`;

class UserGroups extends PureComponent {
  render() {
    const { user, userLoading } = this.props;
    return (
      <Page>
        {userLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : user.groups.length > 0 ? (
          <List>
            {user.groups.map(({ id, name }) => (
              <Group key={id}>{name}</Group>
            ))}
          </List>
        ) : (
          <Empty>
            <PeopleIcon />
            <EmptyText>This user is in no groups.</EmptyText>
          </Empty>
        )}
      </Page>
    );
  }
}

export default UserGroups;
