/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

export class Icon extends Component {
  render() {
    const { type, className, style } = this.props;
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <>{React.createElement(type, { className, style })}</>
    );
  }
}

export default Icon;
