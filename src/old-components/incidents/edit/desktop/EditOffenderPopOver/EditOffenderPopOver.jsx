import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

import { PopOver, PopOverContainer } from '../../../../global/layout';
import OffenderPreview from '../../../global/OffenderPreview/OffenderPreview';
import ConfirmDialog from '../../../../global/ConfirmDialog/ConfirmDialog';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;
const DeleteIcon = styled(Delete)`
  font-size: 20px;
`;

class AddOffenderPopOver extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      confrimDelete: false
    };
  }

  render() {
    const { open, close, offender, removeOffender } = this.props;
    const { confrimDelete } = this.state;

    return (
      <PopOver
        noPadding
        open={open}
        width={800}
        handleClose={close}
        title={'View Offender'}
        actions={[
          <Button key={0} color="primary" variant="contained" onClick={close}>
            Close
          </Button>
        ]}
        toolbarActions={[
          <Button
            key={0}
            color="primary"
            variant="contained"
            size="small"
            onClick={() => this.setState({ confrimDelete: true })}
          >
            <DeleteIcon />
            Remove from Incident
          </Button>
        ]}
      >
        <Grow>
          <PopOverContainer>
            <OffenderPreview offender={offender || {}} noPadding fullHeight />
            <ConfirmDialog
              open={confrimDelete}
              handleClose={() => this.setState({ confrimDelete: false })}
              title="Are you sure"
              description="Are you sure you want to remove this offender from the incident? "
              actions={[
                <Button
                  key={0}
                  onClick={() => this.setState({ confrimDelete: false })}
                >
                  Cancel
                </Button>,
                <Button
                  key={1}
                  color="primary"
                  onClick={() => {
                    this.setState({ confrimDelete: false });
                    close();
                    removeOffender(offender.id);
                  }}
                >
                  Remove
                </Button>
              ]}
            />
          </PopOverContainer>
        </Grow>
      </PopOver>
    );
  }
}

export default AddOffenderPopOver;
