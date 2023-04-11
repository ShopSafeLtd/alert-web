import React from 'react';
import { Button, Col, Row, Select, Typography, DatePicker } from 'antd';

import { FeedItemSort } from 'state';
import { Model } from 'graphql/generated';
import type { DateType } from 'types/DataType';
import useStyles from './FeedItemFilter.styles';

const { RangePicker } = DatePicker;

interface Props {
  order: FeedItemSort;
  setOrder: (value: FeedItemSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  typesFilter: Model[];
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
}

const FeedItemFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  typesFilter,
  setTypesFilter,
  groupsFilter,
  setGroupsFilter,
  clearFilters,
  setCreatedAtFilter,
}: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Row justify="end">
        <Col>
          <Button type="text" danger onClick={clearFilters}>
            Clear Filters
          </Button>
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        FeedItems
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Sort Order
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
          >
            <Select.Option value={FeedItemSort.updatedAtDesc}>
              Newest First
            </Select.Option>
            <Select.Option value={FeedItemSort.updatedAtAsc}>
              Oldest First
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Created Between
          </Typography.Paragraph>

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
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Groups
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Groups"
            mode="multiple"
            size="small"
            maxTagCount={2}
            allowClear
            loading={groupsLoading}
            onChange={setGroupsFilter}
            value={groupsFilter}
          >
            {groups.map((group) => (
              <Select.Option value={group.value}>{group.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Types
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Types"
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setTypesFilter}
            value={typesFilter}
          >
            <Select.Option value={Model.Incident}>Incident</Select.Option>
            <Select.Option value={Model.Offender}>Offender</Select.Option>
            <Select.Option value={Model.Investigation}>
              Investigation
            </Select.Option>
            <Select.Option value={Model.Vehicle}>Vehicle</Select.Option>
            <Select.Option value={Model.CrimeGroup}>CrimeGroup</Select.Option>
            <Select.Option value={Model.Article}>Article</Select.Option>
          </Select>
        </Col>
      </Row>
    </>
  );
};

export default FeedItemFilter;
