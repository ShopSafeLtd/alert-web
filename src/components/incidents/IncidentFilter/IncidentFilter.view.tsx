import React from 'react';
import { Button, Col, Input, Row, Select, Typography } from 'antd';

import { IncidentSort } from 'state';
import useStyles from './IncidentFilter.styles';

interface Props {
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  crimeTypesFilter: string[];
  setCrimeTypesFilter: (value: string[]) => void;

  setPeculiarities: (value: string) => void;

  peculiarities: string;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;

  businessesFilter: string[];
  setBusinessesFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  goodsFilter: string[];
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
}

const IncidentFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  crimeTypes,
  tagsLoading,
  clearFilters,
  groupsFilter,
  peculiarities,
  setGroupsFilter,
  setPeculiarities,
  goods,
  goodsFilter,
  setGoodsFilter,
  businesses,
  businessesFilter,
  setBusinessesFilter,
  crimeTypesFilter,
  setCrimeTypesFilter,
  goodsLoading,
  businessesLoading,
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
            <Select.Option value={IncidentSort.createdAtDesc}>
              Newest First
            </Select.Option>
            <Select.Option value={IncidentSort.createdAtAsc}>
              Oldest First
            </Select.Option>
          </Select>
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
            Crime Types
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Crime Types"
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setCrimeTypesFilter}
            value={crimeTypesFilter}
            loading={tagsLoading}
          >
            {crimeTypes.map((tag) => (
              <Select.Option value={tag.value}>{tag.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        Details
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Goods Involved
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Goods Involved"
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setGoodsFilter}
            value={goodsFilter}
            loading={goodsLoading}
          >
            {goods.map((good) => (
              <Select.Option value={good.value}>{good.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            Peculiarities
          </Typography.Paragraph>
          <Input.TextArea
            value={peculiarities}
            onChange={(e) => setPeculiarities(e.target.value)}
            className={classes.select}
          />
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        Locations
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            Incident has happened at...
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Businesses"
            className={classes.select}
            value={businessesFilter}
            onChange={setBusinessesFilter}
            loading={businessesLoading}
            optionLabelProp="textLabel"
            options={businesses.map((item) => ({
              textLabel: item.label,
              label: (
                <div style={{ display: 'inline-block' }} key={item.value}>
                  <Typography.Text>{item.label}</Typography.Text>
                  <div>
                    <Typography.Text>{item.location}</Typography.Text>
                  </div>
                </div>
              ),
              value: item.value,
            }))}
          />
        </Col>
      </Row>
    </>
  );
};

export default IncidentFilter;
