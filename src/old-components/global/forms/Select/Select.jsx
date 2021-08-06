import React, { PureComponent } from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import styled from 'styled-components';

const Control = styled(FormControl)`
  width: 100%;
`;

class CustomSelect extends PureComponent {
  render() {
    const {
      onChange,
      value,
      name,
      id,
      menuItems,
      error,
      helperText
    } = this.props;
    return (
      <Control error={error}>
        <Select
          value={value}
          onChange={event => onChange(event)}
          fullWidth
          inputProps={{
            name: name,
            id: id
          }}
        >
          {menuItems.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </Control>
    );
  }
}

export default CustomSelect;
