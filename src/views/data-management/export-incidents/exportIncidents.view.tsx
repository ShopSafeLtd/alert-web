import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Select,
  Statistic,
  Table,
  Typography,
} from 'antd';
import type {
  Action,
  ExportIncidentsState,
  SelectOption,
} from './useExportIncidents';
import DatePicker from '../../../components/util-components/DatePicker';
import Page from '../../../components/shared-components/AntD/Page/Page';

interface Props {
  loading: boolean;
  state: ExportIncidentsState;
  dispatch: React.Dispatch<Action>;
  groups: SelectOption[];
  businesses: SelectOption[];
  crimeGroups: SelectOption[];
  getZip: () => void;
}

const ExportIncidentsView = ({
  dispatch,
  loading,
  state,
  businesses,
  groups,
  crimeGroups,
  getZip,
}: Props) => {
  const intl = useIntl();
  return (
    <div style={{ marginLeft: 15 }}>
      <Page>
        <Typography.Title level={3}>
          <FormattedMessage defaultMessage="Export Data" />
        </Typography.Title>
        <Row style={{ marginBottom: 10 }} gutter={[10, 10]}>
          <Col span={6}>
            <DatePicker.RangePicker
              style={{ width: '100%', marginLeft: 10 }}
              defaultValue={[state.startDate, state.endDate]}
              value={[state.startDate, state.endDate]}
              onChange={(value) => {
                dispatch({
                  type: 'UPDATE_START_DATE',
                  payload:
                    value?.[0] ||
                    new Date(
                      new Date(
                        new Date().setMonth(new Date().getMonth() - 1)
                      ).setHours(0, 0, 59)
                    ),
                });
                dispatch({
                  type: 'UPDATE_END_DATE',
                  payload:
                    value?.[1] || new Date(new Date().setHours(23, 59, 59)),
                });
              }}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: '100%', marginLeft: 10 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select businesses',
              })}
              mode="multiple"
              maxTagCount="responsive"
              showSearch
              allowClear
              options={businesses}
              onClear={() => {
                dispatch({
                  type: 'UPDATE_BUSINESS_IDS',
                  payload: [],
                });
              }}
              onChange={(value: string[]) => {
                dispatch({
                  type: 'UPDATE_BUSINESS_IDS',
                  payload: value,
                });
              }}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: '100%', marginLeft: 10 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select groups',
              })}
              mode="multiple"
              showSearch
              allowClear
              maxTagCount="responsive"
              options={groups}
              onClear={() => {
                dispatch({
                  type: 'UPDATE_GROUP_IDS',
                  payload: [],
                });
              }}
              onChange={(value: string[]) => {
                dispatch({
                  type: 'UPDATE_GROUP_IDS',
                  payload: value,
                });
              }}
            />
          </Col>
          <Col span={4}>
            <Select
              style={{ width: '100%', marginLeft: 10 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select tags',
              })}
              mode="multiple"
              showSearch
              maxTagCount="responsive"
              allowClear
              options={crimeGroups}
              onClear={() => {
                dispatch({
                  type: 'UPDATE_CRIME_GROUP_IDS',
                  payload: [],
                });
              }}
              onChange={(value: string[]) => {
                dispatch({
                  type: 'UPDATE_CRIME_GROUP_IDS',
                  payload: value,
                });
              }}
            />
          </Col>
          <Col span={6}>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={getZip} type="primary">
                {intl.formatMessage({
                  defaultMessage: 'Generate Zip',
                })}
              </Button>
            </Col>
            <Col flex={1}>
              {state.progress > 0 && (
                <Progress
                  style={{
                    marginTop: 10,
                  }}
                  size="small"
                  percent={state.progress}
                />
              )}
            </Col>
            <Col>
              {state.zipFile && (
                <a href={state.zipFile} download>
                  {intl.formatMessage({
                    defaultMessage: 'Download Zip',
                  })}
                </a>
              )}
            </Col>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={4}>
            <Card>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Incidents',
                })}
                loading={loading}
                value={state.data.incidentCount}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Offenders',
                })}
                loading={loading}
                value={state.data.offenderCount}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Vehicles',
                })}
                loading={loading}
                value={state.data.vehicleCount}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Incident Items',
                })}
                loading={loading}
                value={state.data.incidentItemsCount}
              />
            </Card>
          </Col>
          <Col span={4}>
            <Card>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Activities',
                })}
                loading={loading}
                value={state.data.activityCount}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card
              title={intl.formatMessage({
                defaultMessage: 'Incidents',
              })}
            >
              <Table
                loading={loading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                dataSource={state.data.incidents}
                columns={[
                  {
                    title: intl.formatMessage({
                      defaultMessage: 'Date',
                    }),
                    dataIndex: 'date',
                    key: 'date',
                    render: (date: string) => new Date(date).toLocaleString(),
                  },
                  {
                    title: intl.formatMessage({
                      defaultMessage: 'Description',
                    }),
                    dataIndex: 'description',
                    key: 'description',
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>
      </Page>
    </div>
  );
};

export default ExportIncidentsView;
