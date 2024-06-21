import React from 'react';
import { Button, Col, Row, Select, Typography, DatePicker, Form } from 'antd';

import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import moment from 'moment';
import type { ArticleFilters } from 'state/data-model';
import useStyles from './ArticleFilter.styles';
import { ArticlePriority, SortOrder } from 'graphql/types';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  date: Date;
}

interface Props {
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setOrder: (value: SortOrder) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  filterVariables: ArticleFilters;
}

const ArticleFilter = ({
  clearFilters,
  setGroupsFilter,
  setPriorityFilter,
  setCreatedAtFilter,
  setOrder,
  groups,
  groupsLoading,
  filterVariables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();

  const {
    groups: groupsFilter,
    createdAt: createdAtFilter,
    order,
    priorities: priorityFilter,
  } = filterVariables;

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
                date: [],
              });
            }}
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
            value={order}
            onChange={setOrder}
            size="small"
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
          <Form.Item name="date">
            <RangePicker
              className={classes.select}
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setCreatedAtFilter({
                    startDate: new Date(value[0].valueOf()),
                    endDate: new Date(value[1].valueOf()),
                  });
                else setCreatedAtFilter(undefined);
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
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
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
              <Select.Option value={group.value} key={group.value}>
                {group.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Priority' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Priority',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setPriorityFilter}
            value={priorityFilter}
          >
            <Select.Option value={ArticlePriority.High}>
              {intl.formatMessage({ defaultMessage: 'High' })}
            </Select.Option>
            <Select.Option value={ArticlePriority.Medium}>
              {intl.formatMessage({ defaultMessage: 'Medium' })}
            </Select.Option>
            <Select.Option value={ArticlePriority.Normal}>
              {intl.formatMessage({ defaultMessage: 'Normal' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default ArticleFilter;
