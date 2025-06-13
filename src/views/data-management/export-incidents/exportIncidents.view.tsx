import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { faSquareCheck } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Select,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type {
  Action,
  ExportIncidentsState,
  SelectOption,
} from './useExportIncidents';

import Page from '../../../components/shared-components/AntD/Page/Page';
import DatePicker from '../../../components/util-components/DatePicker';

const useStyles = createUseStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  select: {
    '& .ant-select-selector': {
      borderBottomRightRadius: '0px !important',
      borderTopRightRadius: '0px !important',
    },
  },
});

interface Props {
  crimeGroups: SelectOption[];
  dispatch: React.Dispatch<Action>;
  getZip: () => void;
  loading: boolean;
  selectedGroups: string[];
  state: ExportIncidentsState;
}

const ExportIncidentsView = ({
  crimeGroups,
  dispatch,
  getZip,
  loading,
  selectedGroups,
  state,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <div style={{ marginLeft: 15 }}>
      <Page>
        <Typography.Title level={3}>
          <FormattedMessage defaultMessage="Export Data" />
        </Typography.Title>
        <Row gutter={[10, 10]} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <DatePicker.RangePicker
              defaultValue={[state.startDate, state.endDate]}
              onChange={(value) => {
                dispatch({
                  payload:
                    value?.[0] ||
                    new Date(
                      new Date(
                        new Date().setMonth(new Date().getMonth() - 1)
                      ).setHours(0, 0, 59)
                    ),
                  type: 'UPDATE_START_DATE',
                });
                dispatch({
                  payload:
                    value?.[1] || new Date(new Date().setHours(23, 59, 59)),
                  type: 'UPDATE_END_DATE',
                });
              }}
              style={{ marginLeft: 10, width: '100%' }}
              value={[state.startDate, state.endDate]}
            />
          </Col>
          <Col span={4}>
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
          </Col>
          <Col span={4}>
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
          </Col>
          <Col span={4}>
            <Row>
              <Col flex={1}>
                <Select
                  allowClear
                  className={classes.select}
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value: string[]) => {
                    dispatch({
                      payload: value,
                      type: 'UPDATE_CRIME_GROUP_IDS',
                    });
                  }}
                  onClear={() => {
                    dispatch({
                      payload: [],
                      type: 'UPDATE_CRIME_GROUP_IDS',
                    });
                  }}
                  options={crimeGroups}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select tags',
                  })}
                  showSearch
                  style={{ marginLeft: 10, width: '100%' }}
                  value={state.crimeGroupIds}
                />
              </Col>
              <Col>
                <Tooltip
                  placement="bottom"
                  title={intl.formatMessage({
                    defaultMessage: 'Select all tags',
                  })}
                >
                  <Button
                    className={classes.button}
                    onClick={() => {
                      dispatch({
                        payload: crimeGroups.map((g) => g.value),
                        type: 'UPDATE_CRIME_GROUP_IDS',
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                disabled={selectedGroups.length === 0}
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
        {selectedGroups.length === 0 && (
          <Card bodyStyle={{ padding: 30 }}>
            <Row justify={'center'}>
              <Col>
                <Typography.Title level={3} style={{ textAlign: 'center' }}>
                  <FormattedMessage defaultMessage="Please select at least one group" />
                </Typography.Title>
                <Typography.Text>
                  <FormattedMessage defaultMessage="You need to select at least one group before you can export any data from Alert." />
                </Typography.Text>
              </Col>
            </Row>
          </Card>
        )}
        {selectedGroups.length > 0 && (
          <>
            <Row gutter={[10, 10]}>
              <Col span={4}>
                <Card>
                  <Statistic
                    loading={loading}
                    title={intl.formatMessage({
                      defaultMessage: 'Incidents',
                    })}
                    value={state.data.incidentCount}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    loading={loading}
                    title={intl.formatMessage({
                      defaultMessage: 'Offenders',
                    })}
                    value={state.data.offenderCount}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    loading={loading}
                    title={intl.formatMessage({
                      defaultMessage: 'Vehicles',
                    })}
                    value={state.data.vehicleCount}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    loading={loading}
                    title={intl.formatMessage({
                      defaultMessage: 'Incident Items',
                    })}
                    value={state.data.incidentItemsCount}
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    loading={loading}
                    title={intl.formatMessage({
                      defaultMessage: 'Activities',
                    })}
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
                    columns={[
                      {
                        dataIndex: 'date',
                        key: 'date',
                        render: (date: string) =>
                          new Date(date).toLocaleString(),
                        title: intl.formatMessage({
                          defaultMessage: 'Date',
                        }),
                      },
                      {
                        dataIndex: 'description',
                        key: 'description',
                        title: intl.formatMessage({
                          defaultMessage: 'Description',
                        }),
                      },
                    ]}
                    dataSource={state.data.incidents}
                    loading={loading}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Page>
    </div>
  );
};

export default ExportIncidentsView;
