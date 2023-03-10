import { Col, Row } from 'antd';
import React from 'react';
import CheckTag from '../check-tag/CheckTag.view';

interface Props {
  value?: string[];
  onChange?: (value: string[]) => void;
  options: {
    label: string;
    value: string;
  }[];
  mode?: 'check' | 'radio';
}

const CheckTags = ({
  onChange = () => {},
  options = [],
  value = [],
  mode = 'check',
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

  return (
    <Row gutter={10}>
      {options.map((option) => (
        <Col>
          <CheckTag
            value={option.value}
            label={option.label}
            active={value.includes(option.value)}
            onClick={toggleOption}
          />
        </Col>
      ))}
    </Row>
  );
};

export default CheckTags;
