import React, { PureComponent } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #eeeeee;
  height: 50px;
  padding: 30px 20px;
`;
const Text = styled.div`
  height: 16px;
  width: 40%;
  border-radius: 2px;
  background-color: #bdbdbd;
`;

class AdminWarningSkeleton extends PureComponent {
  render() {
    return (
      <ListItem>
        <Text />
      </ListItem>
    );
  }
}

export default AdminWarningSkeleton;
