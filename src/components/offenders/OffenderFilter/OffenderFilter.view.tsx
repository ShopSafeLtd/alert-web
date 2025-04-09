import type { SearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type { OffenderFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import CrimeTypesSelect from '#/components/form-components/CrimeTypesSelect/CrimeTypesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { Button, Col, Form, Input, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import { Age, Build, Gender, Race } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { OffenderSort } from 'state';

import useStyles from './OffenderFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  createdAt: Date;
}

interface Props {
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
  clearFilters: () => void;
  order: OffenderSort;
  publicOffenderDOB: boolean;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setBusinesses: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setCrimeTypesFilter: (value: string[]) => void;
  setEthnicity: (value: Race[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setHair: (value: string) => void;
  setOrder: (value: OffenderSort) => void;
  setPeculiarities: (value: string) => void;
  setSex: (value: Gender[]) => void;
  setWarnings: (value: string[]) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  variables: OffenderFilters;
}

// TODO change to businesses select component instead of doing a search
const OffenderFilter = ({
  businessData,
  businessesLoading,
  clearFilters,
  order,
  publicOffenderDOB,
  setAge,
  setBuild,
  setBusinesses,
  setCreatedAtFilter,
  setCrimeTypesFilter,
  setEthnicity,
  setGroupsFilter,
  setHair,
  setOrder,
  setPeculiarities,
  setSex,
  setWarnings,
  tags,
  tagsLoading,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();

  const {
    age,
    build,
    businesses,
    createdAt: createdAtFilter,
    crimeTypes,
    ethnicity,
    groups: groupsFilter,
    hair,
    peculiarities,
    sex,
    warnings,
  } = variables;
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sort Order' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            onChange={setOrder}
            size="small"
            value={order}
          >
            <Select.Option value={OffenderSort.updatedAtDesc}>
              {intl.formatMessage({
                defaultMessage: 'Newest First',
              })}
            </Select.Option>
            <Select.Option value={OffenderSort.updatedAtAsc}>
              {intl.formatMessage({
                defaultMessage: 'Oldest First',
              })}
            </Select.Option>
            <Select.Option value={OffenderSort.incidentValueDesc}>
              {intl.formatMessage({
                defaultMessage: 'Most Incidents First',
              })}
            </Select.Option>
            <Select.Option value={OffenderSort.incidentValueAsc}>
              {intl.formatMessage({
                defaultMessage: 'Least Incidents First',
              })}
            </Select.Option>

            <Select.Option value={OffenderSort.noIncidentDesc}>
              {intl.formatMessage({
                defaultMessage: 'Highest Loss First',
              })}
            </Select.Option>

            <Select.Option value={OffenderSort.noIncidentAsc}>
              {intl.formatMessage({
                defaultMessage: 'Lowest Loss First',
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
        <Col span={12}>
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Offender Warnings',
            })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            loading={tagsLoading}
            maxTagCount={2}
            mode="multiple"
            onChange={setWarnings}
            placeholder={intl.formatMessage({
              defaultMessage: 'Offender Warnings',
            })}
            size="small"
            value={warnings}
          >
            {tags.map((tag) => (
              <Select.Option key={tag.value} value={tag.value}>
                {tag.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        {intl.formatMessage({ defaultMessage: 'Description' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Ethnicity' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            mode="multiple"
            onChange={setEthnicity}
            placeholder={intl.formatMessage({
              defaultMessage: 'Ethnicity',
            })}
            value={ethnicity}
          >
            <Select.Option value={Race.Ic1}>
              {intl.formatMessage({
                defaultMessage: 'IC1 - North European',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic2}>
              {intl.formatMessage({
                defaultMessage: 'IC2 - South European',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic3}>
              {intl.formatMessage({
                defaultMessage: 'IC3 - Black',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic4}>
              {intl.formatMessage({
                defaultMessage: 'IC4 - South Asian',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic5}>
              {intl.formatMessage({
                defaultMessage: 'IC5 - Southeast Asian',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic6}>
              {intl.formatMessage({
                defaultMessage: 'IC6 - North African or Arab',
              })}
            </Select.Option>
            <Select.Option value={Race.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown' })}
            </Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Build' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            mode="multiple"
            onChange={setBuild}
            placeholder={intl.formatMessage({
              defaultMessage: 'Build',
            })}
            value={build}
          >
            <Select.Option value={Build.Small}>
              {intl.formatMessage({ defaultMessage: 'Small' })}
            </Select.Option>
            <Select.Option value={Build.Medium}>
              {intl.formatMessage({ defaultMessage: 'Medium' })}
            </Select.Option>
            <Select.Option value={Build.Large}>
              {intl.formatMessage({ defaultMessage: 'Large' })}
            </Select.Option>
            <Select.Option value={Build.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        {publicOffenderDOB && (
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              {intl.formatMessage({ defaultMessage: 'Age' })}
            </Typography.Paragraph>
            <Select
              allowClear
              className={classes.select}
              mode="multiple"
              onChange={setAge}
              placeholder={intl.formatMessage({
                defaultMessage: 'Age',
              })}
              value={age}
            >
              <Select.Option value={Age.UnderEighteen}>
                {intl.formatMessage({
                  defaultMessage: 'Under 18',
                })}
              </Select.Option>
              <Select.Option value={Age.EighteenThirty}>
                {intl.formatMessage({
                  defaultMessage: '18 - 30',
                })}
              </Select.Option>
              <Select.Option value={Age.ThirtyForty}>
                {intl.formatMessage({
                  defaultMessage: '30 - 40',
                })}
              </Select.Option>
              <Select.Option value={Age.FortyFifty}>
                {intl.formatMessage({
                  defaultMessage: '40 - 50',
                })}
              </Select.Option>
              <Select.Option value={Age.FiftySixty}>
                {intl.formatMessage({
                  defaultMessage: '50 - 60',
                })}
              </Select.Option>
              <Select.Option value={Age.SixtySeventy}>
                {intl.formatMessage({
                  defaultMessage: '60 - 70',
                })}
              </Select.Option>
              <Select.Option value={Age.SeventyEighty}>
                {intl.formatMessage({
                  defaultMessage: '70 - 80',
                })}
              </Select.Option>
              <Select.Option value={Age.OverEighty}>
                {intl.formatMessage({
                  defaultMessage: 'Over 80',
                })}
              </Select.Option>
              <Select.Option value={Age.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                })}
              </Select.Option>
            </Select>
          </Col>
        )}
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sex' })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            mode="multiple"
            onChange={setSex}
            placeholder={intl.formatMessage({
              defaultMessage: 'Sex',
            })}
            value={sex}
          >
            <Select.Option value={Gender.Female}>
              {intl.formatMessage({ defaultMessage: 'Female' })}
            </Select.Option>
            <Select.Option value={Gender.Male}>
              {intl.formatMessage({ defaultMessage: 'Male' })}
            </Select.Option>
            <Select.Option value={Gender.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Hair' })}
          </Typography.Paragraph>
          <Input.TextArea
            className={classes.select}
            onChange={(e) => setHair(e.target.value)}
            value={hair}
          />
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Characteristics',
            })}
          </Typography.Paragraph>
          <Input.TextArea
            className={classes.select}
            onChange={(e) => setPeculiarities(e.target.value)}
            value={peculiarities}
          />
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        {intl.formatMessage({ defaultMessage: 'Incidents' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Offender has incidents at...',
            })}
          </Typography.Paragraph>
          <Select
            allowClear
            className={classes.select}
            loading={businessesLoading}
            mode="multiple"
            onChange={setBusinesses}
            optionLabelProp="textLabel"
            options={businessData?.listBusinesses.businesses.map((item) => ({
              label: (
                <div key={item.id} style={{ display: 'inline-block' }}>
                  <Typography.Text>{item.name}</Typography.Text>
                  <div>
                    <Typography.Text>{item.locations[0]?.full}</Typography.Text>
                  </div>
                </div>
              ),
              textLabel: item.name,
              value: item.id,
            }))}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Businesses',
            })}
            value={businesses}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Crime Types',
            })}
          </Typography.Paragraph>
          <CrimeTypesSelect
            allowClear
            className={classes.select}
            mode="multiple"
            onChange={setCrimeTypesFilter}
            placeholder={intl.formatMessage({
              defaultMessage: 'Crime Types',
            })}
            value={crimeTypes}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default OffenderFilter;
