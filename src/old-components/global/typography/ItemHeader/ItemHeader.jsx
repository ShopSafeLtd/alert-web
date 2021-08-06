import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Header = styled(Typography)`
  color: #ef5350;
  margin: 0;
  text-align: ${({ alignright, center }) =>
    alignright === 1 ? 'right' : center === 1 ? 'center' : 'left'};
`;

class ItemHeader extends PureComponent {
  render() {
    const { children, alignRight, center, ...rest } = this.props;
    return (
      <Header
        variant="subtitle1"
        alignright={alignRight ? 1 : 0}
        center={center ? 1 : 0}
        {...rest}
      >
        {children}
      </Header>
    );
  }
}

export default ItemHeader;
