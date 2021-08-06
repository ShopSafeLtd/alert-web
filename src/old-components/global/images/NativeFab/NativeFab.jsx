import React from 'react';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import TakePhotoIcon from '@material-ui/icons/AddAPhoto';
import { SpeedDial } from '../../SpeedDial';

class MobileFab extends React.Component {
  render() {
    const { disabled, upload, bottom } = this.props;
    const actions = [
      {
        icon: <AddPhotoIcon />,
        name: 'Upload Photo',
        onClick: () => {
          global.navigator.camera.getPicture(
            data => upload(data),
            data => console.log(data),
            {
              quality: 50,
              destinationType: global.Camera.DestinationType.FILE_URI,
              sourceType: global.Camera.PictureSourceType.PHOTOLIBRARY
            }
          );
          this.setState({
            open: false
          });
        }
      },
      {
        icon: <TakePhotoIcon />,
        name: 'Take Photo',
        onClick: () => {
          global.navigator.camera.getPicture(
            data => upload(data),
            data => console.log(data),
            {
              quality: 50,
              destinationType: global.Camera.DestinationType.FILE_URI,
              sourceType: global.Camera.PictureSourceType.CAMERA
            }
          );
          this.setState({
            open: false
          });
        }
      }
    ];

    return <SpeedDial actions={actions} disabled={disabled} bottom={bottom} />;
  }
}

export default MobileFab;
