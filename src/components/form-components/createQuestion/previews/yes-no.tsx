import { Radio, Form } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const YesNoPreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <Radio.Group size="small">
      <Radio.Button value="true">
        <FormattedMessage defaultMessage="Yes" />
      </Radio.Button>
      <Radio.Button value="false">
        <FormattedMessage defaultMessage="No" />
      </Radio.Button>
    </Radio.Group>
  </Form.Item>
);

export default YesNoPreview;
