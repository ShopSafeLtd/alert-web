import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
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

class UserRowSkeletom extends PureComponent {
  render() {
    return (
      <Row>
        <TableCell>
          <Text />
        </TableCell>
        <MediaQuery minDeviceWidth={492}>
          <TableCell>
            <Text />
          </TableCell>
        </MediaQuery>
        <MediaQuery minDeviceWidth={642}>
          <TableCell>
            <Text />
          </TableCell>
        </MediaQuery>
        <MediaQuery minDeviceWidth={820}>
          <TableCell>
            <Text />
          </TableCell>
        </MediaQuery>
        <MediaQuery minDeviceWidth={1225}>
          <TableCell>
            <Text />
          </TableCell>
        </MediaQuery>
      </Row>
    );
  }
}

export default UserRowSkeletom;
