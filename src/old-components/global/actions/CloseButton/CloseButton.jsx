import React, { PureComponent } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

const Svg = styled.svg`
  width: 24px;
  height: 24px;
`;

class CloseButton extends PureComponent {
  render() {
    const { close } = this.props;
    return (
      <IconButton viewBox="0 0 24 24" onClick={close}>
        <Svg>
          <path
            fill="#757575"
            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
          />
        </Svg>
      </IconButton>
    );
  }
}

export default CloseButton;
