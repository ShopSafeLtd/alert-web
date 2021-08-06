import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import TakePhotoIcon from '@material-ui/icons/AddAPhoto';

const PictureButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Row = styled.div`
  display: flex;
  width: 100%;
`;
const PictureText = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  ${({ disabled }) => disabled && 'color: #9E9E9E;'};
`;
const IconButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.12)' : '#EF5350'};
`;
const AddPhotoButton = styled(AddPhotoIcon)`
  color: ${({ disabled }) => (disabled ? '#9E9E9E' : '#fff')};
  font-size: 26px;
`;
const TakePhotoButton = styled(TakePhotoIcon)`
  color: ${({ disabled }) => (disabled ? '#9E9E9E' : '#fff')};
  font-size: 24px;
`;

class NativeAddImage extends PureComponent {
  render() {
    const { upload, disabled } = this.props;
    return (
      <Row>
        <PictureButton
          disabled={disabled}
          onClick={() => {
            !disabled &&
              global.navigator.camera.getPicture(
                data => upload(data),
                data => console.log(data),
                {
                  quality: 50,
                  destinationType: global.Camera.DestinationType.FILE_URI,
                  sourceType: global.Camera.PictureSourceType.PHOTOLIBRARY,
                  encodingType: global.Camera.EncodingType.JPEG,
                  mediaType: global.Camera.MediaType.PICTURE,
                  allowEdit: true,
                  correctOrientation: true
                }
              );
          }}
        >
          <IconButton disabled={disabled}>
            <AddPhotoButton disabled={disabled} />
          </IconButton>
          <PictureText disabled={disabled} variant="subtitle2">
            Upload Image
          </PictureText>
        </PictureButton>
        <PictureButton
          onClick={() => {
            !disabled &&
              global.navigator.camera.getPicture(
                data => upload(data),
                data => console.log(data),
                {
                  quality: 50,
                  destinationType: global.Camera.DestinationType.FILE_URI,
                  sourceType: global.Camera.PictureSourceType.CAMERA,
                  encodingType: global.Camera.EncodingType.JPEG,
                  mediaType: global.Camera.MediaType.PICTURE,
                  allowEdit: true,
                  correctOrientation: true
                }
              );
          }}
        >
          <IconButton disabled={disabled}>
            <TakePhotoButton disabled={disabled} />
          </IconButton>
          <PictureText disabled={disabled} variant="subtitle2">
            Take Picture
          </PictureText>
        </PictureButton>
      </Row>
    );
  }
}

export default NativeAddImage;
