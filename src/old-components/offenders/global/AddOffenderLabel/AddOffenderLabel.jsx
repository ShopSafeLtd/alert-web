import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import { Field, FieldHeader } from '../../../global/forms';

const styles = {
  paper: {
    width: '100%'
  }
};

class AddOffenderLabel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      helpText: '',
      helpTextError: ''
    };
  }

  handleChange = field => event =>
    this.setState({
      [field]: event.target.value
    });

  validateLabel = () =>
    new Promise((resolve, reject) => {
      const { name, helpText } = this.state;

      const nameValid = name !== '';
      const helpTextValid = helpText !== '';

      if (!nameValid) {
        this.setState({ nameError: 'This field is required.' });
        reject();
      } else {
        this.setState({ nameError: '' });
      }

      if (!helpTextValid) {
        this.setState({ helpTextError: 'This field is required.' });
        reject();
      } else {
        this.setState({ helpTextError: '' });
      }

      resolve();
    });

  render() {
    const { visible, close, addLabel, classes } = this.props;
    const { name, nameError, helpText, helpTextError } = this.state;
    return (
      <Dialog
        open={visible}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.paper }}
      >
        <DialogTitle id="form-dialog-title">Add Offender Label</DialogTitle>
        <DialogContent>
          <Field>
            <FieldHeader required>Name</FieldHeader>
            <TextField
              autoFocus
              id="name"
              value={name}
              onChange={this.handleChange('name')}
              error={nameError !== ''}
              helperText={nameError}
              fullWidth
            />
          </Field>
          <Field>
            <FieldHeader required>Description</FieldHeader>
            <TextField
              autoFocus
              id="helpText"
              value={helpText}
              onChange={this.handleChange('helpText')}
              fullWidth
              multiline
              error={helpTextError !== ''}
              helperText={helpTextError}
              rows="4"
            />
          </Field>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button
            onClick={() => {
              this.validateLabel()
                .then(() => {
                  addLabel({
                    name,
                    helpText
                  });
                  close();
                })
                .catch(() => {});
            }}
            color="primary"
          >
            Add Label
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AddOffenderLabel);
