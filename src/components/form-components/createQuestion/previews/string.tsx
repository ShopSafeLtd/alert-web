import { Form, Input } from 'antd';
import React from 'react';

const stringPreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <Input />
  </Form.Item>
);

export default stringPreview;
