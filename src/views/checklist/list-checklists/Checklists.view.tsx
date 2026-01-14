import type { FetchResult } from '@apollo/client';
import type { CreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import type { ActiveChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-active-checklists.generated';
import type { ChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';

import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { faDownload, faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import UsersSelect from '#/components/form-components/UsersSelect/UsersSelect.view';
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import DebouncedInput from '#/utils/debounced-input';
import {
  Button,
  Card,
  Drawer,
  Dropdown,
  PageHeader,
  Popconfirm,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import {
  ChecklistStatus,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import type {
  ActiveChecklistSortOptions,
  ChecklistSortOrder,
  FilterModelValues,
  SetChecklistFilterModel,
} from '../../../state/filter-model';

import CreateActiveChecklist from './drawer/create-active-checklist';
import useStyles from './ListChcklists.styles';

interface ChecklistsViewProps {
  activeChecklistSort: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  };
  activeChecklistsData: ActiveChecklistsQuery | undefined;
  activeChecklistsLoading: boolean;
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
  deleteChecklist: (id: string) => void;
  loading: boolean;
  saving: boolean;
  selectedChecklist: { id: string; title: string } | null;
  setActiveChecklistSort: (args: {
    field: ActiveChecklistSortOptions;
    order: ChecklistSortOrder;
  }) => void;
  setChecklistFilters: (filters: SetChecklistFilterModel) => void;
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
}

const ChecklistsView: React.FC<ChecklistsViewProps> = ({
  activeChecklistSort,
  activeChecklistsData,
  activeChecklistsLoading,
  checklistFilter,
  createActive,
  createChecklistOpen,
  data,
  deleteChecklist,
  loading,
  saving,
  selectedChecklist,
  setActiveChecklistSort,
  setChecklistFilters,
  toggleCreateChecklistDrawer,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div className={classes.page}>
      <div className={classes.innerPage}>
        <PageHeader
          extra={[
            <DebouncedInput
              allowClear
              defaultValue={checklistFilter.searchValue || ''}
              key={0}
              onChange={(e) =>
                setChecklistFilters({ searchValue: e.target.value })
              }
              placeholder={intl.formatMessage({
                defaultMessage: 'Search checklists...',
              })}
              style={{ flex: 1, minWidth: 200 }}
            />,
            <Select
              allowClear
              key={1}
              loading={loading}
              maxTagCount="responsive"
              mode="multiple"
              onChange={(values: string[]) =>
                setChecklistFilters({ templates: values })
              }
              options={
                data?.checklists?.map((checklist) => ({
                  label: checklist.titleLocaled,
                  value: checklist.id,
                })) || []
              }
              placeholder={intl.formatMessage({
                defaultMessage: 'Filter by template...',
              })}
              style={{ width: 200 }}
              value={checklistFilter.templates}
            />,
            <BusinessesSelect
              allowClear
              key={2}
              maxTagCount="responsive"
              mode="multiple"
              onChange={(values: string[]) =>
                setChecklistFilters({ businesses: values })
              }
              placeholder={intl.formatMessage({
                defaultMessage: 'Filter by business...',
              })}
              style={{ width: 200 }}
              value={checklistFilter.businesses}
            />,
            <UsersSelect
              allowClear
              key={3}
              mode="multiple"
              onChange={(values: string[]) =>
                setChecklistFilters({ completedBy: values })
              }
              placeholder={intl.formatMessage({
                defaultMessage: 'Filter by completed by...',
              })}
              style={{ width: 200 }}
              value={checklistFilter.completedBy}
            />,
            <Dropdown
              key={4}
              menu={{
                items:
                  data?.checklists?.map((checklist) => ({
                    key: checklist.id,
                    label: checklist.titleLocaled || '',
                    onClick: () => {
                      toggleCreateChecklistDrawer({
                        checklistId: checklist.id,
                        title: checklist.titleLocaled || '',
                      });
                    },
                  })) || [],
              }}
              trigger={['click']}
            >
              <Button type="primary">
                <FormattedMessage defaultMessage="Create from Template" />
                <DownOutlined style={{ marginLeft: 8 }} />
              </Button>
            </Dropdown>,
            <PermissionCheckWrapper
              key={5}
              permission={{
                method: PermissionMethod.Edit,
                model: PermissionModel.Checklist,
              }}
              unauthorizedElement={<div />}
            >
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Manage Templates',
                })}
              >
                <Button
                  icon={<SettingOutlined />}
                  onClick={() =>
                    navigate('/app/scheme-settings/checklist-templates')
                  }
                />
              </Tooltip>
            </PermissionCheckWrapper>,
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
                  <Link to={`/app/checklists/active/${item.key}`}>{value}</Link>
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
                title: <FormattedMessage defaultMessage="Completion (%)" />,
                width: 140,
              },
              {
                dataIndex: 'score',
                key: 'score',
                title: <FormattedMessage defaultMessage="Score (%)" />,

                width: 100,
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
                width: 150,
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
                title: <FormattedMessage defaultMessage="Completed Date" />,
                width: 150,
              },
              {
                dataIndex: 'timeTaken',
                key: 'timeTaken',
                title: <FormattedMessage defaultMessage="Time Taken" />,
                width: 120,
              },
              {
                dataIndex: 'completedByName',
                key: 'completedByName',
                title: <FormattedMessage defaultMessage="Completed By" />,
                width: 150,
              },
              {
                dataIndex: 'storeName',
                key: 'storeName',
                title: <FormattedMessage defaultMessage="Store" />,
                width: 150,
              },

              {
                dataIndex: 'Options',
                key: 'Options',
                // onCellClick: (e) => e.stopPropagation(),
                render: (
                  _,
                  record: {
                    documentLink: string;
                    key: string;
                    status: ChecklistStatus;
                  }
                ) => (
                  <Space>
                    {record.status === ChecklistStatus.Completed &&
                      (record.documentLink ? (
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Download Pdf',
                          })}
                        >
                          <Button
                            icon={<FontAwesomeIcon icon={faDownload} />}
                            onClick={() => window.open(record.documentLink)}
                            size="small"
                            style={{ zIndex: 1000 }}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'View Checklist',
                          })}
                        >
                          <Button
                            onClick={() =>
                              window.open(
                                `/app/checklists/active/${record.key}`,
                                '_blank'
                              )
                            }
                            size="small"
                          >
                            <FormattedMessage defaultMessage="View" />
                          </Button>
                        </Tooltip>
                      ))}
                    {record.status === ChecklistStatus.Completed && (
                      <PermissionCheckWrapper
                        permission={{
                          method: PermissionMethod.Edit,
                          model: PermissionModel.Checklist,
                        }}
                        unauthorizedElement={<div />}
                      >
                        <Tooltip
                          title={intl.formatMessage({
                            defaultMessage: 'Edit Checklist',
                          })}
                        >
                          <Button
                            icon={<FontAwesomeIcon icon={faEdit} />}
                            onClick={() =>
                              navigate(
                                `/app/checklists/active/${record.key}?edit=true`
                              )
                            }
                            size="small"
                          />
                        </Tooltip>
                      </PermissionCheckWrapper>
                    )}
                    <PermissionCheckWrapper
                      permission={{
                        method: PermissionMethod.Delete,
                        model: PermissionModel.Checklist,
                      }}
                      unauthorizedElement={<div />}
                    >
                      <Tooltip
                        title={intl.formatMessage({
                          defaultMessage: 'Delete Checklist',
                        })}
                      >
                        <Popconfirm
                          okText={intl.formatMessage({
                            defaultMessage: 'Delete',
                          })}
                          onConfirm={() => deleteChecklist(record.key)}
                          overlayInnerStyle={{ padding: 10 }}
                          title={intl.formatMessage({
                            defaultMessage: 'Are you sure?',
                          })}
                        >
                          <Button
                            disabled={saving}
                            icon={<FontAwesomeIcon icon={faTrash} />}
                          />
                        </Popconfirm>
                      </Tooltip>
                    </PermissionCheckWrapper>
                  </Space>
                ),
                title: '',
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
                completedByName: checklist.completedBy?.fullName || '',
                description: '',
                documentLink: checklist.document?.url || '',
                key: checklist.id,
                name: checklist.name || '',
                percentComplete: `${checklist.percentComplete || 0}%`,
                score: checklist.percentageScore,
                status: checklist.status,
                storeName: checklist.business?.name || '',
                timeTaken: checklist.timeTaken || '',
              })
            )}
            loading={activeChecklistsLoading}
            onChange={(_pagination, filters, sorter) => {
              if (sorter && 'field' in sorter) {
                setActiveChecklistSort({
                  field: sorter.field as ActiveChecklistSortOptions,
                  order: sorter.order === 'ascend' ? 'asc' : 'desc',
                });
              } else if ('order' in sorter && sorter.order === undefined) {
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
              defaultPageSize: 25,
              hideOnSinglePage: true,
              pageSizeOptions: ['25', '50', '100'],
              showSizeChanger: true,
              showTotal: (total, range) =>
                intl.formatMessage(
                  { defaultMessage: '{start}-{end} of {total} checklists' },
                  { end: range[1], start: range[0], total }
                ),
            }}
            rowClassName={classes.row}
            size="small"
          />
        </Card>
      </div>
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
