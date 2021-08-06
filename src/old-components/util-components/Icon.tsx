import React, { Component } from 'react'

interface Props {
  type?: any;
  className?: any;
  style?: any;
}

export class Icon extends Component<Props> {
	render() {
		const { type, className, style } = this.props;
		return (
			<>{React.createElement(type, { className: className, style })}</>
		)
	}
}

export default Icon
