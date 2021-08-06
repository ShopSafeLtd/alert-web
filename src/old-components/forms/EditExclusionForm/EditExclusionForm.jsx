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
const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;
const Arrow = styled.div`
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
`;

class EditExclusionForm extends PureComponent {
  render() {
    const {
      data: { startDate, endDate, location, description, locationError },
      handleChange,
      loading
    } = this.props;
    return (
      <Form>
        <Row>
          <Column>
            <Field>
              <FieldHeader>Start Date</FieldHeader>
              <DateField
                value={startDate}
                onChange={value => handleChange(value, 'startDate')}
                disabled={loading}
              />
            </Field>
          </Column>
          <Arrow>
            <Svg viewBox="0 0 24 24">
              <path
                fill="#757575"
                d="M11,16H3V8H11V2L21,12L11,22V16M13,7V10H5V14H13V17L18,12L13,7Z"
              />
            </Svg>
          </Arrow>
          <Column>
            <Field>
              <FieldHeader alignRight>End Date</FieldHeader>
              <DateField
                value={endDate}
                onChange={value => handleChange(value, 'endDate')}
                disabled={loading}
              />
            </Field>
          </Column>
        </Row>
        <Field>
          <FieldHeader required>Ban Location</FieldHeader>
          <TextField
            id="location-input"
            value={location}
            onChange={e => handleChange(e.target.value, 'location')}
            margin="normal"
            fullWidth
            error={!!locationError}
            helperText={locationError}
            disabled={loading}
          />
        </Field>
        <Field>
          <FieldHeader>Ban Description</FieldHeader>
          <TextField
            id="location-input"
            value={description}
            onChange={e => handleChange(e.target.value, 'description')}
            margin="normal"
            fullWidth
            multiline
            rows="6"
            disabled={loading}
          />
        </Field>
      </Form>
    );
  }
}

export default EditExclusionForm;
