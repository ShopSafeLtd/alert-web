import React from 'react';
import { Button, Col, Input, Row, Select, Typography } from 'antd';
import type { SearchBusinessesQuery } from 'graphql/generated';
import { Age, Build, Gender, Race } from 'graphql/generated';
import { OffenderSort } from 'state';
import useStyles from './OffenderFilter.styles';

interface Props {
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  ethnicity: Race[];
  setEthnicity: (value: Race[]) => void;
  age: Age[];
  setAge: (value: Age[]) => void;
  build: Build[];
  setBuild: (value: Build[]) => void;
  sex: Gender[];
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  hair: string;
  peculiarities: string;
  clearFilters: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  warnings: string[];
  setWarnings: (value: string[]) => void;
  businesses: string[];
  setBusinesses: (value: string[]) => void;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
}

const OffenderFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  tags,
  tagsLoading,
  age,
  build,
  clearFilters,
  ethnicity,
  groupsFilter,
  hair,
  peculiarities,
  setAge,
  setBuild,
  setEthnicity,
  setGroupsFilter,
  setHair,
  setPeculiarities,
  setSex,
  setWarnings,
  sex,
  warnings,
  businessData,
  businesses,
  setBusinesses,
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Sort Order
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
          >
            <Select.Option value={OffenderSort.updatedAtDesc}>
              Newest First
            </Select.Option>
            <Select.Option value={OffenderSort.updatedAtAsc}>
              Oldest First
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Offender Warnings
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder="Offender Warnings "
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setWarnings}
            value={warnings}
            loading={tagsLoading}
          >
            {tags.map((tag) => (
              <Select.Option value={tag.value}>{tag.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        Description
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Ethnicity
          </Typography.Paragraph>
          <Select
            placeholder="Ethnicity"
            className={classes.select}
            mode="multiple"
            allowClear
            value={ethnicity}
            onChange={setEthnicity}
          >
            <Select.Option value={Race.Ic1}>IC1 - North European</Select.Option>
            <Select.Option value={Race.Ic2}>IC2 - South European</Select.Option>
            <Select.Option value={Race.Ic3}>IC3 - Black</Select.Option>
            <Select.Option value={Race.Ic4}>IC - South Asian4</Select.Option>
            <Select.Option value={Race.Ic5}>
              IC5 - Southeast Asian
            </Select.Option>
            <Select.Option value={Race.Ic6}>
              IC6 - North African or Arab
            </Select.Option>
            <Select.Option value={Race.Unknown}>Unknown</Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Build
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Build"
            className={classes.select}
            value={build}
            onChange={setBuild}
          >
            <Select.Option value={Build.Small}>Small</Select.Option>
            <Select.Option value={Build.Medium}>Medium</Select.Option>
            <Select.Option value={Build.Large}>Large</Select.Option>
            <Select.Option value={Build.Unknown}>Unknown</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Age
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Age"
            className={classes.select}
            value={age}
            onChange={setAge}
          >
            <Select.Option value={Age.UnderEighteen}>Under 18</Select.Option>
            <Select.Option value={Age.EighteenThirty}>18 - 30</Select.Option>
            <Select.Option value={Age.ThirtyForty}>30 - 40</Select.Option>
            <Select.Option value={Age.FortyFifty}>40 - 50</Select.Option>
            <Select.Option value={Age.FiftySixty}>50 - 60</Select.Option>
            <Select.Option value={Age.SixtySeventy}>60 - 70</Select.Option>
            <Select.Option value={Age.SeventyEighty}>70 - 80</Select.Option>
            <Select.Option value={Age.OverEighty}>Over 80</Select.Option>
            <Select.Option value={Age.Unknown}>Unknown</Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Sex
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Sex"
            className={classes.select}
            value={sex}
            onChange={setSex}
          >
            <Select.Option value={Gender.Female}>Female</Select.Option>
            <Select.Option value={Gender.Male}>Male</Select.Option>
            <Select.Option value={Gender.Unknown}>Unknown</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            Hair
          </Typography.Paragraph>
          <Input.TextArea
            value={hair}
            onChange={(e) => setHair(e.target.value)}
            className={classes.select}
          />
        </Col>
        <Col span={12}>
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
        Incidents
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            Offender has incidents at...
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder="Select Businesses"
            className={classes.select}
            value={businesses}
            onChange={setBusinesses}
            loading={businessesLoading}
            optionLabelProp="textLabel"
            options={businessData?.listBusinesses.businesses.map((item) => ({
              textLabel: item.name,
              label: (
                <div style={{ display: 'inline-block' }} key={item.id}>
                  <Typography.Text>{item.name}</Typography.Text>
                  <div>
                    <Typography.Text>{item.locations[0]?.full}</Typography.Text>
                  </div>
                </div>
              ),
              value: item.id,
            }))}
          />
        </Col>
      </Row>
    </>
  );
};

export default OffenderFilter;
