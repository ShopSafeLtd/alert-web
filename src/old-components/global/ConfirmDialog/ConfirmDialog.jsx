import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const StyledActions = styled(DialogActions)`
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  align-items: ${({ column }) => (column ? 'flex-end' : 'center')};
`;

class ConfirmDialog extends PureComponent {
  render() {
    const {
      open,
      handleClose,
      title,
      description,
      actions,
      actionsColumn
    } = this.props;
    return (
      open && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
          <StyledActions column={actionsColumn}>{actions}</StyledActions>
        </Dialog>
      )
    );
  }
}

export default ConfirmDialog;
