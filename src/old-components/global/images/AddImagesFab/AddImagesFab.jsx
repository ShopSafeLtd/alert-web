import React from 'react';

import { WebFab } from '../';

class AddImagesFab extends React.Component {
  render() {
    const { disabled, upload, bottom } = this.props;
    return <WebFab upload={upload} disabled={disabled} bottom={bottom} />;
  }
}

export default AddImagesFab;
