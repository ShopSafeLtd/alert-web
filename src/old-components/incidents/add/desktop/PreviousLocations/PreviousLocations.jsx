import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';

import { EmptyText, SubHeader } from '../../../../global/typography';
import History from '../../../../../images/History';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const List = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const HeaderContainer = styled.div`
  padding-left: 50px;
`;
const Empty = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const PointerRow = styled(TableRow)`
  cursor: pointer;
`;

class PreviousLocations extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  render() {
    const {
      previousLocations,
      previousLocation,
      setPreviousLocation,
      handleNext
    } = this.props;
    const { page } = this.state;
    return (
      <List>
        <HeaderContainer>
          <SubHeader>Previous Locations</SubHeader>
        </HeaderContainer>
        {previousLocations.length > 0 ? (
          <div>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Premises</TableCell>
                  <TableCell align="center">Building</TableCell>
                  <TableCell align="center">Street</TableCell>
                  <TableCell align="center">Town</TableCell>
                  <TableCell align="center">County</TableCell>
                  <TableCell align="center">Postcode</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousLocations
                  .slice(page * 10, page * 10 + 10)
                  .map(
                    ({
                      id,
                      premises,
                      building,
                      street,
                      townCity,
                      county,
                      postcode
                    }) => (
                      <PointerRow
                        key={id}
                        hover
                        onClick={() => {
                          setPreviousLocation(id);
                          handleNext();
                        }}
                        selected={previousLocation === id}
                      >
                        <TableCell align="center">{premises}</TableCell>
                        <TableCell align="center">{building}</TableCell>
                        <TableCell align="center">{street}</TableCell>
                        <TableCell align="center">{townCity}</TableCell>
                        <TableCell align="center">{county}</TableCell>
                        <TableCell align="center">{postcode}</TableCell>
                      </PointerRow>
                    )
                  )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={previousLocations.length}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              page={page}
              backIconButtonProps={{
                'aria-label': 'previous page'
              }}
              nextIconButtonProps={{
                'aria-label': 'next page'
              }}
              onChangePage={(event, newPage) =>
                this.setState({ page: newPage })
              }
            />
          </div>
        ) : (
          <Empty>
            <History width="80px" height="80px" />
            <EmptyText>You have no previous addresses</EmptyText>
          </Empty>
        )}
      </List>
    );
  }
}

export default PreviousLocations;
