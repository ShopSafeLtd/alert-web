import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import { Page } from '#/components/shared-components/AntD/Page/Page';
import { ActivityStatusButton } from '#/views/data-management/export-activities/components/activity-status-button';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { Action, ExportActivitiesState } from './useExportActivities';

import DatePicker from '../../../components/util-components/DatePicker';
import { usePresetDateRanges } from './useExportActivities';

interface Props {
  dispatch: React.Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  selectedGroups: string[];
  state: ExportActivitiesState;
}

const formatStartDate = (date: Date | null) => {
  if (!date) return null;
  return dayjs(date).startOf('day').toDate();
};

const formatEndDate = (date: Date | null) => {
  if (!date) return null;
  return dayjs(date).endOf('day').toDate();
};

const ExportActivitiesView = ({ dispatch, getZip, loading, state }: Props) => {
  const intl = useIntl();
  const ranges = usePresetDateRanges();

  const defaultStartDate = dayjs().subtract(1, 'month').startOf('day').toDate();
  const defaultEndDate = dayjs().endOf('day').toDate();
  return (
    <div style={{ marginLeft: 15 }}>
      <Page>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Title level={3}>
            <FormattedMessage defaultMessage="Export Activities" />
          </Typography.Title>
          <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
            <Col>
              <ActivityStatusButton
                intl={intl}
                selected={state.status}
                setSelected={(status) => {
                  dispatch({ payload: status, type: 'UPDATE_STATUS' });
                }}
              />
            </Col>
            <Col flex={1} />
            <Col span={6}>
              <Col
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  disabled={loading || state.data.length === 0}
                  onClick={getZip}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Generate Zip',
                  })}
                </Button>
              </Col>
              <Col flex={1}>
                {state.progress > 0 && (
                  <Progress
                    percent={state.progress}
                    size="small"
                    style={{
                      marginTop: 10,
                    }}
                  />
                )}
              </Col>
              <Col>
                {state.zipFile && (
                  <a download href={state.zipFile}>
                    {intl.formatMessage({
                      defaultMessage: 'Download Zip',
                    })}
                  </a>
                )}
              </Col>
            </Col>
          </Row>
          <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <Card
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Businesses' })}
              >
                <BusinessesSelect
                  allSelected={state.allBusinesses}
                  allowClear
                  allowSelectAll
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value: string[]) => {
                    dispatch({
                      payload: value,
                      type: 'UPDATE_BUSINESS_IDS',
                    });
                  }}
                  onClear={() => {
                    dispatch({
                      payload: [],
                      type: 'UPDATE_BUSINESS_IDS',
                    });
                  }}
                  onSelectAll={() => {
                    dispatch({
                      payload: !state.allBusinesses,
                      type: 'ALL_BUSINESSES',
                    });
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select businesses',
                  })}
                  showSearch
                  style={{ marginLeft: 10, width: '100%' }}
                  value={state.businessIds}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Groups' })}
              >
                <GroupsSelect
                  allowClear
                  allowSelectAll
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value: string[]) => {
                    dispatch({
                      payload: value,
                      type: 'UPDATE_GROUP_IDS',
                    });
                  }}
                  onClear={() => {
                    dispatch({
                      payload: [],
                      type: 'UPDATE_GROUP_IDS',
                    });
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select groups',
                  })}
                  showSearch
                  style={{ marginLeft: 10, width: '100%' }}
                  value={state.groupIds}
                />
              </Card>
            </Col>
            {/* Users Card */}
            <Col span={8}>
              <Card
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Users' })}
              >
                <UsersSelect
                  allowClear
                  mode="multiple"
                  onChange={(value: string[]) => {
                    dispatch({ payload: value, type: 'UPDATE_ASSIGNED_USERS' });
                    dispatch({ payload: false, type: 'UPDATE_ALL_USERS' });
                  }}
                  onClear={() => {
                    dispatch({ payload: [], type: 'UPDATE_ASSIGNED_USERS' });
                    dispatch({ payload: true, type: 'UPDATE_ALL_USERS' });
                  }}
                  showSearch
                  style={{ width: '100%' }}
                  value={state.assignedUsers}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
            {/* Created At Card */}
            <Col span={8}>
              <Card
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Created At' })}
              >
                <DatePicker.RangePicker
                  onChange={(value) => {
                    dispatch({
                      payload: value
                        ? {
                            endDate: formatEndDate(value[1]) || defaultEndDate,
                            startDate:
                              formatStartDate(value[0]) || defaultStartDate,
                          }
                        : null,
                      type: 'UPDATE_CREATED_AT',
                    });
                  }}
                  ranges={ranges}
                  style={{ width: '100%' }}
                  value={
                    state.createdAt
                      ? [state.createdAt.startDate, state.createdAt.endDate]
                      : [defaultStartDate, defaultEndDate]
                  }
                />
              </Card>
            </Col>

            {/* Completed At Card */}
            <Col span={8}>
              <Card
                extra={
                  state.completedAt && (
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Clear Filter',
                      })}
                    >
                      <CloseOutlined
                        onClick={() =>
                          dispatch({
                            payload: null,
                            type: 'UPDATE_COMPLETED_AT',
                          })
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  )
                }
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Completed At' })}
              >
                {!state.completedAt && (
                  <Button
                    block
                    onClick={() =>
                      dispatch({
                        payload: {
                          endDate: defaultEndDate,
                          startDate: defaultStartDate,
                        },
                        type: 'UPDATE_COMPLETED_AT',
                      })
                    }
                    type={'primary'}
                  >
                    {intl.formatMessage({ defaultMessage: 'Use Filter' })}
                  </Button>
                )}
                {state.completedAt && (
                  <DatePicker.RangePicker
                    onChange={(value) => {
                      dispatch({
                        payload: value
                          ? {
                              endDate:
                                formatEndDate(value[1]) || defaultEndDate,
                              startDate:
                                formatStartDate(value[0]) || defaultStartDate,
                            }
                          : null,
                        type: 'UPDATE_COMPLETED_AT',
                      });
                    }}
                    ranges={ranges}
                    style={{ width: '100%' }}
                    value={[
                      state.completedAt.startDate,
                      state.completedAt.endDate,
                    ]}
                  />
                )}
              </Card>
            </Col>

            {/* Due Date Card */}
            <Col span={8}>
              <Card
                extra={
                  state.dueDate && (
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Clear Filter',
                      })}
                    >
                      <CloseOutlined
                        onClick={() =>
                          dispatch({ payload: null, type: 'UPDATE_DUE_DATE' })
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  )
                }
                size="small"
                style={{ height: '100%' }}
                title={intl.formatMessage({ defaultMessage: 'Due Date' })}
              >
                {!state.dueDate && (
                  <Button
                    block
                    onClick={() =>
                      dispatch({
                        payload: {
                          endDate: defaultEndDate,
                          startDate: defaultStartDate,
                        },
                        type: 'UPDATE_DUE_DATE',
                      })
                    }
                    type={'primary'}
                  >
                    {intl.formatMessage({ defaultMessage: 'Use Filter' })}
                  </Button>
                )}
                {state.dueDate && (
                  <DatePicker.RangePicker
                    onChange={(value) => {
                      dispatch({
                        payload: value
                          ? {
                              endDate:
                                formatEndDate(value[1]) || defaultEndDate,
                              startDate:
                                formatStartDate(value[0]) || defaultStartDate,
                            }
                          : null,
                        type: 'UPDATE_DUE_DATE',
                      });
                    }}
                    ranges={ranges}
                    style={{ width: '100%' }}
                    value={[state.dueDate.startDate, state.dueDate.endDate]}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Space>
        {state.data && state.data.length > 0 && (
          <Card bodyStyle={{ padding: 30 }}>
            <Row>
              <Col>
                <Typography.Title level={4}>
                  <FormattedMessage
                    defaultMessage="Activities ({count})"
                    values={{ count: state.total }}
                  />
                </Typography.Title>
              </Col>
            </Row>
            <Row justify={'center'}>
              <Col>
                <Table
                  columns={[
                    {
                      dataIndex: 'name',
                      key: 'name',
                      title: intl.formatMessage({ defaultMessage: 'Name' }),
                    },
                    {
                      dataIndex: 'reference',
                      key: 'reference',
                      title: intl.formatMessage({
                        defaultMessage: 'Reference',
                      }),
                    },
                    {
                      dataIndex: 'description',
                      key: 'description',
                      title: intl.formatMessage({
                        defaultMessage: 'Description',
                      }),
                    },
                    {
                      dataIndex: 'dueDate',
                      key: 'dueDate',
                      render: (value: Date) =>
                        value ? dayjs(value).format('YYYY-MM-DD') : '',
                      title: intl.formatMessage({ defaultMessage: 'Due Date' }),
                    },
                    {
                      dataIndex: 'completedDate',
                      key: 'completedDate',
                      render: (value: Date) =>
                        value ? dayjs(value).format('YYYY-MM-DD') : '',
                      title: intl.formatMessage({
                        defaultMessage: 'Completed Date',
                      }),
                    },
                    {
                      dataIndex: 'completed',
                      key: 'completed',
                      render: (value: boolean) =>
                        value
                          ? intl.formatMessage({ defaultMessage: 'Yes' })
                          : intl.formatMessage({ defaultMessage: 'No' }),
                      title: intl.formatMessage({
                        defaultMessage: 'Completed',
                      }),
                    },
                    {
                      dataIndex: 'createdAt',
                      key: 'createdAt',
                      render: (value: Date) =>
                        dayjs(value).format('YYYY-MM-DD'),
                      title: intl.formatMessage({
                        defaultMessage: 'Created At',
                      }),
                    },
                    {
                      dataIndex: 'type',
                      key: 'type',
                      title: intl.formatMessage({ defaultMessage: 'Type' }),
                    },
                    {
                      dataIndex: ['business', 'name'],
                      key: 'business',
                      title: intl.formatMessage({ defaultMessage: 'Business' }),
                    },
                  ]}
                  dataSource={state.data}
                  pagination={false}
                />
              </Col>
            </Row>
          </Card>
        )}
      </Page>
    </div>
  );
};

export default ExportActivitiesView;
