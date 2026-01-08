import type { CctvRecordData } from 'types/DataType';

import { Button, Col, Form, Input, Radio, Row, TimePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  onSubmit: (value: Omit<CctvRecordData, 'id'>) => void;
  saving: boolean;
}

const AddCctvRecord = ({ onClose, onSubmit, saving }: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form<Omit<CctvRecordData, 'id'>>
      initialValues={{
        showFace: false,
        showIncident: false,
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Camera Number',
            })}
            name="cameraNumber"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter the camera number',
                }),
                required: true,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
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
            dependencies={['startTime']}
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
                validator(_, value: dayjs.Dayjs | null) {
                  const start = getFieldValue(
                    'startTime'
                  ) as dayjs.Dayjs | null;
                  if (!value || !start) {
                    return Promise.resolve();
                  }
                  // Compare only time portion to avoid date mismatch issues
                  const startTimeOnly = dayjs(start).format('HH:mm:ss');
                  const endTimeOnly = dayjs(value).format('HH:mm:ss');
                  if (endTimeOnly > startTimeOnly) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({
                        defaultMessage:
                          'End time must be later than start time',
                      })
                    )
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
            <Input.TextArea disabled={saving} />
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

export default AddCctvRecord;
