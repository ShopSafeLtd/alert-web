import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 8;
  margin: 0;
`;
const Awaiting = styled(Typography)`
  color: #fff;
  margin-top: 10px;
`;
const Progress = styled(CircularProgress)`
  color: #fff;
`;

class UploadingOverlay extends React.Component {
  render() {
    const { visible } = this.props;
    return visible ? null : (
      <Container>
        <Progress color="inherit" />
        <Awaiting>Uploading</Awaiting>
      </Container>
    );
  }
}

export default UploadingOverlay;
