import React from 'react';
import { Button, Col, DatePicker, Form, Row, Select, Typography } from 'antd';
import { SortOrder } from 'graphql/generated';
import type { DateType } from 'types/DataType';
import { FormattedMessage } from 'react-intl';
import type { VehicleFilters } from 'state/data-model';
import moment from 'moment';
import useStyles from './VehicleFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  createdAt: Date;
}

interface Props {
  setOrder: (value: SortOrder) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  setGroupsFilter: (value: string[]) => void;
  clearFilters: () => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  variables: VehicleFilters;
}

const VehicleFilter = ({
  setOrder,
  groups,
  groupsLoading,
  setGroupsFilter,
  clearFilters,
  setCreatedAtFilter,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const { groups: groupsFilter, createdAt: createdAtFilter, order } = variables;

  return (
    <Form<FormData>
      form={form}
      initialValues={{
        createdAt: createdAtFilter
          ? [
              moment(createdAtFilter?.startDate),
              moment(createdAtFilter?.endDate),
            ]
          : undefined,
      }}
    >
      <Row justify="end">
        <Col>
          <Button
            type="text"
            danger
            onClick={() => {
              clearFilters();
              form.setFieldsValue({
                createdAt: [],
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

          <Form.Item name="createdAt" style={{ marginBottom: 0 }}>
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
