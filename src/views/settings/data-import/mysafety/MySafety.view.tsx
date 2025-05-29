/* eslint-disable formatjs/no-literal-string-in-jsx */
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Typography, Upload } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useMySafety from './useMySafety';

const MySafety = () => {
  const intl = useIntl();
  const { documentUploadProps, form, onSubmit, saving } = useMySafety();

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="Mysafety Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a csv file from mysafety to import it." />
        </Typography.Text>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'CSV Data',
            })}
            name="mySafety"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV file from MySafety.',
            })}
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              accept={'text/csv, application/csv,'}
              disabled={saving}
              listType="picture"
              maxCount={1}
              style={{ display: 'flex' }}
            >
              <Button icon={<UploadOutlined />}>
                {intl.formatMessage({
                  defaultMessage: 'Upload Document',
                })}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            name="groups"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the groups to import the data into.',
            })}
          >
            <GroupsSelect mode="multiple" style={{ width: 250 }} />
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
