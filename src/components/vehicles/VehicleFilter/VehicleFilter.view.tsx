import React from 'react';
import { Button, Col, DatePicker, Form, Row, Select, Typography } from 'antd';
import { SortOrder } from 'graphql/generated';
import type { DateType } from 'types/DataType';
import { FormattedMessage } from 'react-intl';
import useStyles from './VehicleFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  date: Date;
}

interface Props {
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  clearFilters: () => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
}

const VehicleFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  groupsFilter,
  setGroupsFilter,
  clearFilters,
  setCreatedAtFilter,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();

  return (
    <Form<FormData> form={form}>
      <Row justify="end">
        <Col>
          <Button
            type="text"
            danger
            onClick={() => {
              clearFilters();
              form.setFieldsValue({
                date: [],
              });
            }}
          >
            <FormattedMessage id="MsGXc3" defaultMessage="Clear Filters" />
          </Button>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="Hw6crD" defaultMessage="Sort Order" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
          >
            <Select.Option value={SortOrder.Desc}>
              <FormattedMessage id="dZYazP" defaultMessage="Newest First" />
            </Select.Option>
            <Select.Option value={SortOrder.Asc}>
              <FormattedMessage id="FqI37D" defaultMessage="Oldest First" />
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="hGJYON" defaultMessage="Created Between" />
          </Typography.Paragraph>

          <Form.Item name="date">
            <RangePicker
              className={classes.select}
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    startDate: new Date(value[0].valueOf()),
                    endDate: new Date(value[1].valueOf()),
                  });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            <FormattedMessage id="hzmswI" defaultMessage="Groups" />
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={
              <FormattedMessage id="hzmswI" defaultMessage="Groups" />
            }
            mode="multiple"
            size="small"
            maxTagCount={2}
            allowClear
            loading={groupsLoading}
            onChange={setGroupsFilter}
            value={groupsFilter}
          >
            {groups.map((group) => (
              <Select.Option key={group.value} value={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default VehicleFilter;
