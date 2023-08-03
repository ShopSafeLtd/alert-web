import { Radio, Form } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const YesNoPreview = ({ question }: { question: string }) => (
  <Form.Item label={question}>
    <Radio.Group size="small">
      <Radio.Button value="true">
        <FormattedMessage defaultMessage="Yes" id="a5msuh" />
      </Radio.Button>
      <Radio.Button value="false">
        <FormattedMessage defaultMessage="No" id="oUWADl" />
      </Radio.Button>
    </Radio.Group>
  </Form.Item>
);

export default YesNoPreview;
