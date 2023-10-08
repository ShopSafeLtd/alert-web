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
import { IncidentSort } from 'state';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { IncidentFilters } from 'state/data-model';
import moment from 'moment';
import useStyles from './IncidentFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;
interface FormData {
  date: Date;
  createdAt: Date;
}
interface Props {
  order: IncidentSort;
  setOrder: (value: IncidentSort) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  setCrimeTypesFilter: (value: string[]) => void;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;
  setGroupsFilter: (value: string[]) => void;
  setBusinessesFilter: (value: string[]) => void;
  businesses: { value: string; label: string; location: string }[];
  goods: { value: string; label: string }[];
  setGoodsFilter: (value: string[]) => void;
  businessesLoading: boolean;
  goodsLoading: boolean;
  setIncidentDateFilter: (value: DateType | undefined) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  variables: IncidentFilters;
}

const IncidentFilter = ({
  order,
  setOrder,
  groups,
  groupsLoading,
  crimeTypes,
  tagsLoading,
  clearFilters,
  setGroupsFilter,
  setPeculiarities,
  goods,
  setGoodsFilter,
  businesses,
  setBusinessesFilter,
  setCrimeTypesFilter,
  goodsLoading,
  businessesLoading,
  setCreatedAtFilter,
  setIncidentDateFilter,
  variables,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  const {
    crimeTypes: crimeTypesFilter,
    groups: groupsFilter,
    businesses: businessesFilter,
    goods: goodsFilter,
    createdAt: createdAtFilter,
    incidentDate: incidentDateFilter,
    peculiarities,
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
        date: incidentDateFilter
          ? [
              moment(incidentDateFilter?.startDate),
              moment(incidentDateFilter?.endDate),
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
                createdAt: [],
              });
            }}
          >
            {intl.formatMessage({
              id: 'MsGXc3',
              defaultMessage: 'Clear Filters',
            })}
          </Button>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({ id: 'Hw6crD', defaultMessage: 'Sort Order' })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            value={order}
            onChange={setOrder}
            size="small"
          >
            <Select.Option value={IncidentSort.createdAtDesc}>
              {intl.formatMessage({
                id: 'dZYazP',
                defaultMessage: 'Newest First',
              })}
            </Select.Option>
            <Select.Option value={IncidentSort.createdAtAsc}>
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
              id: 'hGJYON',
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
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Occurred Between',
              id: '2u26fg',
            })}
          </Typography.Paragraph>
          <Form.Item name="date" style={{ marginBottom: 0 }}>
            <RangePicker
              className={classes.select}
              onChange={(value) => {
                if (value && value[0] && value[1])
                  setIncidentDateFilter({
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
              <Select.Option value={group.value}>{group.label}</Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Crime Types',
              id: 'Piba4q',
            })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Crime Types',
              id: 'Piba4q',
            })}
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
        {intl.formatMessage({ defaultMessage: 'Details', id: 'Lv0zJu' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Goods Involved',
              id: 'oXvpCQ',
            })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Goods Involved',
              id: 'oXvpCQ',
            })}
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
        {intl.formatMessage({ defaultMessage: 'Locations', id: 'qGb+T3' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Incident has happened at...',
              id: 'ZNawcf',
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
    </Form>
  );
};

export default IncidentFilter;
