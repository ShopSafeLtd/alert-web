import { Form, InputNumber } from 'antd';
import React from 'react';

const numberPreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <InputNumber />
  </Form.Item>
);

export default numberPreview;
