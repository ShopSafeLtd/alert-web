/* eslint-disable formatjs/no-literal-string-in-jsx */
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import MySafetyCSV from '#/components/form-components/MySafetyCSV/MySafetyCSV';
import { Button, Card, Divider, Form, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useMySafety from './useMySafety';

const MySafety = () => {
  const intl = useIntl();
  const { form, onSubmit, saving } = useMySafety();

  const mySafetyData = Form.useWatch('mySafety', form);

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
            <MySafetyCSV />
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
          <div>
            {mySafetyData && (
              <>
                {intl.formatMessage({
                  defaultMessage:
                    'Invalid Data - these incidents will be removed. If any of these are valid, please correct them and re-import.',
                })}
                <br />
                <br />
                {mySafetyData
                  .filter(
                    // filter where actualValue is NaN
                    (item) => Number.isNaN(item.actualValue)
                  )
                  .map((item, i) => (
                    <div key={i}>
                      {intl.formatMessage({
                        defaultMessage: 'Crime Type:',
                      })}{' '}
                      {item.crimeType}
                      <br />
                      {intl.formatMessage({
                        defaultMessage: 'Description:',
                      })}{' '}
                      {item.description}
                      <br />
                      {intl.formatMessage({
                        defaultMessage: 'Date:',
                      })}
                      {JSON.stringify(item.dateOccurred)}
                      <br />
                      {intl.formatMessage({
                        defaultMessage: 'Value:',
                      })}
                      {item.actualValue}
                      <Divider />
                    </div>
                  ))}
              </>
            )}
          </div>
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
