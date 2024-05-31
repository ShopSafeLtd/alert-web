import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import {
  Button,
  Card,
  Drawer,
  PageHeader,
  Popconfirm,
  Radio,
  Space,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import { Link } from 'react-router-dom';
import type { FetchResult } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type {
  ActiveChecklistsQuery,
  ChecklistsQuery,
  CreateActiveChecklistMutation,
} from '../../../graphql/generated';
import { ChecklistStatus } from '../../../graphql/generated';
import useStyles from './ListChcklists.styles';
import type {
  ActiveChecklistSortOptions,
  // ChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
  SetChecklistFilterModel,
} from '../../../state/filter-model';
import CreateActiveChecklist from './drawer/create-active-checklist';

interface ChecklistsViewProps {
  data: ChecklistsQuery | undefined;
  loading: boolean;
  activeChecklistsData: ActiveChecklistsQuery | undefined;
  activeChecklistsLoading: boolean;
  createActive: ({
    checklistId,
    businessId,
    title,
  }: {
    checklistId: string;
    businessId: string | null;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  activeTab: string;
  checklistFilter: FilterModelValues;
  setChecklistFilters: (filters: SetChecklistFilterModel) => void;
  createChecklistOpen: boolean;
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
  selectedChecklist: { id: string; title: string } | null;
  // setChecklistSort: (args: {
  //   field: ChecklistSortOptions;
  //   order: ChecklistSortOrder;
  // }) => void;
  setActiveChecklistSort: (args: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;
  // checklistSort: {
  //   field: ChecklistSortOptions;
  //   order: ChecklistSortOrder;
  // };
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  deleteTemplate: (id: string) => void;
}

const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  data,
  loading,
  activeChecklistsData,
  activeChecklistsLoading,
  activeTab,
  createActive,
  checklistFilter,
  setChecklistFilters,
  createChecklistOpen,
  toggleCreateChecklistDrawer,
  selectedChecklist,
  // checklistSort,
  activeChecklistSort,
  // setChecklistSort,
  setActiveChecklistSort,
  deleteTemplate,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <Tabs
        activeKey={activeTab}
        onChange={(tab) =>
          setChecklistFilters({
            checklistsTab: tab,
          })
        }
        items={[
          {
            key: 'Checklists',
            label: <FormattedMessage defaultMessage="Checklists" id="ICqy9/" />,
            children: (
              <div className={classes.innerPage}>
                <PageHeader
                  extra={[
                    <Radio.Group
                      options={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'All',
                            id: 'zQvVDJ',
                          }),
                          value: false,
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Personal',
                            id: 'NDx+B0',
                          }),
                          value: true,
                        },
                      ]}
                      onChange={(e) => {
                        setChecklistFilters({
                          ownUser: !!e.target.value,
                        });
                      }}
                      value={checklistFilter.ownUser}
                      optionType="button"
                      buttonStyle="solid"
                      key={0}
                    />,
                  ]}
                />
                <Card>
                  <Table
                    dataSource={activeChecklistsData?.activeChecklists.edges?.map(
                      ({ node: checklist }) => ({
                        key: checklist.id,
                        name: checklist.name || '',
                        percentComplete: `${checklist.percentComplete || 0}%`,
                        status: checklist.status,
                        description: '',
                        score: checklist.percentageScore,
                        documentLink: checklist.document?.url || '',
                        businessName: checklist.business?.name || '',
                        completedAt: checklist.completedAt
                          ? new Date(checklist.completedAt).toLocaleDateString(
                              'en-GB',
                              {
                                dateStyle: 'short',
                              }
                            )
                          : '',
                      })
                    )}
                    loading={activeChecklistsLoading}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                    onChange={(_pagination, filters, sorter) => {
                      if (sorter && 'field' in sorter) {
                        setActiveChecklistSort({
                          field: sorter.field as ActiveChecklistSortOptions,
                          order: sorter.order === 'ascend' ? 'asc' : 'desc',
                        });
                      } else if (
                        'order' in sorter &&
                        sorter.order === undefined
                      ) {
                        setActiveChecklistSort({
                          field: 'createdAt',
                          order: 'desc',
                        });
                      }
                      if (filters && filters.status) {
                        setChecklistFilters({
                          activeStatus: filters.status as ChecklistStatus[],
                        });
                      }

                      if (filters?.status?.length === 0 || !filters.status) {
                        setChecklistFilters({
                          activeStatus: [
                            ChecklistStatus.InProgress,
                            ChecklistStatus.Completed,
                          ],
                        });
                      }
                      console.log(sorter);
                    }}
                    size="small"
                    rowClassName={classes.row}
                    columns={[
                      {
                        key: 'name',
                        dataIndex: 'name',
                        sorter: true,
                        width: 400,
                        defaultSortOrder:
                          activeChecklistSort.field === 'name'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        title: (
                          <FormattedMessage
                            defaultMessage="Title"
                            id="9a9+ww"
                          />
                        ),
                        render: (value, item) => (
                          <Link to={`/app/checklists/active/${item.key}`}>
                            {value}
                          </Link>
                        ),
                      },
                      {
                        key: 'businessName',
                        dataIndex: 'businessName',
                        width: 200,
                        title: (
                          <FormattedMessage
                            defaultMessage="Business"
                            id="w1Fanr"
                          />
                        ),
                      },
                      {
                        key: 'percentComplete',
                        dataIndex: 'percentComplete',
                        sorter: true,
                        width: 100,
                        defaultSortOrder:
                          activeChecklistSort.field === 'percentComplete'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        title: (
                          <FormattedMessage
                            defaultMessage="Completion (%)"
                            id="ZDpoRo"
                          />
                        ),
                      },
                      {
                        key: 'score',
                        dataIndex: 'score',
                        width: 200,

                        title: (
                          <FormattedMessage
                            defaultMessage="Score (%)"
                            id="qcR99J"
                          />
                        ),
                      },
                      {
                        key: 'status',
                        dataIndex: 'status',
                        sorter: true,
                        width: 200,
                        defaultSortOrder:
                          activeChecklistSort.field === 'status'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        title: (
                          <FormattedMessage
                            defaultMessage="Status"
                            id="tzMNF3"
                          />
                        ),
                        filters: [
                          {
                            text: intl.formatMessage({
                              defaultMessage: 'In Progress',
                              id: 'B487HA',
                            }),
                            value: ChecklistStatus.InProgress,
                          },
                          {
                            text: intl.formatMessage({
                              defaultMessage: 'Completed',
                              id: '95stPq',
                            }),
                            value: ChecklistStatus.Completed,
                          },
                        ],
                        filterMultiple: true,
                        filteredValue: checklistFilter.activeStatus,
                        // eslint-disable-next-line no-confusing-arrow
                        render: (value: ChecklistStatus) =>
                          value === ChecklistStatus.InProgress ? (
                            <Typography.Text type="warning">
                              <FormattedMessage
                                defaultMessage="In Progress"
                                id="B487HA"
                              />
                            </Typography.Text>
                          ) : (
                            <Typography.Text type="success">
                              <FormattedMessage
                                defaultMessage="Completed"
                                id="95stPq"
                              />
                            </Typography.Text>
                          ),
                      },
                      {
                        sorter: true,
                        defaultSortOrder:
                          activeChecklistSort.field === 'completedAt'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        key: 'completedAt',
                        dataIndex: 'completedAt',
                        width: 100,
                        title: (
                          <FormattedMessage
                            defaultMessage="Completed Date"
                            id="DFG3iK"
                          />
                        ),
                      },

                      {
                        key: 'Options',
                        title: '',
                        dataIndex: 'Options',
                        width: 100,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        // ???
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
                                    id: 'rggueN',
                                    defaultMessage: 'Download Pdf',
                                  })}
                                >
                                  <Button
                                    style={{
                                      zIndex: 1000,
                                    }}
                                    size="small"
                                    icon={
                                      <FontAwesomeIcon
                                        icon={faDownload}
                                        onClick={() =>
                                          window.open(record.documentLink)
                                        }
                                      />
                                    }
                                  />
                                </Tooltip>
                              </Space>
                            );
                          return null;
                        },
                      },
                    ]}
                  />
                </Card>
              </div>
            ),
          },
          {
            key: 'Templates',
            label: <FormattedMessage defaultMessage="Templates" id="A3ptul" />,
            children: (
              <div className={classes.innerPage}>
                <PageHeader
                  extra={[
                    <Radio.Group
                      options={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'All',
                            id: 'zQvVDJ',
                          }),
                          value: false,
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Personal',
                            id: 'NDx+B0',
                          }),
                          value: true,
                        },
                      ]}
                      onChange={(e) =>
                        setChecklistFilters({
                          ownUser: !!e.target.value,
                        })
                      }
                      value={checklistFilter.ownUser}
                      optionType="button"
                      buttonStyle="solid"
                      key={0}
                    />,
                    <Button
                      type="primary"
                      key={1}
                      onClick={() => navigate('/app/checklists/add')}
                    >
                      <FormattedMessage
                        defaultMessage="Create New Template"
                        id="KEGSVQ"
                      />
                    </Button>,
                  ]}
                />
                <Card>
                  <Table
                    dataSource={data?.checklists?.map((checklist) => ({
                      key: checklist.id,
                      title: checklist.titleLocaled || '',
                      description: checklist.descriptionLocaled || '',
                    }))}
                    loading={loading}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                    size="small"
                    columns={[
                      {
                        key: 'title',
                        dataIndex: 'title',
                        title: (
                          <FormattedMessage
                            defaultMessage="Title"
                            id="9a9+ww"
                          />
                        ),
                        render: (value, item) => (
                          <Link to={`edit/${item.key}`}>{value}</Link>
                        ),
                      },
                      {
                        key: 'description',
                        dataIndex: 'description',
                        title: (
                          <FormattedMessage
                            defaultMessage="Description"
                            id="Q8Qw5B"
                          />
                        ),
                      },
                      {
                        key: 'Options',
                        title: '',
                        dataIndex: 'Options',
                        width: 100,
                        render: (_, record: { key: string; title: string }) => (
                          <Space>
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'Pajv+D',
                                defaultMessage:
                                  'Create active checklist from template',
                              })}
                            >
                              <Button
                                size="small"
                                icon={
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() =>
                                      toggleCreateChecklistDrawer({
                                        checklistId: record.key,
                                        title: record.title,
                                      })
                                    }
                                  />
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'hQ4Jcl',
                                defaultMessage: 'Edit template',
                              })}
                            >
                              <Button
                                size="small"
                                icon={
                                  <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    onClick={() =>
                                      navigate(
                                        `/app/checklists/edit/${record.key}`
                                      )
                                    }
                                  />
                                }
                              />
                            </Tooltip>
                            <Tooltip
                              title={intl.formatMessage({
                                id: 'AghqfS',
                                defaultMessage: 'Delete template',
                              })}
                            >
                              <Popconfirm
                                title={intl.formatMessage({
                                  defaultMessage: 'Are you sure?',
                                  id: '2oCaym',
                                })}
                                okText={intl.formatMessage({
                                  defaultMessage: 'Delete',
                                  id: 'K3r6DQ',
                                })}
                                onConfirm={() => deleteTemplate(record.key)}
                                overlayInnerStyle={{ padding: 10 }}
                              >
                                <Button
                                  icon={<FontAwesomeIcon icon={faTrash} />}
                                />
                              </Popconfirm>
                            </Tooltip>
                          </Space>
                        ),
                      },
                    ]}
                  />
                </Card>
              </div>
            ),
          },
        ]}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Checklist',
          id: 'gV8AIA',
        })}
        width={1000}
        open={createChecklistOpen}
        onClose={() => toggleCreateChecklistDrawer(null)}
      >
        {selectedChecklist && (
          <CreateActiveChecklist
            checklistId={selectedChecklist.id}
            defaultTitle={selectedChecklist.title}
            createActive={createActive}
            close={() => toggleCreateChecklistDrawer(null)}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ChecklistsView;
