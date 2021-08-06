import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  font-size: 16px;
  color: #616161;
  margin-bottom: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: inherit;
`;

class ChatName extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return <Text {...rest}>{children}</Text>;
  }
}

export default ChatName;
