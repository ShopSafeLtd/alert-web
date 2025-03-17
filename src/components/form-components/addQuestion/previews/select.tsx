import { Form, Select } from 'antd';
import React from 'react';

const SelectPreview = ({
  options,
  question,
  single = false,
}: {
  options: string[];
  question: string;
  single?: boolean;
}) => (
  <Form.Item label={question}>
    <Select
      mode={single ? undefined : 'multiple'}
      options={options.map((option) => ({ label: option, value: option }))}
    />
  </Form.Item>
);

export default SelectPreview;
