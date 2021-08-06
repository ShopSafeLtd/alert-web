import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { Header, HeaderText, HeaderSubText } from '../../../../global/forms';
import { ErrorText } from '../../../../global/typography';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
const List = styled.div`
  flex: 1;
  width: 100%;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 0 20px;
`;
const ItemText = styled(Typography)`
  margin: 0;
  flex: 1;
  padding-left: 15px;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Svg = styled.svg`
  height: 30px;
  width: 30px;
`;

class Groups extends PureComponent {
  render() {
    const {
      groups,
      selectedGroups,
      groupsLoading,
      toggleSelectedGroups
    } = this.props;
    return (
      <Page>
        <Header>
          <HeaderText>Groups</HeaderText>
          <HeaderSubText>
            Please select the groups that you would like this offender to be
            visible to.
          </HeaderSubText>
        </Header>
        <ErrorText>Please select at least one group.</ErrorText>
        <List>
          {!groupsLoading &&
            groups.map(({ id, name }) => (
              <ListItem key={id} onClick={() => toggleSelectedGroups(id)}>
                <Svg viewBox="0 0 24 24">
                  <path
                    fill={selectedGroups.includes(id) ? '#1E88E5' : '#E0E0E0'}
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
                  />
                </Svg>
                <ItemText>{name}</ItemText>
              </ListItem>
            ))}
        </List>
      </Page>
    );
  }
}

export default Groups;
