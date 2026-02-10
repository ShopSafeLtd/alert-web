import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { ChecklistStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { Action, ExportChecklistState } from './useExportChecklists';

import Page from '../../../components/shared-components/AntD/Page/Page';
import DatePicker from '../../../components/util-components/DatePicker';

const useStyles = createUseStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  select: {
    '& .ant-select-selector': {
      borderBottomRightRadius: '0px !important',
      borderTopRightRadius: '0px !important',
    },
  },
});

interface Props {
  dispatch: React.Dispatch<Action>;
  getZip: () => void;
  loading: boolean;

  state: ExportChecklistState;
}

const ExportChecklistsView = ({
  dispatch,
  getZip,
  loading,

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
              onChange={(value: [Date | null, Date | null] | null) => {
                dispatch({
                  payload:
                    value?.[0] ||
                    new Date(
                      new Date(
                        new Date().setMonth(new Date().getMonth() - 1)
                      ).setHours(0, 0, 0)
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
              placeholder={intl.formatMessage({
                defaultMessage: 'Select businesses',
              })}
              showSearch
              style={{ marginLeft: 10, width: '100%' }}
              value={state.businessIds}
            />
          </Col>
          <Col span={4}>
            <UsersSelect
              allowClear
              mode="multiple"
              onChange={(value: string[]) => {
                dispatch({
                  payload: value,
                  type: 'UPDATE_USER_IDS',
                });
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Users',
              })}
              style={{ marginLeft: 10, width: '100%' }}
              value={state.userIds}
            />
          </Col>
          <Col span={6}>
            <Col
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button disabled={loading} onClick={getZip} type="primary">
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
        <Row>
          <Col span={24}>
            <Card
              title={intl.formatMessage({
                defaultMessage: 'Checklists',
              })}
            >
              <Table
                columns={[
                  {
                    dataIndex: 'name',
                    key: 'name',
                    title: <FormattedMessage defaultMessage="Title" />,
                    width: 400,
                  },
                  {
                    dataIndex: 'businessName',
                    key: 'businessName',
                    title: <FormattedMessage defaultMessage="Business" />,
                    width: 200,
                  },
                  {
                    dataIndex: 'percentComplete',
                    key: 'percentComplete',
                    title: <FormattedMessage defaultMessage="Completion (%)" />,
                    width: 100,
                  },
                  {
                    dataIndex: 'score',
                    key: 'score',
                    title: <FormattedMessage defaultMessage="Score (%)" />,
                    width: 200,
                  },
                  {
                    dataIndex: 'status',
                    key: 'status',
                    // eslint-disable-next-line no-confusing-arrow
                    render: (value: ChecklistStatus) =>
                      value === ChecklistStatus.InProgress ? (
                        <Typography.Text type="warning">
                          <FormattedMessage defaultMessage="In Progress" />
                        </Typography.Text>
                      ) : (
                        <Typography.Text type="success">
                          <FormattedMessage defaultMessage="Completed" />
                        </Typography.Text>
                      ),
                    sorter: true,
                    title: <FormattedMessage defaultMessage="Status" />,
                    width: 200,
                  },
                  {
                    dataIndex: 'completedAt',
                    key: 'completedAt',
                    title: <FormattedMessage defaultMessage="Completed Date" />,
                    width: 100,
                  },

                  {
                    dataIndex: 'Options',
                    key: 'Options',
                    // onCellClick: (e) => e.stopPropagation(),
                    render: (
                      _,
                      record: {
                        documentLink: string;
                        status: ChecklistStatus;
                      }
                    ) => {
                      if (
                        record.status === ChecklistStatus.Completed &&
                        record.documentLink
                      )
                        return (
                          <Space>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Download Pdf',
                              })}
                            >
                              <Button
                                icon={
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    onClick={() =>
                                      window.open(record.documentLink)
                                    }
                                  />
                                }
                                size="small"
                                style={{
                                  zIndex: 1000,
                                }}
                              />
                            </Tooltip>
                          </Space>
                        );
                      return null;
                    },
                    title: '',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    // ???
                    width: 100,
                  },
                ]}
                dataSource={state.data?.map(({ node: checklist }) => ({
                  businessName: checklist.business?.name || '',
                  completedAt: checklist.completedAt
                    ? new Date(checklist.completedAt).toLocaleDateString(
                        'en-GB',
                        {
                          dateStyle: 'short',
                        }
                      )
                    : '',
                  description: '',
                  documentLink: checklist.document?.url || '',
                  key: checklist.id,
                  name: checklist.name || '',
                  percentComplete: `${checklist.percentComplete || 0}%`,
                  score: checklist.percentageScore,
                  status: checklist.status,
                }))}
                loading={loading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                rowClassName={classes.row}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      </Page>
    </div>
  );
};

export default ExportChecklistsView;
