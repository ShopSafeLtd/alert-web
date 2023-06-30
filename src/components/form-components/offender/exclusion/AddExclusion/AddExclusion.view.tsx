import React from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import type { Moment } from 'moment';

import type { RangePickerProps } from 'antd/es/date-picker';

import type { BanData } from 'types/DataType';
import BanTypeValues from 'types/enums/ban-type';
import { useIntl } from 'react-intl';

// interface FormData {
//   endDate: Date;
//   startDate: Date;
//   location: string;
//   description: string;
// }

interface Props {
  onSubmit: (value: BanData) => void;
  onClose: () => void;
  saving: boolean;
  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const AddExclusion = ({
  onSubmit,
  onClose,
  saving,
  setStartDate,
  disabledDate,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name="title"
            label={intl.formatMessage({
              defaultMessage: 'Exclusion Title',
              id: '9ej2FR',
            })}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please enter a title for the new exclusion.',
            //   },
            // ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name="type"
            label={intl.formatMessage({ defaultMessage: 'Type', id: '+U6ozc' })}
            tooltip={intl.formatMessage({
              defaultMessage: 'select a type for the exclusions',
              id: 'YO5FlE',
            })}
          >
            <Select options={BanTypeValues} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name={intl.formatMessage({
              defaultMessage: 'Location',
              id: 'rvirM2',
            })}
            label={intl.formatMessage({
              defaultMessage: 'Exclusion location',
              id: 'dJG2/n',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a location for this exclusion',
                  id: 'J1tpDz',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Exclusion Description',
              id: 'rI1Xj8',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={11}>
          <Form.Item
            name="startDate"
            label={intl.formatMessage({
              defaultMessage: 'Start Date',
              id: 'QirE3M',
            })}
            dependencies={['endDate']}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select a start date',
                  id: 'dKMbT0',
                }),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('endDate') < value) {
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          defaultMessage:
                            'The start date cannot be later than the end date!',
                          id: 'djQusS',
                        })
                      )
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker
              disabled={saving}
              onChange={(value) =>
                setStartDate(value ? new Date(value.valueOf()) : null)
              }
            />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            name="endDate"
            label={intl.formatMessage({
              defaultMessage: 'End Date',
              id: 'T4GOiX',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select a end date for the exclusion.',
                  id: 'CpHzB0',
                }),
              },
            ]}
          >
            <DatePicker disabled={saving} disabledDate={disabledDate} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({
                defaultMessage: 'Add Exclusion',
                id: 'QPeZMN',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddExclusion;
