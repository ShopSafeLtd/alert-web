import type { CctvRecordData } from 'types/DataType';

import { Button, Col, Form, Input, Radio, Row, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: CctvRecordData;
  onClose: () => void;
  onSubmit: (value: CctvRecordData) => void;
  saving: boolean;
}

const EditCctvRecord = ({
  data,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form<CctvRecordData>
      initialValues={{
        description: data.description,
        endTime: dayjs(data.endTime),
        showFace: data.showFace,
        showIncident: data.showIncident,
        startTime: dayjs(data.startTime),
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Start Time',
            })}
            name="startTime"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select a start time for the cctv evidence',
                }),
                required: true,
              },
            ]}
          >
            <TimePicker disabled={saving} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'End Time',
            })}
            name="endTime"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select an end time for the cctv evidence',
                }),
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const start = getFieldValue('startTime');
                  if (!value || !start) {
                    return Promise.resolve();
                  }
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                  if (value.isAfter(start)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('End time must be later than start time')
                  );
                },
              }),
            ]}
          >
            <TimePicker disabled={saving} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Shows Incident',
            })}
            name="showIncident"
            tooltip={intl.formatMessage({
              defaultMessage: 'Does the footage show the incident occur?',
            })}
          >
            <Radio.Group
              disabled={saving}
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Yes',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'No',
                  }),
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Shows suspects face',
            })}
            name="showFace"
            tooltip={intl.formatMessage({
              defaultMessage: 'Does the footage show the suspects face?',
            })}
          >
            <Radio.Group
              disabled={saving}
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Yes',
                  }),
                  value: true,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'No',
                  }),
                  value: false,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Please describe the recordings content',
            })}
            name="description"
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} loading={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({ defaultMessage: 'Save' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default EditCctvRecord;
