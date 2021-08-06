import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  text-align: center;
  margin: 5px 0 10px;
`;

class EmptyText extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="subtitle1" {...rest}>
        {children}
      </Text>
    );
  }
}

export default EmptyText;
