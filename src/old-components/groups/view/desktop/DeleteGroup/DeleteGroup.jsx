import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ProgressButton } from '../../../../global/actions';
import { withRouter } from 'react-router-dom';

class DeleteGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }
  render() {
    const { open, close, handleDelete, history } = this.props;
    const { disabled } = this.state;
    const handleSubmit = async () => {
      this.setState({ disabled: true });
      await handleDelete();
      this.setState({ disabled: false });
      history.push('/admin/groups');
    };
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
            onClick={handleSubmit}
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

export default withRouter(DeleteGroup);
