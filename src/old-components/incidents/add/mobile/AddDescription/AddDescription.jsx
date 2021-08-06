import React, { useEffect } from 'react';
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
`;
const Form = styled.div`
  flex: 1;
  margin-bottom: 60px;
  padding: 0px 30px;
`;

const AddDescription = ({
  setNavbarAction,
  setBackLinkTo,
  validateDescription,
  history,
  description: {
    subject,
    subjectError,
    date,
    time,
    description,
    descriptionError
  },
  handleChange,
  schemeAdmin,
  crimeTypes
}) => {
  // effects
  useEffect(() => {
    setNavbarAction('backLink');
    setBackLinkTo('/incidents');
    return () => {
      setNavbarAction('default');
      setBackLinkTo('');
    };
  });

  // functions
  const handleNext = () =>
    validateDescription(true)
      .then(
        () =>
          !schemeAdmin && !crimeTypes
            ? history.push('/incidents/add/location')
            : history.push('/incidents/add/crime-types')
      )
      .catch(() => {});

  return (
    <Page>
      <Header>
        <HeaderText>Description</HeaderText>
        <HeaderSubText>
          Complete the description of the new incident.
        </HeaderSubText>
      </Header>
      <Form>
        <Field>
          <Row row vertCenter>
            <FieldHeader required>Subject</FieldHeader>
            <FieldHelp>A short overview of the incident.</FieldHelp>
          </Row>
          <TextField
            id="subject-input"
            value={subject}
            onChange={e => handleChange(e.target.value, 'subject')}
            fullWidth
            error={!!subjectError}
            helperText={subjectError}
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
            />
          </Field>
        </Row>
        <Field>
          <Row row vertCenter>
            <FieldHeader required>Description</FieldHeader>
            <FieldHelp>A more detailed description of the incident.</FieldHelp>
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
          />
        </Field>
      </Form>
      <FullWidthButton text="Next" onClick={handleNext} />
    </Page>
  );
};

export default AddDescription;
