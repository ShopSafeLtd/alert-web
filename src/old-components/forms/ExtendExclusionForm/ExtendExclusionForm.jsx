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

class ExtendExclusionForm extends PureComponent {
  render() {
    const {
      data: { endDate, startDate, reason, reasonError },
      handleChange,
      loading
    } = this.props;
    return (
      <Form>
        <Row>
          <Column>
            <Field>
              <FieldHeader required>Select new start date</FieldHeader>
              <DateField
                value={startDate}
                maxDate={endDate}
                onChange={value => handleChange(value, 'startDate')}
                disabled={loading}
              />
            </Field>
          </Column>
          <Column>
            <Field>
              <FieldHeader required>Select new end date</FieldHeader>
              <DateField
                value={endDate}
                minDate={endDate}
                onChange={value => handleChange(value, 'endDate')}
                disabled={loading}
              />
            </Field>
          </Column>
        </Row>
        <Field>
          <FieldHeader required>Reason for extension</FieldHeader>
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
            disabled={loading}
          />
        </Field>
      </Form>
    );
  }
}

export default ExtendExclusionForm;
