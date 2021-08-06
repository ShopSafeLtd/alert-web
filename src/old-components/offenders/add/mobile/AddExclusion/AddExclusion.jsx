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

class AddExclusion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      location: '',
      locationError: '',
      description: ''
    };
  }

  componentDidMount() {
    this.props.setNavbarAction('backLink');
    this.props.setBackLinkTo('/offenders/add/ban');
  }

  handleChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  handleNext = () => {
    if (this.state.location !== '') {
      this.props.addExclusion({
        startDate: new Date(this.state.startDate),
        endDate: new Date(this.state.endDate),
        location: this.state.location,
        description: this.state.description
      });
      this.props.history.push('/offenders/add/ban');
    } else {
      this.setState({
        locationError: 'This field is required.'
      });
    }
  };

  render() {
    const {
      startDate,
      endDate,
      location,
      description,
      locationError
    } = this.state;
    return (
      <Page>
        <Header>
          <HeaderText>Add Ban</HeaderText>
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
        <FullWidthButton text="Add" onClick={this.handleNext} />
      </Page>
    );
  }

  componentWillUnmount() {
    this.props.setNavbarAction('default');
    this.props.setBackLinkTo('');
  }
}

export default AddExclusion;
