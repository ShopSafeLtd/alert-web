/* eslint-disable formatjs/no-literal-string-in-jsx */
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Typography, Upload } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useTJXImport from './useTJXImport';

const TJXImport = () => {
  const intl = useIntl();
  const { documentUploadProps, form, onSubmit, saving } = useTJXImport();

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="TJX Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a CSV or XLSX file from TJX to import it." />
        </Typography.Text>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'File Data',
            })}
            name="tjxData"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV or XLSX file from TJX.',
            })}
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              accept={
                'text/csv, application/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
              }
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
              defaultMessage: 'Group',
            })}
            name="group"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the group to limit business matching to.',
            })}
          >
            <GroupsSelect style={{ width: 250 }} />
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

export default TJXImport;
