import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MediaQuery from 'react-responsive';

import { PopOver, PopOverContainer } from '../../../global/layout';
import { FullWidthButton } from '../../../global/actions';
import OffenderPreview from '../../global/OffenderPreview/OffenderPreview';

class OffenderPopOver extends Component {
  render() {
    const { open, offender, toggleOffenderPopOver } = this.props;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {matches => (
          <PopOver
            noPadding
            title={offender.name}
            open={open}
            width={matches ? 700 : window.innerWidth - 15}
            handleClose={() => toggleOffenderPopOver()}
            mobileAction={[
              <FullWidthButton
                key={0}
                text="Close"
                onClick={toggleOffenderPopOver}
                left
              />
            ]}
            actions={[
              <Button
                key={0}
                color="primary"
                onClick={() => toggleOffenderPopOver()}
              >
                Close
              </Button>
            ]}
          >
            <PopOverContainer noPadding>
              <OffenderPreview noPadding fullHeight offender={offender} />
            </PopOverContainer>
          </PopOver>
        )}
      </MediaQuery>
    );
  }
}

export default OffenderPopOver;
