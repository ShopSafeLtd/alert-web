import React from 'react';
import { Button, Col, Row, Select, Typography, DatePicker, Form } from 'antd';
import { SortOrder, ArticlePriority } from 'graphql/generated';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import useStyles from './ArticleFilter.styles';

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
  priorityFilter: ArticlePriority[];
  setPriorityFilter: (value: ArticlePriority[]) => void;
  clearFilters: () => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
}

const ArticleFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  priorityFilter,
  setPriorityFilter,
  groupsFilter,
  setGroupsFilter,
  clearFilters,
  setCreatedAtFilter,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();

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
            {intl.formatMessage({ defaultMessage: 'Priority', id: '8lCjAM' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Priority',
              id: '8lCjAM',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setPriorityFilter}
            value={priorityFilter}
          >
            <Select.Option value={ArticlePriority.High}>
              {intl.formatMessage({ defaultMessage: 'High', id: 'AxMhQr' })}
            </Select.Option>
            <Select.Option value={ArticlePriority.Medium}>
              {intl.formatMessage({ defaultMessage: 'Medium', id: 'ovJ26C' })}
            </Select.Option>
            <Select.Option value={ArticlePriority.Normal}>
              {intl.formatMessage({ defaultMessage: 'Normal', id: 'myq2ZL' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
    </Form>
  );
};

export default ArticleFilter;
