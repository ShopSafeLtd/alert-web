import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

export interface Props {
	align: 'center' | 'left' | 'right';
	cover: string;
}

const Loading = (props: Props) => {
	const { align, cover } = props
	return (
		<div className={`loading text-${align} cover-${cover}`}>
			<Spin indicator={Icon} />
		</div>
	)
}

Loading.propTypes = {
	size: PropTypes.string,
	cover: PropTypes.string
}

Loading.defaultProps = {
	align: 'center',
	cover: 'inline'
};

export default Loading