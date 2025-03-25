import type { ColumnsType } from 'antd/es/table/interface';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { faPenToSquare, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Popconfirm, Row, Tooltip, notification } from 'antd';
import {
  Model,
  PermissionMethod,
  PermissionModel,
  WorkflowTrigger,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

import type { WorkflowsQuery } from '../graphql/queries/__generated__/list-workflows.generated';

import { useDeleteOneWorkflowMutation } from '../graphql/mutations/__generated__/delete-workflow.generated';
import { WorkflowsDocument } from '../graphql/queries/__generated__/list-workflows.generated';

interface WorkflowItem {
  key: string;
  name: string;
  timesRun: number;
  triggerMethod: WorkflowTrigger;
  triggerModel: Model;
  triggeredOff: string;
}

const useCreateColumns = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const currentScheme = useAtomValue(currentSchemeIdAtom) ?? '';

  const variables = {
    where: {
      schemes: {
        some: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  };
  const [deleteWorkflow] = useDeleteOneWorkflowMutation({
    onCompleted: () => {
      notification.success({
        description: `The workflow has been removed from the list!`,
        message: 'Successfully Removed',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<WorkflowsQuery>({
        query: WorkflowsDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<WorkflowsQuery>({
        data: {
          workflows: existingData.workflows.filter(
            ({ id }) => id !== res?.deleteOneWorkflow?.id
          ),
        },
        query: WorkflowsDocument,
        variables,
      });
    },
  });
  const onDelete = (id: string) => {
    setSaving(true);
    void deleteWorkflow({
      variables: {
        id,
      },
    }).finally(() => setSaving(false));
  };
  const coloumns: ColumnsType<WorkflowItem> = [
    {
      dataIndex: 'name',
      key: 'name',
      title: <FormattedMessage defaultMessage="Name" />,
    },
    {
      dataIndex: 'triggeredOff',
      key: 'triggeredOff',
      title: <FormattedMessage defaultMessage="Trigger" />,
    },
    {
      dataIndex: 'triggerModel',
      filters: [
        {
          text: <FormattedMessage defaultMessage="Incident" />,
          value: Model.Incident,
        },
        {
          text: <FormattedMessage defaultMessage="Offender" />,
          value: Model.Offender,
        },
      ],
      key: 'triggerModel',
      title: <FormattedMessage defaultMessage="Trigger Data" />,
    },
    {
      dataIndex: 'triggerMethod',
      filters: [
        {
          text: <FormattedMessage defaultMessage="Approved" />,
          value: WorkflowTrigger.Approved,
        },
        {
          text: <FormattedMessage defaultMessage="Assigned" />,
          value: WorkflowTrigger.Assigned,
        },
        {
          text: <FormattedMessage defaultMessage="Completed" />,
          value: WorkflowTrigger.Completed,
        },
        {
          text: <FormattedMessage defaultMessage="Created" />,
          value: WorkflowTrigger.Created,
        },
        {
          text: <FormattedMessage defaultMessage="Schedule" />,
          value: WorkflowTrigger.Cron,
        },
        {
          text: <FormattedMessage defaultMessage="Updated" />,
          value: WorkflowTrigger.Updated,
        },
      ],
      key: 'triggerMethod',
      title: <FormattedMessage defaultMessage="Trigger Action" />,
    },
    {
      dataIndex: 'timesRun',
      key: 'timesRun',
      title: <FormattedMessage defaultMessage="Times Run" />,
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record: WorkflowItem) => (
        <Row gutter={8} wrap={false}>
          <PermissionCheckWrapper
            permission={{
              method: PermissionMethod.Edit,
              model: PermissionModel.Workflows,
            }}
            unauthorizedElement={<div />}
          >
            <Col>
              <Tooltip title={<FormattedMessage defaultMessage="Edit" />}>
                <Button
                  icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  onClick={() => {
                    navigate(`edit/${record.key}`);
                  }}
                  size="small"
                  style={{ marginRight: 5 }}
                />
              </Tooltip>
            </Col>
          </PermissionCheckWrapper>
          <PermissionCheckWrapper
            permission={{
              method: PermissionMethod.Delete,
              model: PermissionModel.Workflows,
            }}
            unauthorizedElement={<div />}
          >
            <Col>
              <Tooltip title={<FormattedMessage defaultMessage="Delete" />}>
                <Popconfirm
                  onConfirm={() => onDelete(record.key)}
                  overlayInnerStyle={{ padding: 10 }}
                  title={
                    <FormattedMessage defaultMessage="Do you want to delete this workflow?" />
                  }
                >
                  <Button
                    disabled={saving}
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    size="small"
                  />
                </Popconfirm>
              </Tooltip>
            </Col>
          </PermissionCheckWrapper>
        </Row>
      ),
      title: '',
      width: 50,
    },
  ];

  return coloumns;
};

export default useCreateColumns;
export type { WorkflowItem };
