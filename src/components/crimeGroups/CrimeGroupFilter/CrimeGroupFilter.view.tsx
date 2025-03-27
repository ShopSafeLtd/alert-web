import type { CrimeGroupFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import DatePicker from '#/components/util-components/DatePicker';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { SortOrder } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './CrimeGroupFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;
interface FormData {
  createdAt: Date;
}
interface Props {
  clearFilters: () => void;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  variables: CrimeGroupFilters;
}

const CrimeGroupFilter = ({
  clearFilters,
  groups,
  groupsLoading,
  setCreatedAtFilter,
  setGroupsFilter,
  setOrder,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const { createdAt: createdAtFilter, groups: groupsFilter, order } = variables;
  return (
    <Form<FormData>
      form={form}
      initialValues={{
        createdAt: createdAtFilter
          ? [dayjs(createdAtFilter?.startDate), dayjs(createdAtFilter?.endDate)]
          : undefined,
      }}
    >
      <Row justify="end">
        <Col>
          <Button
            danger
            onClick={() => {
              clearFilters();
              form.setFieldsValue({
                createdAt: [],
              });
            }}
            type="text"
          >
            {intl.formatMessage({
              defaultMessage: 'Clear Filters',
            })}
          </Button>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sort Order' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            onChange={setOrder}
            size="small"
            value={order}
          >
            <Select.Option value={SortOrder.Desc}>
              {intl.formatMessage({
                defaultMessage: 'Newest First',
              })}
            </Select.Option>
            <Select.Option value={SortOrder.Asc}>
              {intl.formatMessage({
                defaultMessage: 'Oldest First',
              })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Created Between',
            })}
          </Typography.Paragraph>

          <Form.Item name="createdAt" style={{ marginBottom: 0 }}>
            <RangePicker
              className={classes.select}
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    endDate: new Date(value[1].valueOf()),
                    startDate: new Date(value[0].valueOf()),
                  });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Groups' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            loading={groupsLoading}
            maxTagCount={2}
            mode="multiple"
            onChange={setGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            size="small"
            value={groupsFilter}
          >
            {groups.map((group) => (
              <Select.Option value={group.value}>{group.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default CrimeGroupFilter;
