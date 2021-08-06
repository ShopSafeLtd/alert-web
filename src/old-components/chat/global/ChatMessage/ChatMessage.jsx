import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  font-size: 14px;
  color: #757575;
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  font-weight: inherit;
`;

class ChatMessage extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="caption" {...rest}>
        {children}
      </Text>
    );
  }
}

export default ChatMessage;
