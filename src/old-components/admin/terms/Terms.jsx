import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const Page = styled.div`
  background: #fff;
  flex: 1;
  padding-bottom: 60px;
`;
const Row = styled(TableRow)`
  cursor: pointer;
`;

const Terms = ({ history }) => {
  const viewUserTerms = () => {
    history.push(`${APP_PREFIX_PATH}/scheme-settings/user-terms`);
  };
  const viewSchemeTerms = () => {
    history.push(`${APP_PREFIX_PATH}/scheme-settings/scheme-terms`);
  };

  return (
    <Page>
      <Table id="terms-table">
        <TableHead>
          <TableRow>
            <TableCell>Terms</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row>
            <TableCell onClick={viewUserTerms}>User Terms</TableCell>
          </Row>
          <Row>
            <TableCell onClick={viewSchemeTerms}>Scheme Terms</TableCell>
          </Row>
        </TableBody>
      </Table>
    </Page>
  );
};

export default Terms;
