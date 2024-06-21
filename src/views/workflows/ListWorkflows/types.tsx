import type { ColumnsType } from 'antd/es/table/interface';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { Button, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';

interface WorkflowItem {
  key: string;
  name: string;
  triggeredOff: string;
  timesRun: number;
}

const useCreateColumns = () => {
  const navigate = useNavigate();
  const coloumns: ColumnsType<WorkflowItem> = [
    {
      title: <FormattedMessage defaultMessage="Name" />,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <FormattedMessage defaultMessage="Triggered Off" />,
      dataIndex: 'triggeredOff',
      key: 'triggeredOff',
    },
    {
      title: <FormattedMessage defaultMessage="Times Run" />,
      dataIndex: 'timesRun',
      key: 'timesRun',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      width: 50,
      render: (_, record: WorkflowItem) => (
        <Tooltip title={<FormattedMessage defaultMessage="Edit" />}>
          <Button
            size="small"
            onClick={() => {
              console.log('clicked', record);
              navigate(`edit/${record.key}`);
            }}
            style={{ marginRight: 5 }}
            icon={<FontAwesomeIcon icon={faPenToSquare} />}
          />
        </Tooltip>
      ),
    },
  ];

  return coloumns;
};

export default useCreateColumns;
export type { WorkflowItem };
