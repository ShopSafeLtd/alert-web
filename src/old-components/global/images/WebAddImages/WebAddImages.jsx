import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';

import { FileButton } from '../../actions';

class WebAddImages extends PureComponent {
  constructor(props) {
    super(props);
    this.addImageButton = React.createRef();
  }

  render() {
    const { upload, disabled } = this.props;
    return (
      <div onChange={upload}>
        <FileButton
          id="file-2"
          type="file"
          accept="image/*"
          disabled={disabled}
          ref={ref => (this.addImageButton = ref)}
          multiple
        />
        <Button
          component="label"
          variant="contained"
          color="primary"
          disabled={disabled}
          htmlFor="file-2"
        >
          Add Image
        </Button>
      </div>
    );
  }
}

export default WebAddImages;
