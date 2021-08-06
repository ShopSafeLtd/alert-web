import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const Image = styled.div`
  background-color: #eeeeee;
  height: 220px;
  width: 100%;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class UploadingImage extends PureComponent {
  render() {
    return (
      <Image>
        <CircularProgress />
        <Typography>Uploading Image</Typography>
      </Image>
    );
  }
}

export default UploadingImage;
