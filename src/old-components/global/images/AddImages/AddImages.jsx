import React, { PureComponent } from 'react';

import { WebAddImages } from '../';

class AddImages extends PureComponent {
  render() {
    const { upload, disabled } = this.props;
    return <WebAddImages upload={upload} disabled={disabled} />;
  }
}

export default AddImages;
