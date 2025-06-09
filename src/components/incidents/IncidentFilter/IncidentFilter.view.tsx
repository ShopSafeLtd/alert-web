import type { DateType } from 'types/DataType';

import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import IncidentTypesSelect from '#/components/form-components/IncidentTypesSelect/IncidentTypesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import GoodsSelect from '#/components/form-components/goodsSelect/GoodsSelect.view';
import DatePicker from '#/components/util-components/DatePicker';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { IncidentSort, useStoreActions, useStoreState } from 'state';

import useStyles from './IncidentFilter.styles';

const { RangePicker } = DatePicker;
const { useForm } = Form;

interface FormData {
  createdAt: Date;
  date: Date;
}

interface Props {
  clearFilters: () => void;
  setPeculiarities: (value: string) => void;
}

const IncidentFilter = ({
  clearFilters,

  setPeculiarities,
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
      order: value,
      pagination,
      variables,
    });
  };

  const setGroupsFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
    });
  };
  const setBusinessesFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        businesses: values,
      },
    });
  };
  const setGoodsFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        goods: values,
      },
    });
  };

  const setCrimeTypesFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        crimeTypes: values,
      },
    });
  };
  const setIncidentDateFilter = (values: DateType | undefined) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        incidentDate: values,
      },
    });
  };
  const setCreatedAtFilter = (values: DateType | undefined) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
    });
  };

  const setCreatedByFilter = (values: string[]) => {
    setIncidentsState({
      order,
      pagination,
      variables: {
        ...variables,
        createdBy: values,
      },
    });
  };

  const {
    businesses: businessesValue,
    createdAt: createdAtFilter,
    createdBy,
    crimeTypes: crimeTypesValue,
    goods: goodsValue,
    groups,
    incidentDate: incidentDateFilter,
    peculiarities,
    // priority,
  } = variables;

  return (
    <Form<FormData>
      form={form}
      initialValues={{
        createdAt: createdAtFilter
          ? [dayjs(createdAtFilter?.startDate), dayjs(createdAtFilter?.endDate)]
          : undefined,
        date: incidentDateFilter
          ? [
              dayjs(incidentDateFilter?.startDate),
              dayjs(incidentDateFilter?.endDate),
            ]
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
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
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
                      endDate: new Date(value[1].valueOf()),
                      startDate: new Date(value[0].valueOf()),
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
                      endDate: new Date(value[1].valueOf()),
                      startDate: new Date(value[0].valueOf()),
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
              allowClear
              className={classes.select}
              maxTagCount={2}
              mode="multiple"
              onChange={setGroupsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              size="small"
              style={{
                width: '100%',
              }}
              value={groups}
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={23}>
            <Typography.Paragraph className={classes.selectTitle}>
              {intl.formatMessage({
                defaultMessage: 'Incident Types',
              })}
            </Typography.Paragraph>
            <IncidentTypesSelect
              allowClear
              className={classes.select}
              maxTagCount={4}
              multiple
              onChange={setCrimeTypesFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Incident Types',
              })}
              showCheckedStrategy="SHOW_CHILD"
              treeCheckable
              value={crimeTypesValue}
            />
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
            <GoodsSelect
              allowClear
              className={classes.select}
              mode="multiple"
              onChange={setGoodsFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Goods Involved',
              })}
              value={goodsValue}
            />
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
              className={classes.select}
              onChange={(e) => setPeculiarities(e.target.value)}
              value={peculiarities}
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
              className={classes.select}
              maxTagCount="responsive"
              mode="multiple"
              onChange={setBusinessesFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Businesses',
              })}
              style={{ width: '100%' }}
              value={businessesValue}
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
              allowClear
              className={classes.select}
              mode="multiple"
              onChange={setCreatedByFilter}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Users',
              })}
              value={createdBy}
            />
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default IncidentFilter;
