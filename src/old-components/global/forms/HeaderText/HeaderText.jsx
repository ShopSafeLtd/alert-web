import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  margin: 0px 0px 5px;
`;

class HeaderText extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="h6" {...rest}>
        {children}
      </Text>
    );
  }
}

export default HeaderText;
