import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FieldHeader, Field } from '../../../../global/forms';

class AddLabel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameError: '',
      description: '',
      descriptionError: ''
    };
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  handleClose = () => {
    this.setState({
      name: '',
      description: ''
    });
    this.props.close();
  };

  handleSubmit = () => {
    const nameValid = this.state.name !== '';
    const descriptionValid = this.state.description !== '';

    if (nameValid && this.state.description !== '') {
      this.props.addLabel({
        name: this.state.name,
        helpText: this.state.description
      });
      this.handleClose();
    } else {
      if (!nameValid) {
        this.setState({
          nameError: 'This field is required.'
        });
      } else {
        this.setState({
          nameError: ''
        });
      }
      if (!descriptionValid) {
        this.setState({
          descriptionError: 'This field is required.'
        });
      } else {
        this.setState({
          descriptionError: ''
        });
      }
    }
  };

  render() {
    const { open } = this.props;
    const { name, nameError, description, descriptionError } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleChange}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Label</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following information to create a new offender
            warning label.
          </DialogContentText>
          <Field>
            <FieldHeader>Name</FieldHeader>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              value={name}
              onChange={e => this.handleChange(e.target.value, 'name')}
              error={nameError !== ''}
              helperText={nameError}
            />
          </Field>
          <Field>
            <FieldHeader>Description</FieldHeader>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              fullWidth
              multiline
              rows="6"
              value={description}
              onChange={e => this.handleChange(e.target.value, 'description')}
              error={descriptionError !== ''}
              helperText={descriptionError}
            />
          </Field>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddLabel;
