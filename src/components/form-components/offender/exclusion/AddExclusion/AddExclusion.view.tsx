import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import type { BanData } from 'types/DataType';

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
import { BanType } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import BanTypeValues from 'types/enums/ban-type';

// interface FormData {
//   endDate: Date;
//   startDate: Date;
//   location: string;
//   description: string;
// }

interface Props {
  disabledDate: RangePickerProps['disabledDate'];
  onClose: () => void;
  onSubmit: (value: BanData) => void;
  saving: boolean;
  setStartDate: (value: Date | Dayjs | null) => void;
}

const AddExclusion = ({
  disabledDate,
  onClose,
  onSubmit,
  saving,
  setStartDate,
}: Props): JSX.Element => {
  const [form] = Form.useForm<BanData>();
  const intl = useIntl();

  const type = Form.useWatch('type', form) as BanType;

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Type' })}
            name="type"
            tooltip={intl.formatMessage({
              defaultMessage: 'select a type for the outcome',
            })}
          >
            <Select disabled={saving} options={BanTypeValues} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={21}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Description',
            })}
            name="description"
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
                label={intl.formatMessage({
                  defaultMessage: 'Duration (Weeks)',
                })}
                name="months"
              >
                <InputNumber disabled={saving} style={{ width: 120 }} />
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
                label={intl.formatMessage({
                  defaultMessage: 'Fine Value',
                })}
                name="fineValue"
              >
                <InputNumber disabled={saving} style={{ width: 120 }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      )}
      {[
        BanType.Cbo,
        BanType.CommunityBan,
        BanType.CourtData,
        BanType.Cpn,
        BanType.Cpw,
        BanType.Other,
        BanType.Pspo,
        BanType.Wip,
      ].includes(type) && (
        <Row gutter={16}>
          {[BanType.Cbo].includes(type) && (
            <Col span={11}>
              <Row gutter={16}>
                <Col span={21}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Duration (Months)',
                    })}
                    name="months"
                  >
                    <InputNumber disabled={saving} style={{ width: 120 }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          )}
          {[
            BanType.CommunityBan,
            BanType.CourtData,
            BanType.Cpn,
            BanType.Cpw,
            BanType.Other,
            BanType.Pspo,
            BanType.Wip,
          ].includes(type) && (
            <Col span={11}>
              <Form.Item
                dependencies={['endDate']}
                label={
                  BanType.CourtData === type
                    ? intl.formatMessage({
                        defaultMessage: 'Date',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Start Date',
                      })
                }
                name="startDate"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please select a start date',
                    }),
                    required: type !== BanType.Other,
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
                label={intl.formatMessage({
                  defaultMessage: 'End Date',
                })}
                name="endDate"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select a end date for the outcome.',
                    }),
                    required: type !== BanType.Other,
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
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
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
