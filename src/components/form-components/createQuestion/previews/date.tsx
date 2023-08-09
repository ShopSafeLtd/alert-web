import { DatePicker, Form } from 'antd';
import React from 'react';

const DatePreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <DatePicker />
  </Form.Item>
);

export default DatePreview;
