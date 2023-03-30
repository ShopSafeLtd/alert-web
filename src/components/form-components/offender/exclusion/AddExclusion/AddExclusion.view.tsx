import React from 'react';
import { Button, Col, Form, Input, Row, DatePicker, Select } from 'antd';
import type { Moment } from 'moment';

import type { RangePickerProps } from 'antd/es/date-picker';

import type { BanData } from 'types/DataType';
import BanTypeValues from 'types/enums/ban-type';

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
}: Props): JSX.Element => (
  <Form layout="vertical" onFinish={onSubmit}>
    <Row gutter={16}>
      <Col span={11}>
        <Form.Item
          name="startDate"
          label="Start Date"
          dependencies={['endDate']}
          rules={[
            {
              required: true,
              message: 'Please select a start date for the new exclusion.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (getFieldValue('endDate') < value) {
                  return Promise.reject(
                    new Error(
                      'The start date cannot be later than the end date!'
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
          label="End Date"
          rules={[
            {
              required: true,
              message: 'Please select a end date for the new exclusion.',
            },
          ]}
        >
          <DatePicker disabled={saving} disabledDate={disabledDate} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={21}>
        <Form.Item
          name="type"
          label="Type"
          tooltip="select a ban type for the new exclusion."
        >
          <Select options={BanTypeValues} disabled={saving} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={21}>
        <Form.Item
          name="location"
          label="Exclusion Location "
          rules={[
            {
              required: true,
              message: 'Please enter a location for the new exclusion.',
            },
          ]}
        >
          <Input disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={21}>
        <Form.Item name="description" label="Exclusion Description">
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item>
      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Button disabled={saving} onClick={onClose}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            htmlType="submit"
            disabled={saving}
            loading={saving}
          >
            Add Exclusion
          </Button>
        </Col>
      </Row>
    </Form.Item>
  </Form>
);
export default AddExclusion;
