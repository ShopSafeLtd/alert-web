/* eslint-disable formatjs/no-literal-string-in-jsx */
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Typography, Upload } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useMCCImport from './useMCCImport';

const MCCImport = () => {
  const intl = useIntl();
  const { documentUploadProps, form, onSubmit, saving } = useMCCImport();

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="MCC Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a CSV or XLSX file from MCC to import it." />
        </Typography.Text>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getValueFromEvent={(e: any) => {
              if (Array.isArray(e)) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return e;
              }
              // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
              return e?.fileList || [];
            }}
            label={intl.formatMessage({
              defaultMessage: 'File Data',
            })}
            name="mccData"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV or XLSX file from MCC.',
            })}
            valuePropName="fileList"
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
              defaultMessage: 'Groups',
            })}
            name="groups"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the groups to import the data into.',
            })}
          >
            <GroupsSelect
              allowSelectAll
              mode="multiple"
              style={{ width: '33%' }}
            />
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

export default MCCImport;
