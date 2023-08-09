import { TimePicker, Form } from 'antd';
import React from 'react';

const TimePreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <TimePicker />
  </Form.Item>
);

export default TimePreview;
