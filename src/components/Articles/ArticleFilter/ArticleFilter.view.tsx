import type { ArticleFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
// TP
import dayjs from 'dayjs';
import { ArticlePriority, CompleteStatus, SortOrder } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './ArticleFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  date: Date;
}

interface Props {
  clearFilters: () => void;
  filterVariables: ArticleFilters;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setPriorityFilter: (value: ArticlePriority[]) => void;
  setStatus: (value: CompleteStatus[]) => void;
}

const ArticleFilter = ({
  clearFilters,
  filterVariables,
  setCreatedAtFilter,
  setGroupsFilter,
  setOrder,
  setPriorityFilter,
  setStatus,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();

  const {
    createdAt: createdAtFilter,
    groups: groupsFilter,
    order,
    priorities: priorityFilter,
    status,
  } = filterVariables;

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
                else setCreatedAtFilter(undefined);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Status' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            maxTagCount={2}
            mode="multiple"
            onChange={setStatus}
            placeholder={intl.formatMessage({
              defaultMessage: 'Priority',
            })}
            size="small"
            value={status}
          >
            <Select.Option value={CompleteStatus.Completed}>
              {intl.formatMessage({ defaultMessage: 'Completed' })}
            </Select.Option>
            <Select.Option value={CompleteStatus.InProgress}>
              {intl.formatMessage({ defaultMessage: 'InProgress' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Groups' })}
          </Typography.Paragraph>
          <GroupsSelect
            allowClear
            className={classes.select}
            maxTagCount={2}
            mode="multiple"
            onChange={setGroupsFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            size="small"
            value={groupsFilter}
          />
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Priority' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            maxTagCount={2}
            mode="multiple"
            onChange={setPriorityFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Priority',
            })}
            size="small"
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
