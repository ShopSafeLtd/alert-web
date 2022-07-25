import React from 'react';
import { BanQuery } from 'graphql/generated';
import { Button, Col, DatePicker, Form, Input, Row, Skeleton } from 'antd';
import moment from 'moment';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';

interface FormData {
  endDate: Date;
  startDate: Date;
  location: string;
  description: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  data: BanQuery | undefined;
  loading: boolean;
  saving: boolean;
  setStartDate: (value: Moment | Date | null) => void;
  disabledDate: RangePickerProps['disabledDate'];
}

const EditExclusion = ({
  onSubmit,
  onClose,
  data,
  loading,
  saving,
  setStartDate,
  disabledDate,
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <Form
      initialValues={{
        startDate: moment(data?.ban?.startDate, 'YYYY-MM-DD'),
        endDate: moment(data?.ban?.endDate, 'YYYY-MM-DD'),
        location: data?.ban?.location,
        description: data?.ban?.description || '',
      }}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={11}>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              {
                required: true,
                message: 'Please select a start date for the new exclusion.',
              },
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
            <Input disabled={saving} />
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
              save
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );

export default EditExclusion;
