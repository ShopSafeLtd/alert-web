import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  margin: 0;
  font-size: 14px;
`;

class HeaderSubText extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return <Text {...rest}>{children}</Text>;
  }
}

export default HeaderSubText;
