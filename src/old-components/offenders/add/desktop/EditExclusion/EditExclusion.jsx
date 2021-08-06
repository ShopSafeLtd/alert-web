import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  PopOver,
  PopOverHeader,
  PopOverActions,
  PopOverContainer,
  Row
} from '../../../../global/layout';
import {
  FieldHeader,
  Field,
  DateField,
  FieldHelp
} from '../../../../global/forms';
import { BackButton } from '../../../../global/actions';

const Grow = styled.div`
  flex: 1;
  width: 100%;
`;

class EditExclusion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      locationError: '',
      description: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.setState({
        id: this.props.editingExclusion.id,
        startDate: this.props.editingExclusion.startDate,
        endDate: this.props.editingExclusion.endDate,
        location: this.props.editingExclusion.location,
        locationError: '',
        description: this.props.editingExclusion.description
      });
    }
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  handleEdit = async () => {
    if (this.state.location !== '') {
      await this.props.editExclusion({
        id: this.state.id,
        startDate: new Date(this.state.startDate),
        endDate: new Date(this.state.endDate),
        location: this.state.location,
        description: this.state.description
      });
      this.handleClose();
    } else {
      this.setState({
        locationError: 'This field is required.'
      });
    }
  };

  handleClose = () => {
    this.setState({
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      locationError: '',
      description: ''
    });
    this.props.close();
  };

  render() {
    const { open } = this.props;
    const {
      startDate,
      endDate,
      location,
      description,
      locationError
    } = this.state;
    return (
      <PopOver noPadding open={open} width={600}>
        <PopOverHeader close={this.handleClose}>Edit Ban</PopOverHeader>
        <Grow>
          <PopOverContainer>
            <Row row>
              <Field row>
                <Row row>
                  <FieldHeader>Start Date</FieldHeader>
                  <FieldHelp>The start date of the ban period.</FieldHelp>
                </Row>
                <DateField
                  id="Start Date"
                  value={startDate}
                  onChange={value => this.handleChange(value, 'startDate')}
                />
              </Field>
              <Field row left>
                <Row row>
                  <FieldHeader>End Date</FieldHeader>
                  <FieldHelp>The end date of the ban period.</FieldHelp>
                </Row>
                <DateField
                  id="End Date"
                  value={endDate}
                  onChange={value => this.handleChange(value, 'endDate')}
                />
              </Field>
            </Row>
            <Field>
              <Row row>
                <FieldHeader>Location</FieldHeader>
                <FieldHelp>
                  The location that the offender the excluded from.
                </FieldHelp>
              </Row>
              <TextField
                id="name-input"
                value={location}
                onChange={e => this.handleChange(e.target.value, 'location')}
                fullWidth
                error={locationError !== ''}
                helperText={locationError}
              />
            </Field>
            <Field>
              <Row row>
                <FieldHeader>Description</FieldHeader>
                <FieldHelp>
                  Any addition information about the ban, like the reasoning for
                  excluding.
                </FieldHelp>
              </Row>
              <TextField
                id="name-input"
                value={description}
                onChange={e => this.handleChange(e.target.value, 'description')}
                fullWidth
                multiline
                rows="5"
              />
            </Field>
          </PopOverContainer>
        </Grow>
        <PopOverActions>
          <BackButton onClick={this.handleClose}>Cancel</BackButton>
          <Button variant="contained" color="primary" onClick={this.handleEdit}>
            Edit Ban
          </Button>
        </PopOverActions>
      </PopOver>
    );
  }
}

export default EditExclusion;
