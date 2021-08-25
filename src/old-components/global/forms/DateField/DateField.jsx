import React, { PureComponent } from "react";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";
import MediaQuery from "react-responsive";

const Field = styled.div`
  margin-top: 10px;
`;

class DateField extends PureComponent {
  render() {
    const { value, onChange, modal, fullWidth, ...rest } = this.props;
    return (
      <MediaQuery minDeviceWidth={1024}>
        {(matches) => (
          <Field>
            {matches && !modal ? (
              <DatePicker
                value={value}
                variant="inline"
                onChange={onChange}
                fullWidth={fullWidth}
                {...rest}
              />
            ) : (
              <DatePicker
                value={value}
                onChange={onChange}
                fullWidth={fullWidth}
                {...rest}
              />
            )}
          </Field>
        )}
      </MediaQuery>
    );
  }
}

export default DateField;
