import React from 'react';
import { Button, Card, Form, Typography } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import IntelOneCSV from '#/components/form-components/IntelOneCSV/IntelOneCSV';
import useIntelOne from './useIntelOne';

const MySafety = () => {
  const intl = useIntl();
  const { saving, onSubmit } = useIntelOne();
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage id="0gOWfx" defaultMessage="Intel One Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage
            id="BmgGnd"
            defaultMessage="Select a csv file from Intel One to import it."
          />
        </Typography.Text>
        <Form onFinish={onSubmit} layout="vertical">
          <Form.Item
            label={intl.formatMessage({
              id: '6FC4x9',
              defaultMessage: 'CSV Data',
            })}
            tooltip={intl.formatMessage({
              id: 'EGnxkC',
              defaultMessage: 'Upload the CSV file from Intel One.',
            })}
            name="intelOne"
            required
          >
            <IntelOneCSV />
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              id: 'hzmswI',
              defaultMessage: 'Groups',
            })}
            tooltip={intl.formatMessage({
              id: 'dh1Etf',
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
              <FormattedMessage id="cTiCAi" defaultMessage="Import Data" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default MySafety;
