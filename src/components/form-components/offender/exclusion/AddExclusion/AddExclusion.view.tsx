import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  InputNumber,
} from 'antd';
import type { Moment } from 'moment';

import type { RangePickerProps } from 'antd/es/date-picker';
import type { BanData } from 'types/DataType';
import BanTypeValues from 'types/enums/ban-type';
import { useIntl } from 'react-intl';
import { BanType } from 'graphql/generated';

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
  const [form] = Form.useForm<BanData>();
  const intl = useIntl();

  const type = Form.useWatch('type', form) as BanType;

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name="type"
            label={intl.formatMessage({ defaultMessage: 'Type', id: '+U6ozc' })}
            tooltip={intl.formatMessage({
              defaultMessage: 'select a type for the outcome',
              id: 'WI+gQZ',
            })}
          >
            <Select options={BanTypeValues} disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      {[BanType.PrisonSentence, BanType.SuspendedSentence].includes(type) && (
        <Col span={11}>
          <Row gutter={16}>
            <Col span={21}>
              <Form.Item
                name="months"
                label={intl.formatMessage({
                  defaultMessage: 'Duration (Months)',
                  id: 'u5MbA8',
                })}
              >
                <InputNumber style={{ width: 120 }} disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      )}
      {[BanType.Fine].includes(type) && (
        <Col span={11}>
          <Row gutter={16}>
            <Col span={21}>
              <Form.Item
                name="fineValue"
                label={intl.formatMessage({
                  defaultMessage: 'Fine Value',
                  id: 'l2lAwm',
                })}
              >
                <InputNumber style={{ width: 120 }} disabled={saving} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      )}
      {[
        BanType.Cbo,
        BanType.CommunityBan,
        BanType.Cpw,
        BanType.Cpn,
        BanType.Pspo,
        BanType.Wip,
        BanType.Other,
        BanType.CourtData,
      ].includes(type) && (
        <Row gutter={16}>
          {[BanType.Cbo].includes(type) && (
            <Col span={11}>
              <Row gutter={16}>
                <Col span={21}>
                  <Form.Item
                    name="months"
                    label={intl.formatMessage({
                      defaultMessage: 'Duration (Months)',
                      id: 'u5MbA8',
                    })}
                  >
                    <InputNumber style={{ width: 120 }} disabled={saving} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
          {[
            BanType.CommunityBan,
            BanType.Cpw,
            BanType.Cpn,
            BanType.Pspo,
            BanType.Wip,
            BanType.Other,
            BanType.CourtData,
          ].includes(type) && (
            <Col span={11}>
              <Form.Item
                name="startDate"
                label={
                  BanType.CourtData === type
                    ? intl.formatMessage({
                        defaultMessage: 'Date',
                        id: 'P7PLVj',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Start Date',
                        id: 'QirE3M',
                      })
                }
                dependencies={['endDate']}
                rules={[
                  {
                    required: type !== BanType.Other,
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
          )}

          {type !== BanType.CourtData && (
            <Col span={11}>
              <Form.Item
                name="endDate"
                label={intl.formatMessage({
                  defaultMessage: 'End Date',
                  id: 'T4GOiX',
                })}
                rules={[
                  {
                    required: type !== BanType.Other,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a end date for the outcome.',
                      id: 'r/aQ+Q',
                    }),
                  },
                ]}
              >
                <DatePicker disabled={saving} disabledDate={disabledDate} />
              </Form.Item>
            </Col>
          )}
        </Row>
      )}

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
                defaultMessage: 'Add Outcome',
                id: 'HQnZ2l',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddExclusion;
