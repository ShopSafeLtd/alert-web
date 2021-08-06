import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const StyledButton = styled(Button)`
  margin-right: ${({ back }) => back && '15px'};
`;

class ButtonExport extends React.PureComponent {
  render() {
    const { back, children, ...rest } = this.props;
    return (
      <StyledButton back={back} style={{ minWidth: 'auto' }} {...rest}>
        {children}
      </StyledButton>
    );
  }
}

export default ButtonExport;
