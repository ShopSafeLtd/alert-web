import React from 'react';
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Typography,
  DatePicker,
  Form,
} from 'antd';
import type { SearchBusinessesQuery } from 'graphql/generated';
import { Role, Age, Build, Gender, Race } from 'graphql/generated';
import { OffenderSort, useStoreState } from 'state';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import useStyles from './OffenderFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;
interface FormData {
  date: Date;
}
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
  setCreatedAtFilter: (value: DateType | undefined) => void;
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
  setCreatedAtFilter,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sort Order', id: 'Hw6crD' })}
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
                id: 'dZYazP',
              })}
            </Select.Option>
            <Select.Option value={OffenderSort.updatedAtAsc}>
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
        <Col span={12}>
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
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Offender Warnings',
              id: '1jRWJS',
            })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Offender Warnings',
              id: '1jRWJS',
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
        {intl.formatMessage({ defaultMessage: 'Description', id: 'Q8Qw5B' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Ethnicity', id: 'XtCAFo' })}
          </Typography.Paragraph>
          <Select
            placeholder={intl.formatMessage({
              defaultMessage: 'Ethnicity',
              id: 'XtCAFo',
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
                id: 'ZbGHgq',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic2}>
              {intl.formatMessage({
                defaultMessage: 'IC2 - South European',
                id: 'qDNJ3C',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic3}>
              {intl.formatMessage({
                defaultMessage: 'IC3 - Black',
                id: 'k0NwMh',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic4}>
              {intl.formatMessage({
                defaultMessage: 'IC4 - South Asian',
                id: 'nok2Wh',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic5}>
              {intl.formatMessage({
                defaultMessage: 'IC5 - Southeast Asian',
                id: 'u7exuh',
              })}
            </Select.Option>
            <Select.Option value={Race.Ic6}>
              {intl.formatMessage({
                defaultMessage: 'IC6 - North African or Arab',
                id: 'V2hDQr',
              })}
            </Select.Option>
            <Select.Option value={Race.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown', id: '5jeq8P' })}
            </Select.Option>
          </Select>
        </Col>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Build', id: 'RSctv1' })}
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Build',
              id: 'RSctv1',
            })}
            className={classes.select}
            value={build}
            onChange={setBuild}
          >
            <Select.Option value={Build.Small}>
              {intl.formatMessage({ defaultMessage: 'Small', id: 'BPnT3T' })}
            </Select.Option>
            <Select.Option value={Build.Medium}>
              {intl.formatMessage({ defaultMessage: 'Medium', id: 'ovJ26C' })}
            </Select.Option>
            <Select.Option value={Build.Large}>
              {intl.formatMessage({ defaultMessage: 'Large', id: '/06iwc' })}
            </Select.Option>
            <Select.Option value={Build.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown', id: '5jeq8P' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        {publicOffenderDOB && (
          <Col span={12}>
            <Typography.Paragraph className={classes.selectTitle}>
              {intl.formatMessage({ defaultMessage: 'Age', id: '9oNQSC' })}
            </Typography.Paragraph>
            <Select
              mode="multiple"
              allowClear
              placeholder={intl.formatMessage({
                defaultMessage: 'Age',
                id: '9oNQSC',
              })}
              className={classes.select}
              value={age}
              onChange={setAge}
            >
              <Select.Option value={Age.UnderEighteen}>
                {intl.formatMessage({
                  defaultMessage: 'Under 18',
                  id: 'Cwx1GS',
                })}
              </Select.Option>
              <Select.Option value={Age.EighteenThirty}>
                {intl.formatMessage({
                  defaultMessage: '18 - 30',
                  id: '088rlR',
                })}
              </Select.Option>
              <Select.Option value={Age.ThirtyForty}>
                {intl.formatMessage({
                  defaultMessage: '30 - 40',
                  id: 'cENhUd',
                })}
              </Select.Option>
              <Select.Option value={Age.FortyFifty}>
                {intl.formatMessage({
                  defaultMessage: '40 - 50',
                  id: 'FEg968',
                })}
              </Select.Option>
              <Select.Option value={Age.FiftySixty}>
                {intl.formatMessage({
                  defaultMessage: '50 - 60',
                  id: 'xuMURn',
                })}
              </Select.Option>
              <Select.Option value={Age.SixtySeventy}>
                {intl.formatMessage({
                  defaultMessage: '60 - 70',
                  id: 'W8pA9z',
                })}
              </Select.Option>
              <Select.Option value={Age.SeventyEighty}>
                {intl.formatMessage({
                  defaultMessage: '70 - 80',
                  id: 'yjJSPV',
                })}
              </Select.Option>
              <Select.Option value={Age.OverEighty}>
                {intl.formatMessage({
                  defaultMessage: 'Over 80',
                  id: 'oFu9sf',
                })}
              </Select.Option>
              <Select.Option value={Age.Unknown}>
                {intl.formatMessage({
                  defaultMessage: 'Unknown',
                  id: '5jeq8P',
                })}
              </Select.Option>
            </Select>
          </Col>
        )}
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Sex', id: 'eWJHGp' })}
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Sex',
              id: 'eWJHGp',
            })}
            className={classes.select}
            value={sex}
            onChange={setSex}
          >
            <Select.Option value={Gender.Female}>
              {intl.formatMessage({ defaultMessage: 'Female', id: '74BYXL' })}
            </Select.Option>
            <Select.Option value={Gender.Male}>
              {intl.formatMessage({ defaultMessage: 'Male', id: 'jIbAky' })}
            </Select.Option>
            <Select.Option value={Gender.Unknown}>
              {intl.formatMessage({ defaultMessage: 'Unknown', id: '5jeq8P' })}
            </Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ defaultMessage: 'Hair', id: 'e4YBbX' })}
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
              defaultMessage: 'Peculiarities',
              id: '9s+ZmX',
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
        {intl.formatMessage({ defaultMessage: 'Incidents', id: 'mtr3R4' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Offender has incidents at...',
              id: 'xPGy5S',
            })}
          </Typography.Paragraph>
          <Select
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Businesses',
              id: 'MZynHZ',
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
