import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  Field,
  FieldHeader,
  FieldHelp,
  DateField,
  Header,
  HeaderText,
  HeaderSubText
} from '../../../../global/forms';
import { Row } from '../../../../global/layout';
import { FullWidthButton } from '../../../../global/actions';

const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 20px 30px;
`;

class EditExclusion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      startDate: new Date(),
      startDateError: null,
      endDate: new Date(),
      endDateError: null,
      location: '',
      locationError: null,
      description: ''
    };
  }
  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders/add/ban');
    this.setState({
      id: this.props.editingExclusion.id,
      startDate: this.props.editingExclusion.startDate,
      endDate: this.props.editingExclusion.endDate,
      location: this.props.editingExclusion.location,
      description: this.props.editingExclusion.description
    });
  }

  validate = () =>
    new Promise((resolve, reject) => {
      const locationValid = !!this.state.location;
      const startDateValid = !!this.state.startDate;
      const endDateValid = !!this.state.endDate;

      this.setState({
        locationError: locationValid ? null : 'This field is required',
        startDateError: startDateValid ? null : 'This field is required',
        endDateError: endDateValid ? null : 'This field is required'
      });

      locationValid && startDateValid && endDateValid ? resolve() : reject();
    });

  handleNext = () => {
    this.validate()
      .then(() => {
        this.props.editExclusion({
          id: this.state.id,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          location: this.state.location,
          description: this.state.description
        });
        this.props.history.push('/offenders/add/ban');
      })
      .catch(() => {});
  };
  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };
  render() {
    const {
      startDate,
      startDateError,
      endDate,
      endDateError,
      location,
      locationError,
      description
    } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Edit Ban</HeaderText>
          <HeaderSubText>
            Create ban for this offender to ban them from areas or premises.
          </HeaderSubText>
        </Header>
        <Form>
          <Row row>
            <Field row>
              <Row row>
                <FieldHeader required>Start Date</FieldHeader>
                <FieldHelp>The start date of the ban period.</FieldHelp>
              </Row>
              <DateField
                id="Start Date"
                value={startDate}
                onChange={value => this.handleChange(value, 'startDate')}
                error={!!startDateError}
                helperText={startDateError}
              />
            </Field>
            <Field row left>
              <Row row>
                <FieldHeader required>End Date</FieldHeader>
                <FieldHelp>The end date of the ban period.</FieldHelp>
              </Row>
              <DateField
                id="End Date"
                value={endDate}
                onChange={value => this.handleChange(value, 'endDate')}
                error={!!endDateError}
                helperText={endDateError}
              />
            </Field>
          </Row>
          <Field>
            <Row row>
              <FieldHeader required>Location</FieldHeader>
              <FieldHelp>
                The location that the offender the excluded from.
              </FieldHelp>
            </Row>
            <TextField
              id="name-input"
              value={location}
              onChange={e => this.handleChange(e.target.value, 'location')}
              fullWidth
              error={!!locationError}
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
        </Form>
        <FullWidthButton text="Save" onClick={this.handleNext} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default EditExclusion;
