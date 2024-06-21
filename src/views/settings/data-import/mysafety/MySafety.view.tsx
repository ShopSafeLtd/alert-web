import React from 'react';
import { Button, Card, Typography, Form } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import MySafetyCSV from '#/components/form-components/MySafetyCSV/MySafetyCSV';
import useMySafety from './useMySafety';

const MySafety = () => {
  const intl = useIntl();
  const { saving, onSubmit } = useMySafety();
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="Mysafety Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a csv file from mysafety to import it." />
        </Typography.Text>
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'CSV Data',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV file from MySafety.',
            })}
            name="mySafety"
            required
          >
            <MySafetyCSV />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the groups to import the data into.',
            })}
            name="groups"
            required
          >
            <GroupsSelect mode="multiple" style={{ width: 250 }} />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              style={{ marginTop: 20 }}
              loading={saving}
              disabled={saving}
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
