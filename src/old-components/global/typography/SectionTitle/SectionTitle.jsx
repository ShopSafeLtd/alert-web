import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  flex: 1;
  margin: 0;
`;

class SectionTitle extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Text variant="h6" {...rest}>
        {children}
      </Text>
    );
  }
}

export default SectionTitle;
