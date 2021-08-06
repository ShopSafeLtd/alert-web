import React, { Component } from 'react'

export class Icon extends Component {
	render() {
		const { type, className, style } = this.props;
		return (
			<>{React.createElement(type, { className: className, style })}</>
		)
	}
}

export default Icon
