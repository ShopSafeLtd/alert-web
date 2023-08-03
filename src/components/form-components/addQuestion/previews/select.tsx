import { Select, Form } from 'antd';
import React from 'react';

const SelectPreview = ({
  question,
  options,
}: {
  options: string[];
  question: string;
}) => (
  <Form.Item label={question}>
    <Select
      mode="multiple"
      options={options.map((option) => ({ label: option, value: option }))}
    />
  </Form.Item>
);

export default SelectPreview;
