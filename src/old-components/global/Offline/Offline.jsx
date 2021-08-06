import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import OfflineImage from '../../../images/Offline';

const Page = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 60px;
`;

const Header = styled(Typography)`
  margin-top: 10px;
  color: rgba(0, 0, 0, 0.54);
`;

const Text = styled(Typography)`
  margin: 10px 0;
  text-align: center;
  width: 90%;
`;

class Offline extends PureComponent {
  render() {
    const { type } = this.props;
    return (
      <Page>
        <OfflineImage width="80px" height="80px" />
        <Header variant="h6">You Are Offline</Header>
        <Text>
          We cannot currently fetch any {type} as your are offline, please try
          again when you are connected to the internet.
        </Text>
        <Button
          variant="contained"
          color="primary"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </Page>
    );
  }
}

export default Offline;
