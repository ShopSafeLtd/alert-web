import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Text = styled(Typography)`
  font-weight: 300;
  margin: 0 0;
  text-align: ${({ alignright, center }) =>
    alignright === 1 ? 'right' : center === 1 ? 'center' : 'left'};
  ${({ loading }) =>
    loading === 1 &&
    `
    background: #EF9A9A;
    border-radius: 4px;
    height: 20px;
    width: 80px;
  `};
`;

class ItemText extends PureComponent {
  render() {
    const { children, alignRight, center, loading } = this.props;
    return (
      <Text
        variant="body2"
        alignright={alignRight ? 1 : 0}
        center={center ? 1 : 0}
        loading={loading ? 1 : 0}
      >
        {children}
      </Text>
    );
  }
}

export default ItemText;
