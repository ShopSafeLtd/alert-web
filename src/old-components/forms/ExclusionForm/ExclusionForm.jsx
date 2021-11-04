import React, { PureComponent } from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

import { Field, FieldHeader, DateField } from '../../global/forms';

const Form = styled.div`
  width: 100%;
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  flex: 1;
  & + & {
    margin-left: 10px;
  }
`;

class ExclusionForm extends PureComponent {
  render() {
    const {
      data: {
        startDate,
        startDateError,
        endDate,
        endDateError,
        location,
        locationError,
        description
      },
      handleChange
    } = this.props;
    return (
      <Form>
        <Row>
          <Column>
            <Field>
              <FieldHeader required>Start Date</FieldHeader>
              <DateField
                value={startDate}
                onChange={value => handleChange(value, 'startDate')}
                error={!!startDateError}
                helperText={startDateError}
              />
            </Field>
          </Column>
          <Column>
            <Field>
              <FieldHeader required>End Date</FieldHeader>
              <DateField
                value={endDate}
                onChange={value => handleChange(value, 'endDate')}
                disablePast
                minDateMessage="Date cannot be in the past!"
                error={!!endDateError}
                helperText={endDateError}
              />
            </Field>
          </Column>
        </Row>
        <Field>
          <FieldHeader required>Exclusion Location</FieldHeader>
          <TextField
            id="location-input"
            value={location}
            onChange={e => handleChange(e.target.value, 'location')}
            margin="normal"
            fullWidth
            error={!!locationError}
            helperText={locationError}
          />
        </Field>
        <Field>
          <FieldHeader>Exclusion Description</FieldHeader>
          <TextField
            id="location-input"
            value={description}
            onChange={e => handleChange(e.target.value, 'description')}
            margin="normal"
            fullWidth
            multiline
            rows="6"
          />
        </Field>
      </Form>
    );
  }
}

export default ExclusionForm;
