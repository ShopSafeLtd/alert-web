import type { ImagePosition } from 'graphql/types';

import {
  currencyAtom,
  currentSchemeAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faEllipsisV,
  faPenToSquare,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreState } from 'state';

const useStyles = createUseStyles({
  avatar: {
    '& img': {
      pointerEvents: 'none',
      userSelect: 'none',
    },
    '&:hover': {
      borderColor: '#1890ff',
      transform: 'scale(1.1)',
    },
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
  },
  avatarGroup: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
  filterSection: {
    borderBottom: '1px solid #f0f0f0',
    padding: '12px 0',
  },
  moreAvatar: {
    '&:hover': {
      backgroundColor: '#40a9ff',
    },
    backgroundColor: '#1890ff',
    border: '2px solid transparent',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 600,
  },
  row: {
    // cursor: 'pointer'
  },
});

interface Props {
  deleteRights?: boolean;
  hasNavigation?: boolean;
  incidents:
    | Array<{
        business?: {
          id: string;
          name?: null | string | undefined;
        } | null;
        dayTime?: null | string;
        id: string;
        // };
        location?: {
          full?: null | string | undefined;
          id: string;
        } | null;
        offenders?: Array<{
          id: string;
          images?: Array<{
            id: string;
            optimised?: null | string;
            position?: ImagePosition | null;
            rotation?: null | number;
          }> | null;
          name?: null | string;
          reference?: null | number | string;
        }> | null;
        policeRef?: null | string;
        reference?: null | number;
        // crimeTypes?: Array<{ id: string; name: string }>;
        // createdBy?: {
        //   id: string;
        //   fullName?: string;
        subject?: null | string;
        //   businesses: Array<{ id: string; name: string }>;
        totalRecoveredValue?: null | number;
        totalValue?: null | number;
      }>
    | undefined;
  loading?: boolean;
  onDelete?: (id: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortChange?: (
    field: 'date' | 'totalValue',
    order: 'ascend' | 'descend'
  ) => void;
  page?: number;
  pageSize?: number;
  setEditData?: (id: string) => void;
  sortField?: 'date' | 'totalValue';
  sortOrder?: 'ascend' | 'descend';
  title?: React.ReactNode;
  total?: number;
}

const IncidentTable = ({
  deleteRights,
  hasNavigation,
  incidents,
  loading,
  onDelete,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  page,
  pageSize,
  setEditData,
  sortField,
  sortOrder,
  title,
  total,
}: Props): JSX.Element => {
  const classes = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();
  const darkTheme =
    useStoreState((state) => state.theme.currentTheme) === 'dark';
  const restrictIncidentAccess =
    useAtomValue(currentSchemeAtom)?.restrictIncidentAccess &&
    hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Incidents,
      },
    });
  const currency = useAtomValue(currencyAtom);

  // State for offender filter
  const [selectedOffenderIds, setSelectedOffenderIds] = useState<string[]>([]);

  // Get unique offenders from all incidents
  const allOffenders = useMemo(() => {
    const offenderMap = new Map<
      string,
      {
        id: string;
        imageUrl?: null | string;
        name?: null | string;
        reference?: null | number | string;
      }
    >();

    if (incidents)
      for (const incident of incidents) {
        if (incident.offenders)
          for (const offender of incident.offenders) {
            if (!offenderMap.has(offender.id)) {
              const imageUrl =
                offender.images && offender.images.length > 0
                  ? offender.images[0].optimised
                  : null;

              offenderMap.set(offender.id, {
                id: offender.id,
                imageUrl,
                name: offender.name,
                reference: offender.reference,
              });
            }
          }
      }

    return [...offenderMap.values()].sort((a, b) => {
      const nameA = a.name || 'Unknown';
      const nameB = b.name || 'Unknown';
      return nameA.localeCompare(nameB);
    });
  }, [incidents]);

  // Filter incidents - sorting is handled server-side
  const filteredIncidents = useMemo(() => {
    let result = incidents;

    // Filter by selected offenders
    if (selectedOffenderIds.length > 0) {
      result = result?.filter((incident) =>
        incident.offenders?.some((offender) =>
          selectedOffenderIds.includes(offender.id)
        )
      );
    }

    return result;
  }, [incidents, selectedOffenderIds]);

  return (
    <Table
      columns={[
        {
          dataIndex: 'reference',
          key: 'reference',
          render: (
            _,
            record: { key: string; reference: null | number | undefined }
          ) => {
            if (hasNavigation && !restrictIncidentAccess) {
              return (
                <Link to={`/app/incidents/view/${record.key}`}>
                  {record.reference}
                </Link>
              );
            }
            return <Typography.Text>{record.reference}</Typography.Text>;
          },
          title: intl.formatMessage({
            defaultMessage: 'Alert ID',
          }),
          width: 80,
        },
        {
          dataIndex: 'policeRef',
          key: 'policeRef',
          title: intl.formatMessage({
            defaultMessage: 'Crime No.',
          }),
        },
        {
          dataIndex: 'subject',
          key: 'subject',
          title: intl.formatMessage({
            defaultMessage: 'Subject',
          }),
        },
        {
          dataIndex: 'date',
          key: 'date',
          render: (date: string) => {
            if (!date) return '-';
            return date;
          },
          sortDirections: ['descend', 'ascend', 'descend'],
          sortOrder: sortField === 'date' ? sortOrder : null,
          sorter: true,
          title: intl.formatMessage({
            defaultMessage: 'Date',
          }),
        },
        {
          dataIndex: 'loss',
          key: 'loss',
          render: (value: number) =>
            intl.formatNumber(value || 0, {
              currency,
              style: 'currency',
            }),
          sortDirections: ['descend', 'ascend', 'descend'],
          sortOrder: sortField === 'totalValue' ? sortOrder : null,
          sorter: true,
          title: intl.formatMessage({
            defaultMessage: 'Loss',
          }),
        },
        {
          dataIndex: 'location',
          key: 'location',
          title: intl.formatMessage({
            defaultMessage: 'Location',
          }),
        },
        {
          dataIndex: 'offenders',
          key: 'offenders',
          render: (
            _,
            record: {
              offenders?: Array<{
                id: string;
                images?: Array<{
                  id: string;
                  optimised?: null | string;
                }> | null;
                name?: null | string;
                reference?: null | number | string;
              }> | null;
            }
          ) => {
            const offenders = record.offenders || [];
            const maxDisplay = 3;
            const displayOffenders = offenders.slice(0, maxDisplay);
            const remaining = offenders.length - maxDisplay;

            return (
              <div className={classes.avatarGroup}>
                {displayOffenders.map((offender) => {
                  const hasImage =
                    offender.images && offender.images.length > 0;
                  const imageUrl = hasImage
                    ? offender.images![0].optimised
                    : null;

                  return (
                    <Tooltip
                      key={offender.id}
                      title={
                        <div>
                          <div>
                            <strong>
                              {offender.name ||
                                intl.formatMessage({
                                  defaultMessage: 'Unknown',
                                })}
                            </strong>
                          </div>
                          {offender.reference && (
                            <div>
                              {intl.formatMessage(
                                { defaultMessage: '#{reference}' },
                                { reference: offender.reference }
                              )}
                            </div>
                          )}
                          <div style={{ fontSize: 11, marginTop: 4 }}>
                            {intl.formatMessage({
                              defaultMessage: 'Click to view',
                            })}
                          </div>
                        </div>
                      }
                    >
                      <div
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }}
                      >
                        <Avatar
                          className={classes.avatar}
                          icon={!imageUrl && <FontAwesomeIcon icon={faUser} />}
                          onClick={() =>
                            navigate(`/app/offenders/view/${offender.id}`)
                          }
                          size={32}
                          src={imageUrl}
                          style={{
                            backgroundColor: imageUrl
                              ? undefined
                              : darkTheme
                                ? '#595959'
                                : '#bfbfbf',
                            userSelect: 'none',
                          }}
                        />
                      </div>
                    </Tooltip>
                  );
                })}
                {remaining > 0 && (
                  <Tooltip
                    title={
                      <div>
                        {offenders.slice(maxDisplay).map((offender) => (
                          <div key={offender.id}>
                            {offender.name ||
                              intl.formatMessage({ defaultMessage: 'Unknown' })}
                          </div>
                        ))}
                      </div>
                    }
                  >
                    <Avatar className={classes.moreAvatar} size={32}>
                      {intl.formatMessage(
                        { defaultMessage: '+{remaining}' },
                        { remaining }
                      )}
                    </Avatar>
                  </Tooltip>
                )}
              </div>
            );
          },
          title: intl.formatMessage({
            defaultMessage: 'Offenders',
          }),
          width: 150,
        },
        {
          align: 'center' as const,
          dataIndex: 'Options',
          key: 'Options',
          render: (_, record: { key: string }) => {
            const menuItems: Array<{
              danger?: boolean;
              icon: React.ReactNode;
              key: string;
              label: string;
              onClick: () => void;
            }> = [];

            if (setEditData) {
              menuItems.push({
                icon: <FontAwesomeIcon icon={faPenToSquare} />,
                key: 'edit',
                label: intl.formatMessage({ defaultMessage: 'Edit' }),
                onClick: () => setEditData(record.key),
              });
            }

            if (onDelete) {
              menuItems.push({
                danger: true,
                icon: <FontAwesomeIcon icon={faTrash} />,
                key: 'delete',
                label: intl.formatMessage({ defaultMessage: 'Remove' }),
                onClick: () => {
                  Modal.confirm({
                    cancelText: intl.formatMessage({ defaultMessage: 'No' }),
                    okText: intl.formatMessage({ defaultMessage: 'Yes' }),
                    onOk: () => onDelete(record.key),
                    title: intl.formatMessage({
                      defaultMessage: 'Remove the incident?',
                    }),
                  });
                },
              });
            }

            if (menuItems.length === 0) return null;

            return (
              <Dropdown
                className="no-print"
                overlay={<Menu items={menuItems} />}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button
                  icon={<FontAwesomeIcon icon={faEllipsisV} />}
                  size="small"
                  style={{
                    color: darkTheme ? '#8c8c8c' : '#595959',
                  }}
                  type="text"
                />
              </Dropdown>
            );
          },
          title: '',
          width: 50,
        },
      ].filter((item) => item?.key !== 'Options' || deleteRights)}
      dataSource={
        filteredIncidents?.map((incident) => ({
          date: incident?.dayTime,
          key: incident?.id,
          location: incident?.business?.name || incident?.location?.full,
          loss:
            (incident?.totalValue || 0) - (incident?.totalRecoveredValue || 0),
          offenders: incident?.offenders,
          policeRef: incident?.policeRef,
          reference: incident?.reference,
          subject: incident?.subject,
        })) || []
      }
      loading={loading}
      onChange={(pagination, filters, sorter) => {
        if (
          !Array.isArray(sorter) &&
          sorter.columnKey &&
          sorter.order &&
          onSortChange
        ) {
          const field = sorter.columnKey === 'loss' ? 'totalValue' : 'date';
          onSortChange(field, sorter.order);
        }
      }}
      pagination={{
        defaultPageSize: pageSize || 5,
        hideOnSinglePage: !!(pageSize && pageSize < 100) || true,
        onChange:
          onPageSizeChange || onPageChange
            ? (tablePage: number, tablePageSize: number) => {
                if (onPageSizeChange && pageSize !== tablePageSize) {
                  onPageSizeChange(tablePageSize);
                }
                if (onPageChange && page !== tablePage) {
                  onPageChange(tablePage);
                }
              }
            : undefined,
        pageSizeOptions: [5, 10, 20, 50, 100],
        showSizeChanger: true,
        total: total || filteredIncidents?.length || 0,
      }}
      rowClassName={classes.row}
      size="small"
      title={() =>
        title ? (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 16,
              justifyContent: 'space-between',
              marginBottom: 16,
            }}
          >
            <div>{title}</div>
            <div style={{ alignItems: 'center', display: 'flex', gap: 12 }}>
              <Select
                allowClear
                dropdownStyle={{
                  backgroundColor: darkTheme ? '#1f1f1f' : '#ffffff',
                }}
                filterOption={(input, option) => {
                  const offender = allOffenders.find(
                    (o) => o.id === option?.value
                  );
                  if (!offender) return false;
                  const searchText =
                    `${offender.name || 'Unknown'} ${offender.reference || ''}`.toLowerCase();
                  return searchText.includes(input.toLowerCase());
                }}
                maxTagCount={2}
                mode="multiple"
                onChange={setSelectedOffenderIds}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Filter by offenders',
                })}
                showSearch
                style={{ minWidth: 300 }}
                value={selectedOffenderIds}
              >
                {allOffenders.map((offender) => (
                  <Select.Option key={offender.id} value={offender.id}>
                    <Space>
                      <div
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }}
                      >
                        <Avatar
                          icon={
                            !offender.imageUrl && (
                              <FontAwesomeIcon icon={faUser} />
                            )
                          }
                          size={20}
                          src={offender.imageUrl}
                          style={{
                            backgroundColor: offender.imageUrl
                              ? undefined
                              : darkTheme
                                ? '#595959'
                                : '#bfbfbf',
                            userSelect: 'none',
                          }}
                        />
                      </div>
                      <span>
                        {offender.name ||
                          intl.formatMessage({ defaultMessage: 'Unknown' })}
                        {offender.reference &&
                          intl.formatMessage(
                            { defaultMessage: ' (#{reference})' },
                            { reference: offender.reference }
                          )}
                      </span>
                    </Space>
                  </Select.Option>
                ))}
              </Select>
              {selectedOffenderIds.length > 0 && (
                <Space>
                  <Typography.Text style={{ fontSize: 13 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: '{count} filtered' },
                      { count: filteredIncidents?.length || 0 }
                    )}
                  </Typography.Text>
                  <Button
                    onClick={() => setSelectedOffenderIds([])}
                    size="small"
                    style={{ padding: '0 4px' }}
                    type="link"
                  >
                    {intl.formatMessage({ defaultMessage: 'Clear' })}
                  </Button>
                </Space>
              )}
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default IncidentTable;
