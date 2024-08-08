/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/default-props-match-prop-types */
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
/* eslint-disable react/require-default-props */
import React from 'react';

const Icon = <LoadingOutlined spin style={{ fontSize: 35 }} />;

export interface Props {
  align: 'center' | 'left' | 'right';
  cover: string;
}

const Loading = (props: Props) => {
  const { align, cover } = props;
  return (
    <div className={`loading text-${align} cover-${cover}`}>
      <Spin indicator={Icon} />
    </div>
  );
};

Loading.propTypes = {
  cover: PropTypes.string,
  size: PropTypes.string,
};

Loading.defaultProps = {
  align: 'center',
  cover: 'inline',
};

export default Loading;
