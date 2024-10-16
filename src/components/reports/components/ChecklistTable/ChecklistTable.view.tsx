import type { ChecklistTableReportQuery } from '#/views/reports/checklist-table/__generated__/checklist-table-report-query.generated';
import type { MetaData } from '#/views/reports/types';

import {
  ChecklistColumns,
  type ChecklistTableData,
} from '#/components/reports/tableColumns';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Row, Switch, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface Props {
  changeSize: (arg0: string, arg1: number) => void;
  checklistsTableData: [] | ChecklistTableData[];
  data: ChecklistTableReportQuery | undefined;
  defaultPageSize?: number;
  editMode: boolean;
  loading: boolean;
  metadata: MetaData[];
  removeItem: (arg0: string) => void;
  setMetadata: (arg0: MetaData[]) => void;
}

const ChecklistTable = ({
  changeSize,
  checklistsTableData,
  data,
  defaultPageSize = 10,
  editMode,
  loading,
  metadata,
  removeItem,
  setMetadata,
}: Props) => {
  const intl = useIntl();

  const [editColumnOpen, setEditColumnOpen] = useState(false);
  const tableMetaData = useMemo(
    () => metadata.find((item) => item.key === 'checklistsTable'),
    [metadata]
  );
  const toggleEditColumn = () => {
    setEditColumnOpen(!editColumnOpen);
  };
  const onSubmitColumns = (formData: { [i: string]: string }) => {
    setMetadata([
      ...metadata.filter((item) => item.key !== 'checklistsTable'),
      {
        key: 'checklistsTable',
        type: 'table',
        ...tableMetaData,
        columns: ChecklistColumns.filter(
          (column) => formData[column.key as string]
        ).map((column) => column.key as string),
      },
    ]);
    toggleEditColumn();
  };

  return (
    <>
      <div>
        <Button
          className="change-graph1 no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon icon={faEdit} size="lg" />}
          onClick={toggleEditColumn}
          shape="circle"
          size="small"
          type="text"
        />
        <Button
          className="card-remove no-print"
          hidden={!editMode}
          icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
          onClick={() => removeItem('checklistsTable')}
          shape="circle"
          size="small"
          type="text"
        />
        <Table
          className="no-break"
          // eslint-disable-next-line
          columns={ChecklistColumns.filter((column) =>
            tableMetaData?.columns
              ? tableMetaData.columns.includes(column.key as string)
              : true
          )}
          dataSource={checklistsTableData}
          loading={loading}
          pagination={{
            defaultPageSize,
            hideOnSinglePage: true,
            onChange: (_, pageSize) => {
              changeSize('checklistsTable', pageSize);
            },
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
            total: data?.checklistTableReport?.total || 0,
          }}
          size="small"
        />
      </div>
      <Drawer
        onClose={toggleEditColumn}
        open={editColumnOpen}
        title={intl.formatMessage({
          defaultMessage: 'Select Table Columns',
        })}
      >
        {editColumnOpen && (
          <Form
            initialValues={
              tableMetaData?.columns
                ? Object.fromEntries(
                    tableMetaData.columns.map((b) => [b, true])
                  )
                : Object.fromEntries(
                    ChecklistColumns.map((b) => [b.key as string, true])
                  )
            }
            onFinish={onSubmitColumns}
          >
            {ChecklistColumns.map((column) => (
              <Form.Item
                key={column.key}
                label={column.title}
                name={column.key}
                style={{ marginBottom: 0 }}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            ))}
            <Row justify="end">
              <Col>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    <FormattedMessage defaultMessage="Save Columns" />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default ChecklistTable;
