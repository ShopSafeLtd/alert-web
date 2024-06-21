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
import { IncidentSort, useStoreActions, useStoreState } from 'state';
import type { DateType } from 'types/DataType';
import { useIntl } from 'react-intl';
import moment from 'moment';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import useStyles from './IncidentFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  date: Date;
  createdAt: Date;
}

interface Props {
  crimeTypes: { value: string; label: string }[];
  tagsLoading: boolean;
  setPeculiarities: (value: string) => void;
  clearFilters: () => void;

  goods: { value: string; label: string }[];

  goodsLoading: boolean;
}

const IncidentFilter = ({
  crimeTypes,
  tagsLoading,
  clearFilters,
  setPeculiarities,
  goods,

  goodsLoading,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [form] = useForm<FormData>();
  const intl = useIntl();
  // const setIncidentPriority = useStoreActions(
  //   (actions) => actions.data.setIncidentPriority
  // );

  const order = useStoreState((state) => state.data.incidents.order);
  const variables = useStoreState((state) => state.data.incidents.variables);
  const pagination = useStoreState((state) => state.data.incidents.pagination);
  const setIncidentsState = useStoreActions(
    (actions) => actions.data.setIncidents
  );

  const setOrder = (value: IncidentSort) => {
    setIncidentsState({
      pagination,
      variables,
      order: value,
    });
  };

  const setGroupsFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };
  const setBusinessesFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
      order,
    });
  };
  const setGoodsFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        goods: values,
      },
      order,
    });
  };

  const setCrimeTypesFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
      order,
    });
  };
  const setIncidentDateFilter = (values: DateType | undefined) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        incidentDate: values,
      },
      order,
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
      order,
    });
  };

  const setCreatedByFilter = (values: string[]) => {
    setIncidentsState({
      pagination,
      variables: {
        ...variables,
        createdBy: values,
      },
      order,
    });
  };

  const {
    createdAt: createdAtFilter,
    incidentDate: incidentDateFilter,
    peculiarities,
    createdBy,
    crimeTypes: crimeTypesValue,
    businesses: businessesValue,
    goods: goodsValue,
    groups,
    // priority,
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
            <Select.Option value={IncidentSort.createdAtDesc}>
              {intl.formatMessage({
                defaultMessage: 'Newest First',
              })}
            </Select.Option>
            <Select.Option value={IncidentSort.createdAtAsc}>
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

      {/* <Row gutter={16}> */}
      {/*  <Col span={23}> */}
      {/*    <Typography.Paragraph className={classes.selectTitle}> */}
      {/*      {intl.formatMessage({ defaultMessage: 'Priority', id: '8lCjAM' })} */}
      {/*    </Typography.Paragraph> */}

      {/*    <Select */}
      {/*      className={classes.select} */}
      {/*      placeholder={intl.formatMessage({ */}
      {/*        defaultMessage: 'Priority', */}
      {/*        id: '8lCjAM', */}
      {/*      })} */}
      {/*      mode="multiple" */}
      {/*      size="small" */}
      {/*      maxTagCount={4} */}
      {/*      allowClear */}
      {/*      onChange={setIncidentPriority} */}
      {/*      value={priority.sort(sortPrios)} */}
      {/*      tagRender={tagRender} */}
      {/*    > */}
      {/*      <Select.Option value={IncidentPriority.Low}> */}
      {/*        <FormattedMessage id="477I0g" defaultMessage="Low" /> */}
      {/*      </Select.Option> */}
      {/*      <Select.Option value={IncidentPriority.Normal}> */}
      {/*        <FormattedMessage id="myq2ZL" defaultMessage="Normal" /> */}
      {/*      </Select.Option> */}
      {/*      <Select.Option value={IncidentPriority.Medium}> */}
      {/*        <FormattedMessage id="ovJ26C" defaultMessage="Medium" /> */}
      {/*      </Select.Option> */}
      {/*      <Select.Option value={IncidentPriority.High}> */}
      {/*        <FormattedMessage id="AxMhQr" defaultMessage="High" /> */}
      {/*      </Select.Option> */}
      {/*    </Select> */}
      {/*  </Col> */}
      {/* </Row> */}

      <Row gutter={16}>
        <Col span={23}>
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
            value={groups}
          />
        </Col>
      </Row>
      <Row>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Crime Types',
            })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Crime Types',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setCrimeTypesFilter}
            value={crimeTypesValue}
            loading={tagsLoading}
          >
            {crimeTypes.map((tag) => (
              <Select.Option value={tag.value} key={tag.value}>
                {tag.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Typography.Paragraph className={classes.filtersTitle}>
        {intl.formatMessage({ defaultMessage: 'Details' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={23}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Goods Involved',
            })}
          </Typography.Paragraph>
          <Select
            className={classes.select}
            placeholder={intl.formatMessage({
              defaultMessage: 'Goods Involved',
            })}
            mode="multiple"
            size="small"
            allowClear
            maxTagCount={2}
            onChange={setGoodsFilter}
            value={goodsValue}
            loading={goodsLoading}
          >
            {goods.map((good) => (
              <Select.Option key={good.value} value={good.value}>
                {good.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={23}>
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
        {intl.formatMessage({ defaultMessage: 'Locations' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Incident has happened at:',
            })}
          </Typography.Paragraph>
          <BusinessesSelect
            mode="multiple"
            maxTagCount="responsive"
            onChange={setBusinessesFilter}
            value={businessesValue}
            style={{ width: '100%' }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Businesses',
            })}
            className={classes.select}
          />
        </Col>
      </Row>

      <Typography.Paragraph className={classes.filtersTitle}>
        {intl.formatMessage({ defaultMessage: 'Created By' })}
      </Typography.Paragraph>
      <Row gutter={16}>
        <Col span={24}>
          <Typography.Paragraph className={classes.selectTitle}>
            {intl.formatMessage({
              defaultMessage: 'Incident created by:',
            })}
          </Typography.Paragraph>
          <UsersSelect
            mode="multiple"
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Users',
            })}
            className={classes.select}
            value={createdBy}
            onChange={setCreatedByFilter}
          />
        </Col>
      </Row>
    </Form>
  );
};

export default IncidentFilter;
