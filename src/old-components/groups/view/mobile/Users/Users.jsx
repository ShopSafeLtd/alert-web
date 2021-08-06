import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import People from '@material-ui/icons/People';

import { EmptyText } from '../../../../global/typography';

const Page = styled.div`
  height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
  display: flex;
  overflow: auto;
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
const Org = styled(Typography)`
  font-style: italic;
  display: inline;
`;
const Empty = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PeopleIcon = styled(People)`
  font-size: 50px;
  color: #ef5350;
`;

class Users extends PureComponent {
  render() {
    const { loading, group } = this.props;
    return (
      <Page>
        {loading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : group.users.length > 0 ? (
          <List>
            {group.users.map(({ id, fullName, organisation }) => (
              <Group key={id}>
                {fullName} - <Org variant="caption">{organisation}</Org>
              </Group>
            ))}
          </List>
        ) : (
          <Empty>
            <PeopleIcon />
            <EmptyText>This group has no members.</EmptyText>
          </Empty>
        )}
      </Page>
    );
  }
}

export default Users;
