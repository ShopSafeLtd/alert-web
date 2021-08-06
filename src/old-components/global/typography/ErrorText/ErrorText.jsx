import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Error = styled(Typography)`
  margin: 0;
  padding: 0;
  text-align: center;
  height: 20px;
  color: #ef5350;
`;

class ErrorText extends PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return (
      <Error variant="subtitle2" {...rest}>
        {children}
      </Error>
    );
  }
}

export default ErrorText;
