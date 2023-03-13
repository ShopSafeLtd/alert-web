import { Col, Row, Skeleton } from 'antd';
import React from 'react';
import CheckTag from '../check-tag/CheckTag.view';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: {
    label: string;
    value: string;
    tooltip?: string;
  }[];
  mode?: 'check' | 'radio';
  loading?: boolean;
}

const CheckTags = ({
  onChange = () => {},
  options = [],
  value = [],
  mode = 'check',
  loading = false,
}: Props) => {
  const toggleOption = (e: string) => {
    if (mode === 'check') {
      if (value.includes(e)) {
        onChange(value.filter((i) => i !== e));
      } else {
        onChange([...value, e]);
      }
    }
    if (mode === 'radio') {
      if (value.includes(e)) {
        onChange([]);
      } else {
        onChange([e]);
      }
    }
  };

  return loading ? (
    <Row gutter={[10, 10]}>
      <Col>
        <Skeleton.Input
          active
          style={{ borderRadius: 100, height: 31, width: 80 }}
        />
      </Col>
      <Col>
        <Skeleton.Input
          active
          style={{ borderRadius: 100, height: 31, width: 80 }}
        />
      </Col>
      <Col>
        <Skeleton.Input
          active
          style={{ borderRadius: 100, height: 31, width: 80 }}
        />
      </Col>
    </Row>
  ) : (
    <Row gutter={[10, 10]}>
      {options.map((option) => (
        <Col>
          <CheckTag
            value={option.value}
            label={option.label}
            tooltip={option.tooltip}
            active={value.includes(option.value)}
            onClick={toggleOption}
          />
        </Col>
      ))}
    </Row>
  );
};

export default CheckTags;
