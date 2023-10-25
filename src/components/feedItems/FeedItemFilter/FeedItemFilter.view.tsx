import React from 'react';
import { Button, Col, Row, Select, Typography, DatePicker, Form } from 'antd';
import { SortOrder, Model } from 'graphql/generated';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FeedItemFilters } from 'state/data-model';
import moment from 'moment';
import useStyles from './FeedItemFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;
interface FormData {
  date: Date;
}
interface Props {
  setOrder: (value: SortOrder) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  setGroupsFilter: (value: string[]) => void;
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  variables: FeedItemFilters;
}

const FeedItemFilter = ({
  setOrder,
  groups,
  groupsLoading,
  setTypesFilter,
  setGroupsFilter,
  clearFilters,
  setCreatedAtFilter,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const {
    groups: groupsFilter,
    createdAt: createdAtFilter,
    types: typesFilter,
    order,
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
            type="text"
            danger
            onClick={() => {
              clearFilters();
              form.setFieldsValue({
                date: [],
              });
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Clear Filters',
              id: 'MsGXc3',
            })}
          </Button>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sort Order', id: 'Hw6crD' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
          >
            <Select.Option value={SortOrder.Desc}>
              {intl.formatMessage({
                defaultMessage: 'Newest First',
                id: 'dZYazP',
              })}
            </Select.Option>
            <Select.Option value={SortOrder.Asc}>
              {intl.formatMessage({
                defaultMessage: 'Oldest First',
                id: 'FqI37D',
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
              id: 'hGJYON',
            })}
          </Typography.Paragraph>

          <Form.Item name="date" style={{ marginBottom: 0 }}>
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
            {intl.formatMessage({ defaultMessage: 'Groups', id: 'hzmswI' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
              id: 'hzmswI',
            })}
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
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Types', id: 'kxP9GJ' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Types',
              id: 'kxP9GJ',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setTypesFilter}
            value={typesFilter}
          >
            <Select.Option value={Model.Incident}>
              {intl.formatMessage({ defaultMessage: 'Incident', id: 'zaYxwd' })}
            </Select.Option>
            <Select.Option value={Model.Offender}>
              {intl.formatMessage({ defaultMessage: 'Offender', id: 'AN7Aru' })}
            </Select.Option>
            <Select.Option value={Model.Investigation}>
              {intl.formatMessage({
                defaultMessage: 'Investigation',
                id: 'tNseQe',
              })}
            </Select.Option>
            <Select.Option value={Model.Vehicle}>
              {intl.formatMessage({ defaultMessage: 'Vehicle', id: '4T7son' })}
            </Select.Option>
            <Select.Option value={Model.CrimeGroup}>
              {intl.formatMessage({
                defaultMessage: 'CrimeGroup',
                id: 'zbPKYg',
              })}
            </Select.Option>
            <Select.Option value={Model.Article}>
              {intl.formatMessage({ defaultMessage: 'Article', id: 'jx7Hn3' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default FeedItemFilter;
