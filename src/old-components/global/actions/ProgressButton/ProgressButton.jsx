import React, { PureComponent } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const ButtonContainer = styled.div`
  position: relative;
`;
const Progress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -12px;
`;

class ProgressButton extends PureComponent {
  render() {
    const { disabled, children, ...rest } = this.props;
    return (
      <ButtonContainer>
        <Button disabled={disabled} {...rest}>
          {children}
        </Button>
        {disabled && <Progress size={20} />}
      </ButtonContainer>
    );
  }
}

export default ProgressButton;
