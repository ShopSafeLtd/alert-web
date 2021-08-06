import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ProgressButton } from '../../../../../global/actions';

class DeletChatGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }
  render() {
    const { open, close, handleDelete } = this.props;
    const { disabled } = this.state;
    return (
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="disable-dialog-title"
        aria-describedby="disable-dialog-description"
      >
        <DialogTitle id="disable-dialog-title">{'Are you sure?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="disable-dialog-description">
            This will permanently delete the group from the scheme.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={disabled} onClick={close}>
            Cancel
          </Button>
          <ProgressButton
            disabled={disabled}
            onClick={handleDelete}
            color="primary"
            autoFocus
          >
            Delete Group
          </ProgressButton>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeletChatGroup;
