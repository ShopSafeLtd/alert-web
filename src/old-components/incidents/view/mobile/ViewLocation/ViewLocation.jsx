import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const AlertLocation = styled.div`
  height: calc(100vh - 381px);
  padding: 1rem 1rem;
`;
const TableHeader = styled(Typography)`
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  padding-right: 1rem;
`;
const TableCell = styled(Typography)`
  display: table-cell;
`;

class ViewLocation extends React.PureComponent {
  render() {
    const {
      location: { premises, building, street, townCity, county, postcode }
    } = this.props;
    return (
      <AlertLocation>
        <table>
          <tbody>
            <tr>
              <TableHeader component="th" variant="body2">
                Premisis:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {premises === '' ? 'None' : premises}
              </TableCell>
            </tr>
            <tr>
              <TableHeader component="th" variant="body2">
                Building:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {building === '' ? 'None' : building}
              </TableCell>
            </tr>
            <tr>
              <TableHeader component="th" variant="body2">
                Street:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {street}
              </TableCell>
            </tr>
            <tr>
              <TableHeader component="th" variant="body2">
                Town/City:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {townCity}
              </TableCell>
            </tr>
            <tr>
              <TableHeader component="th" variant="body2">
                County:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {county}
              </TableCell>
            </tr>
            <tr>
              <TableHeader component="th" variant="body2">
                Postcode:
              </TableHeader>
              <TableCell component="td" variant="body2">
                {postcode}
              </TableCell>
            </tr>
          </tbody>
        </table>
      </AlertLocation>
    );
  }
}

export default ViewLocation;
