import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

class BackButton extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return <StyledButton {...rest}>{children}</StyledButton>;
  }
}

export default BackButton;
