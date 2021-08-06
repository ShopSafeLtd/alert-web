import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class InactiveOffenderModal extends PureComponent {
  render() {
    const { open, close, offenderId, markOffenderActive } = this.props;

    const handleSubmit = () => {
      markOffenderActive(offenderId, false);
      close();
    };

    return (
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="activate-dialog-title"
        aria-describedby="activate-dialog-description"
      >
        <DialogTitle id="activate-dialog-title">
          {'Mark offender as not active?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="deactivate-dialog-description">
            Marking the offender as not active will remove the offender from the
            Active tab of the offender feed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default InactiveOffenderModal;
