import IntelOneCSV from '#/components/form-components/IntelOneCSV/IntelOneCSV';
import { Button, Card, Form, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useIntelOne from './useIntelOne';

const MySafety = () => {
  const intl = useIntl();
  const { onSubmit, saving } = useIntelOne();
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="Intel One Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a csv file from Intel One to import it." />
        </Typography.Text>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'CSV Data',
            })}
            name="intelOne"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV file from Intel One.',
            })}
          >
            <IntelOneCSV />
          </Form.Item>
          <Form.Item>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              style={{ marginTop: 20 }}
            >
              <FormattedMessage defaultMessage="Import Data" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MySafety;
