import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  color: #616161;
  margin: 0;
`;

class ListTitle extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="h5" {...rest}>
        {children}
      </Text>
    );
  }
}

export default ListTitle;
