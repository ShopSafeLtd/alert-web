import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Header = styled(Typography)`
  margin: 0;
  color: ${({ error }) => (error ? '#EF5350' : '#616161')};
  text-align: ${({ alignright }) => (alignright === 1 ? 'right' : 'left')};
`;
const Required = styled.span`
  color: #ef5350;
`;

class FieldHeader extends PureComponent {
  render() {
    const { children, required, alignRight } = this.props;
    return (
      <Header variant="subtitle2" alignright={alignRight ? 1 : 0}>
        {children}
        {required && <Required> *</Required>}
      </Header>
    );
  }
}

export default FieldHeader;
