import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import {
  Field,
  FieldHeader,
  FieldHelp,
  DateField,
  TimeField,
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
  background-color: #fff;
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

class EditDescription extends PureComponent {
  componentDidMount() {
    this.props.setBackLinkTo(this.props.basePath);
  }

  handleSave = () => {
    this.props
      .validateDescription()
      .then(() => {
        this.props.handleSave();
        this.props.history.push(this.props.basePath);
      })
      .catch(error => {});
  };

  render() {
    const {
      loading,
      description: {
        subject,
        subjectError,
        description,
        descriptionError,
        date,
        time
      },
      handleChange
    } = this.props;

    return (
      <Page>
        <Header>
          <HeaderText>Description</HeaderText>
          <HeaderSubText>
            Update the description of the new incident.
          </HeaderSubText>
        </Header>
        <Form>
          <Field>
            <Row row vertCenter>
              <FieldHeader required error={!!subjectError}>
                Subject
              </FieldHeader>
              <FieldHelp>A short overview of the incident.</FieldHelp>
            </Row>
            <TextField
              id="subject-input"
              value={subject}
              onChange={e => handleChange(e.target.value, 'subject')}
              fullWidth
              error={!!subjectError}
              helperText={subjectError}
              disabled={loading}
            />
          </Field>
          <Row row vertCenter>
            <Field mobile row>
              <Row row vertCenter>
                <FieldHeader required>Date</FieldHeader>
                <FieldHelp>The date that the incident occurred.</FieldHelp>
              </Row>
              <DateField
                id="date-input"
                value={date}
                onChange={value => handleChange(value, 'date')}
                disabled={loading}
              />
            </Field>
            <Field mobile row left>
              <Row row vertCenter>
                <FieldHeader required>Time</FieldHeader>
                <FieldHelp>The time that the incident occurred.</FieldHelp>
              </Row>
              <TimeField
                id="time-input"
                value={time}
                onChange={value => handleChange(value, 'time')}
                disabled={loading}
              />
            </Field>
          </Row>
          <Field>
            <Row row vertCenter>
              <FieldHeader required error={!!descriptionError}>
                Description
              </FieldHeader>
              <FieldHelp>
                A more detailed description of the incident.
              </FieldHelp>
            </Row>
            <TextField
              id="description-input"
              value={description}
              onChange={e => handleChange(e.target.value, 'description')}
              rows="5"
              multiline
              fullWidth
              error={!!descriptionError}
              helperText={descriptionError}
              disabled={loading}
            />
          </Field>
        </Form>
        <FullWidthButton
          text="Save Description"
          onClick={this.handleSave}
          disabled={loading}
        />
      </Page>
    );
  }
}

export default EditDescription;
