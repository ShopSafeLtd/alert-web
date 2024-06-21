import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import { OffenderSort } from 'state';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { OffenderFilters } from 'state/data-model';
import moment from 'moment';
import useStyles from './OffenderFilter.styles';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import type { SearchBusinessesQuery } from 'graphql/businesses/queries/search-businesses.generated';
import { Age, Build, Gender, Race } from 'graphql/types';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  createdAt: Date;
}

interface Props {
  order: OffenderSort;
  setOrder: (value: OffenderSort) => void;
  setEthnicity: (value: Race[]) => void;
  setAge: (value: Age[]) => void;
  setBuild: (value: Build[]) => void;
  setSex: (value: Gender[]) => void;
  setHair: (value: string) => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setWarnings: (value: string[]) => void;
  setBusinesses: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  variables: OffenderFilters;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  businessData: SearchBusinessesQuery | undefined;
  businessesLoading: boolean;
  publicOffenderDOB: boolean;
}

const OffenderFilter = ({
  order,
  setOrder,
  tags,
  tagsLoading,
  clearFilters,
  setAge,
  setBuild,
  setEthnicity,
  setGroupsFilter,
  setHair,
  setPeculiarities,
  setSex,
  setWarnings,
  businessData,
  setBusinesses,
  businessesLoading,
  setCreatedAtFilter,
  variables,
  publicOffenderDOB,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();

  const {
    groups: groupsFilter,
    businesses,
    createdAt: createdAtFilter,
    peculiarities,
    hair,
    warnings,
    ethnicity,
    age,
    build,
    sex,
  } = variables;
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
                createdAt: [],
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sort Order' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
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
                    startDate: new Date(value[0].valueOf()),
                    endDate: new Date(value[1].valueOf()),
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
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Groups',
            })}
            mode="multiple"
            size="small"
            maxTagCount={2}
            allowClear
            onChange={setGroupsFilter}
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
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Offender Warnings',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setWarnings}
            value={warnings}
            loading={tagsLoading}
          >
            {tags.map((tag) => (
              <Select.Option value={tag.value} key={tag.value}>
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
            placeholder={intl.formatMessage({
              defaultMessage: 'Ethnicity',
            })}
            className={classes.select}
            mode="multiple"
            allowClear
            value={ethnicity}
            onChange={setEthnicity}
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
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Build',
            })}
            className={classes.select}
            value={build}
            onChange={setBuild}
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
              mode="multiple"
              allowClear
              placeholder={intl.formatMessage({
                defaultMessage: 'Age',
              })}
              className={classes.select}
              value={age}
              onChange={setAge}
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
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Sex',
            })}
            className={classes.select}
            value={sex}
            onChange={setSex}
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
            value={hair}
            onChange={(e) => setHair(e.target.value)}
            className={classes.select}
          />
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Characteristics',
            })}
          </Typography.Paragraph>
          <Input.TextArea
            value={peculiarities}
            onChange={(e) => setPeculiarities(e.target.value)}
            className={classes.select}
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
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Businesses',
            })}
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
    </Form>
  );
};

export default OffenderFilter;
