import type { CreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import type { ActiveChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-active-checklists.generated';
import type { ChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';
import type { FetchResult } from '@apollo/client';

import {
  faDownload,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { ChecklistStatus } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import type {
  ActiveChecklistSortOptions,
  // ChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
  SetChecklistFilterModel,
} from '../../../state/filter-model';

import useStyles from './ListChcklists.styles';
import CreateActiveChecklist from './drawer/create-active-checklist';

interface ChecklistsViewProps {
  // };
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  activeChecklistsData: ActiveChecklistsQuery | undefined;
  activeChecklistsLoading: boolean;
  activeTab: string;
  checklistFilter: FilterModelValues;
  createActive: ({
    businessId,
    checklistId,
    title,
  }: {
    businessId: null | string;
    checklistId: string;
    title: string;
  }) => Promise<FetchResult<CreateActiveChecklistMutation>>;
  createChecklistOpen: boolean;
  data: ChecklistsQuery | undefined;
  deleteTemplate: (id: string) => void;
  loading: boolean;
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
  setChecklistFilters: (filters: SetChecklistFilterModel) => void;
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
}

const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  // checklistSort,
  activeChecklistSort,
  activeChecklistsData,
  activeChecklistsLoading,
  activeTab,
  checklistFilter,
  createActive,
  createChecklistOpen,
  data,
  deleteTemplate,
  loading,
  selectedChecklist,
  // setChecklistSort,
  setActiveChecklistSort,
  setChecklistFilters,
  toggleCreateChecklistDrawer,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <Tabs
        activeKey={activeTab}
        items={[
          {
            children: (
              <div className={classes.innerPage}>
                <PageHeader
                  extra={[
                    <Radio.Group
                      buttonStyle="solid"
                      key={0}
                      onChange={(e) => {
                        setChecklistFilters({
                          ownUser: !!e.target.value,
                        });
                      }}
                      optionType="button"
                      options={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'All',
                          }),
                          value: false,
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Personal',
                          }),
                          value: true,
                        },
                      ]}
                      value={checklistFilter.ownUser}
                    />,
                  ]}
                />
                <Card>
                  <Table
                    columns={[
                      {
                        dataIndex: 'name',
                        defaultSortOrder:
                          activeChecklistSort.field === 'name'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        key: 'name',
                        render: (value, item) => (
                          <Link to={`/app/checklists/active/${item.key}`}>
                            {value}
                          </Link>
                        ),
                        sorter: true,
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
                        defaultSortOrder:
                          activeChecklistSort.field === 'percentComplete'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        key: 'percentComplete',
                        sorter: true,
                        title: (
                          <FormattedMessage defaultMessage="Completion (%)" />
                        ),
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
                        defaultSortOrder:
                          activeChecklistSort.field === 'status'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        filterMultiple: true,
                        filteredValue: checklistFilter.activeStatus,
                        filters: [
                          {
                            text: intl.formatMessage({
                              defaultMessage: 'In Progress',
                            }),
                            value: ChecklistStatus.InProgress,
                          },
                          {
                            text: intl.formatMessage({
                              defaultMessage: 'Completed',
                            }),
                            value: ChecklistStatus.Completed,
                          },
                        ],
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
                        defaultSortOrder:
                          activeChecklistSort.field === 'completedAt'
                            ? activeChecklistSort.order === 'asc'
                              ? 'ascend'
                              : 'descend'
                            : undefined,
                        key: 'completedAt',
                        sorter: true,
                        title: (
                          <FormattedMessage defaultMessage="Completed Date" />
                        ),
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
                    dataSource={activeChecklistsData?.activeChecklists.edges?.map(
                      ({ node: checklist }) => ({
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
                      })
                    )}
                    loading={activeChecklistsLoading}
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
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                    rowClassName={classes.row}
                    size="small"
                  />
                </Card>
              </div>
            ),
            key: 'Checklists',
            label: <FormattedMessage defaultMessage="Checklists" />,
          },
          {
            children: (
              <div className={classes.innerPage}>
                <PageHeader
                  extra={[
                    <Radio.Group
                      buttonStyle="solid"
                      key={0}
                      onChange={(e) =>
                        setChecklistFilters({
                          ownUser: !!e.target.value,
                        })
                      }
                      optionType="button"
                      options={[
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'All',
                          }),
                          value: false,
                        },
                        {
                          label: intl.formatMessage({
                            defaultMessage: 'Personal',
                          }),
                          value: true,
                        },
                      ]}
                      value={checklistFilter.ownUser}
                    />,
                    <Button
                      key={1}
                      onClick={() => navigate('/app/checklists/add')}
                      type="primary"
                    >
                      <FormattedMessage defaultMessage="Create New Template" />
                    </Button>,
                  ]}
                />
                <Card>
                  <Table
                    columns={[
                      {
                        dataIndex: 'title',
                        key: 'title',
                        render: (value, item) => (
                          <Link to={`edit/${item.key}`}>{value}</Link>
                        ),
                        title: <FormattedMessage defaultMessage="Title" />,
                      },
                      {
                        dataIndex: 'description',
                        key: 'description',
                        title: (
                          <FormattedMessage defaultMessage="Description" />
                        ),
                      },
                      {
                        dataIndex: 'Options',
                        key: 'Options',
                        render: (_, record: { key: string; title: string }) => (
                          <Space>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage:
                                  'Create active checklist from template',
                              })}
                            >
                              <Button
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
                                size="small"
                              />
                            </Tooltip>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Edit template',
                              })}
                            >
                              <Button
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
                                size="small"
                              />
                            </Tooltip>
                            <Tooltip
                              title={intl.formatMessage({
                                defaultMessage: 'Delete template',
                              })}
                            >
                              <Popconfirm
                                okText={intl.formatMessage({
                                  defaultMessage: 'Delete',
                                })}
                                onConfirm={() => deleteTemplate(record.key)}
                                overlayInnerStyle={{ padding: 10 }}
                                title={intl.formatMessage({
                                  defaultMessage: 'Are you sure?',
                                })}
                              >
                                <Button
                                  icon={<FontAwesomeIcon icon={faTrash} />}
                                />
                              </Popconfirm>
                            </Tooltip>
                          </Space>
                        ),
                        title: '',
                        width: 100,
                      },
                    ]}
                    dataSource={data?.checklists?.map((checklist) => ({
                      description: checklist.descriptionLocaled || '',
                      key: checklist.id,
                      title: checklist.titleLocaled || '',
                    }))}
                    loading={loading}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                    size="small"
                  />
                </Card>
              </div>
            ),
            key: 'Templates',
            label: <FormattedMessage defaultMessage="Templates" />,
          },
        ]}
        onChange={(tab) =>
          setChecklistFilters({
            checklistsTab: tab,
          })
        }
      />
      <Drawer
        onClose={() => toggleCreateChecklistDrawer(null)}
        open={createChecklistOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add Checklist',
        })}
        width={1000}
      >
        {selectedChecklist && (
          <CreateActiveChecklist
            checklistId={selectedChecklist.id}
            close={() => toggleCreateChecklistDrawer(null)}
            createActive={createActive}
            defaultTitle={selectedChecklist.title}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ChecklistsView;
