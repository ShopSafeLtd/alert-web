/* eslint-disable formatjs/no-literal-string-in-jsx */
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Typography, Upload } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useRiverIslandImport from './useRiverIslandImport';

const RiverIslandImport = () => {
  const intl = useIntl();
  const { documentUploadProps, form, onSubmit, saving } =
    useRiverIslandImport();

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="River Island Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a CSV or XLSX file from River Island to import it." />
        </Typography.Text>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'File Data',
            })}
            name="riverIslandData"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the CSV or XLSX file from River Island.',
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

export default RiverIslandImport;
