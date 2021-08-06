import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Svg = styled.svg`
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
`;

class Check extends PureComponent {
  render() {
    const { onClick, selected } = this.props;
    return selected ? (
      <Svg onClick={onClick} viewBox="0 0 24 24">
        <path
          fill="#1E88E5"
          d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
        />
      </Svg>
    ) : (
      <Svg onClick={onClick} viewBox="0 0 24 24">
        <path
          fill="#E0E0E0"
          d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"
        />
      </Svg>
    );
  }
}

export default Check;
