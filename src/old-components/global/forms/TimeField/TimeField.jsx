import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { TimePicker } from '@material-ui/pickers';

const Field = styled.div`
  margin-top: 10px;
`;

class DateField extends PureComponent {
  render() {
    const { value, onChange, fullWidth, ...rest } = this.props;
    return (
      <Field>
        <TimePicker
          clearable
          ampm={false}
          value={value}
          onChange={onChange}
          fullWidth={fullWidth}
          {...rest}
        />
      </Field>
    );
  }
}

export default DateField;
