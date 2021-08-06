import React, { PureComponent } from 'react';
import Svg from '../Svg';

class Extended extends PureComponent {
  render() {
    const { width, height } = this.props;
    return (
      <Svg viewBox="0 0 24 24" width={width} height={height}>
        <path
          fill="#E57373"
          d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"
        />
      </Svg>
    );
  }
}

export default Extended;
