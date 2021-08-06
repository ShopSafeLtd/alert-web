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

class ReduceExclusionForm extends PureComponent {
  render() {
    const {
      data: { startDate, endDate, reason, reasonError },
      handleChange
    } = this.props;
    return (
      <Form>
        <Row>
          <Column>
            <Field>
              <FieldHeader>Select new start date</FieldHeader>
              <DateField
                value={startDate}
                maxDate={endDate}
                onChange={value => handleChange(value, 'startDate')}
              />
            </Field>
          </Column>
          <Column>
            <Field>
              <FieldHeader>Select new end date</FieldHeader>
              <DateField
                value={endDate}
                minDate={startDate}
                maxDate={endDate}
                onChange={value => handleChange(value, 'endDate')}
              />
            </Field>
          </Column>
        </Row>
        <Field>
          <FieldHeader required>Reason for reduction</FieldHeader>
          <TextField
            id="location-input"
            value={reason}
            onChange={e => handleChange(e.target.value, 'reason')}
            margin="normal"
            fullWidth
            multiline
            rows="6"
            error={reasonError !== ''}
            helperText={reasonError}
          />
        </Field>
      </Form>
    );
  }
}

export default ReduceExclusionForm;
