import React, { PureComponent } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const Text = styled(Typography)`
  color: #263238;
`;

class MenuItemText extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="subtitle1" {...rest}>
        {children}
      </Text>
    );
  }
}

export default MenuItemText;
