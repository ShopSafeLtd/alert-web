import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const Row = styled(TableRow)`
  cursor: pointer;
`;
const Text = styled.div`
  height: 16px;
  width: 40%;
  border-radius: 2px;
  background-color: #bdbdbd;
`;

class ChatGroupRowSkeleton extends PureComponent {
  render() {
    return (
      <Row>
        <TableCell>
          <Text />
        </TableCell>
      </Row>
    );
  }
}

export default ChatGroupRowSkeleton;
