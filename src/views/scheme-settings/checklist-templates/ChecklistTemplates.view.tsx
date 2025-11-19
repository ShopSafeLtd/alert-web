import type { CreateActiveChecklistMutation } from '#/views/checklist/graphql/mutations/__generated__/create-active-checklist.generated';
import type { ChecklistsQuery } from '#/views/checklist/graphql/queries/__generated__/list-checklists.generated';
import type { FetchResult } from '@apollo/client';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import {
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
  Space,
  Table,
  Tooltip,
} from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import CreateActiveChecklist from '../../../views/checklist/list-checklists/drawer/create-active-checklist';

interface ChecklistTemplatesViewProps {
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
  toggleCreateChecklistDrawer: (
    args: { checklistId: string; title: string } | null
  ) => void;
}

const ChecklistTemplatesView: React.FC<ChecklistTemplatesViewProps> = ({
  createActive,
  createChecklistOpen,
  data,
  deleteTemplate,
  loading,
  selectedChecklist,
  toggleCreateChecklistDrawer,
}) => {
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div style={{ padding: '24px' }}>
      <PageHeader
        extra={[
          <PermissionCheckWrapper
            key={0}
            permission={{
              method: PermissionMethod.Edit,
              model: PermissionModel.Checklist,
            }}
            unauthorizedElement={<div />}
          >
            <Button
              onClick={() => navigate('/app/checklists/add')}
              type="primary"
            >
              <FormattedMessage defaultMessage="Create New Template" />
            </Button>
          </PermissionCheckWrapper>,
        ]}
        title={<FormattedMessage defaultMessage="Checklist Templates" />}
      />
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'title',
              key: 'title',
              render: (value, item) => (
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Edit,
                    model: PermissionModel.Checklist,
                  }}
                  unauthorizedElement={<div> {value} </div>}
                >
                  <Link to={`/app/checklists/edit/${item.key}`}>{value}</Link>
                </PermissionCheckWrapper>
              ),
              title: <FormattedMessage defaultMessage="Title" />,
            },
            {
              dataIndex: 'description',
              key: 'description',
              title: <FormattedMessage defaultMessage="Description" />,
            },
            {
              dataIndex: 'Options',
              key: 'Options',
              render: (_, record: { key: string; title: string }) => (
                <Space>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Create active checklist from template',
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
                  <PermissionCheckWrapper
                    permission={{
                      method: PermissionMethod.Edit,
                      model: PermissionModel.Checklist,
                    }}
                    unauthorizedElement={<div />}
                  >
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
                              navigate(`/app/checklists/edit/${record.key}`)
                            }
                          />
                        }
                        size="small"
                      />
                    </Tooltip>
                  </PermissionCheckWrapper>
                  <PermissionCheckWrapper
                    permission={{
                      method: PermissionMethod.Delete,
                      model: PermissionModel.Checklist,
                    }}
                    unauthorizedElement={<div />}
                  >
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
                        <Button icon={<FontAwesomeIcon icon={faTrash} />} />
                      </Popconfirm>
                    </Tooltip>
                  </PermissionCheckWrapper>
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

export default ChecklistTemplatesView;
