import type { FeedItemFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { Button, Col, DatePicker, Form, Row, Select, Typography } from 'antd';
import { Model, SortOrder } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './FeedItemFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;
interface FormData {
  date: Date;
}
interface Props {
  clearFilters: () => void;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setTypesFilter: (value: Model[]) => void;

  variables: FeedItemFilters;
}

const FeedItemFilter = ({
  clearFilters,
  groups,
  groupsLoading,
  setCreatedAtFilter,
  setGroupsFilter,
  setOrder,
  setTypesFilter,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    types: typesFilter,
  } = variables;

  return (
    <Form
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
            danger
            onClick={() => {
              clearFilters();
              form.setFieldsValue({
                date: [],
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

          <Form.Item name="date" style={{ marginBottom: 0 }}>
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
              <Select.Option key={group.value} value={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Types' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            maxTagCount={2}
            mode="multiple"
            onChange={setTypesFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Types',
            })}
            size="small"
            value={typesFilter}
          >
            <Select.Option value={Model.Incident}>
              {intl.formatMessage({ defaultMessage: 'Incident' })}
            </Select.Option>
            <Select.Option value={Model.Offender}>
              {intl.formatMessage({ defaultMessage: 'Offender' })}
            </Select.Option>
            <Select.Option value={Model.Investigation}>
              {intl.formatMessage({
                defaultMessage: 'Investigation',
              })}
            </Select.Option>
            <Select.Option value={Model.Vehicle}>
              {intl.formatMessage({ defaultMessage: 'Vehicle' })}
            </Select.Option>
            <Select.Option value={Model.CrimeGroup}>
              {intl.formatMessage({
                defaultMessage: 'CrimeGroup',
              })}
            </Select.Option>
            <Select.Option value={Model.Article}>
              {intl.formatMessage({ defaultMessage: 'Article' })}
            </Select.Option>
            <Select.Option value={Model.Ban}>
              {intl.formatMessage({ defaultMessage: 'Ban' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default FeedItemFilter;
