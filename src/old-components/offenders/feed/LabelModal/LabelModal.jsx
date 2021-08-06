import React, { PureComponent } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class LabelModal extends PureComponent {
  render() {
    const {
      visible,
      close,
      label: { name, helpText }
    } = this.props;
    return (
      <Dialog
        open={visible}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {helpText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()} color="primary" autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LabelModal;
