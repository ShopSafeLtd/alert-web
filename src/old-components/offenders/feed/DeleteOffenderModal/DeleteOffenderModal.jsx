import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

class DeleteOffenderModal extends React.Component {
  render() {
    const { visible, close, handleDelete, disabled } = this.props;
    return (
      <Dialog
        open={visible}
        onClose={() => close()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this offender will add it to the recyle bin for 30 days,
            after which, it will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={disabled} onClick={() => close()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete();
              close();
            }}
            color="primary"
            autoFocus
            disabled={disabled}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteOffenderModal;
