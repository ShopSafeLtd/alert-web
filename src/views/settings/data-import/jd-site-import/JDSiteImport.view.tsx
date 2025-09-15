/* eslint-disable formatjs/no-literal-string-in-jsx */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Card, Form, Radio, Typography, Upload } from 'antd';
import { JdSiteSchemeSelection } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useJDSiteImport from './useJDSiteImport';

const JDSiteImport = () => {
  const intl = useIntl();
  const { documentUploadProps, form, onSubmit, saving } = useJDSiteImport();

  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Typography.Title level={4}>
          <FormattedMessage defaultMessage="JD Site Import" />
        </Typography.Title>
        <Typography.Text>
          <FormattedMessage defaultMessage="Select a JD site file to import it. Group selection is not required." />
        </Typography.Text>
        <Form
          form={form}
          initialValues={{
            schemeSelection: JdSiteSchemeSelection.Both,
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Import Destination',
            })}
            name="schemeSelection"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Select which scheme(s) to import the data into.',
            })}
          >
            <Radio.Group
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <Radio
                style={{ alignItems: 'center' }}
                value={JdSiteSchemeSelection.Both}
              >
                <FormattedMessage defaultMessage="Both JD Nexus and JDNA" />
              </Radio>
              <Radio
                style={{ alignItems: 'center' }}
                value={JdSiteSchemeSelection.JdNexus}
              >
                <FormattedMessage defaultMessage="JD Nexus Only" />
              </Radio>
              <Radio
                style={{ alignItems: 'center' }}
                value={JdSiteSchemeSelection.Jdna}
              >
                <FormattedMessage defaultMessage="JDNA Only" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'JD Site File',
            })}
            name="jdSiteFile"
            required
            tooltip={intl.formatMessage({
              defaultMessage: 'Upload the JD site file for import.',
            })}
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              accept={'application/json, .json'}
              disabled={saving}
              listType="picture"
              maxCount={1}
              style={{ display: 'flex' }}
            >
              <Button icon={<UploadOutlined />}>
                {intl.formatMessage({
                  defaultMessage: 'Upload File',
                })}
              </Button>
            </Upload>
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

export default JDSiteImport;
