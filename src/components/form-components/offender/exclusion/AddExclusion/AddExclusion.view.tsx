import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import type { Moment } from 'moment';

import type { RangePickerProps } from 'antd/es/date-picker';
import type { BanData } from 'types/DataType';
import BanTypeValues from 'types/enums/ban-type';
import { useIntl } from 'react-intl';
import { BanType } from 'graphql/types';

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
            label={intl.formatMessage({ defaultMessage: 'Type' })}
            tooltip={intl.formatMessage({
              defaultMessage: 'select a type for the outcome',
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
                  defaultMessage: 'Duration (Weeks)',
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
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Start Date',
                      })
                }
                dependencies={['endDate']}
                rules={[
                  {
                    required: type !== BanType.Other,
                    message: intl.formatMessage({
                      defaultMessage: 'Please select a start date',
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
                })}
                rules={[
                  {
                    required: type !== BanType.Other,
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a end date for the outcome.',
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
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
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
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default AddExclusion;
